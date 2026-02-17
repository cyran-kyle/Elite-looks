import { Phone } from 'lucide-react';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42s2.42 3.63 2.42 5.82c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.13c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.1-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.55-.42-.15 0-.31-.02-.48-.02s-.42.06-.64.31c-.22.25-.86.84-.86 2.04s.88 2.37 1 2.54c.12.17 1.73 2.63 4.2 3.7.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.06 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.12-.25-.19-.5-.31z" />
    </svg>
);


const Footer = () => {
    const phoneNumber = '0243333371';
    const whatsappNumber = '233243333371';
    const paymentNumberDisplay = '0243333371 - MTN MOMO';
  
    return (
      <footer className="border-t bg-secondary/50">
        <div className="container py-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <WhatsAppIcon className="h-5 w-5 fill-current" />
                    <span>Send us a message</span>
                </a>
                <a href={`tel:${phoneNumber}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="h-5 w-5" />
                    <span>{phoneNumber}</span>
                </a>
            </div>
            <div className="mt-6 text-center text-sm text-muted-foreground">
                <p><strong>Payment Number:</strong> {paymentNumberDisplay} </p>
                <p className="mt-4">&copy; {new Date().getFullYear()} Jomez Glow Spa. All rights reserved.</p>
            </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
