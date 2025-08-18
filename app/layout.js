import { Ubuntu } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Import Ubuntu font with CSS variable
const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Naman Chaturvedi",
  description: "A website showcasing Naman Chaturvedi's portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ubuntu.variable} font-sans antialiased`}>
        <Navbar /> 
        <div className="cursor-crosshair">
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
