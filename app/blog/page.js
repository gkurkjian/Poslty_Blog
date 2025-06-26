'use client';
import blogData from '@/data/blogData.json';
import BlogCard from '@/components/BlogCard';

export default function BlogPage() {
  return (
    <main className="container py-4">
      <h1 className="mb-4">Blog Home</h1>
      <div className="row g-4">
        {blogData.map((post) => (
          <div key={post.id} className="col-12 col-sm-6 col-lg-4">
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </main>
  );
}
