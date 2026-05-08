import React, { useEffect, useState } from 'react';
import { useNewsStore } from '../../store/useNewsStore';
import { newsService } from '../../services/newsService';
import NewsCard from './NewsCard';
import { Search, Filter, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const categories = ['Technology', 'Science', 'Space', 'Business', 'Health'];

const NewsGrid = () => {
  const { articles, setArticles, category, setCategory, isLoading, setLoading, error, setError, searchQuery, setSearchQuery } = useNewsStore();
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchNews = async (cat, showToast = false) => {
    try {
      setLoading(true);
      const data = await newsService.getNewsByCategory(cat);
      setArticles(data);
      if (showToast) toast.success(`Refreshed ${cat} news`);
    } catch (err) {
      setError(err);
      toast.error('Failed to fetch news');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredArticles = articles.filter(article => 
    article.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
    article.description?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    article.source?.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Force cache invalidation by just fetching again (the service uses cache, but we can clear it or just let the user know we're checking)
    fetchNews(category, true);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                category === c 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-card-foreground/50" />
            <input 
              type="text" 
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary text-sm rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button 
            onClick={handleRefresh}
            disabled={isLoading || isRefreshing}
            className="p-2 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors disabled:opacity-50"
            title="Refresh News"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Content */}
      {isLoading && articles.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-96 bg-card border border-border rounded-2xl animate-pulse flex flex-col">
              <div className="h-48 bg-secondary rounded-t-2xl"></div>
              <div className="p-5 flex-1 space-y-3">
                <div className="h-6 bg-secondary rounded w-3/4"></div>
                <div className="h-4 bg-secondary rounded w-full"></div>
                <div className="h-4 bg-secondary rounded w-full"></div>
                <div className="h-4 bg-secondary rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-8 rounded-2xl flex flex-col items-center justify-center text-center gap-4">
          <AlertCircle className="w-12 h-12" />
          <div>
            <h3 className="font-bold text-lg mb-1">Failed to load news</h3>
            <p className="text-sm opacity-80">{error}</p>
          </div>
          <button 
            onClick={() => fetchNews(category)}
            className="px-6 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="bg-card border border-border p-12 rounded-2xl flex flex-col items-center justify-center text-center text-card-foreground/50 gap-3">
          <Search className="w-12 h-12 opacity-20" />
          <p>No articles found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, idx) => (
            <NewsCard key={`${article.url}-${idx}`} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsGrid;
