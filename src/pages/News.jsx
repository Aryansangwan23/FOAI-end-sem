import React from 'react';
import NewsGrid from '../components/news/NewsGrid';

const News = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Intelligence Feed</h1>
          <p className="text-card-foreground/60 mt-1">Latest curated news from around the world.</p>
        </div>
      </div>

      <NewsGrid />
    </div>
  );
};

export default News;
