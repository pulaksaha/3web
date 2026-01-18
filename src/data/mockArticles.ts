export type Category = 'science' | 'technology' | 'innovation' | 'research' | 'gadgets' | 'space';

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
}

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Breakthrough in Quantum Computing: Scientists Achieve 1000-Qubit Milestone',
    description: 'Researchers have developed a revolutionary quantum processor that could transform cryptography, drug discovery, and artificial intelligence.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'technology',
    author: 'Dr. Sarah Chen',
    publishedAt: '2026-01-10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'New Species of Deep-Sea Creatures Discovered in Mariana Trench',
    description: 'Marine biologists have identified over 30 previously unknown species living in the deepest parts of the ocean.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'science',
    author: 'James Morrison',
    publishedAt: '2026-01-09',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'SpaceX Announces Plans for First Civilian Mars Mission',
    description: 'The ambitious project aims to send the first non-astronaut crew to Mars by 2030.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'space',
    author: 'Emily Rodriguez',
    publishedAt: '2026-01-09',
    thumbnailUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Revolutionary AI Model Can Predict Earthquakes 48 Hours in Advance',
    description: 'Machine learning breakthrough could save countless lives by providing early warning systems for seismic events.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'innovation',
    author: 'Dr. Michael Park',
    publishedAt: '2026-01-08',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Apple Unveils Neural Interface Headset for Hands-Free Computing',
    description: 'The next generation of wearable technology allows users to control devices using only their thoughts.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'gadgets',
    author: 'Lisa Wang',
    publishedAt: '2026-01-08',
    thumbnailUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'CERN Scientists Discover New Subatomic Particle',
    description: 'The finding could help explain dark matter and reshape our understanding of the universe.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'research',
    author: 'Dr. Hans Mueller',
    publishedAt: '2026-01-07',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop',
  },
  {
    id: '7',
    title: 'Gene Therapy Successfully Reverses Blindness in Clinical Trial',
    description: 'Patients with inherited retinal diseases regained significant vision after groundbreaking treatment.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'science',
    author: 'Dr. Amanda Foster',
    publishedAt: '2026-01-07',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop',
  },
  {
    id: '8',
    title: 'Tesla Reveals Solid-State Battery with 1000-Mile Range',
    description: 'The revolutionary battery technology charges in under 10 minutes and could make EVs more practical than ever.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'technology',
    author: 'Robert Kim',
    publishedAt: '2026-01-06',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop',
  },
];

export const categories = [
  { id: 'science', name: 'Science', color: 'category-science' },
  { id: 'technology', name: 'Technology', color: 'category-technology' },
  { id: 'innovation', name: 'Innovation', color: 'category-innovation' },
  { id: 'research', name: 'Research', color: 'category-research' },
  { id: 'gadgets', name: 'Gadgets', color: 'category-gadgets' },
  { id: 'space', name: 'Space', color: 'category-space' },
] as const;