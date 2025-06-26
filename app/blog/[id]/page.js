// app/blog/[id]/page.js
import blogData from '@/data/blogData.json';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return blogData.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogPostPage({ params }) {
  const { id } = params;

  const post = blogData.find((p) => p.id === id);

  if (!post) return notFound();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <p>{post.summary}</p>
    </main>
  );
}
