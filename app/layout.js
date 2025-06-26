// app/layout.js
export const metadata = {
  title: "Postly Blog",
  description: "Minimal blog using App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
