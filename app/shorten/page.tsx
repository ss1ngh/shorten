import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShortenPageClient from "./ShortenPageClient";

export default function Shorten() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ShortenPageClient />
      </main>
      <Footer />
    </>
  );
}