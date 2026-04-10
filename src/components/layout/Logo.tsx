/**
 * Inline SVG logo — always renders as true vector graphics, never rasterised.
 *
 * The previous approach piped the SVG through Next.js <Image>, which runs the
 * image optimiser and converts it to a fixed-resolution raster (240×30 px).
 * That's why the logo looked blurry/pixelated, especially on high-DPR screens.
 *
 * By inlining the SVG we get:
 *  • pixel-perfect sharpness at every zoom level and device pixel ratio
 *  • zero layout shift (no network request)
 *  • full CSS control over sizing via the className prop
 *
 * Gradient IDs are prefixed with "logo-" to avoid collisions if other inline
 * SVGs share the page.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 60"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-gM" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#D4C6F0" />
          <stop offset="35%" stopColor="#9E88CC" />
          <stop offset="65%" stopColor="#7B68AE" />
          <stop offset="100%" stopColor="#4A3D72" />
        </linearGradient>
        <linearGradient id="logo-gL" x1="0.25" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stopColor="#E0D4F5" />
          <stop offset="100%" stopColor="#A48ECE" />
        </linearGradient>
        <linearGradient id="logo-gA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6B5E95" />
          <stop offset="100%" stopColor="#3D325E" />
        </linearGradient>
      </defs>

      {/* ── Lotus icon ── */}
      <g transform="translate(30,31) scale(0.105)">
        {/* Outer petals */}
        <path
          d="M0,-195 C30,-155 50,-100 50,-55 C50,-20 35,5 0,18 C-35,5 -50,-20 -50,-55 C-50,-100 -30,-155 0,-195Z"
          fill="url(#logo-gM)" stroke="#3D325E" strokeWidth="2"
        />
        <g transform="rotate(-42)">
          <path
            d="M0,-175 C28,-138 45,-90 45,-50 C45,-18 32,5 0,16 C-32,5 -45,-18 -45,-50 C-45,-90 -28,-138 0,-175Z"
            fill="url(#logo-gM)" stroke="#3D325E" strokeWidth="2"
          />
        </g>
        <g transform="rotate(42)">
          <path
            d="M0,-175 C28,-138 45,-90 45,-50 C45,-18 32,5 0,16 C-32,5 -45,-18 -45,-50 C-45,-90 -28,-138 0,-175Z"
            fill="url(#logo-gM)" stroke="#3D325E" strokeWidth="2"
          />
        </g>
        <g transform="rotate(-80)">
          <path
            d="M0,-160 C25,-125 40,-82 40,-45 C40,-15 28,8 0,16 C-28,8 -40,-15 -40,-45 C-40,-82 -25,-125 0,-160Z"
            fill="url(#logo-gM)" stroke="#3D325E" strokeWidth="2"
          />
        </g>
        <g transform="rotate(80)">
          <path
            d="M0,-160 C25,-125 40,-82 40,-45 C40,-15 28,8 0,16 C-28,8 -40,-15 -40,-45 C-40,-82 -25,-125 0,-160Z"
            fill="url(#logo-gM)" stroke="#3D325E" strokeWidth="2"
          />
        </g>

        {/* Inner petals */}
        <path
          d="M0,-135 C20,-105 32,-68 32,-38 C32,-12 22,6 0,14 C-22,6 -32,-12 -32,-38 C-32,-68 -20,-105 0,-135Z"
          fill="url(#logo-gL)" stroke="#6B5E95" strokeWidth="1.6" opacity="0.92"
        />
        <g transform="rotate(-42)">
          <path
            d="M0,-120 C18,-95 28,-62 28,-35 C28,-10 20,6 0,12 C-20,6 -28,-10 -28,-35 C-28,-62 -18,-95 0,-120Z"
            fill="url(#logo-gL)" stroke="#6B5E95" strokeWidth="1.6" opacity="0.88"
          />
        </g>
        <g transform="rotate(42)">
          <path
            d="M0,-120 C18,-95 28,-62 28,-35 C28,-10 20,6 0,12 C-20,6 -28,-10 -28,-35 C-28,-62 -18,-95 0,-120Z"
            fill="url(#logo-gL)" stroke="#6B5E95" strokeWidth="1.6" opacity="0.88"
          />
        </g>
        <g transform="rotate(-80)">
          <path
            d="M0,-105 C16,-82 24,-55 24,-30 C24,-8 16,6 0,12 C-16,6 -24,-8 -24,-30 C-24,-55 -16,-82 0,-105Z"
            fill="url(#logo-gL)" stroke="#6B5E95" strokeWidth="1.6" opacity="0.85"
          />
        </g>
        <g transform="rotate(80)">
          <path
            d="M0,-105 C16,-82 24,-55 24,-30 C24,-8 16,6 0,12 C-16,6 -24,-8 -24,-30 C-24,-55 -16,-82 0,-105Z"
            fill="url(#logo-gL)" stroke="#6B5E95" strokeWidth="1.6" opacity="0.85"
          />
        </g>

        {/* Center jewel */}
        <circle cx="0" cy="14" r="12" fill="url(#logo-gL)" stroke="url(#logo-gA)" strokeWidth="2.5" />
        <circle cx="0" cy="14" r="6" fill="url(#logo-gM)" stroke="#332A52" strokeWidth="1.5" />
      </g>

      {/* ── Brand name ── */}
      <text
        x="68"
        y="28"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        fontSize="23"
        fontWeight="700"
        fill="#2A2D5E"
        letterSpacing="3.5"
        textRendering="geometricPrecision"
      >
        360 RADIANCE
      </text>

      {/* ── Tag line ── */}
      <text
        x="68"
        y="47"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        fontSize="10.5"
        fontWeight="500"
        fill="#5A4D80"
        letterSpacing="5.5"
        textRendering="geometricPrecision"
      >
        SKIN CARE
      </text>
    </svg>
  );
}
