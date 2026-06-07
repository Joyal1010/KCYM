import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Youth Summit 2026",
    date: "August 15",
    desc: "Annual gathering of the youth featuring inspiring talks and worship.",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Charity Drive",
    date: "September 02",
    desc: "Helping those in need within our local community.",
    img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Midnight Mass",
    date: "December 24",
    desc: "A beautiful, cinematic celebration of Christmas Eve.",
    img: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Retreat Camp",
    date: "January 10",
    desc: "A weekend of spiritual renewal and reflection.",
    img: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=2574&auto=format&fit=crop"
  }
];

const Events = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray('.event-card');
    
    // We only pin if there's enough room to scroll horizontally
    let tl = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + scrollRef.current.offsetWidth
      }
    });

    return () => {
      if(tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    }
  }, []);

  return (
    <section id="events" ref={containerRef} className="h-screen w-full overflow-hidden bg-background relative flex items-center">
      <div className="absolute top-12 left-6 lg:left-12 lg:top-24 z-10">
        <h2 className="text-sm uppercase tracking-[0.3em] text-gold mb-2">Upcoming</h2>
        <h3 className="text-5xl font-serif">Events</h3>
      </div>
      
      <div ref={scrollRef} className="flex gap-8 px-6 lg:px-12 mt-20 md:mt-0 items-center h-[60vh] w-[400vw] md:w-[200vw]">
        {events.map((event) => (
          <div key={event.id} className="event-card w-[80vw] md:w-[40vw] h-full flex-shrink-0 relative group perspective-[1000px]">
            <div className="w-full h-full relative overflow-hidden rounded-lg transition-transform duration-700 ease-out group-hover:scale-[1.02] transform-style-3d">
              <img src={event.img} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              <div className="absolute inset-0 border border-white/10 rounded-lg pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
                <span className="text-gold tracking-widest text-sm mb-2">{event.date}</span>
                <h4 className="text-3xl font-serif mb-4">{event.title}</h4>
                <p className="text-white/70 max-w-sm mb-8">{event.desc}</p>
                <button className="interactive w-fit flex items-center gap-2 uppercase tracking-widest text-sm border-b border-white/30 pb-1 hover:border-gold hover:text-gold transition-colors">
                  Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
