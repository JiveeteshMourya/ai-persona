import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  {
    href: "https://github.com/JiveeteshMourya",
    label: "GitHub",
    icon: FiGithub,
  },
  {
    href: "https://www.linkedin.com/in/jiveetesh-mourya-535994346/",
    label: "LinkedIn",
    icon: FiLinkedin,
  },
  {
    href: "https://x.com/jiveemourya",
    label: "X",
    icon: FaXTwitter,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-secondary/10 bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:px-6 lg:px-8">
        {/* Logo + Name */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="./JCodeLogo.png"
            alt="JCode logo"
            className="h-8 w-8 rounded-md object-contain sm:h-9 sm:w-9"
          />
          <span className="font-headlines text-base font-semibold text-secondary sm:text-lg">
            Jiveetesh Mourya
          </span>
        </div>

        {/* Warm message */}
        <p className="max-w-md text-center text-sm text-secondary/70 sm:text-base">
          I&apos;m happy you&apos;re using my project — thanks for stopping by, and I hope it's
          useful to you. 💚
        </p>

        {/* Project repo link */}
        <a
          href="https://github.com/JiveeteshMourya/ai-persona"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-secondary/15 px-4 py-2 text-sm font-medium text-secondary transition-colors duration-200 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
        >
          <FiGithub className="h-4 w-4" />
          View this project on GitHub
        </a>

        {/* Social links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full text-secondary transition-colors duration-200 hover:bg-primary/10 hover:text-primary sm:h-10 sm:w-10"
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          ))}
        </div>

        {/* Divider + copyright */}
        <div className="w-full max-w-xs border-t border-secondary/10 pt-4">
          <p className="text-center text-xs text-secondary/50">© {year} Jiveetesh Mourya.</p>
        </div>
      </div>
    </footer>
  );
}
