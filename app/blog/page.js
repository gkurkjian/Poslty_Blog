// app/blog/page.js
'use client';
import blogData from '@/data/blogData.json';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Blog Home</h1>
      <ul style={{ marginTop: '1rem' }}>
        {blogData.map((post) => (
          <li key={post.id} style={{ marginBottom: '1rem' }}>
            <Link href={`/blog/${post.id}`}>
              <strong>{post.title}</strong>
            </Link>
            <p>{post.subtitle}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
