'use client';

import blogData from '@/data/blogData.json';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(blogData);
  }, []);

  return (
    <main>
      <h1>All Blog Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
