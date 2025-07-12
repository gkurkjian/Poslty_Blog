import BlogCard from "@/components/BlogCard";
import blogData from "@/data/blogData.json";

export default function CategoryPage({ params }) {
  const posts = blogData.filter(post => post.category === params.category);

  return (
    <main className="container py-5">
      <h1 className="mb-4">Category: {params.category}</h1>
      <div className="row g-4">
        {posts.map(post => (
          <div key={post.id} className="col-12 col-sm-6 col-lg-4">
            <BlogCard post={post} showButton={true} showContent={false} />
          </div>
        ))}
      </div>
    </main>
  );
}
