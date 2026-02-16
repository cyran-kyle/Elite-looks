import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import Stylists from '@/components/sections/stylists';
import AiSuggester from '@/components/sections/ai-suggester';
import Booking from '@/components/sections/booking';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background font-body">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Stylists />
        <AiSuggester />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
