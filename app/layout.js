import { Manrope } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Import Manrope font with correct weights
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200","300","400","500","600","700","800"], // removed 100
  display: "swap",
});

export const metadata = {
  title: "Naman Chaturvedi",
  description: "A website showcasing Naman Chaturvedi's portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans antialiased`}>
        <Navbar />
        <div className="cursor-crosshair">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
