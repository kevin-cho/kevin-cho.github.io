import Image from "next/image";
import { FaEnvelopeSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { ResumeSquareIcon } from "@/components/resume-square-icon";

const links = [
  { label: "GitHub", href: "https://github.com/kevin-cho", Icon: FaGithubSquare },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chokevinj", Icon: FaLinkedin },
  { label: "Email", href: "mailto:chokevinj@gmail.com", Icon: FaEnvelopeSquare },
  { label: "Resume", href: "/kevin-cho-resume.pdf", Icon: ResumeSquareIcon },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <Image
        src="/images/kevin.png"
        alt="Photo of Kevin Cho"
        width={160}
        height={160}
        priority
        className="rounded-full"
      />
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Kevin Cho</h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Web Engineer
        </p>
      </div>
      <nav aria-label="Links">
        <ul className="flex gap-2">
          {links.map(({ label, href, Icon }) => (
            <li key={label}>
              {/* Icon-only link: aria-label gives screen readers the name, title shows it on hover */}
              <a
                href={href}
                aria-label={label}
                title={label}
                className="block rounded-md text-zinc-600 transition-colors hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                <Icon aria-hidden className="size-9" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
