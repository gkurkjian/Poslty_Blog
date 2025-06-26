export default function AboutPage() {
  return (
    <main className="container py-5">
      <div className="bg-white p-5 rounded-4 shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
        <h1 className="mb-4 fw-bold">About Postly</h1>
        <p className="lead text-muted">
          Postly is a modern blogging platform designed for curious minds and passionate storytellers.
          Whether you’re into science, tech, culture, or creative writing — Postly gives you the tools
          to share your ideas with the world.
        </p>

        <hr className="my-4" />

        <p>
          Built with <strong>Next.js</strong> and powered by clean UI components, Postly is optimized
          for performance, readability, and simplicity. This project showcases practical use of
          client-side rendering, routing, pagination, and responsive design.
        </p>

        <p>
          From feature-rich blog cards to dynamic category filtering and post detail pages, Postly is a
          living example of how modern front-end frameworks can power beautiful, fast, and scalable
          publishing experiences.
        </p>

        <p className="text-muted small">
          This site is a personal development project created to practice and demonstrate full-stack
          Next.js skills. Content and layout will grow as the platform evolves.
        </p>
      </div>
    </main>
  );
}
