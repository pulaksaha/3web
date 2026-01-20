import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground mt-12">
      <div className="container py-12 flex flex-col items-center text-center gap-6">
        <div>
          <h3 className="font-headline text-3xl font-bold mb-2 tracking-tighter text-primary">VPLAZA</h3>
          <p className="text-sm opacity-80">
            Your premium destination for the latest in multimedia entertainment.
          </p>
        </div>

        <Separator className="bg-primary-foreground/20 w-full max-w-md" />

        <p className="text-sm opacity-60">
          © {new Date().getFullYear()} VPLAZA. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;