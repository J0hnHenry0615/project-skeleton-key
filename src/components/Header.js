// src/components/Header.js

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from './Navigation';
import { getSiteOptions } from '@/lib/wordpress';

export default function Header() {
  const [siteOptions, setSiteOptions] = useState(null);

  useEffect(() => {
    async function fetchOptions() {
      const options = await getSiteOptions();
      setSiteOptions(options);
    }
    fetchOptions();
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition">
            {siteOptions?.logo?.url ? (
              <div className="relative h-12 w-auto">
                <Image
                  src={siteOptions.logo.url}
                  alt={siteOptions.logo.alt || 'Site Logo'}
                  width={siteOptions.logo.width || 150}
                  height={siteOptions.logo.height || 48}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="text-2xl font-bold text-blue-600">
                🔑 Skeleton Key
              </div>
            )}
          </Link>

          {/* Navigation & Search */}
          <div className="flex items-center gap-8">
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
}