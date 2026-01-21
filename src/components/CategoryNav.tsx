import { useRef, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';



const CategoryNav = () => {
    const [searchParams] = useSearchParams();
    const currentCategory = searchParams.get('category');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Import dynamically to avoid circular deps if any, or just use imported service
                const { videoService } = await import('@/services/api');
                const uniqueCategories = await videoService.getUniqueCategories();
                setCategories(uniqueCategories);
            } catch (err) {
                console.error('Failed to fetch categories', err);
                // Fallback or empty
            }
        };
        fetchCategories();
    }, []);

    // Scroll checking for mobile ribbon
    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
        }
    };

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll);
            // Initial check
            checkScroll();
            // Check on resize
            window.addEventListener('resize', checkScroll);
            return () => {
                el.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, [categories]); // Re-run when categories load

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Mobile View: Horizontal Ribbon (Black bg, White text) */}
            <div className="lg:hidden bg-black text-white py-2 px-2 border-b border-white/10 relative group">

                {/* Left Arrow Overlay */}
                {showLeftArrow && (
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 flex items-center justify-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-full w-6 text-white hover:bg-black/50 p-0"
                            onClick={() => scroll('left')}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                {/* Scrollable Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth px-2"
                >
                    {filteredCategories.map((cat) => (
                        <Link
                            key={cat}
                            to={`/?category=${cat}`}
                            className={cn(
                                "whitespace-nowrap px-3 py-1.5 rounded-sm text-sm font-medium transition-colors hover:bg-white/20",
                                currentCategory === cat ? "bg-white/20 text-white" : "text-gray-300"
                            )}
                        >
                            {cat}
                        </Link>
                    ))}
                    <Link
                        to="/categories"
                        className="whitespace-nowrap px-3 py-1.5 rounded-sm text-sm font-medium text-blue-400 hover:bg-white/10"
                    >
                        More...
                    </Link>
                </div>

                {/* Right Arrow Overlay */}
                {showRightArrow && (
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black via-black/80 to-transparent z-10 flex items-center justify-end pr-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-full w-6 text-white hover:bg-black/50 p-0"
                            onClick={() => scroll('right')}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Desktop View: Vertical Sidebar (White bg, Left aligned) */}
            <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r h-[calc(100vh-5rem)] sticky top-20 bg-background p-4 gap-4">
                {/* Search Box */}
                <div className="relative shrink-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Filter by category"
                        className="pl-9 bg-muted/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Scrollable List */}
                <div className="flex-1 overflow-y-auto -mx-2 px-2 no-scrollbar">
                    <div className="flex flex-col gap-1">
                        {filteredCategories.map((cat) => (
                            <Link
                                key={cat}
                                to={`/?category=${cat}`}
                                className={cn(
                                    "px-2 py-2 rounded-md text-base transition-colors hover:bg-accent hover:text-accent-foreground text-left truncate text-foreground font-medium",
                                    currentCategory === cat ? "bg-accent font-bold" : ""
                                )}
                                title={cat}
                            >
                                {cat}
                            </Link>
                        ))}
                        {filteredCategories.length === 0 && (
                            <div className="text-sm text-muted-foreground p-2">No categories found</div>
                        )}
                    </div>
                </div>

                {/* Bottom Button */}
                <Button variant="ghost" className="w-full justify-between font-bold text-foreground border-t pt-4 mt-auto rounded-none hover:bg-transparent px-2 h-auto text-lg hover:text-foreground">
                    All Categories <ChevronRight className="h-5 w-5" />
                </Button>
            </aside>
        </>
    );
};

export default CategoryNav;
