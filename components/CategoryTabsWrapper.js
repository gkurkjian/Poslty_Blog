'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import CategoryTabs from './CategoryTabs';

export default function CategoryTabsWrapper({ categories }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategory = searchParams.get('category') || 'All';

  const handleCategorySelect = (category) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', category);
    params.set('page', '1'); // reset pagination
    router.push(`/?${params.toString()}`);
  };

  return (
    <CategoryTabs
      categories={categories}
      selected={selectedCategory}
      onSelect={handleCategorySelect}
    />
  );
}
