// components/PaginatedPostsWrapper.js
'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import PaginatedPosts from './PaginatedPosts';

const POSTS_PER_PAGE = 6;

export default function PaginatedPostsWrapper({ allPosts = [] }) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const selectedCategory = searchParams.get('category') || 'All';

  const filteredPosts = useMemo(() => {
    return selectedCategory === 'All'
      ? allPosts
      : allPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory, allPosts]);

  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [page, filteredPosts]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  return (
    <PaginatedPosts
      posts={paginatedPosts}
      page={page}
      totalPages={totalPages}
    />
  );
}
