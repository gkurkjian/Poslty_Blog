'use client';

import { useSearchParams } from 'next/navigation';
import PaginatedPosts from './PaginatedPosts';

export default function PaginatedPostsWrapper({ allPosts = [] }) {
  const searchParams = useSearchParams();
  const category = (searchParams.get('category') || 'All').toLowerCase();

  const filteredPosts =
    category === 'all'
      ? allPosts
      : allPosts.filter(
          (post) =>
            (post.category || 'Uncategorized').toLowerCase() === category
        );

  return <PaginatedPosts posts={filteredPosts} />;
}
