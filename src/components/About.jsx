import { useEffect, useRef } from 'react';
import gsap from 'gsap';

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
    // Image wrapper 3D Parallax animation
    const imageWrapper = imageRef.current.parentElement;
    gsap.fromTo(imageWrapper,
      { y: 80, rotateX: 15, rotateY: -15, opacity: 0 },
      {
        y: 0, rotateX: 0, rotateY: 0, opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageWrapper,
          start: "top 90%",
          end: "center center",
          scrub: 1
        }
      }
    );
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 px-6 lg:px-12 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
      <div className="w-full md:w-1/2">
        <h2 className="text-sm uppercase tracking-[0.3em] text-gold mb-8">About Us</h2>
        <p ref={textRef} className="text-2xl md:text-4xl font-serif leading-relaxed">
          KCYM is more than just a youth organization; through its activities in various sectors of society, it has consistently demonstrated its commitment, dedication, and love for the community. KCYM Kottiyoor has organized many exemplary and commendable initiatives, ensuring that the strengths and talents of each office bearer are effectively utilized for the betterment of society.
        </p>
      </div>
      <div className="w-full md:w-1/2 h-[60vh] overflow-hidden rounded-[2.5rem] shadow-2xl relative perspective-[1000px] border border-white/10">
        <div className="absolute inset-0 bg-gold/10 mix-blend-overlay z-10 pointer-events-none" />
        <img 
          ref={imageRef}
          src="/WhatsApp Image 2026-06-07 at 1.58.37 PM.jpeg" 
          alt="Church architecture"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default About;
