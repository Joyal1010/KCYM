import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import BlurText from './BlurText';

const images = [
  "/IMG_20260119_132738032.jpg",
  "/Picsart_26-02-22_18-55-07-711.jpg.jpeg",
  "/Picsart_26-04-05_20-26-33-547.jpg.jpeg",
  "/TMA04377.jpg.jpeg",
  "/Picsart_26-05-04_22-50-36-230.jpg.jpeg"
];

const Hero = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textContainerRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    // Parallax effect on scroll
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(textContainerRef.current, {
      yPercent: 50,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Slideshow interval
    const timer = setInterval(nextImage, 5000);

    return () => clearInterval(timer);
  }, [currentImage]);

  return (
    <section ref={containerRef} id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image Slideshow */}
      <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
        <AnimatePresence>
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url("${images[currentImage]}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </AnimatePresence>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-background/60 mix-blend-multiply z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full pointer-events-none">
        <div 
          ref={textContainerRef} 
          className={`absolute flex flex-col items-center w-full transition-all duration-[1500ms] ease-in-out ${
            currentImage === 0 
              ? 'top-1/2 -translate-y-1/2' 
              : 'top-[22%] md:top-[25%] translate-y-0'
          }`}
        >
          <p className={`uppercase tracking-[0.4em] font-medium text-white/90 text-center drop-shadow-md transition-all duration-[1500ms] overflow-hidden ${currentImage === 0 ? 'mb-4 text-xs md:text-sm opacity-100 h-auto' : 'mb-0 text-[0px] opacity-0 h-0'}`}>
            St. Sebastian's Church, Kottiyoor
          </p>
          
          <BlurText
            text="KCYM"
            delay={100}
            animateBy="letters"
            direction="top"
            className={`leading-none font-serif text-center flex overflow-hidden justify-center drop-shadow-2xl transition-all duration-[1500ms] ease-in-out ${
              currentImage === 0 
                ? 'text-[6rem] md:text-[12rem] lg:text-[20rem] tracking-[0.1em] md:tracking-[0.15em]' 
                : 'text-[3rem] md:text-[5rem] lg:text-[7rem] tracking-[0.2em] md:tracking-[0.3em]'
            }`}
          />
          
          <div className="relative h-12 md:h-16 w-full flex items-center justify-center mt-2">
            <p className={`absolute uppercase tracking-[0.3em] font-light text-white/80 text-center drop-shadow-md transition-all duration-[1500ms] ${currentImage === 0 ? 'opacity-100 text-xs md:text-base scale-100' : 'opacity-0 text-[0px] scale-50'}`}>
              Kerala Catholic Youth Movement
            </p>
            <p className={`absolute uppercase tracking-[0.5em] md:tracking-[0.8em] font-medium text-white/90 text-center drop-shadow-md transition-all duration-[1500ms] ${currentImage !== 0 ? 'opacity-100 text-sm md:text-xl lg:text-3xl scale-100' : 'opacity-0 text-[0px] scale-150'}`}>
              KOTTIYOOR
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prevImage}
        className="absolute left-4 md:left-10 z-30 p-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white transition-all interactive border border-white/10"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextImage}
        className="absolute right-4 md:right-10 z-30 p-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white transition-all interactive border border-white/10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse opacity-50 interactive z-20">
        <span className="text-xs uppercase tracking-widest">Scroll to discover</span>
        <ArrowDown size={16} />
      </div>
    </section>
  );
};

export default Hero;
