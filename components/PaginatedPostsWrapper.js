'use client';
import PaginatedPosts from './PaginatedPosts';

export default function PaginatedPostsWrapper({ posts }) {
  return <PaginatedPosts posts={posts} />;
}
