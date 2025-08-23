'use client';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

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
      {/* Changed to 'fixed' for a more robust stacking context */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex items-center justify-between bg-transparent">
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
                <a
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3 transition hover:text-green-800" // Using a standard Tailwind color for simplicity
                >
                  {item}
                </a>
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
        className={`sm:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          {/* Hardcoded Links Start Here */}
          <a
            href="/"
            className="text-white text-3xl font-semibold transition hover:text-green-400"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="/work"
            className="text-white text-3xl font-semibold transition hover:text-green-400"
            onClick={() => setIsMenuOpen(false)}
          >
            Work
          </a>
          <a
            href="/about-me"
            className="text-white text-3xl font-semibold transition hover:text-green-400"
            onClick={() => setIsMenuOpen(false)}
          >
            About Me
          </a>
          {/* Hardcoded Links End Here */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
