'use client';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [title, setTitle] = useState('Naman Chaturvedi');
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // This effect can be used to toggle a dark theme on the root HTML element
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    // This effect cycles through the titles with a fade animation
    const titles = ['Naman Chaturvedi', 'Half Skirmish'];
    let index = 0;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        index = (index + 1) % titles.length;
        setTitle(titles[index]);
        setVisible(true);
      }, 500); // Duration of the fade-out
    }, 3500); // Time each title is visible

    return () => clearInterval(interval);
  }, []);

  // Effect to prevent scrolling when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to restore scrolling if the component unmounts while menu is open
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navItems = ['Home', 'Work', 'About Me'];

  return (
    <>
      {/* --- Main Navigation Bar --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between bg-transparent max-w-[100vw]">
        {/* Logo with dissolve animation */}
        <div
          className={`text-lg font-bold text-white transition-opacity duration-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {title}
        </div>

        {/* --- Desktop Menu (Centered) --- */}
        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={`flex items-center px-6 py-3 rounded-full shadow-lg transition-colors duration-300 ${
              isDark ? 'bg-white text-black' : 'bg-black text-white'
            }`}
          >
            {navItems.map((item, index) => (
              <div key={item} className="flex items-center">
                {/* Reverted to <a> tags to resolve compilation error */}
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3 transition hover:text-green-800"
                >
                  {item}
                </Link>
                {/* Divider */}
                {index < navItems.length - 1 && (
                  <span className="mx-1 h-5 w-px bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- Hamburger Menu Icon (Mobile) --- */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-white rounded-md"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay --- */}
      <div
        className={`sm:hidden fixed left-0 right-0 top-0 bottom-0 bg-black/80 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out max-w-[100vw]
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          {/* Reverted to <a> tags to resolve compilation error */}
          <Link
            href="/"
            className="text-white text-3xl font-semibold transition hover:text-green-400"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/work"
            className="text-white text-3xl font-semibold transition hover:text-green-400"
            onClick={() => setIsMenuOpen(false)}
          >
            Work
          </Link>
          <Link
            href="/about-me"
            className="text-white text-3xl font-semibold transition hover:text-green-400"
            onClick={() => setIsMenuOpen(false)}
          >
            About Me
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

