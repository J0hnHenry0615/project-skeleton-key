// src/app/search/page.js

'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { searchContent } from '@/lib/wordpress';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      if (query) {
        setIsLoading(true);
        const searchResults = await searchContent(query);
        setResults(searchResults);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }

    performSearch();
  }, [query]);

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Search</h1>
        <p className="text-gray-600">Enter a search term to get started.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-2">
        Search Results
      </h1>
      <p className="text-gray-600 mb-8">
        Showing results for: <span className="font-semibold">"{query}"</span>
      </p>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
          <span className="ml-3 text-gray-600">Searching...</span>
        </div>
      )}

      {!isLoading && results.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">
            No results found for "{query}". Try a different search term.
          </p>
          <Link 
            href="/"
            className="inline-block text-blue-600 hover:text-blue-700 font-semibold"
          >
            Go back home
          </Link>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.id} className="border-b border-gray-200 pb-6">
              <Link 
                href={result.url.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL || '', '')}
                className="block group"
              >
                <h2 className="text-2xl font-semibold text-blue-600 group-hover:text-blue-700 mb-2">
                  {result.title}
                </h2>
                {result.subtype && (
                  <p className="text-sm text-gray-500 mb-2">
                    {result.subtype}
                  </p>
                )}
              </Link>
            </div>
          ))}
          
          <p className="text-gray-600 text-sm pt-4">
            Found {results.length} result{results.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
