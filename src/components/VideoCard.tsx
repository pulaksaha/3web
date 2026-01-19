import { Video } from '@/data/mockArticles';
import CategoryBadge from './CategoryBadge';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

interface ArticleCardProps {
  article: Video;
  variant?: 'default' | 'compact' | 'horizontal';
}

const ArticleCard = ({ article, variant = 'default' }: ArticleCardProps) => {
  if (variant === 'horizontal') {
    return (
      <Link
        to={`/video/${article.id}`}
        className="group flex gap-3 py-3 cursor-pointer hover:bg-accent/50 rounded-lg transition-colors duration-200"
      >
        <div className="relative w-40 h-24 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
            <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="currentColor" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{article.author}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/video/${article.id}`}
      className="group cursor-pointer block"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden rounded-xl mb-3 bg-muted">
        <img
          src={article.thumbnailUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
            <div className="flex items-center gap-2">
              <Play className="w-10 h-10 text-white drop-shadow-lg" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Duration Badge (mock for now) */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
          12:34
        </div>
      </div>

      {/* Video Info */}
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          {/* Author Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <span className="text-sm font-semibold text-primary">
              {article.author.charAt(0)}
            </span>
          </div>

          {/* Title and Meta */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {article.title}
            </h3>

            <div className="flex flex-col gap-0.5 mt-1">
              <p className="text-xs text-muted-foreground">{article.author}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CategoryBadge category={article.category} size="sm" />
                <span>•</span>
                <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;