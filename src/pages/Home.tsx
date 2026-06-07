import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import * as THREE from 'three';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Glows and Grids */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#F16736]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-[#F16736]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #1e1e1e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="z-10"
        >
          {/* Node Connection Line Animation */}
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: 100 }} 
            transition={{ duration: 1, delay: 0.5 }} 
            className="hidden md:block absolute -left-12 top-10 h-[1px] bg-[#F16736]/30"
          >
            <div className="absolute right-0 -top-1 w-2 h-2 rounded-full border border-[#F16736] bg-white animate-ping" />
          </motion.div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff1eb] border border-[#F16736]/20 text-[#F16736] text-xs font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F16736] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F16736]"></span>
            </span>
            Beyond the School Wall
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.05] tracking-tight mb-6 text-[#1e1e1e]">
            Equipping You With What{' '}
            <span className="text-[#F16736] italic relative inline-block">
              School
              <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-3 md:h-4 text-[#F16736]/20" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 50 20 100 10" fill="transparent" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span> Won't Teach.
          </h1>

          <p className="text-lg md:text-xl text-[#6b6b6b] max-w-xl mb-10 leading-relaxed font-medium">
            Raising men for resourcefulness. A digital ecosystem built on{' '}
            <span className="text-[#1e1e1e] font-bold">Creativity</span>,{' '}
            <span className="text-[#1e1e1e] font-bold">Intelligence</span>, and{' '}
            <span className="text-[#1e1e1e] font-bold">Innovation</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a 
              href="#join"
              className="group relative px-8 py-4 bg-[#F16736] text-white font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(241,103,54,0.3)] active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Join the Community <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <button className="px-8 py-4 bg-transparent text-[#1e1e1e] font-bold rounded-full border border-[#e8e5e0] hover:bg-[#faf9f7] hover:border-[#F16736]/30 transition-all">
              Learn More
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-[3px] border-white bg-neutral-100 flex items-center justify-center overflow-hidden shadow-sm"
                >
                  <img
                    src={`https://picsum.photos/seed/user${i}/100/100`}
                    alt="User"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-[3px] border-white bg-[#F16736] flex items-center justify-center text-[11px] font-black tracking-tighter text-white shadow-sm">
                +5k
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <Users size={16} className="text-[#F16736]" />
                <span className="text-base font-bold text-[#1e1e1e]">Join 5,000+</span>
              </div>
              <span className="text-xs font-bold text-[#6b6b6b] uppercase tracking-[0.2em] mt-0.5">Resourceful Minds</span>
            </div>
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block p-8"
        >
          <div className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-[#e8e5e0] shadow-2xl group bg-white p-4">
            <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
              <img
                src="https://picsum.photos/seed/climbing/800/1000"
                alt="Climbing to success"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
              
              {/* Tech Node Overlay Elements */}
              <div className="absolute inset-0 border border-[#F16736]/20 rounded-[1.5rem] m-4 pointer-events-none">
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#F16736]" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#F16736]" />
              </div>

              {/* Floating Card UI */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#F16736] animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest text-[#F16736]">Active Session</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/70 uppercase">Live Now</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Creative Intelligence 101</h3>
                <p className="text-sm text-white/80 font-medium">Mastering the art of resourcefulness in a digital age.</p>
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F16736]/10 rounded-full blur-[40px] pointer-events-none" />
          <div className="absolute bottom-10 -left-10 w-48 h-48 bg-[#F16736]/15 rounded-full blur-[60px] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

const Mission = () => {
  return (
    <section id="intelligence" className="py-24 bg-[#faf9f7] relative overflow-hidden scroll-mt-24">
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
            <div className="group relative aspect-video rounded-2xl overflow-hidden border border-[#e8e5e0] shadow-xl cursor-pointer">
              {/* Placeholder Image */}
              <img
                src="https://picsum.photos/seed/btsw-mission/1280/720"
                alt="BTSW Mission Video"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#F16736] rounded-full blur-2xl opacity-40 group-hover:opacity-75 transition-opacity animate-pulse" />
                  <div className="relative w-20 h-20 bg-[#F16736] rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(241,103,54,0.5)] transform group-hover:scale-110 transition-transform duration-300">
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
                <div className="bg-[#1e1e1e]/80 backdrop-blur-md border border-[#e8e5e0]/20 px-4 py-2 rounded-lg">
                  <span className="text-xs font-bold text-white uppercase tracking-widest">The BTSW Story</span>
                </div>
                <span className="text-xs text-white/80 font-mono">03:45</span>
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
            <span className="text-[#F16736] text-xs font-black uppercase tracking-[0.3em] mb-4 block">
              The Philosophy
            </span>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e1e1e] mb-8 leading-tight">
              Why Traditional School <br className="hidden md:block" />
              <span className="text-[#6b6b6b] italic">Isn't Enough.</span>
            </h2>

            <div className="space-y-6 text-[#6b6b6b] text-lg leading-relaxed">
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
                className="group inline-flex items-center gap-3 text-[#1e1e1e] font-bold hover:text-[#F16736] transition-colors"
              >
                Watch our latest study session
                <div className="w-10 h-10 rounded-full border border-[#e8e5e0] flex items-center justify-center group-hover:border-[#F16736] group-hover:translate-x-2 transition-all">
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
  const navigate = useNavigate();
  const programs = [
    {
      title: "The Magnet School",
      description: "Our flagship program for deep intellectual growth, leadership, and character development.",
      icon: <Users className="w-6 h-6" />,
      cta: "Explore Program",
      slug: "the-magnet-school"
    },
    {
      title: "The Skill Hut",
      description: "Master high-income digital skills that the market actually demands. Practical, project-based learning.",
      icon: <ArrowRight className="w-6 h-6 rotate-[-45deg]" />,
      cta: "Explore Program",
      slug: "the-skill-hut"
    },
    {
      title: "Cash On Campus",
      description: "Financial intelligence and entrepreneurship tailored for the modern student ecosystem.",
      icon: <ArrowRight className="w-6 h-6" />,
      cta: "Explore Program",
      slug: "cash-on-campus"
    },
    {
      title: "The Mental Application Study",
      description: "A deep dive into cognitive development, strategic thinking, and the psychology of execution.",
      icon: <ArrowRight className="w-6 h-6 rotate-90" />,
      cta: "Explore Program",
      slug: "the-mental-application-study"
    },
    {
      title: "Crash Course",
      description: "Rapid-fire learning sessions designed to jumpstart your innovation journey and creative spark.",
      icon: <ArrowRight className="w-6 h-6 rotate-45" />,
      cta: "Explore Program",
      slug: "crash-course"
    }
  ];

  return (
    <section id="creativity" className="py-24 bg-white relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#F16736] text-xs font-black uppercase tracking-[0.3em] mb-4 block"
          >
            Our Curriculum
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-[#1e1e1e] mb-6"
          >
            Choose Your Path to Resourcefulness
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#6b6b6b] max-w-2xl mx-auto text-lg"
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
              onClick={() => navigate(`/programs/${program.slug}`)}
              className={`group relative p-8 bg-white border border-[#e8e5e0] rounded-[2rem] overflow-hidden hover:border-[#F16736] hover:-translate-y-1 hover:shadow-xl transition-all duration-500 ease-in-out cursor-pointer flex flex-col justify-between ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
            >
              {/* Intelligent Background Visuals */}
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <path d="M60 0L60 120M0 60L120 60" stroke="#F16736" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="60" cy="60" r="40" stroke="#F16736" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              <div>
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-[#fff1eb] border border-[#F16736]/10 flex items-center justify-center text-[#F16736] mb-8 group-hover:scale-110 group-hover:bg-[#F16736] group-hover:text-white transition-all duration-300">
                  {program.icon}
                </div>

                {/* Content */}
                <h3 className={`font-bold text-[#1e1e1e] mb-4 group-hover:text-[#F16736] transition-colors ${index === 0 ? 'text-3xl' : 'text-2xl'}`}>
                  {program.title}
                </h3>
                <p className="text-[#6b6b6b] text-base leading-relaxed mb-10 max-w-lg">
                  {program.description}
                </p>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm font-bold text-[#1e1e1e] group-hover:text-[#F16736] transition-colors mt-auto">
                <span className="relative">
                  {program.cta}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#F16736] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </span>
                <div className="w-6 h-6 rounded-full bg-[#f4f4f4] flex items-center justify-center group-hover:bg-[#fff1eb] transition-colors">
                  <ArrowRight size={14} className="rotate-[-45deg] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Subtle Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F16736]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Teasers = () => {
  return (
    <section id="innovation" className="py-24 bg-[#faf9f7] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Orange-Mart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative p-10 bg-white rounded-3xl border border-[#e8e5e0] hover:border-[#F16736] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F16736]/5 blur-[80px] -mr-32 -mt-32 group-hover:bg-[#F16736]/10 transition-colors" />
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold text-[#1e1e1e] mb-4">The Orange-Mart</h3>
              <p className="text-[#6b6b6b] mb-8 max-w-xs">
                Equip yourself with our premium resources, toolkits, and exclusive BTSW merch.
              </p>
              <button className="px-6 py-3 border border-[#F16736] text-[#F16736] font-bold rounded-xl hover:bg-[#F16736] hover:text-white transition-all flex items-center gap-2">
                Visit Store <ArrowRight size={18} className="rotate-[-45deg]" />
              </button>
            </div>
          </motion.div>

          {/* Simulation Games */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative p-10 bg-white rounded-3xl border border-[#e8e5e0] hover:border-[#F16736] transition-all duration-300 overflow-hidden"
          >
            {/* Tech Grid Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #F16736 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold text-[#1e1e1e] mb-4">Simulation Games</h3>
              <p className="text-[#6b6b6b] mb-8 max-w-xs">
                Test your resourcefulness in real-time scenarios. Strategy, execution, and high-stakes decision making.
              </p>
              <button className="px-6 py-3 bg-[#F16736] text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(241,103,54,0.4)] transition-all flex items-center gap-2">
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
    <section className="py-24 bg-white border-t border-b border-[#e8e5e0]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e1e1e] mb-6">
            Bring BTSW to Your Institution.
          </h2>
          <p className="text-[#6b6b6b] text-lg mb-10 leading-relaxed">
            We partner with forward-thinking school administrators to integrate digital skilling, 
            creative intelligence, and human capital development directly into your curriculum.
          </p>
          <a 
            href="/partnership-brochure.pdf" 
            className="inline-flex items-center gap-3 text-[#F16736] font-bold hover:underline underline-offset-8 decoration-2"
          >
            <div className="w-12 h-12 rounded-full bg-[#fff1eb] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#F16736" strokeWidth="2.5" className="w-5 h-5">
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
    <section className="py-24 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#1e1e1e]">The Wall We've Broken.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col p-8 bg-white border border-[#e8e5e0] rounded-2xl shadow-sm"
            >
              <div className="text-[#F16736] mb-6">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor">
                  <path d="M0 24V10.6667C0 4.44444 4.44444 0 10.6667 0V5.33333C7.11111 5.33333 5.33333 7.11111 5.33333 10.6667H10.6667V24H0ZM21.3333 24V10.6667C21.3333 4.44444 25.7778 0 32 0V5.33333C28.4444 5.33333 26.6667 7.11111 26.6667 10.6667H32V24H21.3333Z" />
                </svg>
              </div>
              <p className="text-[#6b6b6b] text-lg italic mb-8 leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-neutral-100 overflow-hidden border border-[#e8e5e0]">
                  <img 
                    src={`https://picsum.photos/seed/testi${i}/100/100`} 
                    alt={t.name} 
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-[#1e1e1e] font-bold text-sm">{t.name}</h4>
                  <p className="text-[#6b6b6b] text-xs uppercase tracking-widest">{t.role}</p>
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
    <section id="join" className="relative py-32 overflow-hidden bg-[#1e1e1e]">
      {/* Animated Background Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [-20, 20, -20],
          y: [-20, 20, -20],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F16736]/10 rounded-full blur-[120px] pointer-events-none" 
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
          className="absolute w-1 h-1 bg-[#F16736] rounded-full"
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
            For Your <span className="text-[#F16736] italic">Certificate.</span>
          </h2>
          <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto font-medium">
            Join the community of 5,000+ resourceful students rewriting the rules of success in Nigeria.
          </p>
          
          <button className="group relative px-12 py-6 bg-[#F16736] text-white text-xl font-black rounded-full overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(241,103,54,0.5)] hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center justify-center gap-3">
              Join BTSW Today <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          
          <p className="mt-8 text-neutral-500 text-sm font-bold uppercase tracking-widest">
            Equipping You With What School Won't Teach
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const EchelonProjectSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = window.innerWidth < 768;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#1e1e1e');
    scene.fog = new THREE.FogExp2('#1e1e1e', 0.04);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xF16736, 1.8, 40);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    const dirLight = new THREE.DirectionalLight(0xF16736, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // 5. Central Focal Hero Object (Rotating icosahedron with orange emissive glow)
    const heroGroup = new THREE.Group();
    
    // Large icosahedron
    const heroGeom = new THREE.IcosahedronGeometry(1.6, 0);
    
    // Solid core with glowing edge/specular properties
    const heroCoreMat = new THREE.MeshPhongMaterial({
      color: 0x121212,
      emissive: 0x4d1604, // glowing orange emissive
      specular: 0xF16736,
      shininess: 90,
      flatShading: true
    });
    const heroCore = new THREE.Mesh(heroGeom, heroCoreMat);
    heroGroup.add(heroCore);

    // Outer wireframe shell for technological feel
    const heroOuterGeom = new THREE.IcosahedronGeometry(1.72, 1);
    const heroOuterMat = new THREE.MeshBasicMaterial({
      color: 0xF16736,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const heroOuter = new THREE.Mesh(heroOuterGeom, heroOuterMat);
    heroGroup.add(heroOuter);
    
    scene.add(heroGroup);

    // 6. Floating shapes (icosahedrons, octahedrons, and wireframe cubes)
    const numShapes = isMobile ? 5 : 14;
    const shapes: Array<{
      mesh: THREE.Object3D;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      swimSpeed: number;
      swimAmp: number;
      initialY: number;
    }> = [];

    for (let i = 0; i < numShapes; i++) {
      let geom: THREE.BufferGeometry;
      const type = i % 3;
      const size = 0.3 + Math.random() * 0.45;

      if (type === 0) {
        geom = new THREE.IcosahedronGeometry(size, 0);
      } else if (type === 1) {
        geom = new THREE.OctahedronGeometry(size, 0);
      } else {
        geom = new THREE.BoxGeometry(size, size, size);
      }

      const isWireframe = i % 2 === 0;
      let mesh: THREE.Object3D;

      if (isWireframe) {
        // Pure orange wireframe shape
        const wireMat = new THREE.MeshBasicMaterial({
          color: 0xF16736,
          wireframe: true,
          transparent: true,
          opacity: 0.8
        });
        mesh = new THREE.Mesh(geom, wireMat);
      } else {
        // Solid structure with dark body & orange edge glow
        const shpGroup = new THREE.Group();
        const shpCoreMat = new THREE.MeshPhongMaterial({
          color: 0x1e1e1e,
          emissive: 0x100400,
          specular: 0xF16736,
          shininess: 30,
          flatShading: true
        });
        const shpCore = new THREE.Mesh(geom, shpCoreMat);
        
        const edges = new THREE.EdgesGeometry(geom);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xF16736,
          transparent: true,
          opacity: 0.95
        });
        const shpEdges = new THREE.LineSegments(edges, lineMat);
        shpEdges.scale.setScalar(1.02);

        shpGroup.add(shpCore);
        shpGroup.add(shpEdges);
        mesh = shpGroup;
      }

      // Distribute shapes randomly
      mesh.position.set(
        (Math.random() - 0.5) * (isMobile ? 8 : 16),
        (Math.random() - 0.5) * (isMobile ? 5 : 10),
        -5 - Math.random() * 8
      );

      scene.add(mesh);

      shapes.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        rotSpeedZ: (Math.random() - 0.5) * 0.015,
        swimSpeed: 0.5 + Math.random() * 1.2,
        swimAmp: 0.1 + Math.random() * 0.25,
        initialY: mesh.position.y
      });
    }

    // 7. Particle field (Subtle drifting points of light)
    const particleCount = isMobile ? 60 : 160;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;     // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16; // Y
      positions[i * 3 + 2] = -12 + Math.random() * 10;   // Z
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom Canvas Texture for beautiful round soft glowing particles
    const createTexture = () => {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 16;
      pCanvas.height = 16;
      const ctx = pCanvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(241, 103, 54, 1.0)');
        grad.addColorStop(0.3, 'rgba(241, 103, 54, 0.7)');
        grad.addColorStop(1, 'rgba(241, 103, 54, 0.0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(pCanvas);
    };

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      map: createTexture(),
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 8. Dynamic connecting lines between some shapes
    const numConnections = isMobile ? 3 : 8;
    const connections: Array<{ shapeA: THREE.Object3D; shapeB: THREE.Object3D }> = [];
    
    for (let i = 0; i < numConnections; i++) {
      const indexA = Math.floor(Math.random() * shapes.length);
      let indexB = Math.floor(Math.random() * shapes.length);
      if (indexA === indexB) {
        indexB = (indexB + 1) % shapes.length;
      }
      connections.push({
        shapeA: shapes[indexA].mesh,
        shapeB: shapes[indexB].mesh
      });
    }

    const linesGeom = new THREE.BufferGeometry();
    const linesPositions = new Float32Array(numConnections * 2 * 3);
    linesGeom.setAttribute('position', new THREE.BufferAttribute(linesPositions, 3));

    const linesMat = new THREE.LineBasicMaterial({
      color: 0xF16736,
      transparent: true,
      opacity: 0.3,
      linewidth: 1
    });

    const constellationLines = new THREE.LineSegments(linesGeom, linesMat);
    scene.add(constellationLines);

    // 9. Input & Parallax mouse tracking
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.x = x;
      mouse.y = y;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 10. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(container);

    // 11. Animation Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Hero core pulse rotation
      heroGroup.rotation.y += 0.007;
      heroGroup.rotation.x += 0.003;
      const pulseScale = 1.0 + Math.sin(elapsedTime * 1.6) * 0.06;
      heroGroup.scale.setScalar(pulseScale);

      // Rotate and swim floating bodies
      shapes.forEach((shp) => {
        shp.mesh.rotation.x += shp.rotSpeedX;
        shp.mesh.rotation.y += shp.rotSpeedY;
        shp.mesh.rotation.z += shp.rotSpeedZ;
        shp.mesh.position.y = shp.initialY + Math.sin(elapsedTime * shp.swimSpeed) * shp.swimAmp;
      });

      // Drifting particles
      const partsArr = particleGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        partsArr[i * 3 + 1] += Math.sin(elapsedTime * 0.2 + i) * 0.001; // subtle float Y
        partsArr[i * 3] += Math.cos(elapsedTime * 0.2 + i * 2) * 0.0008; // subtle float X
      }
      particleGeom.attributes.position.needsUpdate = true;

      // Constellation structure connect updates
      const lineArray = constellationLines.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < connections.length; i++) {
        const posA = connections[i].shapeA.position;
        const posB = connections[i].shapeB.position;

        lineArray[i * 6] = posA.x;
        lineArray[i * 6 + 1] = posA.y;
        lineArray[i * 6 + 2] = posA.z;

        lineArray[i * 6 + 3] = posB.x;
        lineArray[i * 6 + 4] = posB.y;
        lineArray[i * 6 + 5] = posB.z;
      }
      constellationLines.geometry.attributes.position.needsUpdate = true;

      // SmoothCamera Interpolation & movement
      const orbitAng = elapsedTime * 0.055;
      const basX = Math.sin(orbitAng) * 1.2;
      const basY = Math.cos(orbitAng * 0.6) * 0.8;

      let targetCamX = basX;
      let targetCamY = basY;

      if (!isMobile) {
        targetCamX += mouse.x * 2.2;
        targetCamY += mouse.y * 1.5;
      }

      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, -2);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      
      // Dispose geometry and materials to free WebGL memory
      scene.clear();
      heroGeom.dispose();
      heroCoreMat.dispose();
      heroOuterGeom.dispose();
      heroOuterMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      linesGeom.dispose();
      linesMat.dispose();

      shapes.forEach((shp) => {
        if (shp.mesh instanceof THREE.Mesh) {
          shp.mesh.geometry.dispose();
          if (Array.isArray(shp.mesh.material)) {
            shp.mesh.material.forEach((m) => m.dispose());
          } else {
            shp.mesh.material.dispose();
          }
        } else if (shp.mesh instanceof THREE.Group) {
          shp.mesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              if (Array.isArray(child.material)) {
                child.material.forEach((m) => m.dispose());
              } else {
                child.material.dispose();
              }
            } else if (child instanceof THREE.LineSegments) {
              child.geometry.dispose();
              if (Array.isArray(child.material)) {
                child.material.forEach((m) => m.dispose());
              } else {
                child.material.dispose();
              }
            }
          });
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative overflow-hidden bg-[#1e1e1e] py-24 md:py-32 text-white flex items-center min-h-[580px]"
    >
      {/* Three.js Canvas Element */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Grid Pattern overlay at low opacity */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-1" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #F16736 1.5px, transparent 1.5px)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      {/* Intense Orange Glow bloom backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-[#F16736]/15 rounded-full blur-[100px] pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-8 backdrop-blur-[2px] bg-black/25 p-8 rounded-3xl border border-white/5 md:bg-transparent md:border-none md:p-0">
          {/* Intense Top Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#F16736]/30 text-[10px] md:text-sm font-black uppercase tracking-[0.25em] text-[#F16736]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F16736] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F16736]"></span>
            </span>
            COGNITIVE SPORTS & STRATEGIC DIVISION
          </motion.div>

          {/* Epic Main Headline */}
          <div className="relative">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7.5xl font-black tracking-tight leading-none text-white uppercase relative z-10"
            >
              The Echelon <span className="text-[#F16736] inline-block relative">Project Africa</span>
            </motion.h2>
          </div>

          {/* Punchy Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-md md:text-xl font-black text-[#F16736] uppercase tracking-[0.08em] max-w-2xl mx-auto"
          >
            BTSW's gamified simulation and strategic intelligence division
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-medium"
          >
            This is where students enter virtual simulations, brain game training, and tabletop strategy experiences designed to sharpen real-world thinking and decision making. Build high-stakes situational awareness, logical game theory execution, and long-range focus filters.
          </motion.p>

          {/* Side-by-Side Call To Action Buttons (V-Stack on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 max-w-md md:max-w-none mx-auto w-full sm:w-auto"
          >
            <button
              onClick={() => navigate('/echelon-project-africa/simulation')}
              className="w-full sm:w-auto px-8 py-4 bg-[#F16736] text-white font-extrabold text-xs md:text-sm uppercase tracking-wider rounded-full hover:shadow-[0_0_30px_rgba(241,103,54,0.5)] hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer text-center"
            >
              Enter the Simulation
            </button>
            <button
              onClick={() => navigate('/echelon-project-africa/tabletop')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/20 hover:border-[#F16736] hover:bg-[#F16736]/10 text-white font-extrabold text-xs md:text-sm uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-95 text-center"
            >
              Explore Tabletop Games
            </button>
          </motion.div>
        </div>
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
      <EchelonProjectSection />
      <Teasers />
      <Partnership />
      <Testimonials />
      <FinalCTA />
    </>
  );
};

export default Home;
