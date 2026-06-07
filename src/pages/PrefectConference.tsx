import { useState, FormEvent } from 'react';
import { Calendar, MapPin, Users, CheckCircle2 } from 'lucide-react';

export default function PrefectConference() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
  const [registered, setRegistered] = useState(false);

  const keyTakeaways = [
    { title: "Diplomatic Crisis Resolution", desc: "How to de-escalate hostel tension or disputes objectively without losing authority." },
    { title: "Leadership Redundancy", desc: "Build secondary administrative committees to prevent burnout or dropping grades." },
    { title: "Character Ethics Modeling", desc: "Modeling a professional, stoic demeanor that commands respect naturally." }
  ];

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !school) return;
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
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
              The Prefect <span className="text-[#F16736]">Conference</span>
            </h1>
            <p className="text-neutral-500 font-medium text-sm md:text-base leading-relaxed">
              The premium leadership program targeted at Junior and Senior Secondary School prefects across Nigeria. Unlocking character ethics, group governance models, and systemic discipline frameworks.
            </p>
            <div className="flex gap-6 text-xs text-neutral-500 font-bold">
              <div className="flex items-center gap-1.5"><MapPin size={16} className="text-[#F16736]" /> Ibadan, Nigeria</div>
              <div className="flex items-center gap-1.5"><Users size={16} className="text-[#F16736]" /> 300+ Young Leaders</div>
            </div>
          </div>

          <div className="p-8 border border-[#e8e5e0] rounded-[2.5rem] bg-[#faf9f7] relative space-y-6">
            {registered ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-black">Admitted To Delegation!</h4>
                <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                  We have registered your application representing <strong>{school}</strong>. An email notification contains confirmation details for your head teacher.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <h3 className="text-xl font-black">Register School Delegation</h3>
                
                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-neutral-500">Student Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ebuka Okafor" 
                    className="w-full p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:outline-none" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-neutral-500">Contact Email</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. headteacher@school.org" 
                    className="w-full p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:outline-none" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-neutral-500">Your School Name</label>
                  <input 
                    type="text" 
                    required
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="e.g. Loyola Jesuit College" 
                    className="w-full p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:outline-none" 
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all mt-2"
                >
                  Submit Delegation Form
                </button>
              </form>
            )}
          </div>
        </div>

        {/* What to expect */}
        <div className="space-y-6 text-left max-w-3xl">
          <h3 className="text-2xl font-black">Strategic Governance Takeaways</h3>
          <p className="text-sm text-neutral-500 leading-relaxed font-semibold">
            Being a school prefect is the first testing ground for administrative capacity. We gather elite student delegates to teach them stoic behavior patterns, emotional boundaries under pressure, and how to represent school bodies elegantly.
          </p>
        </div>

        {/* Takeaway Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-4">
          {keyTakeaways.map((item, idx) => (
            <div key={idx} className="p-6 border border-[#e8e5e0] rounded-3xl bg-neutral-50/50 space-y-3 shadow-xs">
              <span className="text-xs font-black uppercase text-[#F16736] tracking-wider">Module 0{idx + 1}</span>
              <h4 className="font-extrabold text-[#1e1e1e] tracking-tight">{item.title}</h4>
              <p className="text-xs text-neutral-500 font-semibold leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
