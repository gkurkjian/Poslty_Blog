'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import BlogCard from './BlogCard'; // ✅ Make sure this is imported

const POSTS_PER_PAGE = 6;

export default function PaginatedPosts({ posts = [] }) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [page, posts]);

  return (
    <>
      <div className="row">
        {paginatedPosts.map(post => (
          <div className="col-md-4 mb-4" key={post.id}>
            <BlogCard post={post} />
          </div>
        ))}
      </div>
      <Pagination current={page} totalPages={totalPages} />
    </>
  );
}

function Pagination({ current, totalPages }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        {pages.map(p => (
          <li key={p} className={`page-item ${p === current ? 'active' : ''}`}>
            <a className="page-link" href={`/?page=${p}`}>
              {p}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
