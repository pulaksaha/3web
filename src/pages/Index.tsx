import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import CategoryNav from '@/components/CategoryNav';
import HeroSection from '@/components/HeroSection';
import ArticleGrid from '@/components/ArticleGrid';
import Pagination from '@/components/Pagination';
import Footer from '@/components/Footer';
import AdSpace from '@/components/AdSpace';
import AdSense from '@/components/AdSense';

import { Video } from '@/data/mockArticles';
import { videoService } from '@/services/api';

const ITEMS_PER_PAGE = 16;

const Index = () => {
  const [articles, setArticles] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  const selectedCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        let data: Video[] = [];
        if (searchQuery) {
          data = await videoService.searchVideos(searchQuery);
        } else {
          // Determine sort based on path
          let sortBy: 'latest' | 'views' | 'top_rated' = 'latest';
          if (location.pathname === '/most-viewed') sortBy = 'views';
          if (location.pathname === '/top-rated') sortBy = 'top_rated';

          data = await videoService.getVideos(sortBy);
        }
        setArticles(data);
      } catch (err) {
        setError('Failed to load videos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchQuery, selectedCategory, location.pathname]); // Re-run when search or category changes

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, location.pathname]);

  // Scroll to top whenever currentPage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

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

  // Filter articles by category/tag if selected (Search is handled by API)
  const filteredArticles = selectedCategory
    ? articles.filter(article =>
      article.category === selectedCategory ||
      article.bodytype === selectedCategory ||
      article.scenario === selectedCategory ||
      article.ethnicity === selectedCategory ||
      article.author === selectedCategory ||
      article.location === selectedCategory
    )
    : articles;

  // Pagination Logic
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Determine the title
  let gridTitle = 'Latest Videos';
  if (searchQuery) {
    gridTitle = `Results for: "${searchQuery}"`;
  } else if (selectedCategory) {
    gridTitle = `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Videos`;
  } else if (location.pathname === '/most-viewed') {
    gridTitle = 'Most Viewed Videos';
  } else if (location.pathname === '/top-rated') {
    gridTitle = 'Top Rated Videos';
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Responsive Category Navigation */}
        <CategoryNav />

        <main className="flex-1 w-full min-w-0">
          {/* {featuredArticle && <HeroSection article={featuredArticle} />} */}

          {/* Display Ad between hero and content */}
          {/* Native Banner Ad */}
          <div className="container py-2">
            <AdSpace variant="native" className="my-2" />
          </div>

          {/* Category indicator */}
          {selectedCategory && (
            <div className="container pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Showing: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </div>
            </div>
          )}

          {/* No Results Fallback */}
          {searchQuery && filteredArticles.length === 0 ? (
            <div className="container py-8 text-center">
              <h2 className="text-xl font-semibold mb-4">No results found for "{searchQuery}"</h2>
              <p className="text-muted-foreground mb-8">Try adjusting your search terms or browse our latest videos below.</p>
              {/* Could fetch recommendations here, but for now we rely on user navigating back or searching again */}
              <div className="inline-block">
                <a href="/" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                  Browse Latest
                </a>
              </div>
            </div>
          ) : (
            <ArticleGrid articles={currentArticles} title={gridTitle} />
          )}

          {/* Pagination (Hide if no results) */}
          {filteredArticles.length > 0 && (
            <div className="container pb-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}


          {/* Bottom Ad Section */}
          <div className="container py-8">
            <div className="flex justify-center">
              <AdSpace variant="vertical" className="w-[160px] h-[300px]" />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Index;