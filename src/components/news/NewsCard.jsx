import React from 'react';
import { ExternalLink, Calendar, User } from 'lucide-react';

const NewsCard = ({ article }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <article className="flex flex-col h-full bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden bg-secondary">
        {article.urlToImage ? (
          <img 
            src={article.urlToImage} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-card-foreground/30 bg-secondary">
            No Image
          </div>
        )}
        {article.source?.name && (
          <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {article.source.name}
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        
        <p className="text-sm text-card-foreground/70 mb-4 line-clamp-3 flex-1">
          {article.description || 'No description available for this article.'}
        </p>
        
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs text-card-foreground/50">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formattedDate}</span>
            {article.author && <span className="flex items-center gap-1 truncate max-w-[100px]"><User className="w-3 h-3" /> {article.author}</span>}
          </div>
          
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Read <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
