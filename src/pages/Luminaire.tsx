import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ShieldCheck, Heart, User, Compass, ArrowRight, Star, Flame, Trophy, 
  MessageCircle, Send, LogOut, CheckCircle, ChevronRight, HelpCircle, Laptop, Smile, School
} from 'lucide-react';
import { getCurrentUser, setCurrentUser, getUsers, saveUsers, getScenarios } from '../lib/storage';
import { callSimulationAI, ChatMessage } from '../lib/anthropic';
import Logo from '../components/Logo';

const Luminaire = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(getCurrentUser());
  const [activeSegment, setActiveSegment] = useState<'landing' | 'login' | 'portal'>('landing');

  // Login form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorWord, setErrorWord] = useState<string | null>(null);

  // Portal States
  const [activeQuest, setActiveQuest] = useState<'quest-design' | 'quest-negotiate' | null>(null);
  const [questHistory, setQuestHistory] = useState<ChatMessage[]>([]);
  const [questInput, setQuestInput] = useState('');
  const [questLoading, setQuestLoading] = useState(false);
  const [questFinished, setQuestFinished] = useState(false);
  const [questVerdict, setQuestVerdict] = useState<{ score: number; review: string } | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.isLuminaireUser) {
      setSession(user);
      setActiveSegment('portal');
    } else {
      setActiveSegment('landing');
    }
  }, []);

  const handlePortalLogout = () => {
    setCurrentUser(null);
    setSession(null);
    setActiveSegment('landing');
  };

  const handleLuminaireLogin = (e: FormEvent) => {
    e.preventDefault();
    setErrorWord(null);

    const users = getUsers();
    const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (matched) {
      // Elevate or tag as Luminaire participant
      matched.isLuminaireUser = true;
      matched.luminaireTrack = matched.luminaireTrack || 'middle';
      
      setCurrentUser(matched);
      setSession(matched);
      setActiveSegment('portal');
    } else {
      setErrorWord('Oops! Check spelling. E.g. Try kid.genius@gmail.com with password123');
    }
  };

  // Pre-seed Luminaire Guest logins
  const handleQuickEnter = () => {
    const users = getUsers();
    let guest = users.find(u => u.email === 'kid.genius@gmail.com');

    if (!guest) {
      guest = {
        id: 'luminaire-guest',
        name: 'Kid Genius Bello',
        email: 'kid.genius@gmail.com',
        role: 'student',
        enrolledSchools: [],
        completedLessons: [],
        playgroundScores: [],
        streak: 3,
        isLuminaireUser: true,
        luminaireTrack: 'middle',
        joinedDate: new Date().toISOString().split('T')[0]
      };
      users.push(guest);
      saveUsers(users);
    }

    setCurrentUser(guest);
    setSession(guest);
    setActiveSegment('portal');
  };

  const handleQuestStart = (type: 'quest-design' | 'quest-negotiate') => {
    setActiveQuest(type);
    setQuestHistory([
      {
        sender: 'ai',
        text: type === 'quest-design' 
          ? "Hi there, little designer! I am Uncle Ola, owner of 'Ola Bread Shop'. I've heard you can design colorful bakery sticker logos for 1,500 NGN. But isn't that too expensive for just a single sticker? Convince me why I need your colorful layout logo!" 
          : "Hello! I am your strict Dad. You've asked for 2 extra hours of video-game time today. No way! Game-time destroys focus. Convince me firmly using what you learned about fair trades or negotiation swaps!",
        timestamp: 'Now'
      }
    ]);
    setQuestVerdict(null);
    setQuestFinished(false);
    setQuestInput('');
  };

  const handleQuestSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!questInput.trim() || questLoading || !activeQuest) return;

    const studentArg = questInput.trim();
    setQuestInput('');

    const newHist: ChatMessage[] = [
      ...questHistory,
      { sender: 'student', text: studentArg, timestamp: 'Now' }
    ];
    setQuestHistory(newHist);
    setQuestLoading(true);

    // Dynamic, delightful childlike responses
    setTimeout(() => {
      setQuestLoading(false);
      const turnCount = newHist.filter(m => m.sender === 'student').length;

      if (turnCount >= 3) {
        setQuestFinished(true);
        const score = studentArg.toLowerCase().includes('value') || studentArg.toLowerCase().includes('deal') || studentArg.toLowerCase().includes('please') ? 10 : 8;
        setQuestVerdict({
          score,
          review: `🌟 Incredible Quest progress! You successfully presented logical arguments.\n\nUncle Ola/Dad says: "You made highly thoughtful points with high respect. I will accept your terms!"\n\nReward: +50 Virtual Star Gems unlocked!`
        });
        setQuestHistory(prev => [...prev, { sender: 'ai', text: "🌟 Excellent! Let's submit this Quest to earn our sticker badges!", timestamp: 'Now' }]);
      } else {
        if (activeQuest === 'quest-design') {
          setQuestHistory(prev => [...prev, {
            sender: 'ai',
            text: "A sticker attracts customers? Hmm, but my customers already smell the bread. Why else should I pay 1,500 NGN? Try to offer me a test design or explain what graphics do!",
            timestamp: 'Now'
          }]);
        } else {
          setQuestHistory(prev => [...prev, {
            sender: 'ai',
            text: "Fair trade? What partition of home chores or math study will you swap for those 2 hours of gaming? Tell me your exact swap deal!",
            timestamp: 'Now'
          }]);
        }
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-200">
      
      {/* 1. PUBLIC LUMINAIRE LANDING PAGE */}
      {activeSegment === 'landing' && (
        <div className="text-left">
          
          {/* Header */}
          <nav className="p-6 bg-white border-b border-[#e8e5e0] flex items-center justify-between sticky top-0 z-30 shadow-sm">
            <Link to="/" className="flex items-center gap-2">
              <Logo className="h-10 w-auto" textClassName="text-2xl text-[#1e1e1e]" />
              <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                LUMINAIRE
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-neutral-600 hover:text-[#1e1e1e] hidden sm:block">
                BTSW Portal
              </Link>
              <button 
                onClick={() => setActiveSegment('login')}
                className="px-5 py-2.5 bg-[#F16736] hover:bg-[#F16736]/90 text-white font-black text-xs uppercase tracking-wider rounded-full transition-all shadow-md active:scale-95"
              >
                Go to Student Login
              </button>
            </div>
          </nav>

          {/* Hero Banner Grid layout */}
          <div className="relative overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-slate-50 py-16 md:py-24 px-6">
            <div className="absolute top-10 right-10 opacity-30 animate-pulse text-[#F16736]"><Star size={40} fill="currentColor" /></div>
            <div className="absolute bottom-10 left-10 opacity-20 text-[#F16736]"><Smile size={48} /></div>

            <div className="max-w-4xl mx-auto text-center space-y-6">
              <span className="text-xs font-black uppercase text-[#F16736] bg-[#fff1eb] border border-[#F16736]/15 px-4.5 py-2 rounded-full tracking-widest inline-block shadow-sm">
                Sparking Teen & Pre-Teen Capability
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-neutral-900 tracking-tight leading-tight">
                Where Young Minds Learn <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F16736] to-amber-500">Real-World Command.</span>
              </h1>
              <p className="text-sm sm:text-lg text-neutral-500 font-medium max-w-2xl mx-auto leading-relaxed">
                Luminaire Virtual Academy is BTSW's highly gamified junior branch. We prepare Nigerian pupils aged 10-17 with visual design skills, direct negotiation tactics, and leadership grit.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                <button 
                  onClick={() => setActiveSegment('login')}
                  className="px-8 py-4 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-black text-sm rounded-full transition-all shadow-lg active:scale-98 flex items-center gap-1.5"
                >
                  Enter Junior Workspace <ArrowRight size={16} />
                </button>
                <a 
                  href="#tracks-breakdown"
                  className="px-8 py-4 bg-white border border-[#e8e5e0] hover:border-zinc-400 text-neutral-700 font-black text-sm rounded-full transition-all"
                >
                  Explore Class Tracks
                </a>
              </div>
            </div>
          </div>

          {/* Core Tracks segment */}
          <div id="tracks-breakdown" className="max-w-5xl mx-auto px-6 py-16 space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-black text-[#1e1e1e] tracking-tight">Two Tailored Learning Directions</h2>
              <p className="text-sm text-neutral-500 font-medium max-w-md mx-auto">Age-appropriate timelines to construct solid portfolios early.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Pathfinder Track */}
              <div className="p-8 border border-[#e8e5e0] bg-white rounded-[2rem] space-y-6 shadow-sm flex flex-col justify-between hover:border-amber-400 transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-amber-50 border border-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                    <Compass size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-[#F16736] uppercase bg-[#fff1eb] px-2.5 py-1 rounded-full">AGES 10 - 13</span>
                    <h3 className="text-2xl font-black text-neutral-800 tracking-tight mt-2">The Pathfinder Track</h3>
                  </div>
                  <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                    Introductory puzzle blocks, digital sticker designs, and playground negotiation simulations (e.g. arguing chores with parental figures with absolute emotional composure).
                  </p>
                  
                  <div className="space-y-2 pt-3">
                    {['Figma shapes & vector badges', 'Practical chore-exchange logic', 'Earn school star-gem badges'].map((p, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-bold text-neutral-600">
                        <Star size={14} className="text-amber-500" fill="currentColor" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setActiveSegment('login')}
                  className="w-full py-4.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/50 font-black text-xs uppercase tracking-wider rounded-2xl transition-all mt-6"
                >
                  Join Pathfinder Cohort
                </button>
              </div>

              {/* Strategist Track */}
              <div className="p-8 border border-[#e8e5e0] bg-white rounded-[2rem] space-y-6 shadow-sm flex flex-col justify-between hover:border-rose-300 transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-rose-50 border border-rose-100 text-rose-500 rounded-full flex items-center justify-center">
                    <Laptop size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-rose-600 uppercase bg-rose-50 px-2.5 py-1 rounded-full">AGES 14 - 17</span>
                    <h3 className="text-2xl font-black text-neutral-800 tracking-tight mt-2">The Strategist Track</h3>
                  </div>
                  <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                    Visual web grids, managing miniature wholesale candy-stands inside high schools, logistics route structures, and full-fidelity dialogue cases.
                  </p>
                  
                  <div className="space-y-2 pt-3">
                    {['Layout column structures', 'Negotiate with local packaging labs', 'High school portfolio directories'].map((p, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-bold text-neutral-600">
                        <Star size={14} className="text-rose-500" fill="currentColor" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setActiveSegment('login')}
                  className="w-full py-4.5 bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200/50 font-black text-xs uppercase tracking-wider rounded-2xl transition-all mt-6"
                >
                  Join Strategist Cohort
                </button>
              </div>

            </div>
          </div>

          {/* Testimonial info widget for parents */}
          <div className="bg-white border-t border-b border-[#e8e5e0] py-16 px-6 text-left">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 space-y-2">
                <h3 className="text-2xl font-black text-neutral-800 tracking-tight">Parent Board Verification</h3>
                <p className="text-xs font-medium text-neutral-500 leading-normal">Our curriculum undergoes quarterly auditing to secure safety, high-grade moral standards, and practical outcomes.</p>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 pl-2">
                <div className="p-5 bg-slate-50 border border-neutral-100 rounded-2xl space-y-2">
                  <p className="text-[11px] font-semibold text-neutral-600 italic">"My daughter Abidemi created her local customized bakery sticker logbook inside Figma after just 3 weeks in Pathfinder."</p>
                  <p className="text-xs font-black text-neutral-800">— Mrs. Bello, Lagos Parent</p>
                </div>
                <div className="p-5 bg-slate-50 border border-neutral-100 rounded-2xl space-y-2">
                  <p className="text-[11px] font-semibold text-neutral-600 italic">"The Stoic guidelines taught my 15yo son to manage stressful exams with absolute calm and high performance."</p>
                  <p className="text-xs font-black text-neutral-800">— Dr. Adelaja, Ibadan Board Director</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 2. DEDICATED LUMINAIRE STUDENT LOGIN */}
      {activeSegment === 'login' && (
        <div className="min-h-screen flex items-center justify-center p-6 text-left bg-[#fffcfb]">
          <div className="w-full max-w-md bg-white border border-[#F16736]/15 rounded-[2.5rem] p-8 md:p-10 shadow-xl space-y-8 relative">
            <div className="absolute top-6 right-6 text-amber-400 opacity-60"><Star size={24} fill="currentColor" /></div>
            
            <button 
              onClick={() => setActiveSegment('landing')}
              className="px-3.5 py-1.5 border border-neutral-200 hover:bg-neutral-50 text-neutral-500 font-extrabold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-1 w-max"
            >
              ← Return
            </button>

            <div>
              <span className="text-[9px] font-black uppercase text-rose-500 bg-rose-50 px-3 py-1 rounded-full tracking-widest inline-block mb-3.5 border border-rose-100">
                LUMINAIRE CAMPUS
              </span>
              <h2 className="text-3xl font-black text-neutral-800 tracking-tight mb-1.5">Enter Junior Space</h2>
              <p className="text-xs font-bold text-neutral-500">Provide registration details or choose Instant Entry below.</p>
            </div>

            {errorWord && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-800 font-bold text-xs rounded-xl flex items-center gap-2">
                <HelpCircle size={16} className="text-red-500" />
                <span>{errorWord}</span>
              </div>
            )}

            <form onSubmit={handleLuminaireLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-neutral-600 mb-1">Your registered email</label>
                <input 
                  type="email" 
                  required
                  placeholder="kid.genius@gmail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-neutral-200 focus:border-[#F16736] focus:outline-none rounded-xl px-4 py-3.5 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-neutral-600 mb-1">Your passcode</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-neutral-200 focus:border-[#F16736] focus:outline-none rounded-xl px-4 py-3.5 text-xs font-semibold"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow active:scale-95 flex items-center justify-center gap-2"
              >
                Let me in! <ArrowRight size={14} />
              </button>
            </form>

            <div className="relative flex items-center justify-center pt-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-100"></div></div>
              <span className="relative px-3 bg-white text-[9px] font-bold uppercase text-neutral-400">⚡ Kid testing quick entry</span>
            </div>

            {/* Quick Guest loader */}
            <button
              onClick={handleQuickEnter}
              className="w-full py-3.5 bg-amber-50 hover:bg-amber-100 border border-amber-200/40 text-amber-800 hover:text-amber-900 font-black text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-1.5"
            >
              <Smile size={16} /> Load Kid Genius Profile
            </button>
          </div>
        </div>
      )}

      {/* 3. AGE-APPROPRIATE LUMINAIRE JUNIOR STUDENT PORTAL */}
      {activeSegment === 'portal' && session && (
        <div className="min-h-screen text-left flex flex-col justify-between bg-[#fffcf7]">
          
          {/* Header */}
          <header className="p-5 border-b border-neutral-200 bg-white flex items-center justify-between sticky top-0 z-20 shadow-sm">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-auto" textClassName="text-xl text-[#1e1e1e]" />
              <span className="text-[9px] bg-amber-100 text-amber-800 font-black px-2 py-0.5 rounded-full border border-amber-200">LUMINAIRE SPACE</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-200 font-black text-xs rounded-full px-3.5 py-1.5 shadow-sm">
                <Star size={14} fill="currentColor" className="text-amber-500 animate-spin" />
                <span>80 GEMS</span>
              </div>
              <button 
                onClick={handlePortalLogout}
                className="p-2 border border-dotted border-red-200 hover:bg-red-50 text-red-600 rounded-full cursor-pointer"
                title="Disconnect Space"
              >
                <LogOut size={16} />
              </button>
            </div>
          </header>

          <main className="flex-grow p-6 md:p-10 max-w-4xl w-full mx-auto space-y-10">
            
            {/* Friendly Kid welcome */}
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#fff1eb] to-amber-50 border border-[#F16736]/10 text-[#1e1e1e] flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm">
              <div className="space-y-3 max-w-md text-center sm:text-left">
                <span className="text-[10px] font-black uppercase text-[#F16736] tracking-widest bg-white border border-[#F16736]/10 px-3 py-1 rounded-full inline-block">
                  CAMPUS COHORT ID: LUMINAIRE-M10
                </span>
                <h2 className="text-3xl font-black tracking-tight leading-tight">Welcome, <span className="text-[#F16736]">{session.name}!</span></h2>
                <p className="text-xs text-neutral-600 leading-relaxed font-semibold">
                  Get ready to tackle fun weekly quests, craft colorful designs, and test your smart negotiation arguments against our AI simulation partners!
                </p>
              </div>

              <div className="text-center bg-white p-4 rounded-2xl border border-neutral-100 min-w-36 flex-shrink-0 shadow-sm relative">
                <div className="absolute -top-3 -right-3 text-amber-400"><Star size={20} fill="currentColor" className="animate-bounce" /></div>
                <span className="text-[9px] uppercase font-black text-neutral-400 block tracking-wider">Lumin Streak</span>
                <span className="text-2xl font-black mt-1 block flex items-center justify-center gap-1"><Flame size={20} className="text-[#F16736]" /> {session.streak} Days</span>
              </div>
            </div>

            {/* Quests Lists */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#1e1e1e]">DELIGHTFUL QUEST BOARD</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Sticker Quest */}
                <div className="p-6 bg-white border border-neutral-200 rounded-3xl space-y-4 flex flex-col justify-between hover:border-[#F16736] transition-all relative overflow-hidden group shadow-sm">
                  <div className="absolute top-4 right-4 text-emerald-500"><Smile size={24} /></div>
                  <div className="space-y-2 max-w-xs">
                    <span className="text-[9px] uppercase font-black tracking-wider text-amber-600 font-mono">TASK QUEST 1</span>
                    <h4 className="text-lg font-black text-[#1e1e1e] group-hover:text-[#F16736]">Ola Bread Shop Sticker Setup</h4>
                    <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                      Uncle Ola needs a sticker logo and thinks 1,500 NGN is too costly. Talk to him, explain layout design value of decals, and lock in your price!
                    </p>
                  </div>
                  <button 
                    onClick={() => handleQuestStart('quest-design')}
                    className="w-full py-3 bg-[#F16736] text-white hover:bg-[#F16736]/90 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-sm"
                  >
                    Enter Quest Area
                  </button>
                </div>

                {/* Dad Quest */}
                <div className="p-6 bg-white border border-neutral-200 rounded-3xl space-y-4 flex flex-col justify-between hover:border-[#F16736] transition-all relative overflow-hidden group shadow-sm">
                  <div className="absolute top-4 right-4 text-[#F16736]"><Trophy size={24} /></div>
                  <div className="space-y-2 max-w-xs">
                    <span className="text-[9px] uppercase font-black tracking-wider text-rose-600 font-mono">TASK QUEST 2</span>
                    <h4 className="text-lg font-black text-[#1e1e1e] group-hover:text-[#F16736]">Strict Dad Game-time Swap</h4>
                    <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                      Dad is blocking video game hours. Create a fair trade layout (like swapping chores or science study) to negotiate 2 extra hours securely!
                    </p>
                  </div>
                  <button 
                    onClick={() => handleQuestStart('quest-negotiate')}
                    className="w-full py-3 bg-neutral-900 hover:bg-[#F16736] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-sm"
                  >
                    Enter Quest Area
                  </button>
                </div>

              </div>
            </div>

            {/* Interactive simulation area in portal */}
            {activeQuest && (
              <div className="border border-[#F16736]/20 bg-white p-6 md:p-8 rounded-[2.5rem] space-y-6 shadow-lg text-left">
                <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
                  <span className="text-[10px] font-black uppercase text-[#F16736] bg-[#fff1eb] px-3 py-1 rounded-full">
                    ACTIVE SCENARIO CHAT ARENA
                  </span>
                  <button 
                    onClick={() => setActiveQuest(null)}
                    className="p-1 hover:bg-neutral-100 text-neutral-400 rounded-lg hover:text-neutral-700"
                  >
                    Close Arena
                  </button>
                </div>

                {/* Scroll messages */}
                <div className="space-y-4 max-h-72 overflow-y-auto p-3 bg-[#faf9f7] rounded-2xl border border-neutral-100">
                  {questHistory.map((m, mIdx) => (
                    <div key={mIdx} className={`flex ${m.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-3.5 rounded-2xl max-w-[85%] text-xs font-semibold leading-relaxed ${
                        m.sender === 'student'
                          ? 'bg-[#F16736] text-white rounded-br-none'
                          : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-none'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}

                  {questLoading && (
                    <div className="flex justify-start">
                      <div className="p-3 bg-neutral-100 rounded-xl text-xs font-bold text-neutral-400 animate-pulse flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-[#F16736] border-t-transparent rounded-full animate-spin" />
                        AI partner is reviewing...
                      </div>
                    </div>
                  )}
                </div>

                {/* Input block */}
                {!questFinished ? (
                  <form onSubmit={handleQuestSend} className="relative flex items-center">
                    <input 
                      type="text" 
                      required
                      placeholder="Write your polite but firm argument here..." 
                      value={questInput}
                      onChange={(e) => setQuestInput(e.target.value)}
                      className="w-full pl-4 pr-12 py-3.5 border border-neutral-200 focus:outline-none focus:border-[#F16736] rounded-xl text-xs font-semibold placeholder-zinc-400 bg-[#faf9f7]"
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#F16736] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                    >
                      <Send size={14} />
                    </button>
                  </form>
                ) : (
                  questVerdict && (
                    <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-4">
                      <div className="flex justify-between items-baseline pb-2 border-b border-amber-200/40">
                        <span className="text-xs font-black text-amber-800">QUEST RECORD COMPLETED</span>
                        <span className="text-2xl font-black text-[#F16736]">{questVerdict.score}/10 Stars</span>
                      </div>
                      <p className="text-xs leading-relaxed text-amber-900 font-bold whitespace-pre-line">{questVerdict.review}</p>
                      <button
                        onClick={() => { setActiveQuest(null); setQuestFinished(false); }}
                        className="px-6 py-2.5 bg-neutral-900 hover:bg-[#F16736] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg block mx-auto transition-all"
                      >
                        Claim Reward and Close Quest
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </main>

          <footer className="p-5 border-t border-neutral-100 bg-white text-center text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            © 2026 Luminaire Virtual Academy • Verified Junior Learning Ledger
          </footer>
        </div>
      )}

    </div>
  );
};

export default Luminaire;
