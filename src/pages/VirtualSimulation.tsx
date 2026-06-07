import { useState, FormEvent } from 'react';
import { Shield, Brain, Laptop, CheckCircle2 } from 'lucide-react';

export default function VirtualSimulation() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rank, setRank] = useState('none');
  const [submitted, setSubmitted] = useState(false);

  const modules = [
    { title: "Neuro-Cognitive Velocity Training", desc: "Interactive computer-based testing mapping reaction timing coefficients and decision logic thresholds." },
    { title: "Strategic Resource Management Maps", desc: "Build simulated operations models, matching supply vectors under high synthetic stress constraints." },
    { title: "Strategic Positioning Sprints", desc: "Computational multiplayer spatial matrix layouts that build deep situational awareness." }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen text-[#1e1e1e] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        
        {/* Banner Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff1eb] border border-[#F16736]/10 text-[#F16736] text-xs font-black tracking-widest uppercase">
              <Brain size={14} /> COGNITIVE DIVISION ACADEMIES
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-neutral-900">
              Virtual Simulation Brain Training
            </h1>
            <p className="text-neutral-500 font-medium text-sm md:text-base leading-relaxed">
              Experience the customized computer coaching platform designed to map, track, and double your critical decision-making speed through logical game theory frameworks.
            </p>
          </div>

          <div className="p-8 border border-[#e8e5e0] rounded-[2.5rem] bg-[#faf9f7] relative space-y-6">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-black">Assessment Queue Booked!</h4>
                <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                  We've successfully registered <strong>{name}</strong> onto our intake roster. Match invitations for cognitive baseline checks are dispatched via email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-black">Join intake roster</h3>
                
                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-neutral-500">Your Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Samuel Adeyemi" 
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
                    placeholder="e.g. sam@gmail.com" 
                    className="w-full p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:outline-none" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-neutral-500">Chess / Logic Rank (If any)</label>
                  <select 
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-bold focus:border-[#F16736] focus:outline-none"
                  >
                    <option value="none">Standard Beginner / Casual Gamer</option>
                    <option value="intermediate">Active Competitor (Chess.com Rating 1200+)</option>
                    <option value="expert">Provable Mastery (Fide Elo / Regional Honors)</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all mt-2"
                >
                  Submit Registration Request
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Modules information */}
        <div className="space-y-6 text-left max-w-3xl">
          <h3 className="text-2xl font-black">Our Logical Gameplay Architecture</h3>
          <p className="text-sm text-neutral-500 leading-relaxed font-semibold">
            By analyzing decision matrices under cognitive constraints, candidates establish systematic pathways to manage personal attention channels and tactical logic fields securely.
          </p>
        </div>

        {/* Module cards template */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-4">
          {modules.map((item, idx) => (
            <div key={idx} className="p-6 border border-[#e8e5e0] rounded-3xl bg-neutral-50/50 space-y-3">
              <span className="text-xs font-mono text-zinc-400 font-extrabold">COGNITIVE COMPONENT H-{idx + 1}</span>
              <h4 className="font-extrabold text-[#1e1e1e] tracking-tight">{item.title}</h4>
              <p className="text-xs text-neutral-500 font-semibold leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
