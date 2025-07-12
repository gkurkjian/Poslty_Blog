import blogData from '@/data/blogData.json';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BlogAuthor from '@/components/BlogAuthor';
import { Suspense } from 'react';
import BackToCategoryWrapper from '@/components/BackToCategoryWrapper';

export async function generateStaticParams() {
  return blogData.map((post) => ({ id: post.id }));
}

export default async function BlogPostPage({ params }) {  // made async function
  const { id } = await params;  // to read dynamic API
  const post = blogData.find((p) => p.id === id);
  if (!post) return notFound();

  return (
    <main className="py-5" style={{ background: '#f8f9fa' }}>
      <div className="container">

        {/* ✅ Suspense-wrapped client component */}
        <Suspense fallback={null}>
          <BackToCategoryWrapper />
        </Suspense>

        <article
          className="bg-white p-4 p-md-5 rounded-4 shadow-sm mx-auto"
          style={{ maxWidth: '1000px', width: '100%' }}
        >
          <BlogAuthor user={post?.user} data={post?.created_at} />

          <div className="ratio ratio-16x9 rounded-3 overflow-hidden mb-4">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.main_content }}
            style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}
          />
        </article>
      </div>
    </main>
  );
}
