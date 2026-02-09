import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "About Odelya Krief — software engineer.",
};

export default function About() {
  return (
    <div className={styles.page}>
      <h1>About Me</h1>
      <p>
        I&apos;m Odelya, a software engineer with a focus on backend development
        and infrastructure. I enjoy designing systems that are reliable,
        maintainable, and simple.
      </p>
      <p>
        My day-to-day work involves building APIs, designing data pipelines,
        working with cloud infrastructure, and making sure things run smoothly
        at scale.
      </p>
      <p>
        Outside of work, I&apos;m always learning — whether it&apos;s exploring
        new technologies, reading about distributed systems, or tinkering with
        side projects like this website.
      </p>
      <h2>Get in Touch</h2>
      <p>
        Feel free to reach out on{" "}
        <a
          href="https://github.com/odelya"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        or{" "}
        <a
          href="https://linkedin.com/in/odelya"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        .
      </p>
    </div>
  );
}
