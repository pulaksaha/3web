import { Video } from '@/data/mockArticles';
import CategoryBadge from './CategoryBadge';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import React from 'react';

interface ArticleCardProps {
  article: Video;
  variant?: 'default' | 'compact' | 'horizontal';
}

const ArticleCard = ({ article, variant = 'default' }: ArticleCardProps) => {
  // Extract YouTube ID if applicable
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYouTubeId(article.videoUrl);
  const [isHovered, setIsHovered] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);

  // Delay preview for better UX
  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isHovered) {
      timeout = setTimeout(() => setShowPreview(true), 1000); // 1s delay before playing
    } else {
      setShowPreview(false);
    }
    return () => clearTimeout(timeout);
  }, [isHovered]);

  if (variant === 'horizontal') {
    return (
      <Link
        to={`/video/${article.id}`}
        className="group flex gap-3 py-3 cursor-pointer hover:bg-accent/50 rounded-lg transition-colors duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-40 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
          {showPreview && youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0`}
              className="absolute inset-0 w-full h-full object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={article.title}
            />
          ) : showPreview && !youtubeId ? (
            <video
              src={article.videoUrl}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={article.thumbnailUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          )}
          {!showPreview && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="currentColor" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="font-medium text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/video/${article.id}`}
      className="group cursor-pointer block space-y-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-muted shadow-sm">
        {showPreview && youtubeId ? (
          <div className="absolute inset-0 w-full h-full bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3`}
              className="w-full h-full pointer-events-none scale-150" // scale to hide controls/branding
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ border: 0 }}
              title={article.title}
              tabIndex={-1}
            />
          </div>
        ) : showPreview && !youtubeId ? (
          <video
            src={article.videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Hover Overlay - Only if preview is not showing */}
        {!showPreview && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
              <div className="flex items-center gap-2">
                <Play className="w-10 h-10 text-white drop-shadow-lg" fill="currentColor" />
              </div>
            </div>
          </div>
        )}

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm font-medium">
          {article.duration || '0:00'}
        </div>
      </div>

      {/* Video Info - Just Title */}
      <h3 className="font-medium text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
        {article.title}
      </h3>
    </Link>
  );
};

export default ArticleCard;