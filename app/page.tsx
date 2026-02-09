import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Hey, I&apos;m Odelya</h1>
      <p className={styles.subtitle}>
        Software engineer focused on backend systems and infrastructure.
        I build reliable, scalable things — and occasionally write about it.
      </p>
      <div className={styles.links}>
        <a href="/about">About me &rarr;</a>
        <a href="/blog">Read the blog &rarr;</a>
      </div>
    </div>
  );
}
