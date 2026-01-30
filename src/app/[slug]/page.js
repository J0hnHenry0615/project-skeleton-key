// src/app/[slug]/page.js

import { getPageBySlug, getAllPages } from '@/lib/wordpress';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { notFound } from 'next/navigation';

// Optional: Revalidate every hour
export const revalidate = 3600;

// Generate static pages at build time
export async function generateStaticParams() {
  const pages = await getAllPages();
  const filteredPages = pages.filter(page => page.slug !== 'home');
  
  return filteredPages.map((page) => ({
    slug: page.slug,
  }));
}

// Generate metadata for SEO using Yoast
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  
  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  // Use Yoast SEO data if available
  const yoast = page.yoast_head_json;

  if (yoast) {
    return {
      title: yoast.title || `${page.title.rendered} | Project Skeleton Key`,
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
      alternates: {
        canonical: yoast.canonical || page.link,
      },
    };
  }

  // Fallback if Yoast data not available
  return {
    title: `${page.title.rendered} | Project Skeleton Key`,
    description: page.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
  };
}

// Main page component
export default async function Page({ params }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
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