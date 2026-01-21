import { cn } from '@/lib/utils';

interface AdSpaceProps {
    className?: string;
    variant?: 'native' | 'vertical' | 'card' | 'banner';
}

const AdSpace = ({ className, variant = 'native' }: AdSpaceProps) => {
    return (
        <div
            className={cn(
                "bg-muted/30 border border-dashed border-muted-foreground/30 flex items-center justify-center text-muted-foreground text-sm font-medium transition-colors hover:bg-muted/50",
                // Default styling based on expectations of previous components
                variant === 'native' && "w-full min-h-[100px] rounded-lg",
                variant === 'card' && "w-full h-full min-h-[250px] rounded-xl",
                variant === 'vertical' && "w-[160px] h-[300px] rounded-lg", // Assuming 160x300 based on previous filename
                variant === 'banner' && "w-[300px] h-[250px] rounded-lg", // Generic banner
                className
            )}
        >
            <div className="flex flex-col items-center gap-2">
                <span className="uppercase tracking-widest text-xs opacity-70">Advertisement</span>
            </div>
        </div>
    );
};

export default AdSpace;
