import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    // Mock pages for visual fidelity to image (1, 2, 3, 4, 5, 6 ... 12 ... 22)
    // In a real app we'd calculate this dynamically, but for now fixed visual
    const pages = [1, 2, 3, 4, 5, 6];

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 py-8 mt-4">
            {pages.map((page) => (
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
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Button>
            ))}

            <span className="text-muted-foreground px-1 font-medium select-none">...</span>

            <Button
                variant="secondary"
                size="icon"
                className="h-10 w-10 text-base font-medium rounded-md shadow-sm bg-[#e5e5e5] text-black hover:bg-[#d4d4d4]"
                onClick={() => onPageChange(12)}
            >
                12
            </Button>

            <span className="text-muted-foreground px-1 font-medium select-none">...</span>

            <Button
                variant="secondary"
                size="icon"
                className="h-10 w-10 text-base font-medium rounded-md shadow-sm bg-[#e5e5e5] text-black hover:bg-[#d4d4d4]"
                onClick={() => onPageChange(22)}
            >
                22
            </Button>

            <Button
                className="h-10 px-4 bg-[#e53935] hover:bg-[#d32f2f] text-white font-bold rounded-md ml-2 shadow-sm"
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            >
                Next <ChevronRight className="ml-1 h-4 w-4 stroke-[3]" />
            </Button>
        </div>
    );
};

export default Pagination;
