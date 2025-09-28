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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'AI Chat', href: 'https://ai.halfskirmish.com', external: true },
  ];

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
          <Link href="/" className="hover:text-green-400 transition-colors">
            {title}
          </Link>
        </div>

        {/* --- Desktop Menu (Centered) --- */}
        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={`flex items-center px-6 py-3 rounded-full shadow-lg transition-colors duration-300 ${
              isDark ? 'bg-white text-black' : 'bg-black text-white'
            }`}
          >
            {navItems.map((item, index) => (
              <div key={item.label} className="flex items-center">
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="px-3 transition hover:text-green-800"
                >
                  {item.label}
                </Link>
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
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="text-white text-3xl font-semibold transition hover:text-green-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
