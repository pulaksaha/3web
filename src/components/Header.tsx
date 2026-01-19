import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import TopRibbon from './TopRibbon';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="glass-nav sticky top-0 z-50">
      {/* Top ribbon with font size, language, dark mode, login */}
      <TopRibbon />

      {/* Main header */}
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <div className="flex-1 text-center lg:text-left">
            <Link to="/" className="inline-block">
              <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-primary hover:opacity-80 transition-opacity cursor-pointer">
                VPLAZA
              </h1>
              <p className="text-xs md:text-sm text-primary/80 font-medium tracking-wide mt-1 uppercase">
                Premium Multimedia Experience
              </p>
            </Link>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            {isSearchOpen && (
              <Input
                type="search"
                placeholder="Search articles..."
                className="w-48 md:w-64 animate-in slide-in-from-right"
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block border-t border-border">
        <Navigation />
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <Navigation mobile onClose={() => setIsMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;