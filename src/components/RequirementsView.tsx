import { publicUrl, telHref } from "../lib/format";
import { ui } from "../lib/strings";
import type { Requirements } from "../lib/schemas";
import { PrintButton } from "./PrintButton";

export function RequirementsView({ data }: { data: Requirements }) {
  return (
    <>
      <p className="lead">{data.intro}</p>
      <p className="no-print actions">
        <PrintButton />
        {data.formPdf ? (
          <a className="btn btn-secondary" href={publicUrl(data.formPdf)} download>{ui.requirements.downloadForm}</a>
        ) : null}
      </p>

      <section aria-labelledby="docs">
        <h2 id="docs">{ui.requirements.documents}</h2>
        <ul className="checklist">
          {data.documents.map((d) => (
            <li key={d.name}>
              <span className="box" aria-hidden="true" />
              <span><strong>{d.name}</strong>{d.note ? <span className="note"> {d.note}</span> : null}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="steps">
        <h2 id="steps">{ui.requirements.steps}</h2>
        <ol className="steps">
          {data.steps.map((s) => (
            <li key={s.title}><strong>{s.title}</strong><span>{s.description}</span></li>
          ))}
        </ol>
      </section>

      {data.deadlines.length ? (
        <section aria-labelledby="deadlines">
          <h2 id="deadlines">{ui.requirements.deadlines}</h2>
          <dl className="facts">
            {data.deadlines.map((d) => (
              <div key={d.label}><dt>{d.label}</dt><dd>{d.when}</dd></div>
            ))}
          </dl>
        </section>
      ) : null}

      {data.fees.length ? (
        <section aria-labelledby="fees">
          <h2 id="fees">{ui.requirements.fees}</h2>
          <dl className="facts">
            {data.fees.map((f) => (
              <div key={f.label}><dt>{f.label}</dt><dd>{f.amount}</dd></div>
            ))}
          </dl>
        </section>
      ) : null}

      <section aria-labelledby="questions">
        <h2 id="questions">{ui.requirements.questions}</h2>
        <p>
          {data.contact.office}: <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a> ·{" "}
          <a href={telHref(data.contact.phone)}>{data.contact.phone}</a>
        </p>
      </section>
    </>
  );
}
