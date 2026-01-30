// src/components/SearchResults.js

'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { searchContent } from '@/lib/wordpress';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      if (!query) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await searchContent(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }

    performSearch();
  }, [query]);

  if (!query) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">Enter a search term to get started</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Searching for "{query}"...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No results found</h2>
        <p className="text-gray-600 mb-8">
          We couldn't find anything matching "{query}"
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-600 mb-8">
        Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
      </p>

      <div className="space-y-6">
        {results.map((result, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <Link href={result.url || '#'} className="block group">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                {result.title || 'Untitled'}
              </h2>
              {result.excerpt && (
                <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: result.excerpt }} />
              )}
              <span className="text-blue-600 text-sm mt-2 inline-block group-hover:underline">
                Read more →
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}