import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const InstagramIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// Fallback events in case API fails
const fallbackEvents = [
  {
    id: 1,
    title: "Youth Summit 2026",
    date: "August 15",
    desc: "Annual gathering of the youth featuring inspiring talks and worship.",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2574&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 2,
    title: "Charity Drive",
    date: "September 02",
    desc: "Helping those in need within our local community.",
    img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2574&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 3,
    title: "Midnight Mass",
    date: "December 24",
    desc: "A beautiful, cinematic celebration of Christmas Eve.",
    img: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2574&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 4,
    title: "Retreat Camp",
    date: "January 10",
    desc: "A weekend of spiritual renewal and reflection.",
    img: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=2574&auto=format&fit=crop",
    link: "#"
  }
];

const Events = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        // Fetch from our new AI-powered serverless backend
        const response = await fetch('/api/feed');
        if (!response.ok) throw new Error("Failed to fetch from backend API");

        const data = await response.json();
        
        if (data && data.posts && data.posts.length > 0) {
          const formattedPosts = data.posts.map((post, index) => {
            // Format date
            const dateObj = new Date(post.timestamp);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
            
            // Use the beautifully generated AI Title and Description!
            const title = post.aiTitle || "Latest Update";
            const desc = post.aiDesc || "Check out our recent post on Instagram.";

            // Instagram videos don't always provide a mediaUrl that's an image, so thumbnailUrl is safer
            const image = post.sizes?.large?.mediaUrl || post.thumbnailUrl || post.mediaUrl;

            return {
              id: post.id || index,
              title: title,
              date: formattedDate,
              desc: desc,
              img: image,
              link: post.permalink || "https://www.instagram.com/kcym_kottiyoor/"
            };
          });
          
          setEvents(formattedPosts);
        } else {
          setEvents(fallbackEvents);
        }
      } catch (error) {
        console.error("Error fetching Instagram feed:", error);
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  useEffect(() => {
    // We must wait for data to load before initializing GSAP ScrollTrigger
    if (loading || events.length === 0) return;

    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.event-card');
      
      if (sections.length > 1) {
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            // Ensure scroll length is proportional to the container width
            end: () => "+=" + (scrollRef.current ? scrollRef.current.scrollWidth - window.innerWidth : window.innerWidth)
          }
        });
      }
    }, containerRef); // Scope to containerRef

    return () => ctx.revert();
  }, [loading, events]);

  return (
    <section id="events" ref={containerRef} className="h-screen w-full overflow-hidden bg-background flex flex-col justify-center">
      <div className="px-6 lg:px-12 mb-8 md:mb-12">
        <h3 className="text-5xl md:text-7xl font-serif">Events</h3>
      </div>
      
      {loading ? (
        <div className="flex gap-8 px-6 lg:px-12 items-center h-[55vh] md:h-[60vh] w-full">
          {/* Skeleton Loaders */}
          {[1, 2].map((i) => (
             <div key={i} className="w-[80vw] md:w-[40vw] h-full flex-shrink-0 relative rounded-[2.5rem] border border-white/10 bg-white/5 animate-pulse flex flex-col justify-end p-8">
               <div className="w-24 h-4 bg-white/20 rounded mb-4"></div>
               <div className="w-48 h-8 bg-white/20 rounded mb-4"></div>
               <div className="w-full h-16 bg-white/20 rounded mb-8"></div>
               <div className="w-32 h-6 bg-white/20 rounded"></div>
             </div>
          ))}
        </div>
      ) : (
        <div ref={scrollRef} className="flex gap-8 px-6 lg:px-12 items-center h-[55vh] md:h-[60vh] w-max">
          {events.map((event) => (
            <div key={event.id} className="event-card w-[80vw] md:w-[40vw] h-full flex-shrink-0 relative group perspective-[1000px]">
              <div className="w-full h-full relative overflow-hidden rounded-[2.5rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] transform-style-3d">
                <img src={event.img} alt={event.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                <div className="absolute inset-0 border border-white/10 rounded-[2.5rem] pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
                  <span className="text-gold tracking-widest text-sm mb-2">{event.date}</span>
                  <h4 className="text-3xl font-serif mb-4 line-clamp-2">{event.title}</h4>
                  <p className="text-white/70 max-w-sm mb-8 line-clamp-3">{event.desc}</p>
                  <a href={event.link} target="_blank" rel="noopener noreferrer" className="interactive w-fit flex items-center gap-2 uppercase tracking-widest text-sm border-b border-white/30 pb-1 hover:border-gold hover:text-gold transition-colors">
                    View on Instagram <InstagramIcon size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
          
          {/* View All Card */}
          <div className="event-card w-[80vw] md:w-[40vw] h-full flex-shrink-0 relative group perspective-[1000px]">
            <a href="https://www.instagram.com/kcym_kottiyoor/" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 flex flex-col items-center justify-center transition-all duration-700 ease-out group-hover:scale-[1.02] transform-style-3d group-hover:border-gold/30 text-white/50 hover:text-gold cursor-pointer">
               <InstagramIcon size={48} className="mb-6 transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2" />
               <h4 className="text-2xl md:text-3xl font-serif tracking-wide mb-2">View All Posts</h4>
               <span className="text-xs tracking-widest uppercase mt-4 flex items-center gap-2">On Instagram <ArrowRight size={14} /></span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;
