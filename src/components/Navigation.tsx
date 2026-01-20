import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavigationProps {
  mobile?: boolean;
  onClose?: () => void;
  theme?: 'light' | 'dark';
}

const navigationItems = [
  {
    label: 'Movies',
    subcategories: ['New Releases', 'Top Rated', 'Action', 'Drama', 'Horror'],
  },
  {
    label: 'Series',
    subcategories: ['Trending', 'Originals', 'Sci-Fi', 'Crime', 'Anime'],
  },
  {
    label: 'Gaming',
    subcategories: ['Reviews', 'Esports', 'Guides', 'Consoles', 'PC'],
  },
  {
    label: 'Music',
    subcategories: ['Charts', 'New Albums', 'Interviews', 'Concerts'],
  },
  {
    label: 'Sports',
    subcategories: ['Football', 'Basketball', 'Cricket', 'F1', 'Tennis'],
  },
  {
    label: 'Tech',
    subcategories: ['AI', 'Mobile', 'Computing', 'VR/AR', 'Future'],
  },
];

const Navigation = ({ mobile, onClose, theme = 'light' }: NavigationProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/?category=${category.toLowerCase()}`);
    if (onClose) onClose();
  };

  const desktopItemClass = theme === 'dark'
    ? "flex items-center gap-1 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-sm transition-colors"
    : "flex items-center gap-1 px-4 py-2 text-sm font-medium hover:bg-accent rounded-sm transition-colors";

  const desktopLinkClass = theme === 'dark'
    ? "px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-sm transition-colors inline-block"
    : "px-4 py-2 text-sm font-medium hover:bg-accent rounded-sm transition-colors inline-block";

  if (mobile) {
    return (
      <nav className="py-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.label} className="px-4">
              <button
                className="w-full flex items-center justify-between py-2 text-left font-medium hover:text-muted-foreground transition-colors"
                onClick={() => handleCategoryClick(item.label)}
              >
                {item.label}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {openDropdown === item.label && (
                <ul className="pl-4 py-2 space-y-2 border-l border-border ml-2">
                  {item.subcategories.map((sub) => (
                    <li key={sub}>
                      <a
                        href="#"
                        className="block py-1 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={onClose}
                      >
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="px-4 pt-4 border-t border-border mt-4">
            <a href="#" className="block py-2 font-medium" onClick={onClose}>
              About
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul className="flex items-center gap-1">
        {navigationItems.map((item) => (
          <li key={item.label}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={desktopItemClass}
                  onClick={() => handleCategoryClick(item.label)}
                >
                  {item.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-popover z-50">
                {item.subcategories.map((sub) => (
                  <DropdownMenuItem key={sub} className="cursor-pointer">
                    {sub}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ))}
        <li>
          <a
            href="#"
            className={desktopLinkClass}
          >
            About
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;