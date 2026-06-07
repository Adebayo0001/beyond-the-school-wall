import { motion } from 'motion/react';
import { Play, Gamepad2, Trophy, Sparkles, Smile, Compass, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameBasedLearning() {
  const games = [
    {
      id: "game-negotiation",
      title: "The Lagos Bakery Hustle",
      description: "Pitch and negotiate with Uncle Ola, a streetwise bakery owner. Maintain your $1,500 target fee and secure a deposit.",
      icon: <Target className="text-amber-500" size={24} />,
      link: "/portal"
    },
    {
      id: "game-arbitrage",
      title: "Campus Beverage King",
      description: "Pitch Alhaji Musa inside the student transport park. Defend logistical margins and secure cargo on credit.",
      icon: <Compass className="text-sky-500" size={24} />,
      link: "/portal"
    },
    {
      id: "game-ethics",
      title: "The Vice-Principal's Audit",
      description: "Defend your leaders coaching platform from regulatory bans. Cite redundancy metrics under pressure.",
      icon: <Trophy className="text-[#F16736]" size={24} />,
      link: "/portal"
    }
  ];

  return (
    <div className="bg-white min-h-screen text-[#1e1e1e] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        
        {/* Hero Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff1eb] border border-[#F16736]/10 text-[#F16736] text-xs font-black tracking-widest uppercase">
              <Gamepad2 size={14} /> MIDDLE & HIGH SCHOOL PROGRAMS
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Game-Based <span className="text-[#F16736]">Learning</span>
            </h1>
            <p className="text-neutral-500 font-medium text-sm md:text-base leading-relaxed">
              Why cram abstract theories? Our immersive simulation arena tests your real-world communication, financial resourcefulness, and diplomatic reflexes in gamified, intense situational roleplays.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/portal"
                className="px-8 py-4 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-extrabold text-xs uppercase tracking-wider rounded-full transition-all hover:shadow-lg"
              >
                Enter Playground Arena
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F16736]/10 to-transparent rounded-[2.5rem] -rotate-2 scale-105 pointer-events-none" />
            <div className="p-8 border-2 border-[#e8e5e0] rounded-[2.5rem] bg-[#faf9f7] relative space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 font-bold block">SIMULATION PROTOCOL ACTIVED</span>
                <h3 className="text-xl font-black">Lagos Hustle Arena</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                  "Ah, $1,500 for a logo? Little designer, that's too expensive! In this market, we must negotiate."
                </p>
              </div>
              <div className="pt-2 border-t border-neutral-200 flex justify-between items-center text-[10px] font-bold text-[#F16736]">
                <span>DIFFICULTY: AMATEUR</span>
                <span>SYSTEM ONLINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl font-black">Our Pedagogical Directives</h2>
            <p className="text-xs font-semibold text-neutral-500">Every lesson culminates in active roleplaying scenarios backed by instant AI evaluation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[
              { title: "No Paper Exams", desc: "Test performance by convincing realistic clients, investors, and authorities.", icon: <Sparkles size={20} className="text-[#F16736]" /> },
              { title: "Immediate Feedback", desc: "Anthropic Claude analyzes your language, empathy, and negotiation brackets instantly.", icon: <Zap size={20} className="text-amber-500" /> },
              { title: "Soulbound Certificates", desc: "Succeed above 9/10 within any simulation to automatically mint verifiable achievements.", icon: <Trophy size={20} className="text-sky-500" /> }
            ].map((item, idx) => (
              <div key={idx} className="p-6 border border-[#e8e5e0] rounded-3xl bg-neutral-50/50 space-y-3 text-left">
                <div className="p-3 bg-white border border-neutral-100 rounded-2xl w-max shadow-sm">{item.icon}</div>
                <h4 className="font-extrabold text-[#1e1e1e]">{item.title}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Games */}
        <div className="space-y-6 pt-4">
          <h3 className="text-2xl font-black text-left">Available Scenarios Connected</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.map((game, idx) => (
              <div key={idx} className="p-6 border border-[#e8e5e0] rounded-3xl bg-white hover:border-[#F16736]/40 transition-all flex flex-col justify-between text-left shadow-sm">
                <div className="space-y-4">
                  <div className="p-3 bg-[#faf9f7] rounded-xl w-max border border-[#e8e5e0]">{game.icon}</div>
                  <h4 className="font-extrabold text-neutral-800 tracking-tight text-lg">{game.title}</h4>
                  <p className="text-xs text-neutral-500 font-medium leading-relaxed">{game.description}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-neutral-50">
                  <Link 
                    to={game.link}
                    className="text-xs font-black text-[#F16736] hover:underline flex items-center gap-1"
                  >
                    Launch in Student Dashboard →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
