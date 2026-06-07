import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const headerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const logoTextRef = useRef(null);

  useEffect(() => {
    // Set initial state for logo text
    gsap.set(logoTextRef.current, { opacity: 0, x: -10 });

    // Glassmorphism effect and logo text reveal after scrolling past hero
    ScrollTrigger.create({
      start: "100vh top",
      onEnter: () => {
        headerRef.current.classList.add('backdrop-blur-md', 'bg-background/30');
        gsap.to(logoTextRef.current, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" });
      },
      onLeaveBack: () => {
        headerRef.current.classList.remove('backdrop-blur-md', 'bg-background/30');
        gsap.to(logoTextRef.current, { opacity: 0, x: -10, duration: 0.4, ease: "power2.in" });
      }
    });
  }, []);

  const links = ['Home', 'About', 'Events', 'Gallery', 'Contact'];

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-2 lg:px-12 lg:py-3">
      <div className="flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 interactive">
          <img src="/logo.png" alt="KCYM Logo" className="w-16 h-16 object-contain animate-fire" />
          <div ref={logoTextRef} className="flex flex-col opacity-0">
            <div className="font-serif text-xl md:text-2xl tracking-[0.15em] font-bold">KCYM</div>
            <div className="flex justify-between w-full text-[0.45rem] md:text-[0.55rem] uppercase text-white/70 pr-[0.15em]">
              {'KOTTIYOOR'.split('').map((char, i) => (
                <span key={i}>{char}</span>
              ))}
            </div>
          </div>
        </a>
        
        <nav className="hidden md:flex gap-8">
          {links.map((link, index) => (
            <a key={index} href={`#${link.toLowerCase()}`} className="text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300 interactive">
              {link}
            </a>
          ))}
        </nav>

        <button className="md:hidden interactive" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-white/10 py-8 flex flex-col items-center gap-6 md:hidden">
          {links.map((link, index) => (
            <a 
              key={index} 
              href={`#${link.toLowerCase()}`} 
              className="text-lg uppercase tracking-widest hover:text-gold transition-colors duration-300 interactive"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
