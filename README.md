# 🧠 How This Blog App Works — Code Architecture Explained

Welcome to the core of the **Postly Blog App** — where posts come alive, categories remember where you left off, and navigation respects your scroll. This isn't just boilerplate — it's clean, modular, and dynamic using **Next.js 15 App Router** and **React 19**.

Let’s take you on a tour. Whether you’re onboarding a teammate or revisiting the project after months, this README is your technical map.

---

## 🚦 App Flow Overview

```txt
Home (/)
├── Category (/category/[category])
│   └── BlogCard click → Blog Post (/blog/[id]?category=xyz&scroll=123)
│        └── Back to Category → restores previous view
```

We use dynamic routes, query parameters, Suspense boundaries, and Client Component wrappers to preserve stateful UI with fast static rendering.

---

## 1️⃣ App Layout and Entry Point

### `/app/layout.js`

This is the global layout:

- Wraps your app in HTML & `<body>` tags
- Injects Bootstrap (via layout wrapper)
- Injects global components:
  - `<CustomNavbar />`
  - `<Footer />`

### `/app/page.js`

This is your homepage and is now fully functional:

- Filters by category
- Handles pagination
- Renders `PaginatedPostsWrapper` (which wraps a client component inside `<Suspense>`)

### Features:

- Uses `useSearchParams()` for pagination and category
- Uses `router.push()` to change the page in URL
- UI stays in sync with the URL

```jsx
<Suspense fallback={null}>
  <PaginatedPostsWrapper posts={filteredPosts} />
</Suspense>
```

---

## 2️⃣ Category Pages (Optional but Supported)

### `/app/category/[category]/page.js`

This route filters posts by category — but it's optional if everything is handled from the `/` homepage with search params. It exists for flexibility.

---

## 3️⃣ Blog Post Page: Rendering + Memory

### `/app/blog/[id]/page.js`

This is a **Server Component**:

- Pre-rendered using `generateStaticParams()`
- Uses Next.js 15 async params handling:

```js
export default async function BlogPostPage({ params }) {
  const { id } = await params;
}
```

### Renders:

- Author info via `BlogAuthor`
- Image via `next/image`
- Main content via `dangerouslySetInnerHTML`

Above the post is a smart back button:

```jsx
<Suspense fallback={null}>
  <BackToCategoryWrapper />
</Suspense>
```

✅ It reads category and scroll from the query string to send the user back where they came from — with scroll restored.

---

## 4️⃣ Components Breakdown (and Wrappers)

| Component                  | Type        | Role                                              |
|----------------------------|-------------|---------------------------------------------------|
| `BlogCard.js`              | UI          | Renders a post preview card                       |
| `BlogAuthor.js`            | UI          | Displays user avatar + date                       |
| `BackToCategoryButton.js`  | Logic UI    | Reads `useSearchParams()` to restore category scroll |
| `BackToCategoryWrapper.js` | Client UI   | Wraps Back button with `use client` and Suspense |
| `CategoryTabs.js`          | UI Nav      | Renders tabs for each category                    |
| `CategoryTabsWrapper.js`   | Client UI   | Wraps tabs with `use client` and Suspense         |
| `PaginatedPosts.js`        | Logic UI    | Paginates filtered blog posts                     |
| `PaginatedPostsWrapper.js` | Client UI   | Suspense-safe wrapper for paginated content       |
| `CustomNavbar.js`          | Layout UI   | Top navigation bar                                |
| `Footer.js`                | Layout UI   | Footer layout                                     |

### Why the wrappers?

Any component that uses `useSearchParams()` or `useRouter()` must:

- Be a Client Component (`'use client'`)
- Be wrapped in `<Suspense>` when used in a Server Component

---

## 5️⃣ Data Source: `blogData.json`

### `/data/blogData.json`

This is your CMS for now. Each post includes:

```json
{
  "id": "uuid",
  "title": "string",
  "category": "string",
  "featured_image": "url",
  "main_content": "<html>",
  "created_at": "ISO timestamp",
  "user": {
    "name": "string",
    "avatar": "url"
  }
}
```

Used in:

- `generateStaticParams()`
- Filtering on homepage
- Post lookup in `/blog/[id]`

---

## 6️⃣ Scroll Restoration (UX Boost)

When user clicks a blog post from category:

```js
router.push(`/blog/${post.id}?category=${category}&scroll=${window.scrollY}`);
```

Then in the category page:

```js
useEffect(() => {
  if (scroll) {
    window.scrollTo(0, parseInt(scroll, 10));
  }
}, [scroll]);
```

✅ This makes it feel like the app "remembers" where you left off.

---

## 🧪 Experimental Features

### `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
```

✅ Uses new `remotePatterns` instead of deprecated `images.domains`.

---

## 🧠 Summary

- Posts are paginated and filtered via URL
- Each page is statically optimized (SSG)
- Navigation between pages is seamless and state-aware
- Client interactivity is wrapped cleanly with Suspense and separated wrappers
- Fully production-ready and Vercel-deployable ✅
