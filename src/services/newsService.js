import axios from 'axios';
import { getCache, setCache } from '../utils/cache';

// Use a fallback public proxy if no key provided, or use the key from env
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const CACHE_PREFIX = 'news_cache_';

export const newsService = {
  /**
   * Fetch top headlines by category
   */
  async getNewsByCategory(category = 'technology') {
    const cacheKey = `${CACHE_PREFIX}${category}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      let url = '';
      
      // If we have an API key, use NewsAPI
      if (API_KEY && API_KEY !== 'your_news_api_key_here') {
         url = `https://newsapi.org/v2/top-headlines?category=${category.toLowerCase()}&language=en&pageSize=20&apiKey=${API_KEY}`;
      } else {
         // Fallback to a free public API or generic search if no key is provided to ensure the app works out of the box
         // We use spaceflightnewsapi.net as a fallback since it's space-themed and free
         if (category.toLowerCase() === 'space') {
            const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles/?limit=20');
            const formattedData = response.data.results.map(article => ({
                title: article.title,
                description: article.summary,
                url: article.url,
                urlToImage: article.image_url,
                publishedAt: article.published_at,
                source: { name: article.news_site },
                author: 'Spaceflight News'
            }));
            setCache(cacheKey, formattedData, 15);
            return formattedData;
         } else {
            throw new Error('Please set VITE_NEWS_API_KEY in .env file to fetch news.');
         }
      }

      const response = await axios.get(url);
      
      if (response.data && response.data.articles) {
        const articles = response.data.articles.filter(article => article.title !== '[Removed]');
        setCache(cacheKey, articles, 15); // Cache for 15 minutes
        return articles;
      }
      
      throw new Error('Failed to fetch news');
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error.response?.data?.message || error.message;
    }
  }
};
