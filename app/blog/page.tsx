import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts by Odelya Krief.",
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className={styles.page}>
      <h1>Blog</h1>
      {posts.length === 0 ? (
        <p className={styles.empty}>No posts yet. Check back soon!</p>
      ) : (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.item}>
              <Link href={`/blog/${post.slug}`}>
                <h2>{post.title}</h2>
                <time>{post.date}</time>
                {post.excerpt && <p>{post.excerpt}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
