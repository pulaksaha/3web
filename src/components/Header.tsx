import { useState } from 'react';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'EN' },
  { code: 'hi', name: 'HI' },
  { code: 'kn', name: 'KN' },
  { code: 'ta', name: 'TA' },
  { code: 'te', name: 'TE' },
];

const RIBBON_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/categories' },
  { label: 'Latest', href: '/latest' },
  { label: 'Top Rated', href: '/top-rated' },
  { label: 'Most Viewed', href: '/most-viewed' },
  { label: 'Pornstars', href: '/pornstars' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, isDarkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Optional: clear search after submit
    }
  };

  return (
    <header className="flex flex-col w-full z-50 sticky top-0 shadow-sm font-sans">
      {/* 
        Top Section: White Background 
        Mobile: Wraps (Row 1: Logo/Theme, Row 2: Search)
        Desktop: No Wrap (Logo - Search - Actions)
      */}
      <div className="bg-background border-b flex flex-col md:flex-row items-center w-full px-2 lg:px-8 py-2 md:py-0 md:h-20 gap-2 md:gap-4 justify-between">

        {/* Row 1 (Mobile): Logo, Actions */}
        <div className="relative flex items-center justify-center w-full md:w-auto md:justify-between md:relative-0">
          {/* Logo Only (Centered on mobile) */}
          <Link to="/" className="flex flex-col shrink-0">
            <h1 className="font-extrabold text-2xl md:text-3xl tracking-tighter text-foreground">
              VPLAZA
            </h1>
          </Link>

          {/* Right (Mobile Only): Theme Toggle - Absolute Right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-foreground shrink-0"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar - Full Width on Mobile (Row 2), Centered on Desktop */}
        <div className="w-full md:flex-1 md:max-w-4xl mx-0 md:mx-4 order-last md:order-none mt-1 md:mt-0">
          <form onSubmit={handleSearch} className="relative w-full flex">
            <Input
              className="rounded-l-md rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-muted/30 h-10 w-full"
              placeholder="Search for videos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="rounded-l-none rounded-r-md bg-destructive hover:bg-destructive/90 px-4 md:px-6 h-10 shrink-0">
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>

        {/* Right Actions (Desktop Only mainly) */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4 shrink-0">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="text-foreground shrink-0"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden lg:flex gap-1">
                <span className="font-semibold">{currentLanguage.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Login/Signup */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="font-semibold text-muted-foreground hover:text-foreground">
              <Link to="/login">Login</Link>
            </Button>

            <Button asChild className="bg-destructive hover:bg-destructive/90 text-white font-bold rounded-md px-6 shadow-sm hover:shadow-md transition-all">
              <Link to="/signup">Sign up for free</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 
        Bottom Row: Ribbon - Always Black
        Mobile: Menu Button + Links (Space Between)
        Desktop: Links Only (Upload Removed)
      */}
      <div className="flex bg-[#1a1a1b] text-white h-10 md:h-12 items-center px-4 md:px-4 lg:px-8 text-base md:text-lg font-medium border-b border-border/10">

        {/* Mobile: Container for Menu + Links with equal spacing */}
        <div className="flex md:hidden w-full items-center justify-between">
          {/* Menu Button (In Ribbon) */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Mobile Links */}
          {['Categories', 'Top Rated', 'Most Viewed'].map((label) => {
            const link = RIBBON_LINKS.find(l => l.label === label);
            if (!link) return null;
            return (
              <Link
                key={link.label}
                to={link.href}
                className="truncate px-2 hover:text-white/80 transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop: Standard Layout (Centered or Left Aligned?) - Keeping Left Aligned as before */}
        <div className="hidden md:flex w-full items-center justify-between h-full">
          {RIBBON_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="px-3 md:px-4 h-full flex items-center justify-center flex-1 hover:bg-white/10 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Content (Burger) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border absolute w-full top-full left-0 shadow-lg z-50">
          <nav className="flex flex-col py-2">
            {RIBBON_LINKS.map(link => (
              <Link
                key={link.label}
                to={link.href}
                className="px-6 py-3 font-medium hover:bg-accent border-b border-border/50 last:border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 flex gap-2 bg-muted/20">
            <Button className="w-full" variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="w-full bg-destructive text-white" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;