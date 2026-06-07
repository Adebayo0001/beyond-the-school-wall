import { motion } from 'motion/react';
import { Target, Award, Sparkles, Compass, CheckCircle2, Flame, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Thryb8() {
  const tracks = [
    { title: "Technical Drafting & UI", desc: "Construct mobile layouts, define typography pairing grids, and establish complete design files for startups." },
    { title: "Distributed Web-App Mechanics", desc: "Understand database schemes, server endpoints, and deployment setups using React and Tailwind." },
    { title: "Conversational Commercial Sales", desc: "Master cold DMs, proposal writing, commercial anchors, and lead conversion strategies." }
  ];

  return (
    <div className="bg-white min-h-screen text-[#1e1e1e] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff1eb] border border-[#F16736]/10 text-[#F16736] text-xs font-black tracking-widest uppercase">
              <Award size={14} /> Vocational Program H16–18
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Thryb<span className="text-[#F16736]">8</span> Program
            </h1>
            <p className="text-neutral-500 font-medium text-sm md:text-base leading-relaxed">
              An elite 8-week vocational accelerator for young adults (ages 16–18) looking to skip useless academic fluff and secure direct economic independence through design, engineering, and digital trade.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/register"
                className="px-8 py-4 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-extrabold text-sm uppercase tracking-wider rounded-full transition-all hover:shadow-lg"
              >
                Apply Into Cohort
              </Link>
            </div>
          </div>
          
          <div className="p-8 border border-[#e8e5e0] rounded-[2.5rem] bg-[#faf9f7] relative space-y-6">
            <div className="absolute top-6 right-6 text-[#F16736]"><Flame className="animate-pulse" size={24} /></div>
            <h3 className="text-2xl font-black">Cohort H-8 Allocation</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="text-[#F16736] flex-shrink-0" size={18} />
                <p className="text-xs text-neutral-600 font-semibold leading-relaxed"><strong>Guaranteed Proof-of-Work:</strong> Graduate with 3 real-world portfolio web deployments. No theoretical resumes.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-[#F16736] flex-shrink-0" size={18} />
                <p className="text-xs text-neutral-600 font-semibold leading-relaxed"><strong>Lagos Startup Network:</strong> Showcase your builds to active recruiters and technical coordinators during demo sprints.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-[#F16736] flex-shrink-0" size={18} />
                <p className="text-xs text-neutral-600 font-semibold leading-relaxed"><strong>Commercial Mentorship:</strong> Direct feedback from seasoned product leaders inside West African tech sectors.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tracks Section */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl font-black">Specialize in Elite Tracks</h2>
            <p className="text-xs font-semibold text-neutral-500">Choose one core vector to master over the 8-week accelerator period.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {tracks.map((track, idx) => (
              <div key={idx} className="p-6 border border-[#e8e5e0] rounded-3xl bg-white text-left space-y-3 shadow-sm hover:border-[#F16736]/30 transition-all">
                <span className="text-lg font-black text-[#F16736]">0{idx + 1}</span>
                <h4 className="font-extrabold text-[#1e1e1e] tracking-tight">{track.title}</h4>
                <p className="text-xs text-neutral-500 font-semibold leading-relaxed">{track.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Information */}
        <div className="p-8 md:p-12 border border-[#e8e5e0] rounded-[2.5rem] bg-neutral-50/50 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="space-y-4 max-w-xl">
            <h3 className="text-2xl font-black">How to Join Thryb8</h3>
            <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
              Applications are reviewed on a rolling basis. Candidate selection focuses purely on raw grit, analytical competency, and willingness to learn under intense, structured pressure. No formal diplomas needed.
            </p>
          </div>
          <Link
            to="/register"
            className="px-8 py-4 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex-shrink-0 text-center w-full md:w-auto"
          >
            Submit Application Form
          </Link>
        </div>

      </div>
    </div>
  );
}
