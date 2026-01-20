import { Video } from '@/data/mockArticles';
import CategoryBadge from './CategoryBadge';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

interface HeroSectionProps {
  article: Video;
}

const HeroSection = ({ article }: HeroSectionProps) => {
  return (
    <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={article.thumbnailUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container flex items-end pb-12 lg:pb-20">
        <div className="max-w-2xl space-y-4 lg:space-y-6">
          <CategoryBadge category={article.category} />

          <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-2xl">
            {article.title}
          </h1>



          <div className="flex items-center gap-4 text-sm text-white/80">
            <span className="font-medium text-white">{article.author}</span>
            <span>•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}</span>
          </div>

          {/* CTA Button */}
          <Link
            to={`/video/${article.id}`}
            className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl"
          >
            <Play className="w-5 h-5" fill="currentColor" />
            Watch Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;