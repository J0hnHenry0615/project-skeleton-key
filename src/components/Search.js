// src/components/Search.js

'use client';

import { useState, useEffect, useRef } from 'react';
import { searchContent } from '@/lib/wordpress';
import { useRouter } from 'next/navigation';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search when user types (with delay)
  useEffect(() => {
    // Don't search if query is too short
    if (query.length < 3) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    // Delay search by 500ms (wait for user to finish typing)
    const timer = setTimeout(async () => {
      setIsLoading(true);
      const searchResults = await searchContent(query);
      setResults(searchResults);
      setIsOpen(true);
      setIsLoading(false);
    }, 500);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, [query]);

  // Handle clicking a result
  const handleResultClick = (url) => {
    // Convert WordPress URL to Next.js path
    const path = url.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL || '', '');
    setIsOpen(false);
    setQuery('');
    router.push(path);
  };

  return (
    <div className="relative w-full lg:w-auto" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full lg:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm lg:text-base"
        />
        
        {/* Search Icon or Loading Spinner */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-blue-600 rounded-full border-t-transparent"></div>
          ) : (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 lg:right-auto lg:w-96 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result.url)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition"
            >
              <div className="font-semibold text-gray-900 text-sm lg:text-base">{result.title}</div>
              {result.subtype && (
                <div className="text-xs text-gray-500 mt-1">{result.subtype}</div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {isOpen && !isLoading && query.length >= 3 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 lg:right-auto lg:w-96 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 text-gray-600 text-center z-50 text-sm lg:text-base">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}