// app/category/[slug]/page.js
'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import blogData from '@/data/blogData.json';
import BlogCard from '@/components/BlogCard';

const POSTS_PER_PAGE = 6;

export default function CategoryPage({ params }) {
  const { slug } = params;
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const filteredPosts = blogData.filter(
    post => post.category.toLowerCase() === slug.toLowerCase()
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, page]);

  return (
    <main className="container py-5">
      <h1 className="mb-4">Posts in &quot;{slug}&quot;</h1>

      <div className="row">
        {paginatedPosts.map(post => (
          <div className="col-md-4 mb-4" key={post.id}>
            <BlogCard post={post} />
          </div>
        ))}
      </div>

      <Pagination current={page} totalPages={totalPages} slug={slug} />
    </main>
  );
}

function Pagination({ current, totalPages, slug }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        {pages.map(p => (
          <li key={p} className={`page-item ${p === current ? 'active' : ''}`}>
            <a className="page-link" href={`/category/${slug}?page=${p}`}>
              {p}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
