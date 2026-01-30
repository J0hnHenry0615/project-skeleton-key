// src/lib/utils.js

/**
 * Safely get nested object property
 * @param {Object} obj - Object to search
 * @param {string} path - Dot notation path (e.g., 'acf.content_blocks')
 * @param {*} defaultValue - Default if not found
 * @returns {*} Found value or default
 */
export function getNestedValue(obj, path, defaultValue = null) {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return defaultValue;
    }
  }
  
  return current;
}

/**
 * Strip HTML tags from string
 * @param {string} html - HTML string
 * @returns {string} Plain text
 */
export function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Generate SEO meta tags from page data
 * @param {Object} page - WordPress page data
 * @returns {Object} Meta tags object
 */
export function generateMetaTags(page) {
  const title = page?.title?.rendered || 'Project Skeleton Key';
  const description = stripHtml(page?.excerpt?.rendered || '');
  
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: page?.featured_media ? [
        {
          url: page.featured_media,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : [],
    },
  };
}

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Get YouTube video ID from URL
 * @param {string} url - YouTube URL
 * @returns {string|null} Video ID or null
 */
export function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}