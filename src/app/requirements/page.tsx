import type { Metadata } from "next";
import Link from "next/link";
import { loadContent } from "../../lib/content";

export const metadata: Metadata = {
  title: "Requirements",
  description: "What new enrollees and transferees need to prepare and submit.",
};

export default function RequirementsPage() {
  const { requirements } = loadContent();
  return (
    <>
      <h1>Requirements</h1>
      <p className="lead">Choose the group that fits you to see the documents, steps, deadlines and fees.</p>
      <div className="grid two">
        <article className="card">
          <h2><Link href="/requirements/enrollees/">New enrollees</Link></h2>
          <p>{requirements.enrollees.intro}</p>
          <p><Link className="btn" href="/requirements/enrollees/">See enrollee requirements</Link></p>
        </article>
        <article className="card">
          <h2><Link href="/requirements/transferees/">Transferees</Link></h2>
          <p>{requirements.transferees.intro}</p>
          <p><Link className="btn" href="/requirements/transferees/">See transferee requirements</Link></p>
        </article>
      </div>
    </>
  );
}
