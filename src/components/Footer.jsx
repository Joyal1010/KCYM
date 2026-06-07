import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Instagram = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Facebook = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Youtube = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

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
    <footer className="relative bg-[#050505] text-white overflow-hidden z-0 border-t border-white/5">
      <div ref={footerRef} className="max-w-7xl mx-auto pt-32 pb-12 px-6 lg:px-12 flex flex-col min-h-[70vh] justify-between">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-6 flex flex-col">
            <h2 className="font-serif text-5xl md:text-7xl mb-6 tracking-tight text-white/90">
              KCYM <span className="text-gold italic font-light">Kottiyoor</span>
            </h2>
            <p className="text-white/40 text-lg max-w-md leading-relaxed font-light mb-8">
              St. Sebastian's Church, Kottiyoor, Kerala.<br/>
              Spreading faith, love, and hope through youth empowerment.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-6 items-center">
              <a href="https://www.instagram.com/kcym_kottiyoor/" target="_blank" rel="noopener noreferrer" className="group interactive w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:bg-gold/5 transition-all duration-300">
                <Instagram className="w-5 h-5 text-white/70 group-hover:text-gold transition-colors duration-300" />
              </a>
              <a href="https://www.facebook.com/sebastianschurch.kottiyoor" target="_blank" rel="noopener noreferrer" className="group interactive w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:bg-gold/5 transition-all duration-300">
                <Facebook className="w-5 h-5 text-white/70 group-hover:text-gold transition-colors duration-300" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="group interactive w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:bg-gold/5 transition-all duration-300">
                <Youtube className="w-5 h-5 text-white/70 group-hover:text-gold transition-colors duration-300" />
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="col-span-1 md:col-span-6 flex flex-col md:flex-row justify-end gap-16 md:gap-32">
            <div className="flex flex-col gap-6">
              <h4 className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Socials</h4>
              <a href="https://www.instagram.com/kcym_kottiyoor/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors text-lg font-light interactive flex items-center gap-2 group">
                <span className="w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-4"></span>
                Instagram
              </a>
              <a href="https://www.facebook.com/sebastianschurch.kottiyoor" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors text-lg font-light interactive flex items-center gap-2 group">
                <span className="w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-4"></span>
                Facebook
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors text-lg font-light interactive flex items-center gap-2 group">
                <span className="w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-4"></span>
                YouTube
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Explore</h4>
              <a href="#home" className="text-white/60 hover:text-white transition-colors text-lg font-light interactive flex items-center gap-2 group">
                <span className="w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-4"></span>
                Home
              </a>
              <a href="#about" className="text-white/60 hover:text-white transition-colors text-lg font-light interactive flex items-center gap-2 group">
                <span className="w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-4"></span>
                About
              </a>
              <a href="#events" className="text-white/60 hover:text-white transition-colors text-lg font-light interactive flex items-center gap-2 group">
                <span className="w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-4"></span>
                Events
              </a>
            </div>
          </div>
          
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex space-x-6 text-sm text-white/40">
            <span>&copy; {new Date().getFullYear()} KCYM Kottiyoor. All rights reserved.</span>
          </div>
          <p className="text-sm text-white/40 font-light flex items-center gap-1">
            Designed by <a href="https://joyaltomthomas.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-gold transition-colors font-medium">joyaltomthomas</a>
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
