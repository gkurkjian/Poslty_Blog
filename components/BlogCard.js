import Image from 'next/image';
import Link from 'next/link';
import BlogAuthor from '@/components/BlogAuthor';

export default function BlogCard({ post, showButton = true, showContent = false }) {
  return (
    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">

      <div className="ratio ratio-16x9">
        <Image
          src={post?.featured_image}
          alt={post?.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-semibold">{post?.title}</h5>
        <p className="card-text text-muted small flex-grow-1">{post?.summary}</p>

        {showButton && (
          <Link href={`/blog/${post.id}`} className="btn btn-outline-primary btn-sm mt-auto">
            Read More
          </Link>
        )}
      </div>

        {showContent && (
        <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: post.main_content }}
            style={{ fontSize: '1.05rem', color: '#444', lineHeight: 1.9 }}
        />
        )}

        <BlogAuthor user={post?.user} date={post?.created_at} />


    </div>
  );
}
