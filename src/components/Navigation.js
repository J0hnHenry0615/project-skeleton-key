// src/components/Navigation.js

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getAcfOptions } from '@/lib/wordpress';

export default function Navigation() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Fetch menu from ACF Options
  useEffect(() => {
    async function fetchMenu() {
      try {
        const options = await getAcfOptions('main-menu'); // ← Updated slug
        if (options && options.main_menu_items) {
          setMenuItems(options.main_menu_items);
        }
      } catch (error) {
        console.error('Error loading menu:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchMenu();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle desktop dropdown
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Close mobile menu when navigating
  const handleMobileClick = () => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  };

  if (isLoading) {
    return <div className="text-gray-500 text-sm">Loading...</div>;
  }

  if (!menuItems || menuItems.length === 0) {
    // Fallback menu
    return (
      <nav>
        <ul className="flex gap-6">
          <li><Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link></li>
          <li><Link href="/about" className="text-gray-700 hover:text-blue-600 transition">About</Link></li>
          <li><Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">Contact</Link></li>
        </ul>
      </nav>
    );
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block" ref={dropdownRef}>
        <ul className="flex gap-6">
          {menuItems.map((item, index) => {
            const hasSubmenu = item.sub_menu && item.sub_menu.length > 0;
            const isDropdownOpen = openDropdown === index;

            return (
              <li key={index} className="relative group">
                {hasSubmenu ? (
                  // Menu item with dropdown
                  <>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="text-gray-700 hover:text-blue-600 transition font-medium flex items-center gap-1"
                    >
                      {item.menu_item_text}
                      <svg
                        className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                        {item.sub_menu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.sub_menu_link || '#'}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                          >
                            {subItem.sub_menu_text}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // Regular menu item without dropdown
                  <Link
                    href={item.menu_link || '#'}
                    className="text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    {item.menu_item_text}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Hamburger Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-gray-700 hover:text-blue-600 transition"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            // Close Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Menu Dropdown */}
        {isMobileOpen && (
          <div className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg z-50">
            <nav className="container mx-auto px-4 py-4">
              <ul className="flex flex-col gap-2">
                {menuItems.map((item, index) => {
                  const hasSubmenu = item.sub_menu && item.sub_menu.length > 0;
                  const isDropdownOpen = openDropdown === index;

                  return (
                    <li key={index}>
                      {hasSubmenu ? (
                        // Menu with sub-menu
                        <>
                          <button
                            onClick={() => toggleDropdown(index)}
                            className="w-full flex items-center justify-between text-gray-700 hover:text-blue-600 transition font-medium py-2"
                          >
                            {item.menu_item_text}
                            <svg
                              className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* Sub-menu */}
                          {isDropdownOpen && (
                            <ul className="pl-4 mt-2 space-y-2 border-l-2 border-blue-200">
                              {item.sub_menu.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <Link
                                    href={subItem.sub_menu_link || '#'}
                                    onClick={handleMobileClick}
                                    className="block text-gray-600 hover:text-blue-600 transition py-2"
                                  >
                                    {subItem.sub_menu_text}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      ) : (
                        // Regular menu item
                        <Link
                          href={item.menu_link || '#'}
                          onClick={handleMobileClick}
                          className="block text-gray-700 hover:text-blue-600 transition font-medium py-2"
                        >
                          {item.menu_item_text}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
