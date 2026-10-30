import Image from "next/image";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chokevinj" },
  { label: "GitHub", href: "https://github.com/kevin-cho" },
  { label: "Email", href: "mailto:chokevinj@gmail.com" },
  { label: "Resume", href: "/kevin-cho-resume.pdf" },
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
        <ul className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="inline-block rounded-full border border-zinc-300 px-5 py-2 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
