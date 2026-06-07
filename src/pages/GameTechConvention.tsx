import { useState, FormEvent } from 'react';
import { Calendar, MapPin, Users, CheckCircle2 } from 'lucide-react';

export default function GameTechConvention() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState('pc');
  const [registered, setRegistered] = useState(false);

  const features = [
    { title: "AI Simulation Engines", desc: "Understand how neural roleplayers evaluate user arguments and score strategic communications out of 10." },
    { title: "African Indie Game Spotlights", desc: "Playtest localized, custom tabletop and digital strategy games engineered by Nigerian indie studios." },
    { title: "Interactive Workshop Runs", desc: "Design a board-game mechanic or digital workflow with facilitators under three-hour hack guidelines." }
  ];

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setRegistered(true);
  };

  return (
    <div className="bg-white min-h-screen text-[#1e1e1e] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        
        {/* Banner Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff1eb] border border-[#F16736]/10 text-[#F16736] text-xs font-black tracking-widest uppercase">
              <Calendar size={14} /> EXCLUSIVE SUMMITS & CONFERENCES
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
              Game Tech <span className="text-[#F16736]">Convention</span>
            </h1>
            <p className="text-neutral-500 font-medium text-sm md:text-base leading-relaxed">
              Where simulation math meets experiential education. Discover how gamified interfaces, multiplayer roleplay networks, and intelligent conversational tools are transforming modern learning ecosystems.
            </p>
            <div className="flex gap-6 text-xs text-neutral-500 font-bold">
              <div className="flex items-center gap-1.5"><MapPin size={16} className="text-[#F16736]" /> Abuja, Nigeria</div>
              <div className="flex items-center gap-1.5"><Users size={16} className="text-[#F16736]" /> 400+ Tech Pioneers</div>
            </div>
          </div>

          <div className="p-8 border border-[#e8e5e0] rounded-[2.5rem] bg-[#faf9f7] relative space-y-6">
            {registered ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-black">Convention Pass Issued!</h4>
                <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                  Ticket registration completed successfully for <strong>{email}</strong>. We've compiled your credentials and locked down your demo workspace. See you in Abuja!
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <h3 className="text-xl font-black">Secure Dev Tickets</h3>
                
                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-neutral-500">Your Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Amina Bello" 
                    className="w-full p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:outline-none" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-neutral-500">Your Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. amina@gmail.com" 
                    className="w-full p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:outline-none" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-neutral-500">Primary Platform Focus</label>
                  <select 
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-bold focus:border-[#F16736] focus:outline-none"
                  >
                    <option value="board-games">Tabletop & Board Game Mechanics</option>
                    <option value="pc">Digital Simulation Engines (React/AI)</option>
                    <option value="mobiles">Mobile Gaming & Game Loops</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all mt-2"
                >
                  Confirm Pass Reservation
                </button>
              </form>
            )}
          </div>
        </div>

        {/* What to expect */}
        <div className="space-y-6 text-left max-w-3xl">
          <h3 className="text-2xl font-black">Experience Next-Gen Immersive Learning</h3>
          <p className="text-sm text-neutral-500 leading-relaxed font-semibold">
            Game Tech Convention unites developers, game designers, and progressive educators. From simulation neural systems tracking student negotiation skills, to physical tabletop strategy modeling character ethics, experience tactical gameplay designed to educate.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-4">
          {features.map((item, idx) => (
            <div key={idx} className="p-6 border border-[#e8e5e0] rounded-3xl bg-neutral-50/50 space-y-3">
              <span className="text-xs font-black uppercase text-[#F16736] tracking-wider">Spotlight 0{idx + 1}</span>
              <h4 className="font-extrabold text-[#1e1e1e] tracking-tight">{item.title}</h4>
              <p className="text-xs text-neutral-500 font-semibold leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
