'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import blogData from '@/data/blogData.json';
import CategoryTabs from '@/components/CategoryTabs';
import PaginatedPosts from '@/components/PaginatedPosts';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategory = searchParams.get('category') || 'All';

  const allCategories = [
    'All',
    ...new Set(blogData.map((post) => post.category || 'Uncategorized')),
  ];

  const filteredPosts =
    selectedCategory === 'All'
      ? blogData
      : blogData.filter((post) => post.category === selectedCategory);

  const handleCategorySelect = (category) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', category);
    params.set('page', '1'); // reset page to 1 on category change
    router.push(`/?${params.toString()}`);
  };

  return (
    <main className="container py-5">
      <h1 className="mb-4">Latest Posts</h1>

      <CategoryTabs
        categories={allCategories}
        selected={selectedCategory}
        onSelect={handleCategorySelect}
      />

      <PaginatedPosts posts={filteredPosts} />
    </main>
  );
}
