import blogData from '@/data/blogData.json';
import CategoryTabsWrapper from '@/components/CategoryTabsWrapper';
import PaginatedPostsWrapper from '@/components/PaginatedPostsWrapper';
import { Suspense } from 'react';

export default function HomePage() {
  const allCategories = [
    'All',
    ...new Set(blogData.map((post) => post.category || 'Uncategorized')),
  ];

  return (
    <main className="container py-5">
      <h1 className="mb-4">Latest Posts</h1>

      <Suspense fallback={<p>Loading categories...</p>}>
        <CategoryTabsWrapper categories={allCategories} />
      </Suspense>

      <Suspense fallback={<p>Loading posts...</p>}>
        <PaginatedPostsWrapper allPosts={blogData} />
      </Suspense>
    </main>
  );
}
