import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getPlaceholderImage } from '@/lib/placeholder-images';

const Hero = () => {
  const heroImage = getPlaceholderImage('hero-background');

  return (
    <section className="relative h-[60dvh] w-full text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
      <div className="container relative z-10 flex h-full flex-col items-start justify-end pb-12 text-left md:pb-20">
        <h1 className="font-headline text-4xl font-bold md:text-6xl lg:text-7xl drop-shadow-lg">
          Elegance Redefined, Beauty Perfected
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90 md:text-xl drop-shadow-md">
          Experience world-class beauty services tailored to your unique style. Book your moment of luxury today.
        </p>
        <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
          <a href="#booking">Book an Appointment</a>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
