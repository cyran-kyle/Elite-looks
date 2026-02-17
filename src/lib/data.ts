export type Service = {
  name: string;
  description: string;
  duration: number; // in minutes
  imageId: string;
  price: string;
};

export type Stylist = {
  id: string;
  name: string;
  expertise: string;
  imageId: string;
  services: string[];
};

export const services: Service[] = [
  { name: 'Hair treatment', description: 'Deep conditioning and revitalizing treatment for all hair types.', duration: 60, imageId: 'service-hair-treatment', price: '100' },
  { name: 'Pedicure', description: 'Complete care for your feet, including nail shaping, cuticle care, and polish.', duration: 45, imageId: 'service-pedicure', price: '80 - 150' },
  { name: 'Manicure', description: 'Professional nail shaping, cuticle care, and a beautiful polish application.', duration: 30, imageId: 'service-manicure', price: '50 - 100' },
  { name: 'Acrylic', description: 'Durable and stylish acrylic nail extensions, customized to your preference.', duration: 90, imageId: 'service-acrylic', price: '100+' },
  { name: 'Facial treatment', description: 'A relaxing facial tailored to your skin type to cleanse, exfoliate, and nourish.', duration: 60, imageId: 'service-facial-treatment', price: '200 - 350' },
  { name: 'Wig making', description: 'Custom wig creation using high-quality hair for a natural and flawless look.', duration: 180, imageId: 'service-wig-making', price: '50 - 150' },
  { name: 'Wig installation', description: 'Secure and seamless installation of your wig for long-lasting wear.', duration: 75, imageId: 'service-wig-installation', price: '100 - 200' },
  { name: 'Press on nail', description: 'Quick and beautiful press-on nails for a temporary yet stunning look.', duration: 20, imageId: 'service-press-on-nail', price: '65' },
  { name: 'Tidy and polish', description: 'A quick tidy-up and fresh polish for your nails.', duration: 20, imageId: 'service-tidy-polish', price: '20' },
  { name: 'Touch up', description: 'Quick touch-up for your hairstyle or color to keep you looking fresh.', duration: 45, imageId: 'service-touch-up', price: '30' },
  { name: 'Washing of hair', description: 'A relaxing hair wash and conditioning service.', duration: 25, imageId: 'service-washing-hair', price: '20' },
  { name: 'Pony tail', description: 'A sleek and stylish ponytail for any occasion.', duration: 30, imageId: 'service-pony-tail', price: '50 - 100' },
  { name: 'Finger waves', description: 'Classic and elegant finger waves for a vintage-inspired look.', duration: 60, imageId: 'service-finger-waves', price: '90' },
  { name: 'Straightening of hair', description: 'Professional hair straightening for a smooth and sleek finish.', duration: 60, imageId: 'service-straightening', price: '50' },
  { name: 'Waxing', description: 'Gentle and effective waxing services for smooth skin.', duration: 30, imageId: 'service-waxing', price: '50 - 300' },
  { name: 'Full body piercing', description: 'Professional and hygienic body piercing services.', duration: 20, imageId: 'service-piercing', price: '30+' },
  { name: 'Eye lush extension', description: 'Beautiful and natural-looking eyelash extensions.', duration: 120, imageId: 'service-eyelash', price: '110' },
  { name: 'Hair coloring', description: 'Expert hair coloring, from subtle highlights to bold new shades.', duration: 120, imageId: 'service-hair-coloring', price: '30+' },
  { name: 'Make Up', description: 'Welcomes you with a new look.', duration: 120, imageId: 'service-make-up', price: '30+' },
  { name: 'Braids', description: 'Braids that change your appearance.', duration: 120, imageId: 'service-braids', price: '30+' }
];

export const stylists: Stylist[] = [
  {
    id: 'gifty',
    name: 'Gifty',
    expertise: 'Specializes in creative hair coloring and complex wig installations. A true artist with color.',
    imageId: 'stylist-gifty',
    services: ['Hair coloring', 'Wig making', 'Wig installation', 'Hair treatment'],
  },
  {
    id: 'fuseina',
    name: 'Fuseina',
    expertise: 'An expert in intricate nail art and relaxing facial treatments. Her attention to detail is unmatched.',
    imageId: 'stylist-fuseina',
    services: ['Manicure', 'Pedicure', 'Acrylic', 'Facial treatment', 'Press on nail','Make Up'],
  },
  {
    id: 'pearl',
    name: 'Pearl',
    expertise: 'Known for classic hairstyling, including elegant finger waves and perfect straightening.',
    imageId: 'stylist-pearl',
    services: ['Finger waves', 'Straightening of hair', 'Pony tail', 'Washing of hair', 'Touch up','Braids'],
  },
  {
    id: 'oprah',
    name: 'Oprah',
    expertise: 'Our go-to for precision services like eyelash extensions, waxing, and body piercing.',
    imageId: 'stylist-oprah',
    services: ['Eye lush extension', 'Waxing', 'Full body piercing', 'Tidy and polish'],
  },
];

export const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];
