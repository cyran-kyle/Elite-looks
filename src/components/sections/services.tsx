import Image from 'next/image';
import { services } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  return (
    <section id="services" className="py-16 sm:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-primary">Our Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            From hair transformations to relaxing spa treatments, we offer a complete range of beauty services.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => {
            const serviceImage = getPlaceholderImage(service.imageId);
            return (
              <Card key={service.name} className="flex flex-col text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
                <CardHeader className="p-0">
                  {serviceImage && (
                    <div className="aspect-square relative">
                      <Image
                        src={serviceImage.imageUrl}
                        alt={service.name}
                        fill
                        className="object-cover"
                        data-ai-hint={serviceImage.imageHint}
                      />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <CardTitle className="font-headline text-xl">{service.name}</CardTitle>
                  <p className="mt-2 text-muted-foreground flex-grow">{service.description}</p>
                  <p className="mt-4 font-bold text-lg text-primary">Ghc {service.price}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
