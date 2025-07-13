'use client';

import blogData from '@/data/blogData.json';
import PaginatedPostsWrapper from '@/components/PaginatedPostsWrapper';
import CategoryTabsWrapper from '@/components/CategoryTabsWrapper';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function HomePage() {
  const searchParams = useSearchParams();
  const selectedCategory = (searchParams.get('category') || 'all').toLowerCase();

  const allCategories = [
    'All',
    ...new Set(blogData.map((post) => post.category || 'Uncategorized')),
  ];

  const filteredPosts =
    selectedCategory === 'all'
      ? blogData
      : blogData.filter(
          (post) =>
            (post.category || 'Uncategorized').toLowerCase() === selectedCategory
        );

  return (
    <main className="container py-5">
      <h1 className="mb-4">Latest Posts</h1>

      <Suspense fallback={null}>
        <CategoryTabsWrapper categories={allCategories} />
      </Suspense>

      <Suspense fallback={<p>Loading posts...</p>}>
        <PaginatedPostsWrapper posts={filteredPosts} />
      </Suspense>
    </main>
  );
}
