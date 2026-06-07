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

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 lg:px-12 bg-background relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-sm uppercase tracking-[0.3em] text-gold mb-8">Connect with us</h2>
        <h3 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-16 tracking-tighter">Socials</h3>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl mx-auto">
          <a href="https://www.instagram.com/kcym_kottiyoor/" target="_blank" rel="noopener noreferrer" className="group relative px-12 py-6 border border-white/20 hover:border-gold transition-all duration-500 overflow-hidden interactive flex items-center justify-center min-w-[200px] w-full md:w-auto gap-3">
            <div className="absolute inset-0 bg-gold/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <Instagram className="relative z-10 w-6 h-6 group-hover:text-gold transition-colors duration-500" />
            <span className="relative z-10 text-xl font-serif tracking-wide group-hover:text-gold transition-colors duration-500">Instagram</span>
          </a>
          
          <a href="https://www.facebook.com/sebastianschurch.kottiyoor" target="_blank" rel="noopener noreferrer" className="group relative px-12 py-6 border border-white/20 hover:border-gold transition-all duration-500 overflow-hidden interactive flex items-center justify-center min-w-[200px] w-full md:w-auto gap-3">
            <div className="absolute inset-0 bg-gold/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <Facebook className="relative z-10 w-6 h-6 group-hover:text-gold transition-colors duration-500" />
            <span className="relative z-10 text-xl font-serif tracking-wide group-hover:text-gold transition-colors duration-500">Facebook</span>
          </a>

          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="group relative px-12 py-6 border border-white/20 hover:border-gold transition-all duration-500 overflow-hidden interactive flex items-center justify-center min-w-[200px] w-full md:w-auto gap-3">
            <div className="absolute inset-0 bg-gold/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <Youtube className="relative z-10 w-6 h-6 group-hover:text-gold transition-colors duration-500" />
            <span className="relative z-10 text-xl font-serif tracking-wide group-hover:text-gold transition-colors duration-500">YouTube</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
