import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Award, Briefcase, ChevronRight, GraduationCap, ArrowRight, X, 
  CheckCircle2, Check, Coins, Users, Calendar, MapPin, Sparkles, Building
} from 'lucide-react';

interface UniversityLogos {
  name: string;
  shortName: string;
  location: string;
  color: string;
}

export default function CashOnCampus() {
  const navigate = useNavigate();

  // Interactive UI Modal States
  const [mentorshipModalOpen, setMentorshipModalOpen] = useState(false);
  const [mentorshipSuccess, setMentorshipSuccess] = useState(false);
  const [grantModalOpen, setGrantModalOpen] = useState(false);
  const [grantSuccess, setGrantSuccess] = useState(false);
  const [invasionModalOpen, setInvasionModalOpen] = useState(false);
  const [invasionSuccess, setInvasionSuccess] = useState(false);

  // Form inputs
  const [mentorField, setMentorField] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [grantPitch, setGrantPitch] = useState('');
  const [grantAmount, setGrantAmount] = useState('500');
  const [invasionSchool, setInvasionSchool] = useState('Unilag');
  const [invasionEmail, setInvasionEmail] = useState('');

  const universities: UniversityLogos[] = [
    { name: "University of Lagos", shortName: "Unilag", location: "Akoka, Lagos", color: "from-blue-600 to-indigo-700" },
    { name: "Lagos State University", shortName: "LASU", location: "Ojo, Lagos", color: "from-[#F16736] to-pink-600" },
    { name: "University of Ibadan", shortName: "UI", location: "Ibadan, Oyo", color: "from-emerald-650 to-green-800" },
    { name: "Obafemi Awolowo University", shortName: "OAU", location: "Ile-Ife, Osun", color: "from-yellow-600 to-amber-700" },
    { name: "University of Nigeria, Nsukka", shortName: "UNN", location: "Nsukka, Enugu", color: "from-purple-650 to-purple-800" },
    { name: "Ahmadu Bello University", shortName: "ABU", location: "Zaria, Kaduna", color: "from-teal-600 to-cyan-700" },
    { name: "Federal University of Technology, Akure", shortName: "FUTA", location: "Akure, Ondo", color: "from-red-650 to-orange-700" }
  ];

  const handleMentorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMentorshipSuccess(true);
    setTimeout(() => {
      setMentorshipSuccess(false);
      setMentorshipModalOpen(false);
      setMentorField('');
      setMentorEmail('');
    }, 3500);
  };

  const handleGrantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGrantSuccess(true);
    setTimeout(() => {
      setGrantSuccess(false);
      setGrantModalOpen(false);
      setGrantPitch('');
    }, 3500);
  };

  const handleInvasionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInvasionSuccess(true);
    setTimeout(() => {
      setInvasionSuccess(false);
      setInvasionModalOpen(false);
      setInvasionEmail('');
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-white text-[#1e1e1e] font-sans selection:bg-[#F16736]/20 relative overflow-x-hidden pt-16 text-left">
      
      {/* 1. LARGE FULL-WIDTH HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-black py-24 md:py-36 text-white px-6">
        <div className="absolute inset-0 bg-[#F16736]/5 mix-blend-color-dodge pointer-events-none" />
        <div className="absolute inset-x-0 h-96 top-0 bg-[radial-gradient(#F16736_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F16736]/15 border border-[#F16736]/30 rounded-full text-xs font-black uppercase text-[#F16736] tracking-widest">
              <Sparkles size={12} className="animate-spin" /> VECTORS INITIATIVE
            </span>
            <h1 className="text-4xl md:text-6.5xl font-black tracking-tight leading-tight">
              Cash On Campus
            </h1>
            <p className="text-base md:text-xl font-bold text-neutral-300 max-w-xl leading-relaxed">
              Raising student entrepreneurs across African universities. We believe financial independence starts inside the dynamic corridor networks of your student dormitory.
            </p>
            <div className="flex flex-wrap gap-4 pt-3">
              <button 
                onClick={() => setMentorshipModalOpen(true)}
                className="px-6 py-3 bg-[#F16736] hover:bg-[#F16736]/90 text-white text-xs font-black uppercase tracking-wider rounded-full transition hover:scale-103 shadow-md"
              >
                Join Mentorship
              </button>
              <button 
                onClick={() => setGrantModalOpen(true)}
                className="px-6 py-3 bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 text-neutral-200 text-xs font-black uppercase tracking-wider rounded-full transition"
              >
                Apply for Grants
              </button>
            </div>
          </div>

          <div className="flex-1 w-full md:max-w-md bg-neutral-900/40 backdrop-blur-md rounded-3xl border border-neutral-850 p-6 flex flex-col gap-4 shadow-xl">
            <p className="text-[10px] font-mono text-neutral-500 uppercase">BTSW // Campus Launch Statistics</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-950/80 p-4 rounded-2xl border border-neutral-850">
                <span className="text-2xl block">🏫</span>
                <span className="text-sm font-black text-white block mt-1">12+</span>
                <span className="text-[10px] text-neutral-450 uppercase font-mono">Invasion Anchors</span>
              </div>
              <div className="bg-neutral-950/80 p-4 rounded-2xl border border-neutral-850">
                <span className="text-2xl block">💡</span>
                <span className="text-sm font-black text-white block mt-1">₦24M+</span>
                <span className="text-[10px] text-neutral-450 uppercase font-mono">Student Grants</span>
              </div>
            </div>
            <p className="text-[9px] font-mono text-zinc-500 italic mt-2 text-center">
              *Full funding access reserved exclusively for enrolled students
            </p>
          </div>
        </div>
      </section>

      {/* 2. PROGRAM EXPLANATION */}
      <section className="py-20 md:py-28 px-6 bg-[#faf9f7] border-b border-[#e8e5e0]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#F16736] font-mono">
              💼 FINANCIAL INTEL
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1e1e1e] tracking-tight">
              Why Cash On Campus?
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-semibold">
              Ecosystems like universities are compact markets waiting for structured solutions. Cash On Campus was designed to walk students through the mechanics of low-overhead arbitrage, service package design, and cashflow optimization, securing reliable income loops without damaging curriculum research grades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-[#e8e5e0] rounded-3xl space-y-4 shadow-sm hover:border-[#F16736] transition duration-300">
              <div className="w-12 h-12 bg-[#fff1eb] rounded-2xl flex items-center justify-center text-2xl">
                📥
              </div>
              <h3 className="text-lg font-black text-[#1e1e1e]">Student Pain Pain-points</h3>
              <p className="text-xs md:text-sm text-neutral-500 leading-relaxed">
                We teach you to analyze physical bottlenecks inside your specific student dorms, from laundry backlogs to study session scheduling traps.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#e8e5e0] rounded-3xl space-y-4 shadow-sm hover:border-[#F16736] transition duration-300">
              <div className="w-12 h-12 bg-[#fff1eb] rounded-2xl flex items-center justify-center text-2xl">
                📦
              </div>
              <h3 className="text-lg font-black text-[#1e1e1e]">Arbitrage Logistics</h3>
              <p className="text-xs md:text-sm text-neutral-500 leading-relaxed">
                Connect value between heavy bulk wholesalers outside the university walls and single dormitory blocks utilizing high-yield group-pre-sale methods.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#e8e5e0] rounded-3xl space-y-4 shadow-sm hover:border-[#F16736] transition duration-300">
              <div className="w-12 h-12 bg-[#fff1eb] rounded-2xl flex items-center justify-center text-2xl">
                📈
              </div>
              <h3 className="text-lg font-black text-[#1e1e1e]">Re-Investment Engines</h3>
              <p className="text-xs md:text-sm text-neutral-500 leading-relaxed">
                Learn to divide personal savings from operational funds, reinvesting cash flow back into student ledgers to fund graduation and off-campus ventures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS MENTORSHIP PROGRAM */}
      <section className="py-20 md:py-28 px-6 bg-white border-b border-[#e8e5e0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#F16736] font-mono">
              🤝 ONE-ON-ONE GUIDANCE
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e1e1e] tracking-tight leading-tight">
              The Business Mentorship Program
            </h2>
            <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
              Accelerate your student side-hustle with direct feedback parameters. Get paired with successful alumni vectors who understand campus-specific regulations, logistics pricing structures, and student customer acquisition tactics.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs md:text-sm font-semibold text-neutral-600">
                <CheckCircle2 size={16} className="text-[#F16736]" />
                <span>Weekly live audit of your transaction logs & sales figures</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm font-semibold text-neutral-600">
                <CheckCircle2 size={16} className="text-[#F16736]" />
                <span>Specialized branding collateral & launch templates access</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm font-semibold text-neutral-600">
                <CheckCircle2 size={16} className="text-[#F16736]" />
                <span>Access to micro partner funding channels</span>
              </div>
            </div>
            
            <div className="pt-4">
              <button
                onClick={() => setMentorshipModalOpen(true)}
                className="px-8 py-3.5 bg-[#F16736] text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all hover:shadow-[0_0_20px_rgba(241,103,54,0.3)] hover:scale-102 cursor-pointer flex items-center gap-2"
              >
                Register for Mentorship <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="bg-[#faf9f7] rounded-3xl p-8 border border-[#e8e5e0] relative overflow-hidden flex flex-col justify-between aspect-[4/3]">
            <div className="absolute top-0 right-0 p-4 text-[9px] text-neutral-400 font-mono">COHORT B06 // PRESET</div>
            <div className="space-y-4">
              <span className="text-[10px] font-mono bg-[#fff1eb] text-[#F16736] border border-[#F16736]/10 px-2.5 py-0.5 rounded-full font-black">
                REPRESENTATIVE FACILITATORS
              </span>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-350 flex items-center justify-center font-bold text-[#1e1e1e]">
                    FA
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#1e1e1e] leading-snug">Fadekemi Alao</h4>
                    <p className="text-[10px] text-neutral-500 font-mono">Creator Commerce Facilitator</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-350 flex items-center justify-center font-bold text-[#1e1e1e]">
                    DY
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#1e1e1e] leading-snug">Damilola Yusuf</h4>
                    <p className="text-[10px] text-neutral-500 font-mono">Startup Logistics Operations</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-neutral-500 italic mt-6 leading-relaxed">
              &quot;Mentorship transforms scattered activities into clean, standardized systems that yield stable profit buffers.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* 4. BUSINESS GRANTS */}
      <section className="py-20 md:py-28 px-6 bg-[#faf9f7] border-b border-[#e8e5e0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-3xl p-8 border border-[#e8e5e0] space-y-6 shadow-sm order-last md:order-first">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-[9px] uppercase bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2.5 py-0.5 rounded font-black">
                GRANT DISPATCH REGISTRY
              </span>
              <span className="text-neutral-450 font-mono text-[10px]">ACTIVE BUDGET</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-xs font-semibold text-neutral-500">Unilag Hostel Food Project</span>
                <strong className="text-sm font-black text-[#1e1e1e]">₦500,000 Granted</strong>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-xs font-semibold text-neutral-500">FUTA Graphic Service Pack</span>
                <strong className="text-sm font-black text-[#1e1e1e]">₦250,000 Granted</strong>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-xs font-semibold text-neutral-500">LASU Logistics Presell Delivery</span>
                <strong className="text-sm font-black text-[#1e1e1e]">₦350,000 Granted</strong>
              </div>
            </div>
            <p className="text-[10px] font-mono text-neutral-450 leading-relaxed italic text-center">
              *Grants are disbursed quarterly via live pitching assessments
            </p>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#F16736] font-mono">
              💸 SEED CAPITAL INJECTIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e1e1e] tracking-tight leading-tight">
              Business Grants Access
            </h2>
            <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
              Students shouldn't require high-interest collateral loans to validate simple ideas. You can access equity-free grants ranging from ₦150,000 to over ₦1,000,000 through BTSW to buy stock, package services, or pay for transport loops.
            </p>
            
            <div className="pt-4">
              <button
                onClick={() => setGrantModalOpen(true)}
                className="px-8 py-3.5 bg-neutral-900 text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all hover:bg-neutral-800 cursor-pointer flex items-center gap-2"
              >
                Apply for a Grant <Coins size={14} className="text-[#F16736]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CAMPUS INVASION */}
      <section className="py-20 md:py-28 px-6 bg-white border-b border-[#e8e5e0]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#F16736] font-mono">
                🔥 BTSW ON THE ROAD
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e1e1e] tracking-tight">
                We Are Coming To Your School
              </h2>
              <span className="text-sm text-neutral-400 font-bold block">
                (Register for the next event)
              </span>
            </div>
            <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
              We physically visit top university campuses across Africa to run live, high stakes venture pitch feedback and financial intelligence workshops.
            </p>
          </div>

          {/* HORIZONTAL SCROLL ROW OF UNIVERSITY LOGO CARDS */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            
            <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-neutral-200">
              {universities.map((uni, idx) => (
                <div 
                  key={idx} 
                  className="min-w-[200px] flex-shrink-0 bg-[#faf9f7] rounded-2xl border border-[#e8e5e0] p-5 text-left flex flex-col justify-between min-h-[140px] hover:border-[#F16736] transition-all"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${uni.color} flex items-center justify-center text-white font-extrabold text-xs`}>
                    {uni.shortName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#1e1e1e] leading-snug">{uni.name}</h4>
                    <p className="text-[10px] text-zinc-400 leading-none mt-1">{uni.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={() => setInvasionModalOpen(true)}
              className="px-8 py-4 bg-[#F16736] text-white font-black text-xs uppercase tracking-wider rounded-full transition hover:bg-[#F16736]/90 cursor-pointer shadow-md"
            >
              Register for Campus Invasion
            </button>
          </div>

        </div>
      </section>

      {/* 6. SYLLABUS DIRECT PATH ENTRY -- VERY LAST COMPONENT */}
      <section className="py-24 px-6 bg-[#faf9f7] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#F16736]/3 mix-blend-color-dodge pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fff1eb] border border-[#F16736]/20 rounded-full text-xs font-black uppercase text-[#F16736] tracking-widest">
            🎓 ACTIVE LEDGER
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#1e1e1e] tracking-tight">
            Analyze the Active Curriculum Outline
          </h2>
          <p className="text-sm md:text-base font-semibold text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Ready to explore week-by-week program modules and access our built-in Student Campus Calculator? Click below to enter the full core curriculum outline immediately.
          </p>
          <div className="pt-4">
            <Link
              to="/programs/cash-on-campus/detail"
              className="px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest rounded-full transition inline-flex items-center gap-2 group cursor-pointer"
            >
              View Full Curriculum & Enroll <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== INTERACTIVE APPLICATION MODALS ==================== */}

      {/* A. MENTORSHIP REGISTRATION MODAL */}
      <AnimatePresence>
        {mentorshipModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-[#1e1e1e]"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-neutral-200 max-w-md w-full p-6 space-y-6 relative shadow-2xl"
            >
              <button 
                onClick={() => setMentorshipModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-450 hover:text-neutral-850 p-1"
              >
                <X size={18} />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase bg-[#fff1eb] text-[#F16736] px-2 py-0.5 rounded font-black">
                  MENTORSHIP ACCESS
                </span>
                <h3 className="text-xl font-black text-[#1e1e1e]">
                  Register for Mentorship
                </h3>
              </div>

              {mentorshipSuccess ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-sm font-extrabold text-emerald-800">Application Registered!</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-semibold">
                    We've stored your active entry in the mentorship applicant ledger. An audit vector representative will contact you in under 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleMentorSubmit} className="space-y-4">
                  <p className="text-[11px] text-neutral-500 leading-normal font-medium">
                    We will pair you to a startup mentor upon entry verification. Tell us about your active or proposed student project.
                  </p>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 block uppercase">Project or Shop Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Unilag Smoothie Express"
                      value={mentorField}
                      onChange={(e) => setMentorField(e.target.value)}
                      className="w-full text-xs md:text-sm border border-neutral-300 rounded-xl px-3 py-2.5 bg-neutral-55 focus:outline-none focus:border-[#F16736]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 block uppercase">Student Webmail / Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. entrepreneur@school.edu.ng"
                      value={mentorEmail}
                      onChange={(e) => setMentorEmail(e.target.value)}
                      className="w-full text-xs md:text-sm border border-neutral-300 rounded-xl px-3 py-2.5 bg-neutral-55 focus:outline-none focus:border-[#F16736]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#F16736] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-[#F16736]/90 transition"
                  >
                    Submit Mentorship Request
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* B. GRANT APPLICATION MODAL */}
      <AnimatePresence>
        {grantModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-[#1e1e1e]"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-neutral-200 max-w-md w-full p-6 space-y-6 relative shadow-2xl"
            >
              <button 
                onClick={() => setGrantModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-450 hover:text-neutral-850 p-1"
              >
                <X size={18} />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase bg-[#fff1eb] text-[#F16736] px-2 py-0.5 rounded font-black">
                  CAPITAL POOL ACCESS
                </span>
                <h3 className="text-xl font-black text-[#1e1e1e]">
                  Apply for a Grant
                </h3>
              </div>

              {grantSuccess ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-sm font-extrabold text-emerald-800">Grant Application Lodged!</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-semibold">
                    We have securely logged your business pitch parameters under evaluation unit log. We will schedule a virtual pitch demonstration slot for you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleGrantSubmit} className="space-y-4">
                  <p className="text-[11px] text-neutral-500 leading-normal font-medium">
                    This capital is fully equity-free. Detail exactly how this injection translates to transaction growth inside your campus sector.
                  </p>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 block uppercase">Requested Allocation Amount</label>
                    <select
                      value={grantAmount}
                      onChange={(e) => setGrantAmount(e.target.value)}
                      className="w-full text-xs md:text-sm border border-neutral-300 rounded-xl px-3 py-2.5 bg-neutral-55 focus:outline-none focus:border-[#F16736]"
                    >
                      <option value="150">₦150,000 (Micro Seed)</option>
                      <option value="350">₦350,000 (Operations scaling)</option>
                      <option value="500">₦500,000 (Warehouse logistics)</option>
                      <option value="1000">₦1,000,000 (Venture acceleration)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 block uppercase">Brief Project & Allocation Pitch</label>
                    <textarea 
                      required
                      placeholder="Explain your student venture's customer acquisition strategy and what stock/hardware the grant buys..."
                      rows={3}
                      value={grantPitch}
                      onChange={(e) => setGrantPitch(e.target.value)}
                      className="w-full text-xs md:text-sm border border-neutral-300 rounded-xl px-3 py-2.5 bg-neutral-55 focus:outline-none focus:border-[#F16736]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-neutral-900 text-white text-xs font-black uppercase tracking-wider rounded-xl transition hover:bg-neutral-800"
                  >
                    Submit Grant Proposal
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* C. INVASION RESERVATION MODAL */}
      <AnimatePresence>
        {invasionModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-[#1e1e1e]"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-neutral-200 max-w-md w-full p-6 space-y-6 relative shadow-2xl"
            >
              <button 
                onClick={() => setInvasionModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-450 hover:text-neutral-850 p-1"
              >
                <X size={18} />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase bg-[#fff1eb] text-[#F16736] px-2 py-0.5 rounded font-black">
                  CAMPUS REGISTRY
                </span>
                <h3 className="text-xl font-black text-[#1e1e1e]">
                  Register for Campus Invasion
                </h3>
              </div>

              {invasionSuccess ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl font-bold animate-bounce">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-emerald-800">Event Pass Confirmed!</h4>
                    <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-mono uppercase">
                      TICKET LOCKCODE: BTSW-INVASION-{Math.floor(Math.random() * 900000 + 100000)}
                    </p>
                  </div>
                  <p className="text-[11px] text-neutral-450 leading-relaxed font-semibold">
                    We've locked your entry ticket for <strong>{invasionSchool}</strong>. Show your dynamic email confirmation badge at the physical venue door. See you there!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInvasionSubmit} className="space-y-4">
                  <p className="text-[11px] text-neutral-500 leading-normal font-semibold">
                    Reserve a live seat for the upcoming financial intelligence hackathon and grants presentation.
                  </p>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 block uppercase">Select Your Campus</label>
                    <select
                      value={invasionSchool}
                      onChange={(e) => setInvasionSchool(e.target.value)}
                      className="w-full text-xs md:text-sm border border-neutral-300 rounded-xl px-3 py-2.5 bg-neutral-55 focus:outline-none focus:border-[#F16736]"
                    >
                      {universities.map((uni, idx) => (
                        <option key={idx} value={uni.shortName}>{uni.name} ({uni.shortName})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 block uppercase">Provide Student Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. attendee@school.edu.ng"
                      value={invasionEmail}
                      onChange={(e) => setInvasionEmail(e.target.value)}
                      className="w-full text-xs md:text-sm border border-neutral-300 rounded-xl px-3 py-2.5 bg-neutral-55 focus:outline-none focus:border-[#F16736]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#F16736] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-[#F16736]/90 transition"
                  >
                    Confirm Event Pass
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
