import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const leaders = [
  { role: "Guardian", image: "/Guardian.jpeg", name: "Fr. Biju Thuruthel" },
  { role: "Director", image: "/Director.jpeg", name: "Fr. Shinto Kulangara" },
  { role: "Animator", image: "/Animator.jpeg", name: "Sr. Dona SH" },
  { role: "President", image: "/President.jpeg", name: "Amal Sebastian" },
  { role: "Vice President", image: "/Vice President.jpeg", name: "Diya Mariya" },
  { role: "Secretary", image: "/Secratory.jpeg", name: "Liya Philip" },
  { role: "Joint Secretary", image: "/Joint Secretry.jpeg", name: "Varghese" },
  { role: "Treasurer", image: "/Tressurer.jpeg", name: "Alex Saji" },
  { role: "Coordinator", image: "/Cordinator.jpeg", name: "Annmariya Joshy" },
  { role: "Unit Syndicate", image: "/Unit Syndicate.jpeg", name: "Andriya Mary Jim" },
  { role: "Unit Syndicate", image: "/Unit Syndicate_1.jpeg", name: "Abik D Bojo" },
];

const Leadership = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.leader-card');
    
    gsap.fromTo(cards, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id="leadership" className="py-24 md:py-32 px-6 lg:px-12 w-full max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-20 text-center">
        <h2 className="text-sm uppercase tracking-[0.3em] text-gold mb-4">Our Syndicate</h2>
        <h3 className="text-4xl md:text-6xl font-serif">Leadership Team</h3>
      </div>
      
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
        {leaders.map((leader, index) => (
          <div key={index} className="leader-card group relative flex flex-col items-center">
            <div className="w-full aspect-[3/4] overflow-hidden rounded-[2rem] shadow-2xl relative perspective-[1000px] border border-white/10 mb-6 transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-gold/20">
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10 pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <img 
                src={leader.image} 
                alt={leader.role} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h4 className="text-2xl font-serif mb-1 group-hover:text-gold transition-colors duration-300">{leader.role}</h4>
            <p className="text-sm uppercase tracking-widest text-white/50">{leader.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leadership;
