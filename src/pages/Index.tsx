import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ArticleGrid from '@/components/ArticleGrid';
import Footer from '@/components/Footer';
import { Video } from '@/data/mockArticles';
import { videoService } from '@/services/api';

const Index = () => {
  const [articles, setArticles] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await videoService.getVideos();
        setArticles(data);
      } catch (err) {
        setError('Failed to load videos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading VPLAZA...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  const featuredArticle = articles.find((article) => article.isFeatured) || articles[0];
  const otherArticles = articles.filter((article) => article.id !== featuredArticle?.id);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {featuredArticle && <HeroSection article={featuredArticle} />}
        <ArticleGrid articles={otherArticles} title="Latest Videos" />
      </main>

      <Footer />
    </div>
  );
};

export default Index;