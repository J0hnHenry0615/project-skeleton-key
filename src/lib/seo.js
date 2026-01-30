// src/lib/seo.js

/**
 * Generate Next.js metadata from Yoast SEO data
 * @param {Object} page - WordPress page object
 * @param {string} fallbackTitle - Fallback title if Yoast not available
 * @returns {Object} Next.js metadata object
 */
export function generateMetadataFromYoast(page, fallbackTitle = 'Project Skeleton Key') {
  if (!page) {
    return {
      title: fallbackTitle,
    };
  }

  const yoast = page.yoast_head_json;

  if (yoast) {
    return {
      title: yoast.title || `${page.title?.rendered} | ${fallbackTitle}`,
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
        siteName: yoast.og_site_name || fallbackTitle,
        url: yoast.og_url || page.link,
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

  // Fallback if Yoast not available
  return {
    title: `${page.title?.rendered} | ${fallbackTitle}`,
    description: page.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
  };
}