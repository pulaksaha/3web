import { Video } from '@/data/mockArticles';
import ArticleCard from './VideoCard';

interface ArticleGridProps {
  articles: Video[];
  title?: string;
}

const ArticleGrid = ({ articles, title }: ArticleGridProps) => {
  return (
    <section className="container py-8">
      {title && (
        <h2 className="font-headline text-2xl font-bold mb-6">
          {title}
        </h2>
      )}

      {/* YouTube-style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default ArticleGrid;