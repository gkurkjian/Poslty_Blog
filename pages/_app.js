import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from "@/components/CustomNavbar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CustomNavbar />
      <main className="min-vh-100 d-flex flex-column">
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  );
}
