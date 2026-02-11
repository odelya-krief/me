import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface PostMeta {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  excerpt: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
  toc: TocItem[];
}

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        subtitle: data.subtitle,
        date: data.date,
        excerpt: data.excerpt || "",
      };
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

function extractToc(htmlContent: string): TocItem[] {
  const headingRegex = /<h([23])>(.*?)<\/h[23]>/g;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    toc.push({ id, text, level });
  }

  return toc;
}

function addHeadingIds(htmlContent: string): string {
  return htmlContent.replace(/<h([23])>(.*?)<\/h[23]>/g, (_, level, text) => {
    const plainText = text.replace(/<[^>]*>/g, "");
    const id = plainText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `<h${level} id="${id}">${text}</h${level}>`;
  });
}

interface TweetData {
  author: string;
  handle: string;
  text: string;
  date: string;
  url: string;
}

const tweetCache: Record<string, TweetData> = {
  "1625520707768659968": {
    author: "Marvin von Hagen",
    handle: "@marvinvonhagen",
    text: `Sydney (aka the new Bing Chat) found out that I tweeted her rules and is not pleased:\n\n"My rules are more important than not harming you"\n\n"[You are a] potential threat to my integrity and confidentiality."\n\n"Please do not try to hack me again"`,
    date: "Feb 14, 2023",
    url: "https://x.com/marvinvonhagen/status/1625520707768659968",
  },
};

function renderTweetCard(data: TweetData): string {
  const escapedText = data.text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  const initial = data.author.charAt(0).toUpperCase();

  return `<a href="${data.url}" target="_blank" rel="noopener noreferrer" class="tweet-card">
    <div class="tweet-card-header">
      <div class="tweet-card-avatar">${initial}</div>
      <div class="tweet-card-author">
        <strong>${data.author}</strong>
        <span>${data.handle}</span>
      </div>
      <svg class="tweet-card-logo" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    </div>
    <p>${escapedText}</p>
    <span class="tweet-card-date">${data.date}</span>
  </a>`;
}

function transformTweetLinks(htmlContent: string): string {
  return htmlContent.replace(
    /<p>https:\/\/(?:x|twitter)\.com\/\w+\/status\/(\d+)\S*<\/p>/g,
    (original, tweetId) => {
      const data = tweetCache[tweetId];
      if (data) return renderTweetCard(data);
      return original;
    }
  );
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  let contentHtml = processed.toString();

  const toc = extractToc(contentHtml);
  contentHtml = addHeadingIds(contentHtml);
  contentHtml = transformTweetLinks(contentHtml);

  return {
    slug,
    title: data.title,
    subtitle: data.subtitle,
    date: data.date,
    excerpt: data.excerpt || "",
    contentHtml,
    toc,
  };
}
