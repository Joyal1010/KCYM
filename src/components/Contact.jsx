const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 lg:px-12 bg-background relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-sm uppercase tracking-[0.3em] text-gold mb-8">Get involved</h2>
        <h3 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-16 tracking-tighter">Join the Movement</h3>
        
        <form className="flex flex-col gap-8 max-w-2xl mx-auto text-left">
          <div className="relative">
            <input type="text" id="name" className="peer w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-gold transition-colors text-lg placeholder-transparent interactive" placeholder="Name" />
            <label htmlFor="name" className="absolute left-0 top-4 text-white/50 text-lg transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-gold peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg cursor-text pointer-events-none">Your Name</label>
          </div>
          <div className="relative">
            <input type="email" id="email" className="peer w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-gold transition-colors text-lg placeholder-transparent interactive" placeholder="Email" />
            <label htmlFor="email" className="absolute left-0 top-4 text-white/50 text-lg transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-gold peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg cursor-text pointer-events-none">Your Email</label>
          </div>
          <div className="relative">
            <textarea id="message" rows="4" className="peer w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-gold transition-colors text-lg resize-none placeholder-transparent interactive" placeholder="Message"></textarea>
            <label htmlFor="message" className="absolute left-0 top-4 text-white/50 text-lg transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-gold peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg cursor-text pointer-events-none">Your Message</label>
          </div>
          
          <button type="submit" className="mt-8 self-center px-12 py-4 border border-gold text-gold hover:bg-gold hover:text-background transition-colors duration-300 tracking-widest uppercase text-sm interactive">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
