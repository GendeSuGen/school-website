import type { Metadata } from "next";
import { loadContent } from "../../lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Our history, mission and vision, leadership and campus.",
};

export default function AboutPage() {
  const { site } = loadContent();
  const { about, contact } = site;

  return (
    <>
      <h1>About {site.name}</h1>

      <section aria-labelledby="history">
        <h2 id="history">Our history</h2>
        {about.history.split("\n\n").map((p) => <p key={p}>{p}</p>)}
      </section>

      <section aria-labelledby="mv" className="grid two">
        <div className="card">
          <h2 id="mv">Mission</h2>
          <p>{about.mission}</p>
        </div>
        <div className="card">
          <h2>Vision</h2>
          <p>{about.vision}</p>
        </div>
      </section>

      <section aria-labelledby="leadership">
        <h2 id="leadership">Leadership</h2>
        <div className="grid">
          {about.leadership.map((l) => (
            <article className="card" key={l.name}>
              <h3>{l.name}</h3>
              <p className="meta">{l.role}</p>
              {l.message ? <p>&ldquo;{l.message}&rdquo;</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="campus">
        <h2 id="campus">Campus at a glance</h2>
        <dl className="stats">
          {about.campusFacts.map((f) => (
            <div key={f.label}><dd>{f.value}</dd><dt>{f.label}</dt></div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="visit">
        <h2 id="visit">Visit or contact us</h2>
        <address>
          <p>{contact.address}</p>
          <p>Phone: <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>{contact.phone}</a></p>
          <p>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          <p>Office hours: {contact.hours}</p>
          {contact.mapUrl ? <p><a href={contact.mapUrl}>View on a map</a></p> : null}
        </address>
      </section>
    </>
  );
}
