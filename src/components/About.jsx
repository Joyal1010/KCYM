import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Text scrub animation
    const words = textRef.current.innerText.split(' ');
    textRef.current.innerText = '';
    words.forEach(word => {
      const span = document.createElement('span');
      span.innerText = word + ' ';
      span.className = 'opacity-20 transition-opacity duration-300';
      textRef.current.appendChild(span);
    });

    gsap.to(textRef.current.children, {
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 40%",
        scrub: true
      }
    });

    // Image scale animation
    gsap.fromTo(imageRef.current, 
      { scale: 1.2 },
      { 
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 px-6 lg:px-12 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
      <div className="w-full md:w-1/2">
        <h2 className="text-sm uppercase tracking-[0.3em] text-gold mb-8">About Us</h2>
        <p ref={textRef} className="text-3xl md:text-5xl font-serif leading-tight">
          We are a vibrant community of young believers, dedicated to spreading love, faith, and hope through our cinematic luxury vision of spirituality. Join us on this journey of self-discovery and devotion at St. Sebastian's Church.
        </p>
      </div>
      <div className="w-full md:w-1/2 h-[60vh] overflow-hidden rounded-sm relative">
        <div className="absolute inset-0 bg-gold/10 mix-blend-overlay z-10 pointer-events-none" />
        <img 
          ref={imageRef}
          src="https://images.unsplash.com/photo-1548625361-ec84920b5fa7?q=80&w=2574&auto=format&fit=crop" 
          alt="Church architecture"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default About;
