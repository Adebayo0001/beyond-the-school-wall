import { useState, FormEvent } from 'react';
import { Shield, Target, Trophy, CheckCircle2 } from 'lucide-react';

export default function TabletopGames() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [game, setGame] = useState('chess');
  const [submitted, setSubmitted] = useState(false);

  const localGames = [
    { title: "Strategic Tabletop Chess", desc: "Traditional turn-based planning modeling patience, tactical traps, defensive structures, and positional geometry." },
    { title: "Specialized Tactical Board Games", desc: "Modern grandmaster game layouts exploring resources gathering, regional logistics, and strategic trade channels." },
    { title: "Diplomatic Negotiations Table", desc: "Live round-table roleplaying matches evaluating coalition structures and tactical communications." }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen text-[#1e1e1e] pt-24 pb-16 font-sans">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        
        {/* Banner Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff1eb] border border-[#F16736]/10 text-[#F16736] text-xs font-black tracking-widest uppercase">
              <Shield size={14} /> COGNITIVE DIVISION ACADEMIES
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-neutral-900">
              Physical Tabletop & Board Games
            </h1>
            <p className="text-neutral-500 font-medium text-sm md:text-base leading-relaxed">
              Experience grandmaster-level tactical board games and chess matches. Unlocking critical planning filters, risk calculation, and real-time positioning metrics on a face-to-face spatial table.
            </p>
          </div>

          <div className="p-8 border border-[#e8e5e0] rounded-[2.5rem] bg-[#faf9f7] relative space-y-6">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-black">Position Confirmed!</h4>
                <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                  We've successfully registered <strong>{name}</strong> onto our next tabletop matches schedule. Detailed calendar blocks are sent to your mailbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-black">Register For Tabletop Sprints</h3>
                
                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-neutral-500">Your Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kolawole Davies" 
                    className="w-full p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:outline-none" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-neutral-500">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. kola@gmail.com" 
                    className="w-full p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:outline-none" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-neutral-500">Primary Game Choice</label>
                  <select 
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-bold focus:border-[#F16736] focus:outline-none"
                  >
                    <option value="chess">Strategic Tabletop Chess</option>
                    <option value="catan">Tactical Resource Board Games</option>
                    <option value="diplomacy">Diplomatic Round-Table Sprints</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all mt-2"
                >
                  Confirm Registration Request
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Informational descriptions */}
        <div className="space-y-6 text-left max-w-3xl">
          <h3 className="text-2xl font-black font-sans">Strategic Tabletop Encounters</h3>
          <p className="text-sm text-neutral-500 leading-relaxed font-semibold">
            In an era of hyper-fast screen interactions, spatial tabletop games teach slow, deep analytical planning, patience, and direct interpersonal coordination metrics. Meet regional players and learn together.
          </p>
        </div>

        {/* Core game options listing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-4">
          {localGames.map((item, idx) => (
            <div key={idx} className="p-6 border border-[#e8e5e0] rounded-3xl bg-neutral-50/50 space-y-3">
              <span className="text-xs font-mono text-zinc-400 font-extrabold">TABLETOP SPRINT H-{idx + 1}</span>
              <h4 className="font-extrabold text-[#1e1e1e] tracking-tight">{item.title}</h4>
              <p className="text-xs text-neutral-500 font-semibold leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}export {};
