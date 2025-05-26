// app/page.js
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Homepage />
      <Footer />
    </main>
  );
}