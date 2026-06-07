import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Users, Ticket, CheckCircle2, Star, Sparkles, Send } from 'lucide-react';

export default function CatalystConference() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('student');
  const [registered, setRegistered] = useState(false);

  const speakers = [
    { name: "Olaosebikan Benson", role: "Product Designer & Visual Systems Architect", company: "BTSW Academic Lead", avatar: "OB" },
    { name: "Alhaji Musa Bala", role: "Logistics Expert & Commercial Merchant", company: "Musa Arbitrage Holdings", avatar: "AM" },
    { name: "Dr. Chioma Nwosu", role: "Nanoscience Scholar & Brain Systems Analyst", company: "Apex Neurological", avatar: "CN" }
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
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
              The Catalyst <span className="text-[#F16736]">Conference</span>
            </h1>
            <p className="text-neutral-500 font-medium text-sm md:text-base leading-relaxed">
              Gathering West Africa's leading young engineers, founders, and designers under one roof. Engage in intense design hackathons, networking mixers, and structural pitches.
            </p>
            <div className="flex gap-6 text-xs text-neutral-500 font-bold">
              <div className="flex items-center gap-1.5"><MapPin size={16} className="text-[#F16736]" /> Lagos, Nigeria</div>
              <div className="flex items-center gap-1.5"><Users size={16} className="text-[#F16736]" /> 500+ Attendees</div>
            </div>
          </div>

          <div className="p-8 border border-[#e8e5e0] rounded-[2.5rem] bg-[#faf9f7] relative space-y-6">
            <TicketingForm 
              registered={registered}
              name={name}
              email={email}
              category={category}
              onChangeName={setName}
              onChangeEmail={setEmail}
              onChangeCategory={setCategory}
              onSubmit={handleRegister}
            />
          </div>
        </div>

        {/* About detail */}
        <div className="space-y-6 text-left max-w-3xl">
          <h3 className="text-2xl font-black">What to expect inside the Catalyst Room</h3>
          <p className="text-sm text-neutral-500 leading-relaxed font-semibold">
            The Catalyst Conference is designed to establish authentic leverage. Attend technical sessions showing you how to bypass traditional job queues. Take part in the $1,000 "Fast-Build" hackathon where you clone real products in record time.
          </p>
        </div>

        {/* Speakers List */}
        <div className="space-y-6 pt-4 text-left">
          <h3 className="text-2xl font-black">Meet Our Featured Facilitators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {speakers.map((speaker, idx) => (
              <div key={idx} className="p-6 border border-[#e8e5e0] rounded-3xl bg-neutral-50/50 space-y-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#fff1eb] border border-[#F16736]/20 flex items-center justify-center text-[#F16736] font-bold text-sm">
                  {speaker.avatar}
                </div>
                <div>
                  <h4 className="font-extrabold text-neutral-800 text-sm">{speaker.name}</h4>
                  <p className="text-xs text-neutral-500 font-bold">{speaker.role}</p>
                  <p className="text-[10px] text-zinc-400 font-extrabold uppercase mt-1">{speaker.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Ticketing Helper Panel
interface FormProps {
  registered: boolean;
  name: string;
  email: string;
  category: string;
  onChangeName: (val: string) => void;
  onChangeEmail: (val: string) => void;
  onChangeCategory: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
}
function TicketingForm({ registered, name, email, category, onChangeName, onChangeEmail, onChangeCategory, onSubmit }: FormProps) {
  if (registered) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
          <CheckCircle2 size={32} />
        </div>
        <h4 className="text-xl font-black">Registration Secured!</h4>
        <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
          Check your email (<strong>{email}</strong>) for your QR Entrance Code. Looking forward to matching you with our startup partners on-campus.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-xl font-black">Secure Entry Pass</h3>
      <div className="space-y-1">
        <label className="block text-[10px] font-black uppercase text-neutral-500">Your Full Name</label>
        <input 
          type="text" 
          required
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          placeholder="e.g. Samuel Adekunle" 
          className="w-full p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:outline-none" 
        />
      </div>

      <div className="space-y-1">
        <label className="block text-[10px] font-black uppercase text-neutral-500">Your Email Address</label>
        <input 
          type="email" 
          required
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          placeholder="e.g. sam@gmail.com" 
          className="w-full p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:outline-none" 
        />
      </div>

      <div className="space-y-1">
        <label className="block text-[10px] font-black uppercase text-neutral-500">Attendee Category</label>
        <select 
          value={category}
          onChange={(e) => onChangeCategory(e.target.value)}
          className="w-full p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-bold focus:border-[#F16736] focus:outline-none"
        >
          <option value="student">Undergraduate student</option>
          <option value="highschooler">High School candidate</option>
          <option value="founder">Developer / Startup Promoter</option>
        </select>
      </div>

      <button 
        type="submit"
        className="w-full py-4 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all mt-2"
      >
        Submit Registration Request
      </button>
    </form>
  );
}
