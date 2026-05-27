import { motion } from 'motion/react';
import { Check, ArrowUpRight, MessageCircle, Library } from 'lucide-react';

const programs = [
  {
    title: "The Magnet School",
    kicker: "Leadership & Character",
    description: "Our flagship program designed for deep intellectual growth and character development. We focus on raising men and women of substance who can lead with clarity and purpose. Through rigorous study and community engagement, you'll develop the mental fortitude required for high-level leadership in the 21st century.",
    features: [
      "Strategic Leadership & Character Development",
      "Intellectual Rigor & Critical Thinking",
      "High-Level Community Networking"
    ],
    cta: "Enroll via WhatsApp",
    image: "https://picsum.photos/seed/magnet/800/600"
  },
  {
    title: "The Skill Hut",
    kicker: "Digital Mastery",
    description: "Master high-income digital skills that the global market actually demands. From creative design to technical execution, we provide project-based learning that translates directly into economic value. Stop learning for grades and start learning for impact and income in a digital-first economy.",
    features: [
      "High-Income Digital Skill Acquisition",
      "Project-Based Hands-on Learning",
      "Professional Portfolio Building"
    ],
    cta: "Access the Study",
    image: "https://picsum.photos/seed/skill/800/600"
  },
  {
    title: "Cash On Campus",
    kicker: "Financial Intelligence",
    description: "Financial intelligence tailored specifically for the modern student ecosystem. We teach you how to build sustainable income streams while navigating your academic journey. Learn the principles of entrepreneurship, investment, and financial management that traditional school won't teach you.",
    features: [
      "Student Entrepreneurship Strategies",
      "Financial Intelligence & Management",
      "Sustainable Income Stream Strategy"
    ],
    cta: "Start Earning",
    image: "https://picsum.photos/seed/cash/800/600"
  },
  {
    title: "The Mental Application Study",
    kicker: "Cognitive Performance",
    description: "A deep dive into cognitive development and the psychology of execution. Understand how to optimize your brain for strategic thinking and complex problem-solving. This program is for those who want to master their minds and achieve peak performance in any field through mental discipline.",
    features: [
      "Cognitive Optimization Techniques",
      "Strategic Thinking Frameworks",
      "Psychology of High-Performance Execution"
    ],
    cta: "Apply Now",
    image: "https://picsum.photos/seed/mental/800/600"
  },
  {
    title: "Crash Course",
    kicker: "Rapid Innovation",
    description: "Rapid-fire learning sessions designed to jumpstart your innovation journey. These micro-degrees focus on specific, actionable insights that you can implement immediately. Perfect for the busy student who needs high-impact knowledge in a condensed timeframe to stay ahead of the curve.",
    features: [
      "Rapid Learning & Actionable Insights",
      "Innovation Journey Jumpstart",
      "Micro-Degree Certification"
    ],
    cta: "Get Started",
    image: "https://picsum.photos/seed/crash/800/600"
  }
];

const ProgramBlock = ({ program, index }: { program: typeof programs[0], index: number, key?: string }) => {
  const isEven = index % 2 === 0;

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1"
          >
            <span className="text-[#FF6B00] text-xs font-black uppercase tracking-[0.3em] mb-4 block">
              {program.kicker}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              {program.title}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {program.description}
            </p>
            
            <ul className="space-y-4 mb-10">
              {program.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#FF6B00]/10 flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-[#FF6B00]" strokeWidth={3} />
                  </div>
                  <span className="text-sm md:text-base font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="group relative px-8 py-4 bg-[#FF6B00] text-white font-bold rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,107,0,0.3)] active:scale-95 flex items-center gap-2">
              <span className="relative z-10 flex items-center gap-2">
                {program.cta} <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>

          {/* Image/Graphic Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <img 
                src={program.image} 
                alt={program.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              
              {/* Decorative Accent */}
              <div className={`absolute ${isEven ? '-top-4 -right-4' : '-top-4 -left-4'} w-24 h-24 bg-[#FF6B00]/20 rounded-full blur-2xl pointer-events-none`} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Programs = () => {
  return (
    <>
      {/* Hero Header */}
      <header className="pt-32 pb-16 md:pt-48 md:pb-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-[#FF6B00] text-xs font-black uppercase tracking-[0.4em] mb-6 block">
              OUR CURRICULUM
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
              Master the Art of <br />
              <span className="text-[#FF6B00] italic">Resourcefulness.</span>
            </h1>
            <p className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-2xl">
              Explore our digital ecosystems, masterclasses, and micro-degrees designed to bridge the gap between school and the real world.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Program Showcases */}
      <main>
        {programs.map((program, index) => (
          <ProgramBlock key={program.title} program={program} index={index} />
        ))}
      </main>

      {/* Bottom CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-20 bg-neutral-900 rounded-[3rem] border border-white/5 overflow-hidden text-center"
          >
            {/* Subtle Orange Accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6B00]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6B00]/30 to-transparent" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#FF6B00]/10 rounded-2xl flex items-center justify-center text-[#FF6B00] mx-auto mb-8">
                <MessageCircle size={32} />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Not sure where to start?
              </h2>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                Join our central Telegram community to get guidance from our Creative Director and connect with other resourceful minds.
              </p>
              
              <button className="group relative px-10 py-5 bg-white text-black font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto">
                <span className="relative z-10 flex items-center gap-3">
                  Join the Telegram E-Library <Library size={20} />
                </span>
                <div className="absolute inset-0 bg-[#FF6B00] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="relative z-10 flex items-center gap-3 text-white">
                    Join the Telegram E-Library <Library size={20} />
                  </span>
                </div>
              </button>
            </div>

            {/* Background Glow */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF6B00]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FF6B00]/5 rounded-full blur-[100px] pointer-events-none" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Programs;
