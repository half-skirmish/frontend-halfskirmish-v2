'use client';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [title, setTitle] = useState('Naman Chaturvedi');
  const [visible, setVisible] =useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const titles = ['Naman Chaturvedi', 'Half Skirmish'];
    let index = 0;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        index = (index + 1) % titles.length;
        setTitle(titles[index]);
        setVisible(true);
      }, 500);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Effect to prevent scrolling when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const navItems = ['Home', 'Work', 'About Me'];

  return (
    <>
      <nav className="absolute top-6 left-0 w-full z-50 px-8 flex items-center justify-between">
        {/* Logo with dissolve animation */}
        <div
          className={`text-lg font-bold !text-white transition-opacity duration-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {title}
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={`flex items-center px-6 py-3 rounded-full shadow-lg transition-colors duration-300
              ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            {navItems.map((item, index) => (
              <div key={item} className="flex items-center">
                <a
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3 transition hover:text-[#006400]"
                >
                  {item}
                </a>
                {index < navItems.length - 1 && (
                  <span className="mx-1 h-5 w-px bg-black dark:bg-black" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`sm:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {navItems.map((item) => (
            <a
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-white text-3xl font-semibold my-4 transition hover:text-[#006400]"
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;