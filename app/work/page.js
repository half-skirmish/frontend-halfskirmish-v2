import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Work from "../components/Work";

export default function WorkPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Work />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}