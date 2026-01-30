// src/app/page.js

import { getPageBySlug } from '@/lib/wordpress';
import BlockRenderer from '@/components/blocks/BlockRenderer';

// Set page to revalidate every hour (optional)
export const revalidate = 3600;

// Generate metadata for SEO using Yoast
export async function generateMetadata() {
  const page = await getPageBySlug('home');
  
  if (!page) {
    return {
      title: 'Home | Project Skeleton Key',
      description: 'Next.js + WordPress Headless Framework',
    };
  }

  // Use Yoast SEO data if available
  const yoast = page.yoast_head_json;

  if (yoast) {
    return {
      title: yoast.title || page.title?.rendered || 'Home | Project Skeleton Key',
      description: yoast.description || yoast.og_description || '',
      openGraph: {
        title: yoast.og_title || yoast.title || page.title?.rendered,
        description: yoast.og_description || yoast.description || '',
        images: yoast.og_image ? [
          {
            url: yoast.og_image[0]?.url || '',
            width: yoast.og_image[0]?.width || 1200,
            height: yoast.og_image[0]?.height || 630,
            alt: yoast.og_image[0]?.alt || '',
          }
        ] : [],
        type: yoast.og_type || 'website',
        siteName: yoast.og_site_name || 'Project Skeleton Key',
      },
      twitter: {
        card: yoast.twitter_card || 'summary_large_image',
        title: yoast.twitter_title || yoast.og_title || yoast.title,
        description: yoast.twitter_description || yoast.og_description || yoast.description,
        images: yoast.twitter_image ? [yoast.twitter_image] : [],
      },
      robots: {
        index: yoast.robots?.index !== 'noindex',
        follow: yoast.robots?.follow !== 'nofollow',
      },
    };
  }

  // Fallback if Yoast data not available
  return {
    title: page.title?.rendered || 'Home | Project Skeleton Key',
    description: page.excerpt?.rendered?.replace(/<[^>]*>/g, '') || 'Next.js + WordPress Headless Framework',
  };
}

// Main homepage component (Server Component)
export default async function HomePage() {
  const page = await getPageBySlug('home');

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Could not load homepage. Make sure you have a page with slug "home" in WordPress.
        </p>
        <a 
          href="https://staging.mediaquest.co/wp-admin" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go to WordPress Admin
        </a>
      </div>
    );
  }

  const contentBlocks = page.acf?.content_blocks || [];

  return (
    <>
      <BlockRenderer blocks={contentBlocks} />

      {contentBlocks.length === 0 && page.content?.rendered && (
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl font-bold mb-8 text-gray-900">
            {page.title.rendered}
          </h1>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </div>
      )}
    </>
  );
}