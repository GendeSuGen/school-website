import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <p className="lead">We couldn&apos;t find that page.</p>
      <p><Link className="btn" href="/">Back to Home</Link></p>
    </>
  );
}
