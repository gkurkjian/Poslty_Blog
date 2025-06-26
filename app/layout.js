// app/layout.js
import CustomNavbar from '@/components/CustomNavbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <CustomNavbar />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}


