import { Video } from '@/data/mockArticles';
import ArticleCard from './VideoCard';
import AdSpace from './AdSpace';
import React from 'react';

interface ArticleGridProps {
  articles: Video[];
  title?: string;
}

const ArticleGrid = ({ articles, title }: ArticleGridProps) => {
  const injectAds = (articles: Video[]) => {
    const itemsWithAds: React.ReactNode[] = [];
    // Calculate positions to have roughly 3 ads evenly distributed
    // For 16 items: roughly after 4, 9, 14. To fill 20th slot (4 rows of 5? No, grid-cols-4 means 5 rows of 4 = 20),
    // we need 20 items. 16 videos + 4 ads = 20 items.
    // Positions: 4, 9, 14, 15 (after 16th video)
    const adPositions = [4, 9, 14, 15];

    articles.forEach((article, index) => {
      itemsWithAds.push(<ArticleCard key={article.id} article={article} />);

      if (adPositions.includes(index)) {
        itemsWithAds.push(
          <div key={`ad-${index}`} className="col-span-1 rounded-xl overflow-hidden shadow-sm border border-border bg-card flex flex-col items-center justify-center p-2 min-h-[300px]">
            <div className="w-full h-full bg-muted/30 flex items-center justify-center rounded-lg">
              <AdSpace variant="card" className="w-full h-full" />
            </div>
          </div>
        );
      }
    });
    return itemsWithAds;
  };

  return (
    <section className="container py-8">
      {title && (
        <h2 className="font-headline text-2xl font-bold mb-6">
          {title}
        </h2>
      )}

      {/* YouTube-style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {injectAds(articles)}
      </div>
    </section>
  );
};

export default ArticleGrid;