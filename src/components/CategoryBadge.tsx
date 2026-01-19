import { Category } from '@/data/mockArticles';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
}

const categoryColors: Record<Category, string> = {
  movies: 'bg-category-movies',
  series: 'bg-category-series',
  gaming: 'bg-category-gaming',
  music: 'bg-category-music',
  sports: 'bg-category-sports',
  tech: 'bg-category-tech',
};

const CategoryBadge = ({ category, size = 'md' }: CategoryBadgeProps) => {
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`inline-block ${categoryColors[category]} text-white font-medium uppercase tracking-wider ${sizeClasses} rounded-full`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;