import { Video } from '@/data/mockArticles';
import { Link } from 'react-router-dom';

interface NewsBlocksProps {
  articles: Video[];
}

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  Movies: { bg: 'bg-category-movies/10', border: 'border-l-category-movies', text: 'text-category-movies' },
  Series: { bg: 'bg-category-series/10', border: 'border-l-category-series', text: 'text-category-series' },
  Gaming: { bg: 'bg-category-gaming/10', border: 'border-l-category-gaming', text: 'text-category-gaming' },
  Music: { bg: 'bg-category-music/10', border: 'border-l-category-music', text: 'text-category-music' },
  Sports: { bg: 'bg-category-sports/10', border: 'border-l-category-sports', text: 'text-category-sports' },
  Tech: { bg: 'bg-category-tech/10', border: 'border-l-category-tech', text: 'text-category-tech' },
};

const NewsBlocks = ({ articles }: NewsBlocksProps) => {
  // Group articles by category
  const categories = ['Movies', 'Series', 'Gaming', 'Music'];

  const groupedArticles = categories.reduce((acc, category) => {
    acc[category] = articles.filter(a => a.category === category.toLowerCase()).slice(0, 4); // Note: category in mock is lowercase
    return acc;
  }, {} as Record<string, Video[]>);

  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <section className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const colors = categoryColors[category] || categoryColors.Movies;
          // Matching logic: Component category (Capitalized) -> Mock category (lowercase)
          // But wait, the previous code filtered by `a.category === category`.
          // In mockArticles.ts, categories are lowercase: 'movies', 'series'.
          // So I need to ensure I filter correctly.
          const categoryKey = category; // Capitalized for display
          const mockCategoryKey = category.toLowerCase(); // Lowercase for filtering

          const categoryArticles = articles.filter(a => a.category === mockCategoryKey).slice(0, 4);

          return (
            <div
              key={category}
              className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Block Header */}
              <div className="text-center mb-4 pb-3 border-b border-border">
                <h3 className={`font-headline text-lg font-bold ${colors.text}`}>
                  {category}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Last Update: {currentDate}
                </p>
              </div>

              {/* News Items */}
              <div className="space-y-2">
                {categoryArticles.length > 0 ? (
                  categoryArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/video/${article.id}`}
                      className={`block p-2.5 rounded ${colors.bg} border-l-4 ${colors.border} hover:translate-x-1 transition-transform`}
                    >
                      <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                        {article.title}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No articles available
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NewsBlocks;
