import { motion } from 'motion/react';
import { Target, Award, Sparkles, Compass, Shield, Zap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EchelonProject() {
  const pillars = [
    { title: "Virtual Simulation Brain Game Training", desc: "Neuro-cognitive exercises that map execution velocity, strategic planning, and tactical precision.", path: "/echelon/brain-game-training" },
    { title: "Physical Tabletop Chess & Strategy Games", desc: "Offline leadership encounters that test patience, positioning, and tactical composure face-to-face.", path: "/echelon/tabletop-games" }
  ];

  return (
    <div className="bg-white min-h-screen text-[#1e1e1e] pt-24 pb-16 font-sans">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        
        {/* Banner Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff1eb] border border-[#F16736]/10 text-[#F16736] text-xs font-black tracking-widest uppercase">
              <Shield size={14} /> THE ECHELON PROJECT AFRICA
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-neutral-900">
              The Echelon <span className="text-[#F16736]">Project</span>
            </h1>
            <p className="text-neutral-500 font-medium text-sm md:text-base leading-relaxed">
              Establishing a decentralized hub for cognitive sports and tactical decision training across Africa. Engineering systems that test cognitive limits, strategic patience, and tactical composure.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/echelon/brain-game-training"
                className="px-8 py-4 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow hover:shadow-lg"
              >
                Scan Training Systems
              </Link>
            </div>
          </div>

          <div className="p-8 border border-[#e8e5e0] rounded-[2.5rem] bg-[#faf9f7] relative space-y-6">
            <h3 className="text-2xl font-black">Strategic Pillars</h3>
            <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
              We leverage gamified dynamics to foster mathematical precision and high-level behavioral strategies in young candidates. By combining computational simulation maps with grandmaster-level tabletop programs, we build solid mental frameworks.
            </p>
            <div className="border-t border-[#e8e5e0] pt-4 flex justify-between text-[10px] font-bold text-[#F16736]">
              <span>MISSION: ECO-SYSTEM INTENSITY</span>
              <span>EST. 2024</span>
            </div>
          </div>
        </div>

        {/* Pillars Choice Cards */}
        <div className="space-y-6">
          <div className="text-left font-sans max-w-xl">
            <h3 className="text-3xl font-black">Explore Our Divisions</h3>
            <p className="text-xs font-semibold text-neutral-500 mt-1">Select an academy partition below to read operational mechanics and join training cohorts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="p-8 border border-neutral-200 rounded-[2rem] bg-white text-left flex flex-col justify-between min-h-[250px] shadow-sm hover:border-[#F16736]/40 transition-all group"
              >
                <div className="space-y-4">
                  <span className="text-2xl font-black text-[#F16736]">Division 0{idx + 1}</span>
                  <h4 className="font-extrabold text-[#1e1e1e] text-xl group-hover:text-[#F16736] transition-colors">{pillar.title}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-semibold">{pillar.desc}</p>
                </div>
                <div className="pt-6 border-t border-neutral-50 mt-6">
                  <Link 
                    to={pillar.path}
                    className="text-xs font-black text-[#1e1e1e] group-hover:text-[#F16736] flex items-center gap-1 transition-colors"
                  >
                    Open Division Mechanics →
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
