'use client';

import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import { PRODUCTS, type Product } from '@/lib/constants';

/*
 * Cart state — purely client-side, persisted to localStorage so a page refresh
 * (or returning later in the same browser) keeps the cart intact. No DB, no
 * server session. State is just `{ items: [{ slug, qty }] }`. Pricing and
 * product details are joined from PRODUCTS at read time, so the source of
 * truth for prices stays in src/data/products.ts — no risk of stale snapshots.
 *
 * The provider also owns the drawer open/close state so a single context can
 * power CartButton (in the navbar) and CartDrawer (mounted alongside children
 * here). One source of truth, no prop drilling.
 *
 * `stripeEnabled` is a feature flag passed in from the server-rendered
 * PageShell — read from `process.env.STRIPE_SECRET_KEY` on the server. When
 * false, every cart UI surface (CartButton, "Add to cart" CTAs) hides itself,
 * so the buy flow never appears in prod until the env var is set in Vercel.
 * The moment Marta sets the key, the next deploy lights everything up.
 */

export type CartItem = { slug: string; qty: number };

type CartState = { items: CartItem[] };
type CartAction =
  | { type: 'add'; slug: string; qty?: number }
  | { type: 'remove'; slug: string }
  | { type: 'setQty'; slug: string; qty: number }
  | { type: 'clear' }
  | { type: 'hydrate'; items: CartItem[] };

const STORAGE_KEY = '360radiance_cart_v1';
const MAX_QTY_PER_LINE = 20;

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'hydrate':
      return { items: action.items };
    case 'add': {
      const existing = state.items.find((i) => i.slug === action.slug);
      const inc = action.qty ?? 1;
      if (existing) {
        const nextQty = Math.min(existing.qty + inc, MAX_QTY_PER_LINE);
        return {
          items: state.items.map((i) => (i.slug === action.slug ? { ...i, qty: nextQty } : i)),
        };
      }
      return {
        items: [...state.items, { slug: action.slug, qty: Math.min(inc, MAX_QTY_PER_LINE) }],
      };
    }
    case 'setQty': {
      if (action.qty <= 0) {
        return { items: state.items.filter((i) => i.slug !== action.slug) };
      }
      return {
        items: state.items.map((i) =>
          i.slug === action.slug ? { ...i, qty: Math.min(action.qty, MAX_QTY_PER_LINE) } : i,
        ),
      };
    }
    case 'remove':
      return { items: state.items.filter((i) => i.slug !== action.slug) };
    case 'clear':
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  /** Items joined to PRODUCTS, with stale-slug entries filtered out. */
  lineItems: Array<{ product: Product; qty: number }>;
  /** Total item count (sum of all line qty). */
  count: number;
  /** Subtotal in dollars (NOT cents). */
  subtotal: number;
  /** True when the next dollar pushes the cart over the free-shipping threshold. */
  qualifiesForFreeShipping: boolean;
  freeShippingThreshold: number;
  /** Drawer open state. */
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** True when the build was provisioned with a Stripe secret key. */
  stripeEnabled: boolean;
  /** True until the localStorage hydration runs (prevents SSR/client mismatch). */
  hydrated: boolean;
  // Actions
  addItem: (slug: string, qty?: number) => void;
  removeItem: (slug: string) => void;
  setItemQty: (slug: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const FREE_SHIPPING_THRESHOLD = 75; // dollars

export function CartProvider({
  children,
  stripeEnabled,
}: {
  children: ReactNode;
  stripeEnabled: boolean;
}) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage on mount. The 'hydrate' action replaces state
  // wholesale rather than appending, so a stale localStorage with deleted
  // products gets cleaned up below in the lineItems join.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { items?: CartItem[] };
        if (Array.isArray(parsed.items)) {
          dispatch({ type: 'hydrate', items: parsed.items });
        }
      }
    } catch {
      // ignore — corrupt JSON or no localStorage (private mode), start clean
    }
    setHydrated(true);
  }, []);

  // Persist on every change after hydration. Skipping the first render
  // prevents wiping a cart with an empty initial state before hydrate runs.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // quota exceeded or storage disabled — silently noop
    }
  }, [state, hydrated]);

  // Body scroll lock while drawer is open. Reuses the same pattern as
  // ProductModal and MobileNav so the page doesn't shift behind the drawer.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const value = useMemo<CartContextValue>(() => {
    // Join cart items to PRODUCTS by slug. Drops any stale entries (product
    // removed from catalog after the cart was saved) so we never charge for
    // a missing SKU.
    const productMap = new Map(PRODUCTS.map((p) => [p.slug, p]));
    const lineItems = state.items
      .map((i) => {
        const product = productMap.get(i.slug);
        return product ? { product, qty: i.qty } : null;
      })
      .filter((x): x is { product: Product; qty: number } => x !== null);

    const count = lineItems.reduce((sum, li) => sum + li.qty, 0);
    const subtotal = lineItems.reduce((sum, li) => sum + li.product.price * li.qty, 0);

    return {
      items: state.items,
      lineItems,
      count,
      subtotal,
      qualifiesForFreeShipping: subtotal >= FREE_SHIPPING_THRESHOLD,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      stripeEnabled,
      hydrated,
      addItem: (slug, qty) => dispatch({ type: 'add', slug, qty }),
      removeItem: (slug) => dispatch({ type: 'remove', slug }),
      setItemQty: (slug, qty) => dispatch({ type: 'setQty', slug, qty }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [state.items, isOpen, stripeEnabled, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return ctx;
}
