import Image from 'next/image';
import { stylists } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Stylists = () => {
  return (
    <section id="stylists" className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-primary">Meet Our Stylists</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Our talented team of passionate and skilled stylists is here to bring your vision to life.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stylists.map((stylist) => {
            const stylistImage = getPlaceholderImage(stylist.imageId);
            return (
              <Card key={stylist.name} className="overflow-hidden text-center transition-shadow duration-300 hover:shadow-xl">
                <CardHeader className="p-0">
                  {stylistImage && (
                    <div className="aspect-square relative">
                       <Image
                        src={stylistImage.imageUrl}
                        alt={`Portrait of ${stylist.name}`}
                        fill
                        className="object-cover"
                        data-ai-hint={stylistImage.imageHint}
                      />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="font-headline text-2xl">{stylist.name}</CardTitle>
                  <p className="mt-2 text-muted-foreground">{stylist.expertise}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className='w-full' variant='outline'>
                    <a href="#booking">Book with {stylist.name}</a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stylists;
