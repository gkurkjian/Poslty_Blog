# 🧠 How This Blog App Works — Code Architecture Explained

Welcome to the core of the Postly Blog app — where posts come alive, categories remember where you left off, and navigation actually respects your scroll. This isn't just "blog boilerplate" — it's thoughtfully built, modular, and dynamic using **Next.js 15 App Router** and **React 19**.

Let’s take you on a tour from entry point to deep detail. Whether you’re onboarding a teammate or just want to remember how your own app works two months from now — this section is your friendly map.

---

## 🚦 App Flow Overview

```txt
Home (/)
├── Category (/category/[category])
│   └── BlogCard click → Blog Post (/blog/[id]?category=xyz&scroll=123)
│        └── Back to Category → restores previous view
```

We use **dynamic routes** and **query parameters** to preserve context between views (like scroll and category), and clean modular components to keep logic organized.

---

## 1️⃣ App Layout and Entry Point

### `/app/layout.js`
This is the **HTML scaffold**. It defines your `<html>` and `<body>` tag globally, applies any Bootstrap classes (via layout wrapper), and injects the global `<Navbar />` and `<Footer />` for consistent layout.

### `/app/page.js`
Your homepage. Currently, it's a placeholder. It can be extended to feature:
- Recent posts
- Popular categories
- or a hero banner introducing the blog

🔧 *Tip: you can preload category previews or show "Latest Posts" here.*

---

## 2️⃣ The Category Page: Filtering + Context Awareness

### `/app/category/[category]/page.js`

This is where the app starts to shine. Here’s what happens:

- **URL**: `/category/food-and-drink`
- The `[category]` dynamic param is read from `params.category`
- We filter the `blogData.json` file by category
- We render matching posts using the `BlogCard` component
- We attach a `router.push()` on each card that passes:
  - the post ID
  - the category (as a query param)
  - the current scroll position (`window.scrollY`)

**Example outgoing URL:**
```txt
/blog/abc123?category=food-and-drink&scroll=860
```

✅ *This enables the post page to know where the user came from.*

---

## 3️⃣ The Blog Post Page: Rendering + Memory

### `/app/blog/[id]/page.js`

This is a **server component** using `generateStaticParams()` to pre-render posts. Here’s what happens:

- Reads the `id` from `params`
- Finds the post from `blogData.json`
- Renders:
  - Author info via `BlogAuthor`
  - Featured image via `next/image`
  - Raw HTML content via `dangerouslySetInnerHTML`

### 🧠 And the smart part:
Above the article, it renders a **client component**:

```js
<BackToCategoryButton />
```

This button:
- Uses `useSearchParams()` to read `category` and `scroll` from the URL
- Returns the user back to `/category/food-and-drink?scroll=860`
- Keeps their scroll position (with restoration logic in the category page)

🔁 This makes navigation seamless and "memory aware".

---

## 4️⃣ Components Breakdown (What They Do)

| Component              | Type        | Role |
|------------------------|-------------|------|
| `BlogCard.js`          | UI          | Renders a post preview card |
| `BlogAuthor.js`        | UI          | Displays user avatar + date |
| `BackToCategoryButton.js` | Logic UI | Handles back navigation based on query params |
| `Footer.js`            | Layout UI   | Static footer |
| `CustomNavbar.js`      | Layout UI   | Navigation bar with Bootstrap |
| `CategoryTabs.js`      | UI/UX Nav   | Tabbed navigation for categories |
| `PaginatedPosts.js`    | Logic UI    | (Optional) Component to paginate large post sets |

✅ You don’t need to explain each in README unless they hold logic.  
Only `BackToCategoryButton.js` really *needs* to be called out because it **maintains user state across static routes.**

---

## 5️⃣ Data Source

### `/data/blogData.json`

This is your local "CMS" for now. Each blog post object includes:
- `id`: unique slug
- `title`
- `category`
- `featured_image`
- `main_content` (raw HTML)
- `created_at`
- `user`: `{ name, avatar }`

It’s imported wherever needed (`generateStaticParams`, filtering, rendering).

🧰 Bonus: You have a `/tools/json-export-tool.html` that helps generate blog post JSON. If in case more post needed.

---

## 6️⃣ Scroll Restoration (Behind the Scenes)

This is a subtle but powerful UX enhancement:

- When navigating to a blog post, we append `scroll=${window.scrollY}` to the URL
- When returning to the category page, we read this value and do:

```js
useEffect(() => {
  if (scroll) {
    window.scrollTo(0, parseInt(scroll, 10));
  }
}, [scroll]);
```

🎯 It feels like the page "remembers" you. Simple, effective, and smart.

---

## 🧠 Summary

This app works because each layer has its job:
- `blogData.json` holds content
- `category/[category]` filters and navigates
- `blog/[id]` displays, and remembers how you got there
- `BackToCategoryButton` glues it all together
