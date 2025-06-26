// app/page.js
import blogData from '@/data/blogData.json';

export default function HomePage() {
  console.log(blogData); // This logs to terminal (NOT browser)

  return (
    <main>
      <h1>Blog Home</h1>

    </main>
  );
}
