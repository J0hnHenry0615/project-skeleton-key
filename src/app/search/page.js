// src/app/search/page.js

import { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';

export const metadata = {
  title: 'Search | Project Skeleton Key',
  description: 'Search our site',
};

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Search Results</h1>
      
      <Suspense fallback={<SearchFallback />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}

function SearchFallback() {
  return (
    <div className="text-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading search results...</p>
    </div>
  );
}