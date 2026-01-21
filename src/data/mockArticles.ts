export type Category = 'movies' | 'series' | 'gaming' | 'music' | 'sports' | 'tech';

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  category: Category;
  author: string;
  publishedAt: string;
  thumbnailUrl: string;
  isFeatured?: boolean;
  duration?: string;
  views?: number;
  location?: string;
  bodytype?: string;
  scenario?: string;
  ethnicity?: string;
}

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'DUNE: Part Two - Official Trailer',
    description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    videoUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
    category: 'movies',
    author: 'Warner Bros.',
    publishedAt: '2026-01-10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&auto=format&fit=crop',
    isFeatured: true,
    duration: '2:34',
  },
  {
    id: '2',
    title: 'GTA VI - Reveal Trailer',
    description: 'The first official look at the next entry in the Grand Theft Auto series, set in Vice City.',
    videoUrl: 'https://www.youtube.com/watch?v=QdBZY2fkU-0',
    category: 'gaming',
    author: 'Rockstar Games',
    publishedAt: '2026-01-09',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593305841991-05c29736ce37?w=800&auto=format&fit=crop',
    duration: '1:30',
  },
  {
    id: '3',
    title: 'Stranger Things - Season 5 First Look',
    description: 'A glimpse into the final season of the global phenomenon.',
    videoUrl: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
    category: 'series',
    author: 'Netflix',
    publishedAt: '2026-01-09',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format&fit=crop',
    duration: '0:58',
  },
  {
    id: '4',
    title: 'iPhone 16 Pro - Titanium Design',
    description: 'Experience the new lightweight titanium design and the advanced A18 Pro chip.',
    videoUrl: 'https://www.youtube.com/watch?v=xqyUdNxWazA',
    category: 'tech',
    author: 'Apple',
    publishedAt: '2026-01-08',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556656793-02715d8dd6f8?w=800&auto=format&fit=crop',
    duration: '1:45',
  },
  {
    id: '5',
    title: 'Champions League Final Highlights',
    description: 'All the goals and best moments from the spectacular final match.',
    videoUrl: 'https://www.youtube.com/watch?v=kVirtualId',
    category: 'sports',
    author: 'UEFA',
    publishedAt: '2026-01-08',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop',
    duration: '10:05',
  },
  {
    id: '6',
    title: 'Top 10 Songs of 2025',
    description: 'A countdown of the most streamed and beloved tracks of the past year.',
    videoUrl: 'https://www.youtube.com/watch?v=music123',
    category: 'music',
    author: 'V-Music',
    publishedAt: '2026-01-07',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e3726?w=800&auto=format&fit=crop',
    duration: '15:20',
  },
];

export const categories = [
  { id: 'movies', name: 'Movies', color: 'category-movies' },
  { id: 'series', name: 'Series', color: 'category-series' },
  { id: 'gaming', name: 'Gaming', color: 'category-gaming' },
  { id: 'music', name: 'Music', color: 'category-music' },
  { id: 'sports', name: 'Sports', color: 'category-sports' },
  { id: 'tech', name: 'Tech', color: 'category-tech' },
] as const;