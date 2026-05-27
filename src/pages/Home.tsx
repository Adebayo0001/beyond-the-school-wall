import { motion } from 'motion/react';
import { ArrowRight, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            Beyond the School Wall
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
            Equipping You With What{' '}
            <span className="text-brand-orange italic">School</span> Won't Teach.
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-xl mb-10 leading-relaxed">
            Raising men for resourcefulness. A digital ecosystem built on{' '}
            <span className="text-white font-semibold">Creativity</span>,{' '}
            <span className="text-white font-semibold">Intelligence</span>, and{' '}
            <span className="text-white font-semibold">Innovation</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a 
              href="#join"
              className="group relative px-8 py-4 bg-brand-orange text-white font-bold rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,107,0,0.3)] active:scale-95 text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Join the Community <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <button className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-brand-dark bg-neutral-800 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={`https://picsum.photos/seed/user${i}/100/100`}
                    alt="User"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-brand-dark bg-brand-orange flex items-center justify-center text-[10px] font-bold">
                +5k
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Users size={14} className="text-brand-orange" />
                <span className="text-sm font-bold">Join 5,000+</span>
              </div>
              <span className="text-xs text-neutral-500 uppercase tracking-wider">Resourceful Minds</span>
            </div>
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="https://picsum.photos/seed/climbing/800/800"
              alt="Climbing to success"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
            
            {/* Floating Card UI */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">Active Session</span>
                <span className="text-[10px] text-neutral-400">Live Now</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Creative Intelligence 101</h3>
              <p className="text-sm text-neutral-300">Mastering the art of resourcefulness in a digital age.</p>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-orange/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

const Mission = () => {
  return (
    <section id="intelligence" className="py-24 bg-brand-dark relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Video Facade */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer">
              {/* Placeholder Image */}
              <img
                src="https://picsum.photos/seed/btsw-mission/1280/720"
                alt="BTSW Mission Video"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/20 transition-colors duration-500" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-orange rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity animate-pulse" />
                  <div className="relative w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,107,0,0.5)] transform group-hover:scale-110 transition-transform duration-300">
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-8 h-8 ml-1"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Video Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="bg-brand-dark/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg">
                  <span className="text-xs font-bold text-white uppercase tracking-widest">The BTSW Story</span>
                </div>
                <span className="text-xs text-white/60 font-mono">03:45</span>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em] mb-4 block">
              The Philosophy
            </span>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
              Why Traditional School <br className="hidden md:block" />
              <span className="text-neutral-500 italic">Isn't Enough.</span>
            </h2>

            <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
              <p>
                The modern world moves at the speed of thought, yet our educational systems remain rooted in the industrial age. We believe that certificates are no longer enough to guarantee survival, let alone success.
              </p>
              <p>
                Beyond the School Wall (BTSW) exists to groom human resourcefulness. We bridge the critical gap between formal education and real-world execution, equipping you with the mental tools needed to navigate the complexities of the 21st century.
              </p>
              <p>
                Our mission is simple: to raise a generation of men and women who don't just look for opportunities, but create them through Creativity, Intelligence, and Innovation.
              </p>
            </div>

            <div className="mt-10">
              <a 
                href="#latest-session" 
                className="group inline-flex items-center gap-3 text-white font-bold hover:text-brand-orange transition-colors"
              >
                Watch our latest study session
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-orange group-hover:translate-x-2 transition-all">
                  <ArrowRight size={18} />
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Programs = () => {
  const programs = [
    {
      title: "The Magnet School",
      description: "Our flagship program for deep intellectual growth, leadership, and character development.",
      icon: <Users className="w-6 h-6" />,
      cta: "Join via WhatsApp",
      link: "#magnet"
    },
    {
      title: "The Skill Hut",
      description: "Master high-income digital skills that the market actually demands. Practical, project-based learning.",
      icon: <ArrowRight className="w-6 h-6 rotate-[-45deg]" />,
      cta: "Register Now",
      link: "#skill-hut"
    },
    {
      title: "Cash On Campus",
      description: "Financial intelligence and entrepreneurship tailored for the modern student ecosystem.",
      icon: <ArrowRight className="w-6 h-6" />,
      cta: "Learn More",
      link: "#cash"
    },
    {
      title: "The Mental Application Study",
      description: "A deep dive into cognitive development, strategic thinking, and the psychology of execution.",
      icon: <ArrowRight className="w-6 h-6 rotate-90" />,
      cta: "Apply Now",
      link: "#mental"
    },
    {
      title: "Crash Course",
      description: "Rapid-fire learning sessions designed to jumpstart your innovation journey and creative spark.",
      icon: <ArrowRight className="w-6 h-6 rotate-45" />,
      cta: "Get Started",
      link: "#crash"
    }
  ];

  return (
    <section id="creativity" className="py-24 bg-brand-dark relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-orange text-xs font-black uppercase tracking-[0.3em] mb-4 block"
          >
            Our Curriculum
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Choose Your Path to Resourcefulness
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 max-w-2xl mx-auto text-lg"
          >
            A digital ecosystem designed to replace traditional limitations with real-world execution. Select a program that aligns with your growth goals.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:border-brand-orange/50 hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                {program.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                {program.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8 line-clamp-2">
                {program.description}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-brand-orange transition-colors">
                {program.cta}
                <ArrowRight size={16} className="rotate-[-45deg] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>

              {/* Subtle Glow on Hover */}
              <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Teasers = () => {
  return (
    <section id="innovation" className="py-24 bg-brand-dark scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Orange-Mart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative p-10 bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 blur-[80px] -mr-32 -mt-32 group-hover:bg-brand-orange/20 transition-colors" />
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold text-white mb-4">The Orange-Mart</h3>
              <p className="text-neutral-400 mb-8 max-w-xs">
                Equip yourself with our premium resources, toolkits, and exclusive BTSW merch.
              </p>
              <button className="px-6 py-3 border border-brand-orange text-brand-orange font-bold rounded-xl hover:bg-brand-orange hover:text-white transition-all flex items-center gap-2">
                Visit Store <ArrowRight size={18} className="rotate-[-45deg]" />
              </button>
            </div>
          </motion.div>

          {/* Simulation Games */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative p-10 bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden"
          >
            {/* Tech Grid Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #FF6B00 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold text-white mb-4">Simulation Games</h3>
              <p className="text-neutral-400 mb-8 max-w-xs">
                Test your resourcefulness in real-time scenarios. Strategy, execution, and high-stakes decision making.
              </p>
              <button className="px-6 py-3 bg-brand-orange text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] transition-all flex items-center gap-2">
                Join the Arena <ArrowRight size={18} className="rotate-[-45deg]" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Partnership = () => {
  return (
    <section className="py-24 bg-neutral-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Bring BTSW to Your Institution.
          </h2>
          <p className="text-neutral-400 text-lg mb-10 leading-relaxed">
            We partner with forward-thinking school administrators to integrate digital skilling, 
            creative intelligence, and human capital development directly into your curriculum.
          </p>
          <a 
            href="/partnership-brochure.pdf" 
            className="inline-flex items-center gap-3 text-brand-orange font-bold hover:underline underline-offset-8 decoration-2"
          >
            <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </div>
            Download Partnership Brochure (PDF)
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "BTSW gave me the exact digital ecosystem blueprint my brand needed to scale beyond local boundaries.",
      name: "Tunde A.",
      role: "Creative Director"
    },
    {
      quote: "The Mental Application Study changed how I approach problem-solving. It's not just school; it's a mindset shift.",
      name: "Chioma O.",
      role: "Tech Founder"
    },
    {
      quote: "Finally, an organization that understands the gap between Nigerian education and the global market.",
      name: "Ibrahim K.",
      role: "Entrepreneur"
    }
  ];

  return (
    <section className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white">The Wall We've Broken.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col"
            >
              <div className="text-brand-orange mb-6">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor">
                  <path d="M0 24V10.6667C0 4.44444 4.44444 0 10.6667 0V5.33333C7.11111 5.33333 5.33333 7.11111 5.33333 10.6667H10.6667V24H0ZM21.3333 24V10.6667C21.3333 4.44444 25.7778 0 32 0V5.33333C28.4444 5.33333 26.6667 7.11111 26.6667 10.6667H32V24H21.3333Z" />
                </svg>
              </div>
              <p className="text-neutral-400 text-lg italic mb-8 leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-neutral-800 overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/testi${i}/100/100`} 
                    alt={t.name} 
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                  <p className="text-neutral-600 text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section id="join" className="relative py-32 overflow-hidden border-t border-white/5">
      {/* Animated Background Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [-20, 20, -20],
          y: [-20, 20, -20],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" 
      />
      
      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute w-1 h-1 bg-brand-orange rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tighter">
            The World Won't Wait <br />
            For Your <span className="text-brand-orange italic">Certificate.</span>
          </h2>
          <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-3xl mx-auto font-medium">
            Join the community of 5,000+ resourceful students rewriting the rules of success in Nigeria.
          </p>
          
          <button className="group relative px-12 py-6 bg-brand-orange text-white text-xl font-black rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(255,107,0,0.5)] hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center justify-center gap-3">
              Join BTSW Today <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          
          <p className="mt-8 text-neutral-600 text-sm font-bold uppercase tracking-widest">
            Equipping You With What School Won't Teach
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <Hero />
      <Mission />
      <Programs />
      <Teasers />
      <Partnership />
      <Testimonials />
      <FinalCTA />
    </>
  );
};

export default Home;
