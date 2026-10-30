import type { SVGProps } from "react";

// Font Awesome's rounded square (same shape as FaGithubSquare / FaEnvelopeSquare)
const SQUARE =
  "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z";

// Font Awesome's FaFileAlt document shape
const DOCUMENT =
  "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z";

/**
 * Resume icon matching the Font Awesome square icons: the rounded square
 * with a document shape cut out of it (via an SVG mask).
 */
export function ResumeSquareIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" {...props}>
      <defs>
        <mask id="resume-square-icon-mask">
          <path fill="#fff" d={SQUARE} />
          {/* Black hides the square; the document is scaled to half size and centered */}
          <path fill="#000" d={DOCUMENT} transform="translate(128 128) scale(0.5)" />
        </mask>
      </defs>
      <path d={SQUARE} mask="url(#resume-square-icon-mask)" />
    </svg>
  );
}
