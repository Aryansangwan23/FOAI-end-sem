import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ISSLocation, Astronaut, NewsArticle } from '../types';
import { fetchISSPosition, fetchAstronauts, fetchNews } from '../services/api';
import { calculateDistance } from '../utils/haversine';
import toast from 'react-hot-toast';

interface DataContextType {
  issPath: ISSLocation[];
  currentISS: ISSLocation | null;
  astronauts: Astronaut[];
  news: NewsArticle[];
  loadingISS: boolean;
  loadingNews: boolean;
  refreshISS: () => Promise<void>;
  refreshNews: (category?: string, query?: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const CACHE_KEY_NEWS = 'space_news_cache';
const CACHE_TIME = 15 * 60 * 1000; // 15 mins

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [issPath, setIssPath] = useState<ISSLocation[]>([]);
  const [astronauts, setAstronauts] = useState<Astronaut[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loadingISS, setLoadingISS] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

  const refreshISS = useCallback(async () => {
    try {
      const position = await fetchISSPosition();
      setIssPath(prev => {
        let speed = 27600; // Default average ISS speed km/h
        if (prev.length > 0) {
          const last = prev[prev.length - 1];
          const dist = calculateDistance(last.latitude, last.longitude, position.latitude, position.longitude);
          const timeHours = (position.timestamp - last.timestamp) / 3600;
          if (timeHours > 0) {
            speed = dist / timeHours;
          }
        }
        
        const newLocation: ISSLocation = { ...position, speed };
        const newPath = [...prev, newLocation].slice(-15); // Keep last 15
        return newPath;
      });
      setLoadingISS(false);
    } catch (error) {
      console.error('Failed to fetch ISS data', error);
      toast.error('Failed to update ISS location');
    }
  }, []);

  const refreshNews = useCallback(async (category: string = 'science', query: string = '') => {
    setLoadingNews(true);
    try {
      const cacheData = localStorage.getItem(CACHE_KEY_NEWS);
      if (cacheData && !query) {
        const { timestamp, articles } = JSON.parse(cacheData);
        if (Date.now() - timestamp < CACHE_TIME) {
          setNews(articles);
          setLoadingNews(false);
          return;
        }
      }

      const articles = await fetchNews(category, query);
      // Filter out removed articles
      const validArticles = articles.filter(a => a.title && a.title !== '[Removed]');
      
      if (!query) {
        localStorage.setItem(CACHE_KEY_NEWS, JSON.stringify({ timestamp: Date.now(), articles: validArticles }));
      }
      setNews(validArticles);
    } catch (error) {
      console.error('Failed to fetch news', error);
      toast.error('Failed to fetch space news');
    } finally {
      setLoadingNews(false);
    }
  }, []);

  useEffect(() => {
    refreshISS();
    const interval = setInterval(refreshISS, 15000); // 15 seconds polling

    fetchAstronauts().then(setAstronauts).catch(() => toast.error('Failed to load astronaut list'));
    refreshNews();

    return () => clearInterval(interval);
  }, [refreshISS, refreshNews]);

  return (
    <DataContext.Provider value={{
      issPath,
      currentISS: issPath[issPath.length - 1] || null,
      astronauts,
      news,
      loadingISS,
      loadingNews,
      refreshISS,
      refreshNews
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
};
