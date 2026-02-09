---
title: "Why I Chose Next.js for This Site"
date: "2026-02-08"
excerpt: "A look at the technical decisions behind this personal site and why simplicity won."
---

When I set out to build a personal site, I had a few requirements: it had to be simple, fast, and easy to maintain. Here's why I landed on Next.js.

## The requirements

- **Free hosting** — Vercel's free tier is generous and purpose-built for Next.js
- **Static generation** — blog posts don't change often, so they should be pre-rendered at build time
- **Markdown support** — I want to write posts in Markdown, not through a CMS
- **Minimal dependencies** — fewer dependencies means less maintenance

## Why not a static site generator?

Tools like Hugo or Jekyll are great, but I wanted something in the JavaScript/TypeScript ecosystem. As a backend engineer expanding into frontend, staying in one language reduces context switching.

## The stack

- **Next.js** with the App Router for routing and static generation
- **TypeScript** for type safety
- **CSS Modules** for scoped, zero-runtime styling
- **gray-matter + remark** for Markdown parsing

No UI libraries. No CSS frameworks. No state management. Just the basics.

## The result

The entire site builds in seconds, scores well on Lighthouse, and I can add a new blog post by dropping a Markdown file into a folder. That's exactly what I wanted.
