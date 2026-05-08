import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { ISSMap } from '../map/ISSMap';
import { SpeedChart } from '../charts/SpeedChart';
import { NewsPieChart } from '../charts/NewsPieChart';
import { FeaturedNewsCard, NewsCard, NewsCardSkeleton } from '../components/NewsCard';
import { MapPin, Users, Newspaper, RefreshCw, Activity, Search, Rocket, Filter, SortAsc, X, Sun, Moon } from 'lucide-react';

const NEWS_CATEGORIES = ['science', 'technology', 'health', 'environment'];

export const Dashboard = () => {
  const { currentISS, astronauts, news, loadingISS, refreshISS, refreshNews, loadingNews } = useData();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('science');
  const [sortBy, setSortBy] = useState<'date' | 'source'>('date');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refreshNews(activeCategory, searchQuery);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    refreshNews(cat, searchQuery);
  };

  const sortedNews = [...news].sort((a, b) => {
    if (sortBy === 'source') return (a.source.name || '').localeCompare(b.source.name || '');
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const featuredArticle = sortedNews[0];
  const gridArticles = sortedNews.slice(1);

  return (
    <div className="min-h-screen p-4 md:p-8 relative w-full max-w-[1600px] mx-auto">

      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] dark:bg-cyan-900/10 bg-cyan-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] dark:bg-blue-900/10 bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Rocket className="text-cyan-400" size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
              Orbital Command
            </h1>
            <p className="dark:text-slate-400 text-slate-500 text-sm font-medium flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Systems Operational
            </p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-xl dark:bg-slate-800 bg-white dark:border-slate-700 border-slate-200 border dark:hover:bg-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-600" />}
        </button>
      </header>

      {/* ===== ISS TELEMETRY SECTION ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 mb-10">

        {/* Left: Map */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel p-6 h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-cyan-400" />
                <h2 className="text-xl font-semibold dark:text-slate-100 text-slate-800">Live Telemetry Map</h2>
              </div>
              <button
                onClick={() => refreshISS()}
                className={`p-2 dark:bg-slate-800 bg-white rounded-lg dark:hover:bg-slate-700 hover:bg-slate-50 transition-colors dark:border-slate-700 border-slate-200 border ${loadingISS ? 'animate-spin' : ''}`}
                title="Refresh Location"
              >
                <RefreshCw size={16} className="text-slate-300" />
              </button>
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
              <ISSMap />
            </div>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="lg:col-span-4 space-y-6">
          {/* Speed */}
          <div className="glass-panel p-6 relative overflow-hidden">
            <Activity className="absolute -right-4 -bottom-4 dark:text-slate-800/50 text-slate-200/50" size={120} />
            <h3 className="text-sm dark:text-slate-400 text-slate-500 font-semibold mb-1 uppercase tracking-wider">Orbital Velocity</h3>
            <p className="text-4xl font-mono dark:text-cyan-300 text-cyan-600 mb-2">
              {currentISS ? currentISS.speed.toFixed(0) : '0'} <span className="text-lg dark:text-slate-500 text-slate-400">km/h</span>
            </p>
            <SpeedChart />
          </div>

          {/* Crew */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="text-blue-400" size={20} />
                <h3 className="text-sm dark:text-slate-400 text-slate-500 font-semibold uppercase tracking-wider">Active Crew</h3>
              </div>
              <span className="bg-blue-500/20 dark:text-blue-300 text-blue-600 text-xs font-bold px-2 py-1 rounded-lg border border-blue-500/30">
                {astronauts.length} Total
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto custom-scrollbar pr-2">
              {astronauts.map((astro, i) => (
                <div key={i} className="flex items-center gap-3 p-3 dark:bg-slate-800/40 bg-slate-50 rounded-xl dark:border-slate-700/30 border-slate-200 border">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    <Rocket size={14} className="text-blue-300" />
                  </div>
                  <div className="truncate">
                    <p className="font-medium dark:text-slate-200 text-slate-800 text-sm truncate">{astro.name}</p>
                    <p className="text-[10px] text-cyan-500 font-mono uppercase tracking-wider">{astro.craft}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== NEWS SECTION (Full Width) ===== */}
      <section className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <Newspaper className="text-purple-400" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold dark:text-slate-100 text-slate-800">Sector Intelligence</h2>
              <p className="dark:text-slate-500 text-slate-400 text-sm">Latest science & space reports from around the globe</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <NewsPieChart />
          </div>
        </div>

        {/* Controls Bar */}
        <div className="glass-panel p-4 mb-6 flex flex-col md:flex-row items-stretch md:items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full dark:bg-slate-900/60 bg-white dark:border-slate-700/50 border-slate-200 dark:text-slate-200 text-slate-800 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 text-sm transition-all border"
            />
            {searchQuery && (
              <button type="button" onClick={() => { setSearchQuery(''); refreshNews(activeCategory, ''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                <X size={14} />
              </button>
            )}
          </form>

          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-slate-500 hidden md:block" />
            {NEWS_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${activeCategory === cat
                  ? 'bg-purple-500/20 dark:text-purple-300 text-purple-600 border-purple-500/40'
                  : 'dark:bg-slate-800/50 bg-white dark:text-slate-400 text-slate-500 dark:border-slate-700/30 border-slate-200 dark:hover:bg-slate-700/50 hover:bg-slate-50 dark:hover:text-slate-200 hover:text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 ml-auto">
            <SortAsc size={14} className="text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'source')}
              className="dark:bg-slate-800/60 bg-white dark:border-slate-700/50 border-slate-200 border dark:text-slate-300 text-slate-600 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-purple-500/50 cursor-pointer"
            >
              <option value="date">Newest First</option>
              <option value="source">By Source</option>
            </select>
          </div>

          {/* Refresh */}
          <button
            onClick={() => refreshNews(activeCategory, searchQuery)}
            className={`p-2.5 dark:bg-slate-800 bg-white rounded-lg dark:hover:bg-slate-700 hover:bg-slate-50 transition-colors dark:border-slate-700 border-slate-200 border shrink-0 ${loadingNews ? 'animate-spin' : ''}`}
            title="Refresh News"
          >
            <RefreshCw size={16} className="text-slate-300" />
          </button>
        </div>

        {/* News Content */}
        {loadingNews && news.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <NewsCardSkeleton key={i} />)}
          </div>
        ) : news.length === 0 ? (
          <div className="glass-panel p-16 text-center">
            <Newspaper className="text-slate-700 mx-auto mb-4" size={48} />
            <h3 className="text-slate-400 font-semibold mb-2">No Intelligence Found</h3>
            <p className="text-slate-500 text-sm mb-4">Try adjusting your search or category filters.</p>
            <button onClick={() => { setSearchQuery(''); refreshNews('science', ''); }} className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl text-sm font-medium border border-purple-500/30 hover:bg-purple-500/30 transition-colors">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Featured Article */}
            {featuredArticle && <FeaturedNewsCard article={featuredArticle} />}

            {/* Article Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {gridArticles.map((item, i) => (
                  <NewsCard key={item.url || i} article={item} index={i} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
