import { services } from '@/lib/data';
import { serviceIcons } from '@/lib/icons';
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
            const Icon = serviceIcons[service.name] || serviceIcons.default;
            return (
              <Card key={service.name} className="flex flex-col text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <CardTitle className="font-headline text-xl">{service.name}</CardTitle>
                  <p className="mt-2 text-muted-foreground flex-grow">{service.description}</p>
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
