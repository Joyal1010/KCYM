import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const headerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const logoTextRef = useRef(null);

  useEffect(() => {
    // FIX 1: Header shrink and blur on scroll
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 80) {
          headerRef.current.classList.add('scrolled');
        } else {
          headerRef.current.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    // FIX 2: Active nav link highlight
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(link => link.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));

    // Logo text reveal effect (GSAP)
    gsap.set(logoTextRef.current, { opacity: 0, x: -10 });
    ScrollTrigger.create({
      start: "80px top",
      onEnter: () => {
        gsap.to(logoTextRef.current, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" });
      },
      onLeaveBack: () => {
        gsap.to(logoTextRef.current, { opacity: 0, x: -10, duration: 0.4, ease: "power2.in" });
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const links = ['Home', 'About', 'Leadership', 'Events', 'Gallery', 'Contact'];

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
        
        <nav className="hidden md:flex gap-8 nav-links">
          {links.map((link, index) => (
            <a key={index} href={`#${link.toLowerCase()}`} className="text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300 interactive">
              {link}
            </a>
          ))}
        </nav>

        <button className="md:hidden interactive hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-white/10 py-8 flex flex-col items-center gap-6 md:hidden nav-links">
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
