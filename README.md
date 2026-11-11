# Relay Blog

A production-grade, editorial-style **Blog-Only** site built with **Next.js 16 (App Router)**, **Fumadocs MDX**, and **Tailwind CSS v4**.

Features an ambient dual-theme UI (warm peach/amber glow in Light Mode, deep midnight aura in Dark Mode) inside a floating editorial canvas.

---

## 📁 Project Structure & File Map

```text
├── app/
│   ├── (home)/
│   │   ├── layout.tsx              # Ambient backdrop + floating canvas card + Navbar + Footer
│   │   ├── page.tsx                # Homepage (renders the blog index directly)
│   │   └── blog/
│   │       ├── page.tsx            # Blog index page (hero section, topics filter, post cards)
│   │       ├── [...slug]/page.tsx  # Dynamic blog post page (title, meta, cover, MDX body, TOC)
│   │       └── tags/
│   │           ├── page.tsx        # "All Tags" directory page
│   │           └── [tag]/page.tsx  # Filtered posts by single tag page
│   ├── api/search/route.ts         # Full-text search API powered by Fumadocs
│   ├── og/blog/[...slug]/route.tsx # Automatic dynamic OpenGraph (OG) image generation
│   ├── llms.txt/route.ts           # Clean text index for AI & LLMs (/llms.txt)
│   ├── llms-full.txt/route.ts      # Complete markdown corpus for LLMs (/llms-full.txt)
│   ├── llms.mdx/blog/[[...slug]]/  # Raw markdown content route for curl / CLI
│   ├── rss.xml/route.ts            # RSS 2.0 XML feed (/rss.xml)
│   ├── layout.tsx                  # Root layout (Inter font, metadataBase, search provider)
│   └── global.css                  # Tailwind CSS v4 & Fumadocs theme styles
│
├── components/
│   ├── navbar.tsx                  # Top navigation bar inside the canvas (brand, links, search, theme)
│   ├── theme-toggle.tsx            # Light/Dark mode toggle button
│   ├── search-button.tsx           # Search modal trigger button (⌘K)
│   ├── mdx.tsx                     # MDX component configuration
│   └── blog/                       # Modular blog components:
│       ├── index.ts                # Central barrel export (import from '@/components/blog')
│       ├── card.tsx                # <BlogCards /> & <BlogCard /> post preview cards
│       ├── header.tsx              # <BlogHeader />, <BlogTitle />, <BlogDescription />, <BlogDate />
│       ├── authors.tsx             # <BlogAuthors /> (avatars, titles, profile links)
│       ├── tags.tsx                # <BlogTags /> pills & <BlogTagCards /> directory grid
│       ├── nav.tsx                 # <BlogPostNav /> older / newer post navigation
│       ├── body.tsx                # <BlogBody /> typography styling for MDX
│       ├── page.tsx                # <BlogPage /> article wrapper
│       └── panel.tsx               # Floating table of contents + native share button
│
├── content/
│   └── blog/                       # All MDX blog posts live here
│       ├── reducing-hallucination-rates.mdx
│       ├── introducing-relay.mdx
│       ├── optimizing-latency-at-edge.mdx
│       └── designing-for-focus.mdx
│
├── lib/
│   ├── source.ts                   # Content loader, author definitions, collection schema
│   ├── blog.ts                     # Blog types, post sorting, tag aggregation, reading time
│   ├── shared.ts                   # App name, routes, GitHub config, image/markdown URL helpers
│   ├── rss.ts                      # RSS feed generation logic
│   └── cn.ts                       # ClassName utility
│
├── public/                         # Static assets (images, icons, SVGs)
│   ├── blog/                       # Local images for blog posts
│   └── authors/                    # Local author avatar photos
│
└── proxy.ts                        # Content negotiation (serves .md to curl & AI agents)
```

---

## ✍️ How to Write a New Blog Post

Create a new `.mdx` file inside the `content/blog/` directory (for example, `content/blog/my-first-post.mdx`):

```mdx
---
title: How We Scaled Real-Time Webhooks to 10k Events/sec
description: A practical look at our queueing architecture, retry semantics, and backpressure.
date: 2026-11-15
tags: [Engineering, Architecture, Performance]
authors: [alex, relay]
readingTime: 6 min read
image: /blog/my-cover.png
---

Write your article here using standard Markdown and MDX.

## Subheading One

Here is a paragraph of text explaining your architecture.

```typescript
export function processEvent(event: WebhookEvent) {
  // Your code here
}
```

> Important quote or callout text.
```

### Frontmatter Reference

| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | **Required**. Article headline. |
| `description` | `string` | **Optional**. 1–2 sentence summary shown in previews and metadata. |
| `date` | `YYYY-MM-DD` | **Optional**. Publish date; posts are automatically sorted newest-first. |
| `tags` | `string[]` | **Optional**. Array of categories (e.g. `[AI, Design]`). Dedicated pages are auto-generated at `/blog/tags/[tag]`. |
| `authors` | `string[]` | **Optional**. Keys matching authors declared in `lib/source.ts`. |
| `readingTime` | `string` | **Optional**. e.g. `8 min read`. If omitted, reading time is computed automatically. |
| `image` | `string` | **Optional**. Cover image URL (remote HTTPS or local `/blog/...`). |

---

## 🖼️ How to Use Local Images (`public/` Folder)

Store your local images inside the `public/` directory:

```text
public/
  ├── blog/
  │    ├── cover-photo.png
  │    └── architecture-diagram.svg
  └── authors/
       └── alex.jpg
```

### 1. In Post Frontmatter (Cover Image)
Simply reference the path starting from `/`:
```yaml
image: /blog/cover-photo.png
```

### 2. Inside the Post Body (Markdown)
```markdown
![Architecture Diagram](/blog/architecture-diagram.svg)
```

### 3. As an Author Avatar in `lib/source.ts`
```typescript
alex: {
  name: 'Alex Rivera',
  title: 'Lead Architect',
  image: '/authors/alex.jpg',
}
```

> **Note on External Images**: If using remote images (e.g., Unsplash, GitHub), ensure the domains are allowed in `next.config.mjs` under `images.remotePatterns`. We have already pre-configured `images.unsplash.com` and `avatars.githubusercontent.com`.

---

## 👥 How to Add and Manage Authors

Open [`lib/source.ts`](file:///home/spidey/Projects/relay-blog/lib/source.ts) and add your author to `blogAuthors`:

```typescript
export const blogAuthors: Record<string, BlogAuthor> = {
  oliver: {
    name: 'Oliver Twist',
    title: 'AI Research Lead',
    url: 'https://github.com/RelayMailHQ',
    image: 'https://avatars.githubusercontent.com/u/1024025', // or '/authors/oliver.jpg'
  },
  // Add new authors here:
  elena: {
    name: 'Elena Rostova',
    title: 'Distributed Systems Engineer',
    url: 'https://github.com/elena',
    image: '/authors/elena.png',
  },
};
```

Then in any post, just set `authors: [elena]` in the frontmatter.

---

## 🎛️ How to Adjust Header and Title Text Sizes

All text sizes use standard Tailwind CSS classes and can be customized either globally or per-page:

### 1. Global Default Blog Post Title
File: [`components/blog/header.tsx`](file:///home/spidey/Projects/relay-blog/components/blog/header.tsx)
Locate `BlogTitle`:
```tsx
export function BlogTitle(props: ComponentProps<'h1'>) {
  return (
    <h1
      {...props}
      className={cn(
        'mt-6 text-2xl sm:text-3xl lg:text-[34px] font-normal sm:font-medium tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.25]',
        props.className,
      )}
    />
  );
}
```
- For **smaller title**: change to `text-xl sm:text-2xl lg:text-[28px]`
- For **larger title**: change to `text-3xl sm:text-4xl lg:text-5xl font-bold`

### 2. Post Title on Single Post Page
File: [`app/(home)/blog/[...slug]/page.tsx`](file:///home/spidey/Projects/relay-blog/app/(home)/blog/[...slug]/page.tsx)
```tsx
<BlogTitle>{page.data.title}</BlogTitle>
```
You can pass custom classes anytime: `<BlogTitle className="text-xl sm:text-2xl">...`

### 3. Blog Index Headline ("Blog & Insights")
File: [`app/(home)/blog/page.tsx`](file:///home/spidey/Projects/relay-blog/app/(home)/blog/page.tsx)
```tsx
<BlogTitle className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
  Blog & Insights
</BlogTitle>
```

---

## 🎨 Dual Theme UI (Light & Dark Mode)

The layout features an editorial floating canvas inspired by modern AI labs:
- **Light Mode**: Warm, soft peach/amber ambient gradient backdrop (`#f6dfcc`) with a clean, crisp white card (`bg-white`).
- **Dark Mode**: Deep midnight backdrop (`#0c0e14`) with indigo aurora glow and a deep slate card (`dark:bg-[#12151c]`).

### Theme Switcher
Users can click the Sun/Moon button in the header or use the `ThemeToggle` component to switch modes anytime. The setting is automatically saved in `localStorage`.

---

## 🚀 Development & Build Commands

```bash
# Start development server
npm run dev

# Run TypeScript typegen and type checking (0 errors)
npm run types:check

# Run linter
npm run lint

# Build production static export
npm run build

# Start production server
npm run start
```
