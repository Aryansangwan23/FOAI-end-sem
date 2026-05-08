import axios from 'axios';
import {Astronaut, NewsArticle } from '../types';

export const fetchISSPosition = async () => {
  const res = await axios.get('/api/iss-now');
  return {
    latitude: parseFloat(res.data.iss_position.latitude),
    longitude: parseFloat(res.data.iss_position.longitude),
    timestamp: res.data.timestamp,
  };
};

export const fetchAstronauts = async (): Promise<Astronaut[]> => {
  const res = await axios.get('/api/astros');
  return res.data.people;
};

export const fetchNews = async (category: string = 'science', searchQuery: string = ''): Promise<NewsArticle[]> => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  if (!apiKey) {
    throw new Error('News API key is missing');
  }
  
  const query = searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : '';
  const url = `/api/news?category=${category}${query}&apikey=${apiKey}&language=en`;
  
  const res = await axios.get(url);
  const results = res.data.results || [];
  
  return results.map((item: any) => ({
    title: item.title,
    url: item.link,
    urlToImage: item.image_url,
    source: { name: item.source_id },
    author: item.creator ? item.creator[0] : null,
    publishedAt: item.pubDate,
    description: item.description,
  }));
};
