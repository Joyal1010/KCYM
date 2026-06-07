import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, ArrowRight } from 'lucide-react';

const allImages = [
  "/Gallery/first.jpeg",
  "/Gallery/IMG_20260119_132738032.jpg",
  "/Gallery/Picsart_26-02-22_18-55-07-711.jpg.jpeg",
  "/Gallery/Picsart_26-02-22_21-07-52-319 (1).jpg.jpeg",
  "/Gallery/Picsart_26-03-29_08-07-02-135.jpg.jpeg",
  "/Gallery/Picsart_26-04-03_13-57-25-783 (2).jpg.jpeg",
  "/Gallery/Picsart_26-04-05_20-26-33-547.jpg.jpeg",
  "/Gallery/Picsart_26-04-12_12-31-51-244 (1).jpg.jpeg",
  "/Gallery/Picsart_26-05-04_22-19-01-660.jpg.jpeg",
  "/Gallery/Picsart_26-05-04_22-50-36-230.jpg.jpeg",
  "/Gallery/Picsart_26-05-05_11-45-15-134.jpg.jpeg",
  "/Gallery/Picsart_26-05-05_11-51-22-865.jpg.jpeg",
  "/Gallery/TMA04377.jpg.jpeg",
  "/Gallery/WhatsApp Image 2026-06-07 at 1.58.37 PM.jpeg",
  "/Gallery/IMG_2300.jpg.jpeg",
  "/Gallery/motion_photo_2863101779269848264.jpg.jpeg"
];

const Gallery = () => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Main gallery entrance animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.main-gallery-item');
      
      items.forEach((item) => {
        gsap.fromTo(item, 
          { y: 100, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Overlay enter animations and body scroll lock
  useEffect(() => {
    if (!overlayRef.current) return;
    
    if (isOverlayOpen) {
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Slide up the entire overlay
      gsap.fromTo(overlayRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.8, ease: "power4.out" }
      );
      
      // Stagger animate the photos inside the overlay
      gsap.fromTo('.overlay-gallery-item',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power3.out", delay: 0.3 }
      );
    } else {
      // Re-enable body scroll when closed
      document.body.style.overflow = '';
    }
    
    return () => { document.body.style.overflow = ''; };
  }, [isOverlayOpen]);

  // If overlay is closing, we animate it down BEFORE unmounting
  const handleClose = () => {
    gsap.to(overlayRef.current, {
      yPercent: 100,
      duration: 0.6,
      ease: "power3.in",
      onComplete: () => setIsOverlayOpen(false)
    });
  };

  return (
    <>
      <section id="gallery" ref={containerRef} className="py-24 md:py-32 px-6 lg:px-12 w-full max-w-7xl mx-auto bg-background relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-sm uppercase tracking-[0.3em] text-gold mb-4">Moments</h2>
          <h3 className="text-4xl md:text-6xl font-serif">Our Gallery</h3>
        </div>
        
        {/* Main Grid: First 6 Images */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 group/gallery">
          {allImages.slice(0, 6).map((src, idx) => (
            <div key={`main-${idx}`} className="main-gallery-item break-inside-avoid relative overflow-hidden rounded-[2.5rem] group interactive group-hover/gallery:opacity-40 hover:!opacity-100 transition-all duration-500 shadow-2xl border border-white/5">
              <img 
                src={src} 
                alt={`Gallery image ${idx + 1}`} 
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <button 
            onClick={() => setIsOverlayOpen(true)}
            className="interactive group relative px-8 py-4 border border-gold/30 rounded-full text-gold hover:bg-gold/10 transition-all duration-500 overflow-hidden flex items-center gap-3"
          >
            <span className="relative z-10 tracking-widest uppercase text-sm">View All Photos</span>
            <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Full-Screen Overlay Modal */}
      {isOverlayOpen && (
        <div 
          ref={overlayRef} 
          data-lenis-prevent="true"
          className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl overflow-y-auto overscroll-contain"
        >
          {/* Header Bar */}
          <div className="sticky top-0 w-full px-6 lg:px-12 py-6 flex justify-between items-center bg-gradient-to-b from-background via-background/90 to-transparent z-50">
            <h3 className="text-2xl font-serif text-white/90">Complete Gallery</h3>
            <button 
              onClick={handleClose}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors group interactive"
            >
              <X className="text-white/70 group-hover:text-gold transition-colors" size={24} />
            </button>
          </div>

          {/* Full Grid */}
          <div className="px-6 lg:px-12 pb-24 pt-8 w-full max-w-[100rem] mx-auto">
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
              {allImages.map((src, idx) => (
                <div key={`overlay-${idx}`} className="overlay-gallery-item break-inside-avoid relative overflow-hidden rounded-[1.5rem] border border-white/10 group">
                  <img 
                    src={src} 
                    alt={`Full Gallery image ${idx + 1}`} 
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle glare effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
