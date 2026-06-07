import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Calendar, User, ShoppingBag, Play, ArrowRight, 
  ExternalLink, Check, CheckCircle2, X, MessageSquare, BookOpen, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Masterclass {
  id: string;
  title: string;
  date: string;
  facilitator: string;
}

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: string;
}

export default function TheSkillHut() {
  const navigate = useNavigate();
  
  // Interactive Modals State
  const [registeringClass, setRegisteringClass] = useState<Masterclass | null>(null);
  const [successClass, setSuccessClass] = useState<string | null>(null);
  const [replayingClass, setReplayingClass] = useState<Masterclass | null>(null);
  const [buyingItem, setBuyingItem] = useState<MarketplaceItem | null>(null);
  const [successItem, setSuccessItem] = useState<string | null>(null);

  // Form states for modal
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');

  const upcomingClasses: Masterclass[] = [
    {
      id: 'up-1',
      title: "Web3 Frontends & Canvas Graphics",
      date: "June 20, 2026 — 4:00 PM (GMT+1)",
      facilitator: "Efe Michael (Senior Creative Engineer)"
    },
    {
      id: 'up-2',
      title: "Value-Pricing & Client Workflows",
      date: "July 05, 2026 — 2:00 PM (GMT+1)",
      facilitator: "Adewale Yusuf (Creator Commerce Lead)"
    },
    {
      id: 'up-3',
      title: "No-Code Mobile App Invasions",
      date: "July 24, 2026 — 6:00 PM (GMT+1)",
      facilitator: "Fadekemi Alao (UX Innovation Partner)"
    }
  ];

  const previousClasses: Masterclass[] = [
    {
      id: 'prev-1',
      title: "The 8px Digital Grid Mastery",
      date: "May 12, 2026",
      facilitator: "Chidi Nelson"
    },
    {
      id: 'prev-2',
      title: "Upwork Proposals & Invoice Authority",
      date: "April 28, 2026",
      facilitator: "Damilola Yusuf"
    },
    {
      id: 'prev-3',
      title: "Framer Motion Elements & Micro-Engagements",
      date: "April 10, 2026",
      facilitator: "Timi Balogun"
    }
  ];

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: 'res-1',
      title: "BTSW Portfolio Pitch Stylekit",
      description: "Interactive case-study architecture layouts, Figma Vector wireframes, and copywriting formulas designed to double response rates on digital proposals.",
      price: "$19"
    },
    {
      id: 'res-2',
      title: "Client Scope & Invoice SLA Templates",
      description: "Bulletproof client-side legal pacts, hourly conversion matrices, and milestones delivery timelines tailored specifically for Nigerian creators.",
      price: "$29"
    },
    {
      id: 'res-3',
      title: "Design System Playground Assets",
      description: "A comprehensive toolkit representing 240+ tailwind-calibrated visual container tokens, typography scale tokens, and custom responsive button templates.",
      price: "$14"
    }
  ];

  // Actions
  const handleRegisterConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (registeringClass) {
      setSuccessClass(registeringClass.title);
      setRegName('');
      setRegEmail('');
      setTimeout(() => {
        setSuccessClass(null);
        setRegisteringClass(null);
      }, 3000);
    }
  };

  const handleBuyConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (buyingItem) {
      setSuccessItem(buyingItem.title);
      setBuyerEmail('');
      setTimeout(() => {
        setSuccessItem(null);
        setBuyingItem(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1e1e1e] font-sans selection:bg-[#F16736]/20 relative overflow-x-hidden pt-16">
      
      {/* 1. LARGE FULL-WIDTH HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#121212] to-[#1a1a1a] py-24 md:py-36 text-white text-left px-6">
        <div className="absolute inset-0 bg-[#F16736]/5 mix-blend-color-dodge pointer-events-none" />
        {/* Subtle grid accent */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #F16736 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F16736]/15 hover:bg-[#F16736]/20 border border-[#F16736]/40 rounded-full text-xs font-black uppercase text-[#F16736] tracking-widest transition-all">
              <Sparkles size={12} className="animate-pulse" /> SPRINT STUDIO TRACK
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
              The Skill Hut
            </h1>
            <p className="text-sm md:text-lg font-semibold text-neutral-300 max-w-xl leading-relaxed">
              We bypass empty theoretical lectures to give you direct access to the files, assets, grids, and systems that generate real economic leverage in the digital global market.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#upcoming"
                className="px-6 py-3 bg-[#F16736] text-white text-xs font-black uppercase tracking-wider rounded-full hover:shadow-[0_0_24px_rgba(241,103,54,0.4)] transition"
              >
                Join Next Masterclass
              </a>
              <a 
                href="#marketplace"
                className="px-6 py-3 bg-neutral-800 text-neutral-300 text-xs font-black uppercase tracking-wider rounded-full border border-neutral-750 hover:bg-neutral-700 transition"
              >
                Browse Marketplace
              </a>
            </div>
          </div>
          
          <div className="flex-1 w-full md:max-w-md bg-neutral-900/60 backdrop-blur-md rounded-3xl border border-neutral-800 p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 text-[10px] text-zinc-500 font-mono">
              BTSW-SKILL-MODULE // 02
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Active Studio Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-neutral-950 p-3 rounded-xl border border-neutral-850">
                  <span className="text-xs text-zinc-400">Scheduled Masterclasses</span>
                  <span className="text-xs text-[#F16736] font-bold">3 Sprints Booked</span>
                </div>
                <div className="flex justify-between items-center bg-neutral-950 p-3 rounded-xl border border-neutral-850">
                  <span className="text-xs text-zinc-400">Syllabus Format</span>
                  <span className="text-xs text-white font-mono">Hands-on Sprints</span>
                </div>
                <div className="flex justify-between items-center bg-neutral-950 p-3 rounded-xl border border-neutral-850">
                  <span className="text-xs text-zinc-400">Market Assets Available</span>
                  <span className="text-xs text-emerald-400 font-bold">Instantly Downloadable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MISSION, APPROACH & TARGET AUDIENCE SECTION */}
      <section className="py-20 md:py-28 px-6 bg-[#faf9f7] border-b border-[#e8e5e0]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl text-left space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#F16736] font-mono">
              ⚡ OUR MISSION & APPROACH
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1e1e1e] tracking-tight">
              A Project-Based Digital Foundry
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
              The Skill Hut was built to solve the gap between university grades and actual high-income digital capability. We focus on training your critical taste, building absolute technical precision, and installing the business frameworks necessary to secure international creative contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#e8e5e0] text-left space-y-4 shadow-sm hover:border-[#F16736] transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#fff1eb] flex items-center justify-center text-2xl">
                🎯
              </div>
              <h3 className="text-lg font-black text-[#1e1e1e]">Absolute Focus</h3>
              <p className="text-xs md:text-sm text-neutral-500 leading-relaxed leading-normal">
                No empty filler or long vocabulary quizzes. You will learn typography hierarchies, 8px grid alignments, semantic layout coding, and client billing procedures directly.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#e8e5e0] text-left space-y-4 shadow-sm hover:border-[#F16736] transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#fff1eb] flex items-center justify-center text-2xl">
                🚀
              </div>
              <h3 className="text-lg font-black text-[#1e1e1e]">Learn by Shipping</h3>
              <p className="text-xs md:text-sm text-neutral-500 leading-relaxed leading-normal">
                Every single classroom task is a block added to your client portfolio. You won't study to memorize; you'll build assets that validate your value instantly.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#e8e5e0] text-left space-y-4 shadow-sm hover:border-[#F16736] transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#fff1eb] flex items-center justify-center text-2xl">
                💼
              </div>
              <h3 className="text-lg font-black text-[#1e1e1e]">Contract Mechanics</h3>
              <p className="text-xs md:text-sm text-neutral-500 leading-relaxed leading-normal">
                We equip you with direct outreach architectures, custom proposal drafts, and invoice setups to handle corporate contracts confidently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. UPCOMING MASTERCLASSES */}
      <section id="upcoming" className="py-20 md:py-28 px-6 bg-white border-b border-[#e8e5e0]">
        <div className="max-w-7xl mx-auto space-y-12 text-left">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#F16736] font-mono">
              📅 SCHEDULING CALENDAR
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1e1e1e]">
              Upcoming Technical Masterclasses
            </h2>
            <p className="text-sm text-neutral-500 font-semibold max-w-xl">
              Strictly custom blueprints presented live. Secure your registry slot to access interactive case sheets and assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingClasses.map((item) => (
              <div key={item.id} className="p-6 bg-[#faf9f7] rounded-3xl border border-[#e8e5e0] flex flex-col justify-between min-h-[220px] transition hover:shadow-lg">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase bg-[#fff1eb] text-[#F16736] px-2.5 py-0.5 rounded font-black border border-[#F16736]/10">
                      LIVE STREAM
                    </span>
                    <Clock size={14} className="text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-extrabold tracking-tight text-[#1e1e1e]">
                    {item.title}
                  </h3>
                  <div className="space-y-1 text-xs text-neutral-500 font-medium">
                    <p className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-[#F16736]" /> {item.date}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <User size={12} className="text-[#F16736]" /> {item.facilitator}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setRegisteringClass(item)}
                  className="mt-6 w-full py-2.5 bg-[#F16736] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition hover:bg-[#F16736]/90 cursor-pointer"
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PREVIOUS MASTERCLASSES */}
      <section className="py-20 md:py-28 px-6 bg-[#faf9f7] border-b border-[#e8e5e0]">
        <div className="max-w-7xl mx-auto space-y-12 text-left">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#F16736] font-mono">
              🎬 DIGITAL ARCHIVE
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1e1e1e]">
              Previous Masterclasses Replays
            </h2>
            <p className="text-sm text-neutral-500 font-semibold max-w-xl">
              Missed a custom live stream? Access previous audio loops, visual design grids, and facilitator notes instantly in high fidelity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previousClasses.map((item) => (
              <div key={item.id} className="p-6 bg-white rounded-3xl border border-[#e8e5e0] flex flex-col justify-between min-h-[220px] transition hover:shadow-lg">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded font-bold border border-neutral-200">
                      PAST ARCHIVE
                    </span>
                    <Play size={12} className="text-[#F16736]" />
                  </div>
                  <h3 className="text-lg font-extrabold tracking-tight text-[#1e1e1e]">
                    {item.title}
                  </h3>
                  <div className="space-y-1 text-xs text-neutral-500 font-medium">
                    <p className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-neutral-400" /> {item.date}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <User size={12} className="text-neutral-400" /> {item.facilitator}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setReplayingClass(item)}
                  className="mt-6 w-full py-2.5 bg-neutral-900 text-neutral-100 font-extrabold text-xs uppercase tracking-wider rounded-xl transition hover:bg-neutral-800 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Play size={12} fill="white" /> Watch Replay
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MARKETPLACE SECTION */}
      <section id="marketplace" className="py-20 md:py-28 px-6 bg-white border-b border-[#e8e5e0]">
        <div className="max-w-7xl mx-auto space-y-12 text-left">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#F16736] font-mono">
              💎 PREMIUM ASSET PACKS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1e1e1e]">
              Browse & Buy from the Skill Hut Marketplace
            </h2>
            <p className="text-sm text-neutral-500 font-semibold max-w-xl">
              Accelerate your workflow with custom generated Figma templates, direct-reach proposal decks, and battle-tested contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {marketplaceItems.map((item) => (
              <div key={item.id} className="p-8 bg-[#faf9f7] rounded-3xl border border-[#e8e5e0] flex flex-col justify-between min-h-[280px] relative overflow-hidden transition duration-300 hover:border-[#F16736] hover:shadow-md">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase bg-neutral-900 text-neutral-100 px-2.5 py-0.5 rounded font-bold">
                      <ShoppingBag size={10} /> digital resources
                    </span>
                    <span className="text-lg font-black text-[#F16736]">{item.price}</span>
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight text-[#1e1e1e]">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-semibold">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => setBuyingItem(item)}
                  className="mt-6 w-full py-3 bg-[#F16736] text-white font-black text-xs uppercase tracking-wider rounded-xl transition hover:bg-[#F16736]/90 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(241,103,54,0.2)]"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMMUNITY CTA */}
      <section className="py-24 px-6 bg-[#faf9f7] relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[#F16736]/5 mix-blend-color-dodge pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#fff1eb] border border-[#F16736]/20 rounded-full text-xs font-black uppercase text-[#F16736] tracking-widest">
            💬 VECTORS CHANNELS
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#1e1e1e] tracking-tight">
            Join Our Community
          </h2>
          <p className="text-sm md:text-base font-semibold text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Get instant updates on live design sprints, client critiques reviews, freelance contract opportunities, and connect with global fellow student creators across Africa.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://t.me/BTSW_Community_Placeholder" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-neutral-900 text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition hover:bg-[#1a1a1a] inline-flex items-center gap-2 group cursor-pointer"
            >
              Join BTSW Telegram <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <button 
              onClick={() => navigate('/portal')}
              className="px-8 py-4 bg-white text-neutral-800 font-extrabold text-xs uppercase tracking-widest rounded-full border border-neutral-300 transition hover:bg-neutral-50 cursor-pointer flex items-center gap-2"
            >
              Explore Study Portal <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== INTERACTIVE MODALS ==================== */}
      
      {/* 1. MASTERCLASS REGISTRATION MODAL */}
      <AnimatePresence>
        {registeringClass && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-neutral-200 max-w-md w-full p-6 space-y-6 relative shadow-2xl text-left"
            >
              <button 
                onClick={() => setRegisteringClass(null)}
                className="absolute top-4 right-4 text-neutral-450 hover:text-neutral-850 p-1"
              >
                <X size={18} />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase bg-[#fff1eb] text-[#F16736] px-2 py-0.5 rounded font-black">
                  SECURE YOUR SEAT
                </span>
                <h3 className="text-xl font-black text-[#1e1e1e] leading-snug">
                  {registeringClass.title}
                </h3>
                <p className="text-xs text-neutral-400 font-medium">
                  {registeringClass.date} // Facilitator: {registeringClass.facilitator}
                </p>
              </div>

              {successClass ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-sm font-extrabold text-emerald-800">Registration Confirmed!</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-semibold">
                    We've registered your active ledger slot. We will email your personal live stream credentials 30 minutes before kick-off.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterConfirm} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 block uppercase">Student Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe Abidemi"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full text-xs md:text-sm border border-neutral-300 rounded-xl px-3 py-2.5 bg-neutral-50 focus:outline-none focus:border-[#F16736]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 block uppercase">School Webmail or Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. student@unilag.edu.ng"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full text-xs md:text-sm border border-neutral-300 rounded-xl px-3 py-2.5 bg-neutral-50 focus:outline-none focus:border-[#F16736]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#F16736] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-[#F16736]/90 transition"
                  >
                    Confirm Registration
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. REPLAY WATCH MODAL */}
      <AnimatePresence>
        {replayingClass && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-neutral-900 text-white rounded-3xl border border-neutral-800 max-w-2xl w-full p-6 space-y-6 relative shadow-2xl text-left"
            >
              <button 
                onClick={() => setReplayingClass(null)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white p-1"
              >
                <X size={18} />
              </button>

              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase bg-neutral-950 text-[#F16736] px-2 py-0.5 rounded font-black border border-neutral-850">
                  PLAYBACK RECORDING
                </span>
                <h3 className="text-lg font-black text-white">
                  {replayingClass.title}
                </h3>
                <p className="text-xs text-zinc-400">
                  Archived live block // Speaker: {replayingClass.facilitator}
                </p>
              </div>

              {/* Fake Video Screen */}
              <div className="aspect-video bg-neutral-950 rounded-2xl border border-neutral-800 flex flex-col justify-between p-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-[#F16736]/5 animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-[#F16736] flex items-center justify-center text-white text-2xl shadow-lg cursor-pointer">
                    ▶
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 z-10">
                  <span>FACILITATOR SCREEN: ACTIVE STREAM</span>
                  <span className="text-red-400">● LIVE TIME PLAYBACK</span>
                </div>

                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 z-10 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[#F16736] rounded-full animate-ping" />
                    <span className="font-mono text-[10px]">01:45:20 BUFFERED</span>
                  </div>
                  <span className="text-zinc-400 font-mono">1080p WebStream</span>
                </div>
              </div>

              <div className="text-xs text-zinc-400 font-medium leading-relaxed bg-[#1b1b1b] p-3 rounded-xl border border-neutral-850">
                💡 <strong>Facilitator Note:</strong> &quot;Keep focus on the structural design token guides in page 12 of the resources style pack during playback analysis.&quot;
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MARKETPLACE BUY/CHECKOUT MODAL */}
      <AnimatePresence>
        {buyingItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-neutral-200 max-w-md w-full p-6 space-y-6 relative shadow-2xl text-left"
            >
              <button 
                onClick={() => setBuyingItem(null)}
                className="absolute top-4 right-4 text-neutral-450 hover:text-neutral-850 p-1"
              >
                <X size={18} />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase bg-[#fff1eb] text-[#F16736] px-2 py-0.5 rounded font-black">
                  MARKET CHECKOUT
                </span>
                <h3 className="text-xl font-black text-[#1e1e1e]">
                  Secure Resource Order
                </h3>
              </div>

              <div className="p-4 bg-[#faf9f7] rounded-2xl border border-[#e8e5e0] flex justify-between items-center">
                <div>
                  <p className="text-xs text-neutral-400 font-bold uppercase font-mono">RESOURCE ITEM</p>
                  <p className="text-sm font-black text-[#1e1e1e]">{buyingItem.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-neutral-400 font-bold uppercase font-mono">PRICE</p>
                  <p className="text-lg font-black text-[#F16736]">{buyingItem.price}</p>
                </div>
              </div>

              {successItem ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-sm font-extrabold text-emerald-800">Checkout Complete!</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-semibold">
                    We've verified your order flow ledger. A high-speed link containing download codes and active files has been dispatched to your mailbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBuyConfirm} className="space-y-4">
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-medium">
                    Payments are simulated securely. Enter your student email address below to receive high-fidelity links containing download formats instantly.
                  </p>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 block uppercase">Deliver to Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. buyer@unilag.edu.ng"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full text-xs md:text-sm border border-neutral-300 rounded-xl px-3 py-2.5 bg-neutral-50 focus:outline-none focus:border-[#F16736]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-neutral-900 text-white text-xs font-black uppercase tracking-wider rounded-xl transition hover:bg-neutral-800"
                  >
                    Simulate Payment ({buyingItem.price})
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
