import { Wand2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center">
        <a href="/" className="flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-primary" />
          <span className="font-headline text-2xl font-bold text-foreground">
            Jomez Glow Spa
          </span>
        </a>
      </div>
    </header>
  );
};

export default Header;
