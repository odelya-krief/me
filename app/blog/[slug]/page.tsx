import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className={styles.wrapper}>
      <article className={styles.page}>
        <header>
          <h1>{post.title}</h1>
          {post.subtitle && (
            <p className={styles.subtitle}>{post.subtitle}</p>
          )}
          <time>{post.date}</time>
        </header>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      {post.toc.length > 0 && (
        <aside className={styles.sidebar}>
          <nav className={styles.toc}>
            <h2>On this page</h2>
            <ul>
              {post.toc.map((item) => (
                <li
                  key={item.id}
                  className={item.level === 3 ? styles.tocSub : undefined}
                >
                  <Link href={`#${item.id}`}>{item.text}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </div>
  );
}
