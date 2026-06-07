import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    // Parallax reveal for footer
    gsap.fromTo(footerRef.current, 
      { yPercent: -50 },
      { 
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current.parentElement,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      }
    );
  }, []);

  return (
    <footer className="relative h-[60vh] bg-[#050505] text-white overflow-hidden z-0">
      <div ref={footerRef} className="absolute inset-0 flex flex-col justify-between pt-24 pb-12 px-6 lg:px-12 w-full h-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h4 className="font-serif text-3xl mb-4">KCYM Kottiyoor</h4>
            <p className="text-white/50 max-w-sm">
              St. Sebastian's Church, Kottiyoor, Kerala. Spreading faith, love, and hope.
            </p>
          </div>
          
          <div className="flex gap-12 text-sm uppercase tracking-widest">
            <div className="flex flex-col gap-4">
              <a href="#" className="hover:text-gold transition-colors interactive">Instagram</a>
              <a href="#" className="hover:text-gold transition-colors interactive">Facebook</a>
              <a href="#" className="hover:text-gold transition-colors interactive">YouTube</a>
            </div>
            <div className="flex flex-col gap-4">
              <a href="#home" className="hover:text-gold transition-colors interactive">Home</a>
              <a href="#about" className="hover:text-gold transition-colors interactive">About</a>
              <a href="#events" className="hover:text-gold transition-colors interactive">Events</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 mt-16 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} KCYM Kottiyoor. All rights reserved.</p>
          <p>Designed with cinematic luxury.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
