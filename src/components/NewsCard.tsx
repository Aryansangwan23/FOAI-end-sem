import { motion } from 'framer-motion';
import { ExternalLink, Calendar, User, Clock, ArrowUpRight } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { NewsArticle } from '../types';

const SPACE_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=800&auto=format&fit=crop',
];

// Featured card (first article, large)
export const FeaturedNewsCard = ({ article }: { article: NewsArticle }) => {
  const fallback = SPACE_FALLBACK_IMAGES[0];
  const imgSrc = article.urlToImage || fallback;

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="block relative rounded-2xl overflow-hidden group h-[380px] border border-slate-700/50"
    >
      <img
        src={imgSrc}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-cyan-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full">
            {article.source.name}
          </span>
          <span className="text-slate-400 text-xs flex items-center gap-1">
            <Clock size={12} />
            {article.publishedAt ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true }) : 'Recently'}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
          {article.title}
        </h2>
        <p className="text-slate-300 text-sm line-clamp-2 max-w-2xl">
          {article.description}
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all">
          Read Full Report <ArrowUpRight size={16} />
        </div>
      </div>
    </motion.a>
  );
};

// Standard card (grid items)
export const NewsCard = ({ article, index }: { article: NewsArticle; index: number }) => {
  const fallback = SPACE_FALLBACK_IMAGES[(index + 1) % SPACE_FALLBACK_IMAGES.length];
  const imgSrc = article.urlToImage || fallback;

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="dark:bg-slate-800/40 bg-white dark:border-slate-700/50 border-slate-200 border rounded-2xl overflow-hidden dark:hover:bg-slate-800/60 hover:bg-slate-50 transition-all hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(6,182,212,0.08)] group flex flex-col h-full"
    >
      <div className="h-44 w-full overflow-hidden relative">
        <img
          src={imgSrc}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="absolute top-3 left-3 dark:bg-slate-900/70 bg-white/80 backdrop-blur-sm dark:text-cyan-400 text-cyan-600 text-[10px] font-bold px-2.5 py-1 rounded-full dark:border-cyan-500/20 border-cyan-500/30 border uppercase tracking-wider">
          {article.source.name}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold dark:text-slate-100 text-slate-800 mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors leading-snug">
          {article.title}
        </h3>

        <p className="text-sm dark:text-slate-400 text-slate-500 line-clamp-2 mb-4 flex-1 leading-relaxed">
          {article.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            {article.author && (
              <span className="flex items-center gap-1 truncate max-w-[120px]">
                <User size={12} />
                <span className="truncate">{article.author}</span>
              </span>
            )}
            {article.publishedAt && (
              <span className="flex items-center gap-1 shrink-0">
                <Calendar size={12} />
                {format(new Date(article.publishedAt), 'MMM dd')}
              </span>
            )}
          </div>
          <span className="text-cyan-500 group-hover:text-cyan-400 transition-colors">
            <ExternalLink size={14} />
          </span>
        </div>
      </div>
    </motion.a>
  );
};

// Skeleton loader
export const NewsCardSkeleton = () => (
  <div className="dark:bg-slate-800/40 bg-white dark:border-slate-700/30 border-slate-200 border rounded-2xl overflow-hidden h-full animate-pulse">
    <div className="h-44 dark:bg-slate-700/30 bg-slate-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 dark:bg-slate-700/30 bg-slate-200 rounded w-3/4" />
      <div className="h-4 dark:bg-slate-700/30 bg-slate-200 rounded w-full" />
      <div className="h-3 dark:bg-slate-700/30 bg-slate-200 rounded w-1/2 mt-4" />
    </div>
  </div>
);
