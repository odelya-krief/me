import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: "var(--max-width)",
        margin: "0 auto",
        padding: "4rem 1.5rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>404</h1>
      <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
        This page doesn&apos;t exist.
      </p>
      <Link href="/">Go home &rarr;</Link>
    </div>
  );
}
