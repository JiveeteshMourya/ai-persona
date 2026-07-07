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

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-secondary/10 bg-surface/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo + Name */}
        <a href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img
            src="./JCodeLogo.png"
            alt="JCode logo"
            className="h-8 w-8 shrink-0 rounded-md object-contain sm:h-9 sm:w-9"
          />
          <span className="truncate font-headlines text-base font-semibold text-secondary sm:text-lg">
            Jiveetesh Mourya
          </span>
        </a>

        {/* Social links */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
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
      </nav>
    </header>
  );
}
