import Link from "next/link";
import { telHref } from "../lib/format";
import { ui } from "../lib/strings";
import type { Site } from "../lib/schemas";

const NAV = [
  { href: "/", label: ui.nav.home },
  { href: "/about/", label: ui.nav.about },
  { href: "/blog/", label: ui.nav.blog },
  { href: "/events/", label: ui.nav.events },
  { href: "/requirements/", label: ui.nav.requirements },
];

export function Header({ name }: { name: string }) {
  return (
    <header className="site-header no-print">
      <a className="skip-link" href="#main">{ui.skipToContent}</a>
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
          <p className="footer-title">{ui.footer.contactUs}</p>
          <p>{contact.address}</p>
          <p><a href={telHref(contact.phone)}>{contact.phone}</a></p>
          <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          <p>{contact.hours}</p>
          {contact.mapUrl ? <p><a href={contact.mapUrl}>{ui.footer.findOnMap}</a></p> : null}
        </address>
        <div>
          <p className="footer-title">{ui.footer.explore}</p>
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
