import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const images = [
  "https://images.unsplash.com/photo-1548625361-ec84920b5fa7?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1000&auto=format&fit=crop"
];

const Gallery = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = gsap.utils.toArray('.gallery-item');
    
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
  }, []);

  return (
    <section id="gallery" ref={containerRef} className="py-24 md:py-32 px-6 lg:px-12 w-full max-w-7xl mx-auto bg-background relative z-10">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-sm uppercase tracking-[0.3em] text-gold mb-4">Moments</h2>
        <h3 className="text-4xl md:text-6xl font-serif">Our Gallery</h3>
      </div>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 group/gallery">
        {images.map((src, idx) => (
          <div key={idx} className="gallery-item break-inside-avoid relative overflow-hidden rounded-md group interactive group-hover/gallery:opacity-40 hover:!opacity-100 transition-all duration-500">
            <img 
              src={src} 
              alt={`Gallery image ${idx + 1}`} 
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
