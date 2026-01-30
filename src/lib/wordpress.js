// src/lib/wordpress.js

import axios from 'axios';

// Get WordPress URL from environment variables
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;
const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

/**
 * Fetch all pages from WordPress
 * @returns {Array} Array of pages
 */
export async function getAllPages() {
  try {
    const response = await axios.get(`${WORDPRESS_API_URL}/pages`, {
      params: {
        per_page: 100, // Get up to 100 pages
        _fields: 'id,slug,title,acf', // Only get fields we need
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

/**
 * Fetch a single page by slug
 * @param {string} slug - Page slug (e.g., 'about', 'home')
 * @returns {Object|null} Page data or null
 */
export async function getPageBySlug(slug) {
  try {
    const response = await axios.get(`${WORDPRESS_API_URL}/pages`, {
      params: { 
        slug,
        _fields: 'id,slug,title,excerpt,acf,yoast_head_json' // Include SEO data
      }
    });
    
    // API returns an array, we want the first item
    return response.data[0] || null;
  } catch (error) {
    console.error(`Error fetching page with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch navigation menu
 * @param {string} menuSlug - Menu slug (e.g., 'primary-menu')
 * @returns {Array} Menu items
 */
export async function getMenu(menuSlug) {
  try {
    const response = await axios.get(
      `${WORDPRESS_URL}/wp-json/menus/v1/menus/${menuSlug}`
    );
    return response.data.items || [];
  } catch (error) {
    console.error(`Error fetching menu "${menuSlug}":`, error);
    return [];
  }
}

/**
 * Search WordPress content
 * @param {string} query - Search term
 * @returns {Array} Search results
 */
export async function searchContent(query) {
  try {
    const response = await axios.get(`${WORDPRESS_API_URL}/search`, {
      params: { 
        search: query,
        per_page: 10
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
}

/**
 * Get all menus (for discovering menu slugs)
 * @returns {Array} All available menus
 */
export async function getAllMenus() {
  try {
    const response = await axios.get(
      `${WORDPRESS_URL}/wp-json/menus/v1/menus`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching menus:', error);
    return [];
  }
}

/**
 * Get full image data from WordPress media ID
 * @param {number} imageId - WordPress media ID
 * @returns {Object|null} Image object with URL, alt, etc.
 */
export async function getMediaById(imageId) {
  if (!imageId) return null;
  
  try {
    const response = await axios.get(`${WORDPRESS_API_URL}/media/${imageId}`);
    return {
      id: response.data.id,
      url: response.data.source_url,
      alt: response.data.alt_text || '',
      width: response.data.media_details?.width || null,
      height: response.data.media_details?.height || null,
      title: response.data.title?.rendered || '',
    };
  } catch (error) {
    console.error(`Error fetching media ID ${imageId}:`, error);
    return null;
  }
}

/**
 * Get ACF Options (for Options Pages like Main Menu)
 * @param {string} optionName - The option page slug
 * @returns {Object|null} ACF options data
 */
export async function getAcfOptions(optionName = 'options') {
  try {
    const response = await axios.get(
      `${WORDPRESS_URL}/wp-json/acf/v3/options/${optionName}`
    );
    return response.data.acf || null;
  } catch (error) {
    console.error(`Error fetching ACF options "${optionName}":`, error);
    return null;
  }
}

/**
 * Get Site Options from WordPress
 */
export async function getSiteOptions() {
  try {
    const response = await axios.get(
      `${WORDPRESS_URL}/wp-json/custom/v1/site-options`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching site options:', error);
    return null;
  }
}