import { Video } from '@/data/mockArticles';
import CategoryBadge from './CategoryBadge';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  article: Video;
}

const HeroSection = ({ article }: HeroSectionProps) => {
  return (
    <section className="border-b border-border">
      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={article.thumbnailUrl}
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <CategoryBadge category={article.category} />

            <Link to={`/video/${article.id}`}>
              <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold leading-tight hover:underline cursor-pointer">
                {article.title}
              </h2>
            </Link>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {article.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
              <span className="font-medium text-foreground">{article.author}</span>
              <span>•</span>
              <span>{new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}</span>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;