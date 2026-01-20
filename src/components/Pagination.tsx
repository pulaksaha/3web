import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const getPageNumbers = () => {
        const delta = 2; // Number of pages to show on each side of current page
        const range = [];
        const rangeWithDots = [];
        let l;

        range.push(1);

        if (totalPages <= 1) return [1];

        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i < totalPages && i > 1) {
                range.push(i);
            }
        }
        range.push(totalPages);

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    const pages = getPageNumbers();

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 py-8 mt-4">
            <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                type="button"
            >
                <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>

            {pages.map((page, index) => (
                page === '...' ? (
                    <span key={`dots-${index}`} className="text-muted-foreground px-1 font-medium select-none">...</span>
                ) : (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "secondary"}
                        size="icon"
                        className={cn(
                            "h-10 w-10 text-base font-medium rounded-md shadow-sm transition-all",
                            currentPage === page
                                ? "bg-[#333] text-white hover:bg-[#222]"
                                : "bg-[#e5e5e5] text-black hover:bg-[#d4d4d4]"
                        )}
                        onClick={() => onPageChange(Number(page))}
                        type="button"
                    >
                        {page}
                    </Button>
                )
            ))}

            <Button
                className="h-10 px-4 bg-[#e53935] hover:bg-[#d32f2f] text-white font-bold rounded-md ml-2 shadow-sm"
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                type="button"
            >
                Next <ChevronRight className="ml-1 h-4 w-4 stroke-[3]" />
            </Button>
        </div>
    );
};

export default Pagination;
