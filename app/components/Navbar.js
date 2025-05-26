'use client';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const navItems = ['Home', 'Work', 'About Me'];

  return (
    <nav className="absolute top-6 left-0 w-full z-50 px-8 flex items-center justify-between">
      {/* Logo */}
      <div className="text-lg font-bold text-black dark:text-white">
        Half Skirmish
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

      {/* Hamburger icon - visible on mobile */}
      <div className="sm:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-black dark:text-white focus:outline-none"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="sm:hidden absolute top-16 right-8 bg-white dark:bg-black shadow-xl rounded-xl p-6 w-56 transition-all duration-300">
          <ul className="flex flex-col gap-4 text-black dark:text-white">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setMobileOpen(false)}
                  className="block hover:text-[#006400] transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;