import Link from "next/link";
import type { Site } from "../lib/schemas";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/blog/", label: "Blog" },
  { href: "/events/", label: "Events" },
  { href: "/requirements/", label: "Requirements" },
];

export function Header({ name }: { name: string }) {
  return (
    <header className="site-header no-print">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="container header-inner">
        <Link href="/" className="brand">{name}</Link>
        <nav aria-label="Main">
          <ul className="nav-list">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ site }: { site: Site }) {
  const { contact } = site;
  return (
    <footer className="site-footer no-print">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">{site.name}</p>
          <p>{site.tagline}</p>
        </div>
        <address>
          <p className="footer-title">Contact us</p>
          <p>{contact.address}</p>
          <p><a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>{contact.phone}</a></p>
          <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          <p>{contact.hours}</p>
        </address>
        <div>
          <p className="footer-title">Explore</p>
          <ul className="footer-links">
            {NAV.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-legal">&copy; {new Date().getFullYear()} {site.name}</div>
    </footer>
  );
}
