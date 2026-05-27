import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Check, Calendar, Clock, Users, ArrowUpRight, 
  MessageCircle, Coins, Award, Sparkles, Dumbbell, ShieldCheck, Zap,
  PlayCircle, FileText, CheckCircle2, Play, ArrowRight
} from 'lucide-react';
import { ProgramDetailData } from '../types';

// Structured detailed data for each program
const programDetails: Record<string, ProgramDetailData> = {
  "the-magnet-school": {
    slug: "the-magnet-school",
    title: "The Magnet School",
    kicker: "Leadership & Character",
    duration: "12 Weeks (Full Cohort Match)",
    difficulty: "Advanced Intellectual Study",
    audience: "Aspiring student leaders, community organisers, writers, and change vectors who seek intellectual depth and solid character.",
    intro: "The elite leadership track for high-level thinkers. We don't teach you how to follow rules; we prepare you to build platforms, organize human capital, and command influence.",
    description: "Our flagship program designed for deep intellectual growth and character development. We focus on raising men and women of substance who can lead with clarity and purpose. Through rigorous study and community engagement, you'll develop the mental fortitude required for high-level leadership in the 21st century.",
    image: "https://picsum.photos/seed/magnet/800/600",
    cta: "Apply for Next Cohort",
    features: [
      "Rigor & Dialectic Criticism",
      "Character Architecture and Ethics",
      "Social-Capital Mapping & Networking",
      "Geopolitical and Historical Realities"
    ],
    accentColor: "#F16736",
    bgDecorative: "bg-[#fff1eb]",
    cohortDate: "First Saturday of the Next Quarter",
    curriculum: [
      {
        week: "Weeks 1-3",
        title: "The Self & Character Blueprint",
        description: "Breaking personal boundaries, identifying biases, and setting the psychological groundwork for extreme ownership and intellectual fortitude.",
        topics: ["Philosophical Stoicism", "Ego & Blind Spots", "Frameworks of Personal Ethics"]
      },
      {
        week: "Weeks 4-6",
        title: "The Art of Dialectic & Rhetoric",
        description: "How to deconstruct arguments, think in structures rather than sentiment, and communicate difficult ideas with power and clarity.",
        topics: ["Formal Logic Foundations", "Persuasive Public Discourse", "Writing with Purpose and Substance"]
      },
      {
        week: "Weeks 7-9",
        title: "Power, Networks & Platforms",
        description: "Analyzing the global and regional structures of influence, building strategic relationships, and maintaining platform integrity.",
        topics: ["Social Capital Mapping", "Alliance Building Elements", "Digital Platform Architectures"]
      },
      {
        week: "Weeks 10-12",
        title: "Capstone Assembly & Strategy",
        description: "Working in teams on real community design case-studies and presenting your policy or structural solutions to the board of directors.",
        topics: ["Crisis Control Simulations", "High-Impact Institutional Pitches", "The Lifetime Magnet Oath"]
      }
    ]
  },
  "the-skill-hut": {
    slug: "the-skill-hut",
    title: "The Skill Hut",
    kicker: "Digital Skill Acquisition",
    duration: "8 Weeks (Project-Based Sprint)",
    difficulty: "Beginner to Pro Hands-on",
    audience: "Students, freelancers, and builders who want to translate visual creativity, logic, or text into valuable services traded on international markets.",
    intro: "Learn by shipping real-world things. We bypass empty theoretical lectures to give you direct access to the files, code, and systems that generate capital.",
    description: "Master high-income digital skills that the global market actually demands. From creative design to technical execution, we provide project-based learning that translates directly into economic value. Stop learning for grades and start learning for impact and income in a digital-first economy.",
    image: "https://picsum.photos/seed/skill/800/600",
    cta: "Join the Studio Sprint",
    features: [
      "Real Client Project Portfolios",
      "Active Peer Code Reviews",
      "Modern Tooling Focus (Figma, Framer, Code)",
      "Global Pricing & Invoice Strategies"
    ],
    accentColor: "#F16736",
    bgDecorative: "bg-[#fff1eb]",
    cohortDate: "Admissions Rolling - Instant Access Mode",
    curriculum: [
      {
        week: "Weeks 1-2",
        title: "Visual Hierarchy & Layout Psychology",
        description: "Understanding color theory, negative space, and typographic scale. We train your eye to recognize high-end international digital assets.",
        topics: ["Figma Basics & Vectors", "The Grid System", "Copying Great Design to Learn Style"]
      },
      {
        week: "Weeks 3-4",
        title: "Technical Translation & Execution",
        description: "Converting mockups into live, responsive, accessible web environments without getting bogged down by useless academic overhead.",
        topics: ["Semantic Markup Structure", "Tailwind CSS & Mobile-First Coding", "Component Reuse & Readability"]
      },
      {
        week: "Weeks 5-6",
        title: "The Freelancer's Asset Pack",
        description: "Developing custom resources, UI templates, or style kits that represent your modular value proposition. Building your personal portfolio site.",
        topics: ["Case Study Construction", "Aesthetic Framing for Portfolios", "Figma Auto-Layout & Design Systems"]
      },
      {
        week: "Weeks 7-8",
        title: "Monetisation Mechanics",
        description: "Setting up invoice setups, defining scope of work documents, talking to clients, and securing international gigs from Nigeria.",
        topics: ["Upwork and LinkedIn Positioning", "Direct Outreach Architecture", "Pricing by Value vs Hours"]
      }
    ]
  },
  "cash-on-campus": {
    slug: "cash-on-campus",
    title: "Cash On Campus",
    kicker: "Financial & Tactical Intelligence",
    duration: "6 Weeks (Intensive Bootcamp)",
    difficulty: "All Levels Welcome",
    audience: "Undergraduates navigating tight student finances who want to build real, low-overhead campus startups or reliable side-hustles.",
    intro: "You don't need a million naira to start. Build mini businesses using local arbitrage, community networks, and specific student needs.",
    description: "Financial intelligence tailored specifically for the modern student ecosystem. We teach you how to build sustainable income streams while navigating your academic journey. Learn the principles of entrepreneurship, investment, and financial management that traditional school won't teach you.",
    image: "https://picsum.photos/seed/cash/800/600",
    cta: "Unlock the Cash Blueprint",
    features: [
      "Low-Overhead Micro Startup Blueprints",
      "High-Value Service Provision",
      "Budgeting & Direct Capital Re-investment",
      "Real campus case studies with full numbers"
    ],
    accentColor: "#F16736",
    bgDecorative: "bg-[#fff1eb]",
    cohortDate: "Upcoming Live Session Next Saturday",
    curriculum: [
      {
        week: "Weeks 1-2",
        title: "Campus Demand & Arbitrage",
        description: "Identifying pain points inside your university dorms, lecture theaters, and student groups, and setting up instant-delivery services.",
        topics: ["The Student Pain Point Matrix", "Arbitraging Local Logistics", "Low-cost Supply Chains on Campus"]
      },
      {
        week: "Weeks 3-4",
        title: "Service Package Design",
        description: "How to package formatting, tutorials, tutoring, graphic design, or event organization so students see massive immediate value.",
        topics: ["Defining Your Core Offer", "Setting Easy Payment Terms", "Viral Campus WhatsApp Marketing"]
      },
      {
        week: "Weeks 5-6",
        title: "The Re-investment Engine",
        description: "Managing your money. Knowing how much to spend on your food/accommodation vs what to pump back into growing your campus machine.",
        topics: ["Cashflow vs Profit", "Student Investment Funds", "Graduating to Off-Campus Businesses"]
      }
    ]
  },
  "the-mental-application-study": {
    slug: "the-mental-application-study",
    title: "The Mental Application Study",
    kicker: "Cognitive Performance Engineering",
    duration: "10 Weeks (Rigorous Reading Circle)",
    difficulty: "Very Challenging",
    audience: "Academicians, system designers, developers, and researchers seeking to build ultimate mental focus, decision accuracy, and cognitive endurance.",
    intro: "Overhaul your neural processing capabilities. Learn the models and frameworks used by history's greatest polymaths, military commanders, and product architects.",
    description: "A deep dive into cognitive development and the psychology of execution. Understand how to optimize your brain for strategic thinking and complex problem-solving. This program is for those who want to master their minds and achieve peak performance in any field through mental discipline.",
    image: "https://picsum.photos/seed/mental/800/600",
    cta: "Request Admission",
    features: [
      "Advanced Mental Modeling",
      "Cognitive Focus & Anti-Distraction Auditing",
      "Mental Simulation Playbooks",
      "Systems Thinking & Loop Logic"
    ],
    accentColor: "#F16736",
    bgDecorative: "bg-[#fff1eb]",
    cohortDate: "Registration via Interview Only",
    curriculum: [
      {
        week: "Weeks 1-3",
        title: "Anti-Distraction Architectural Systems",
        description: "Protecting your attention in a hyper-stimulated world. Setting up offline regimes, strict workflow structures, and deep work setups.",
        topics: ["The Attention Balance Sheet", "Vite/Focus Environment Audits", "Analog Thinking Sprints"]
      },
      {
        week: "Weeks 4-6",
        title: "Mental Models & First Principles",
        description: "Deconstructing a problem to its physical limits so you can derive novel solutions instead of copycatting existing models.",
        topics: ["The Pareto Law Applied", "Inversion Thinking Strategies", "Second-Order Consequence Trees"]
      },
      {
        week: "Weeks 7-8",
        title: "Systems Dynamics & Feedback Loops",
        description: "Understanding complex systems—how a small tweak inside one component of an ecosystem cascades to trigger major shifts elsewhere.",
        topics: ["Reinforcing vs Balancing Loops", "Bottleneck Extraction", "Input/Output Mismatch Maps"]
      },
      {
        week: "Weeks 9-10",
        title: "Stress Testing & Execution Psychology",
        description: "How to make critical decisions when resources are tight, deadlines are immediate, and peer pressure is at its maximum.",
        topics: ["Decision Trees under Fire", "Combat-Grade Strategic Mental Maps", "The High-Performance Routine Builder"]
      }
    ]
  },
  "crash-course": {
    slug: "crash-course",
    title: "Crash Course",
    kicker: "Rapid Skill Activation",
    duration: "Self-Paced (Instant Start Modules)",
    difficulty: "Entry Level & Quick-Start",
    audience: "Busy, ambitious minds looking to build immediate cognitive starter kits, understand digital tools, and find rapid momentum for visual ideas.",
    intro: "No fluff, no filler, no 12-week lock-in. A quick-launch pad where you can download actionable resources, watch modular videos, and implement the same evening.",
    description: "Rapid-fire learning sessions designed to jumpstart your innovation journey. These micro-degrees focus on specific, actionable insights that you can implement immediately. Perfect for the busy student who needs high-impact knowledge in a condensed timeframe to stay ahead of the curve.",
    image: "https://picsum.photos/seed/crash/800/600",
    cta: "Unlock the Instant Vault",
    features: [
      "No Lectures, Pure Frameworks",
      "Resource Toolkits & Cheat Sheets",
      "Active Project Template Downloads",
      "Lifetime Community Upgrades"
    ],
    accentColor: "#F16736",
    bgDecorative: "bg-[#fff1eb]",
    cohortDate: "Access is Instant on Application",
    curriculum: [
      {
        week: "Module 1",
        title: "The Creative Ignition Blueprint",
        description: "Overcoming fear of empty mockups and shipping dynamic, clean, responsive digital spaces in under 2 hours.",
        topics: ["The Starter Palette Choice", "Typography Rules of Thumb", "Micro-Copywriting Principles"]
      },
      {
        week: "Module 2",
        title: "The AI Co-pilot Framework",
        description: "Leveraging generative tools to think faster, write code cleaner, layout templates quicker, and edit visual media efficiently.",
        topics: ["Contextual Prompting Keys", "Code Generation Guidelines", "AI Image Generation Workflow"]
      },
      {
        week: "Module 3",
        title: "Immediate Distribution Loop",
        description: "Now that you have built a valuable skill or service, how to configure your immediate WhatsApp status and Twitter thread distribution loop.",
        topics: ["The Hook-and-Value Structure", "Converting Group Chats into Leads", "Tracking Feedback Systems"]
      }
    ]
  }
};

// Interactive widget sub-components
const MagnetArchetypeTool = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    {
      id: 1,
      q: "In a team of 5 people struggling during a major project crisis, what is your instinct?",
      options: {
        A: "Isolate, think through first principles, and write a cohesive written recovery plan.",
        B: "Call an immediate round-table to align mood, delegate emergency tasks, and keep spirit high.",
        C: "Analyze other competing projects to see what historical standard can be successfully cloned."
      }
    },
    {
      id: 2,
      q: "When someone publicly insults a core belief you hold, how do you respond?",
      options: {
        A: "Ask precise questions to target their logical inconsistency and watch them fail in discussions.",
        B: "Ignore and preserve mental peace; the system's output will prove your belief correct.",
        C: "Rally supporters to educate and transform their stance through platform pressure."
      }
    }
  ];

  const handleSelect = (qId: number, optionKey: string) => {
    const updated = { ...selectedAnswers, [qId]: optionKey };
    setSelectedAnswers(updated);

    if (Object.keys(updated).length === questions.length) {
      const answers = Object.values(updated);
      const counts = answers.reduce((acc, curr) => {
        const key = curr as string;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const major = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      if (major === 'A') {
        setResult("The Dialectic Architect — You lead through profound analytical depth, sharp logic, and systemic blueprints.");
      } else if (major === 'B') {
        setResult("The Ethical Operator — You lead through extreme personal integrity, focus, and inspiring standard-setting.");
      } else {
        setResult("The Platform Sovereign — You lead by creating spaces, managing human capital, and rallying strategic networks.");
      }
    }
  };

  const reset = () => {
    setSelectedAnswers({});
    setResult(null);
  };

  return (
    <div className="p-6 bg-white border border-[#e8e5e0] rounded-2xl shadow-sm text-left">
      <div className="flex items-center gap-2 mb-4">
        <Award className="text-[#F16736] w-5 h-5 animate-pulse" />
        <h4 className="font-bold text-[#1e1e1e] text-sm uppercase tracking-widest text-[#F16736]">Leadership Archetype Matcher</h4>
      </div>
      <p className="text-[#6b6b6b] text-sm mb-6">Discover how your style matches the core leadership attributes developed in the Magnet School.</p>
      
      {!result ? (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="space-y-3">
              <span className="text-xs font-bold text-neutral-400">Question {idx + 1} of {questions.length}</span>
              <p className="font-semibold text-sm text-[#1e1e1e] leading-snug">{q.q}</p>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(q.options).map(([key, text]) => (
                  <button
                    key={key}
                    onClick={() => handleSelect(q.id, key)}
                    className={`p-3 text-xs text-left rounded-xl border transition-all ${selectedAnswers[q.id] === key ? 'border-[#F16736] bg-[#fff1eb] text-[#F16736] font-semibold' : 'border-[#e8e5e0] hover:border-[#6b6b6b] text-[#6b6b6b]'}`}
                  >
                    <span className="font-bold mr-2">{key}.</span> {text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="p-4 bg-[#fff1eb] border border-[#F16736]/15 rounded-xl">
            <span className="text-xs font-black text-[#F16736] uppercase tracking-widest block mb-2">Your Profile Match</span>
            <p className="font-extrabold text-[#1e1e1e] text-lg leading-tight">{result}</p>
          </div>
          <button onClick={reset} className="text-xs font-bold text-[#F16736] hover:underline">Retake Test</button>
        </motion.div>
      )}
    </div>
  );
};

const SkillStackBuilder = () => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  
  const stacks = [
    { name: "Visual design", tool: "Figma UI System", outline: "Design scalable tokenized web systems and design files." },
    { name: "Responsive coding", tool: "Semantic Layouts & Tailwind", outline: "Transform raw frames into blazing fast responsive code systems." },
    { name: "Distribution", tool: "WhatsApp Copywriter Blueprint", outline: "Convince stakeholders with strategic high-intent offers." },
  ];

  const toggleStack = (toolName: string) => {
    if (selectedTools.includes(toolName)) {
      setSelectedTools(selectedTools.filter(t => t !== toolName));
    } else {
      setSelectedTools([...selectedTools, toolName]);
    }
  };

  return (
    <div className="p-6 bg-white border border-[#e8e5e0] rounded-2xl shadow-sm text-left">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-[#F16736] w-5 h-5" />
        <h4 className="font-bold text-[#1e1e1e] text-sm uppercase tracking-widest text-[#F16736]">Sprint Portfolio Blueprint</h4>
      </div>
      <p className="text-[#6b6b6b] text-sm mb-6">Select your tracks to visualize your real Skill Hut portfolio deliverable:</p>
      
      <div className="space-y-3 mb-6">
        {stacks.map((stack) => (
          <div 
            key={stack.tool}
            onClick={() => toggleStack(stack.tool)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${selectedTools.includes(stack.tool) ? 'border-[#F16736] bg-[#fff1eb]' : 'border-[#e8e5e0] hover:border-[#6b6b6b]'}`}
          >
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 ${selectedTools.includes(stack.tool) ? 'bg-[#F16736] border-[#F16736] text-white' : 'border-[#e8e5e0] bg-white'}`}>
              {selectedTools.includes(stack.tool) && <Check size={14} strokeWidth={3} />}
            </div>
            <div>
              <h5 className={`text-xs font-black uppercase tracking-wider ${selectedTools.includes(stack.tool) ? 'text-[#F16736]' : 'text-neutral-500'}`}>{stack.name}</h5>
              <p className="font-bold text-sm text-[#1e1e1e]">{stack.tool}</p>
              <p className="text-xs text-[#6b6b6b] mt-1">{stack.outline}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-neutral-50 rounded-xl border border-[#e8e5e0]">
        <h5 className="text-xs font-bold text-[#1e1e1e] uppercase tracking-wider mb-2">Portfolio Project Output:</h5>
        {selectedTools.length === 0 ? (
          <p className="text-xs text-zinc-400 italic">Select skills above to generate custom portfolio blueprints...</p>
        ) : (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#1e1e1e]">You will build:</p>
            <div className="p-3 bg-white border border-[#e8e5e0] rounded-lg text-xs text-neutral-600 font-mono">
              🚀 A full product launch system combining <span className="text-[#F16736] font-bold">{selectedTools.join(" + ")}</span> styled to look like an international brand template ready to sell.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CashCalculator = () => {
  const [servicesCount, setServicesCount] = useState<number>(3);
  const [pricePerService, setPricePerService] = useState<number>(5000);
  const [reinvestmentRate, setReinvestmentRate] = useState<number>(40);

  const totalRevenue = servicesCount * pricePerService;
  const reInvested = (totalRevenue * (reinvestmentRate / 100));
  const takeHomeProfit = totalRevenue - reInvested;

  return (
    <div className="p-6 bg-white border border-[#e8e5e0] rounded-2xl shadow-sm text-left">
      <div className="flex items-center gap-2 mb-4">
        <Coins className="text-[#F16736] w-5 h-5" />
        <h4 className="font-bold text-[#1e1e1e] text-sm uppercase tracking-widest text-[#F16736]">Campus Business Modeler</h4>
      </div>
      <p className="text-[#6b6b6b] text-sm mb-6">Estimate and simulate student cash-flow and business scaling parameters.</p>
      
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between text-xs font-semibold text-[#1e1e1e] mb-1">
            <span>Monthly Clients / Sales:</span>
            <span className="font-mono text-[#F16736] font-bold">{servicesCount} orders</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="15" 
            value={servicesCount} 
            onChange={(e) => setServicesCount(Number(e.target.value))} 
            className="w-full accent-[#F16736]"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-[#1e1e1e] mb-1">
            <span>Average Order Value:</span>
            <span className="font-mono text-[#F16736] font-bold">₦{pricePerService.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="2000" 
            max="25000" 
            step="1000"
            value={pricePerService} 
            onChange={(e) => setPricePerService(Number(e.target.value))} 
            className="w-full accent-[#F16736]"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-[#1e1e1e] mb-1">
            <span>Business Reinvest Rate:</span>
            <span className="font-mono text-[#F16736] font-bold">{reinvestmentRate}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="80" 
            step="5"
            value={reinvestmentRate} 
            onChange={(e) => setReinvestmentRate(Number(e.target.value))} 
            className="w-full accent-[#F16736]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="p-4 bg-[#faf9f7] rounded-xl border border-[#e8e5e0] text-center">
          <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Total Revenue</span>
          <p className="text-lg font-black text-[#1e1e1e] font-mono leading-tight mt-1">₦{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-[#fff1eb] rounded-xl border border-[#F16736]/15 text-center">
          <span className="text-[10px] uppercase font-bold text-[#F16736] tracking-wider">Scale Funds</span>
          <p className="text-lg font-black text-[#F16736] font-mono leading-tight mt-1">₦{reInvested.toLocaleString()}</p>
        </div>
        <div className="col-span-2 p-3 bg-neutral-900 text-white rounded-xl text-center">
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Your Personal Take-Home Budget</span>
          <p className="text-xl font-black text-white font-mono leading-normal">₦{takeHomeProfit.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

const MentalModelAuditor = () => {
  const [activeModel, setActiveModel] = useState<number>(0);

  const models = [
    {
      title: "First Principles Thinking",
      quote: "Boil a situation down to its absolute core facts, then build logical paths upward.",
      usage: "Excellent when trying to disrupt an inefficient campus status quo or launch high-value assets."
    },
    {
      title: "Inversion",
      quote: "Instead of planning how to succeed, exhaustively plan how to fail and systematically block those failure paths.",
      usage: "Excellent for exam preparation, major program launches, or high-stakes client negotiations."
    },
    {
      title: "Second-Order Thinking",
      quote: "Never stop at action. Always ask: 'And then what?' to map cascade consequences.",
      usage: "Critical when setting campus scheduling, planning partnerships, or choosing peer networks."
    }
  ];

  return (
    <div className="p-6 bg-white border border-[#e8e5e0] rounded-2xl shadow-sm text-left">
      <div className="flex items-center gap-2 mb-4">
        <Dumbbell className="text-[#F16736] w-5 h-5" />
        <h4 className="font-bold text-[#1e1e1e] text-sm uppercase tracking-widest text-[#F16736]">Cognitive Toolbox Playbook</h4>
      </div>
      <p className="text-[#6b6b6b] text-sm mb-6">An interactive preview of core mental tools you will master during the Study:</p>

      <div className="flex border-b border-[#e8e5e0] mb-4 gap-1 overflow-x-auto pb-1 scrollbar-none">
        {models.map((m, idx) => (
          <button
            key={m.title}
            onClick={() => setActiveModel(idx)}
            className={`px-3 py-1.5 text-xs rounded-full font-bold whitespace-nowrap transition-all ${activeModel === idx ? 'bg-[#F16736] text-white' : 'hover:bg-[#fff1eb] hover:text-[#F16736] text-[#6b6b6b]'}`}
          >
            Model {idx + 1}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeModel}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="bg-[#faf9f7] p-4 rounded-xl border border-[#e8e5e0]"
        >
          <h5 className="font-black text-sm text-[#1e1e1e] mb-2">{models[activeModel].title}</h5>
          <p className="text-xs italic text-neutral-600 mb-4 leading-relaxed bg-white p-3 rounded-lg border border-[#e8e5e0]">
            "{models[activeModel].quote}"
          </p>
          <span className="text-[10px] font-black uppercase text-[#F16736] tracking-wider block mb-1">Execution Action Plan:</span>
          <p className="text-xs text-[#6b6b6b] leading-relaxed">{models[activeModel].usage}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const CrashChecklist = () => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const milestones = [
    "Identify my immediate focus area & setup digital workspace",
    "Install custom design pack & read copywriting starter templates",
    "Identify 3 students/peers who have painful campus workflows",
    "Configure my instant response WhatsApp script",
    "Deliver the initial value offer & review outcome loops"
  ];

  const toggleCheck = (item: string) => {
    setCompleted({ ...completed, [item]: !completed[item] });
  };

  const count = Object.values(completed).filter(Boolean).length;

  return (
    <div className="p-6 bg-white border border-[#e8e5e0] rounded-2xl shadow-sm text-left">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-[#F16736] w-5 h-5 animate-bounce" />
        <h4 className="font-bold text-[#1e1e1e] text-sm uppercase tracking-widest text-[#F16736]">Rapid-Fire Execution Sprints</h4>
      </div>
      <p className="text-[#6b6b6b] text-sm mb-6">Instantly activate these 5 micro-milestones to spark your skill cycle:</p>

      <div className="space-y-3 mb-6">
        {milestones.map((item, idx) => (
          <div 
            key={idx}
            onClick={() => toggleCheck(item)}
            className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${completed[item] ? 'bg-[#fff1eb] border-[#F16736]' : 'bg-white border-[#e8e5e0] hover:border-[#6b6b6b]'}`}
          >
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 ${completed[item] ? 'bg-[#F16736] border-[#F16736] text-white' : 'border-neutral-300 bg-white'}`}>
              {completed[item] && <Check size={12} strokeWidth={4} />}
            </div>
            <span className={`text-xs select-none leading-tight font-medium ${completed[item] ? 'line-through text-neutral-400' : 'text-[#1e1e1e]'}`}>
              {item}
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#faf9f7] rounded-xl border border-[#e8e5e0] text-center">
        <div className="h-2 w-full bg-[#e8e5e0] rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-[#F16736] transition-all duration-300"
            style={{ width: `${(count / milestones.length) * 100}%` }}
          />
        </div>
        <p className="text-xs font-semibold text-[#1e1e1e]">
          Execution Progress: <span className="font-mono font-black text-[#F16736]">{count} out of {milestones.length} Done</span>
        </p>
      </div>
    </div>
  );
};


const ProgramDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeWeek, setActiveWeek] = useState<number>(0);
  const [completedModules, setCompletedModules] = useState<number[]>([0]);

  const handleComplete = (idx: number) => {
    if (!completedModules.includes(idx)) {
      setCompletedModules([...completedModules, idx]);
    }
  };

  // Fallback to magnet-school if slug not found
  const program = programDetails[slug || 'the-magnet-school'] || programDetails['the-magnet-school'];

  const renderActiveWidget = () => {
    switch (program.slug) {
      case "the-magnet-school":
        return <MagnetArchetypeTool />;
      case "the-skill-hut":
        return <SkillStackBuilder />;
      case "cash-on-campus":
        return <CashCalculator />;
      case "the-mental-application-study":
        return <MentalModelAuditor />;
      case "crash-course":
        return <CrashChecklist />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Decorative background accents */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#F16736]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#F16736]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Breadcrumbs / Custom Top Nav bar spacing */}
      <header className="pt-28 md:pt-36 pb-16 bg-white relative overflow-hidden">
        {/* Creative Intelligence Overlays */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #1e1e1e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Connecting line */}
        <motion.div 
          initial={{ height: 0 }} 
          animate={{ height: '100%' }} 
          transition={{ duration: 1.5, ease: 'easeInOut' }} 
          className="absolute left-6 md:left-[10%] top-0 w-[1px] bg-gradient-to-b from-[#F16736]/30 to-transparent z-0 hidden md:block"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-[#F16736] bg-white animate-ping" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link 
            to="/programs" 
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#6b6b6b] hover:text-[#F16736] transition-colors mb-10 group bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-[#e8e5e0]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Curriculum
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <span className="text-[#F16736] text-xs font-black uppercase tracking-[0.3em] mb-6 block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F16736] animate-pulse" />
                {program.kicker}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-black text-[#1e1e1e] leading-[1.05] mb-8 tracking-tight">
                {program.title}
              </h1>
              <p className="text-lg md:text-xl xl:text-2xl text-[#6b6b6b] leading-relaxed font-medium max-w-3xl">
                {program.intro}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap gap-4 pb-4">
              <div className="px-5 py-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-2xl flex items-center gap-3 text-xs md:text-sm font-bold text-neutral-600 shadow-sm transition-all hover:border-[#F16736]/30 hover:shadow-md">
                <Clock className="w-4 h-4 text-[#F16736]" /> {program.duration}
              </div>
              <div className="px-5 py-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-2xl flex items-center gap-3 text-xs md:text-sm font-bold text-neutral-600 shadow-sm transition-all hover:border-[#F16736]/30 hover:shadow-md">
                <ShieldCheck className="w-4 h-4 text-[#F16736]" /> {program.difficulty}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Visual Panel or Interactive Split Section */}
      <section className="border-t border-b border-[#e8e5e0] bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12">
          {/* Main program description and core details */}
          <div className="lg:col-span-7 p-6 md:p-16 border-r border-[#e8e5e0] bg-white text-left">
            <h2 className="text-2xl font-extrabold text-[#1e1e1e] mb-6">Program Objective & Philosophy</h2>
            <p className="text-[#6b6b6b] text-base leading-relaxed mb-10">
              {program.description}
            </p>

            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#F16736] mb-6">What you will develop:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {program.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[#fff1eb] border border-[#F16736]/10 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-[#F16736]" strokeWidth={4} />
                  </div>
                  <span className="text-xs font-bold text-neutral-700 leading-normal">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 p-6 md:p-16 flex flex-col justify-center bg-[#faf9f7] relative">
            {/* Visual dynamic element depending on program slug */}
            {renderActiveWidget()}
          </div>
        </div>
      </section>

      {/* Khan Academy Inspired Curriculum Panel */}
      <section className="py-24 border-b border-[#e8e5e0] bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#e8e5e0] pb-8">
            <div>
              <span className="text-[#F16736] text-xs font-black uppercase tracking-[0.3em] mb-4 block">COURSE SYLLABUS</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#1e1e1e] tracking-tight">Learning Pathway</h2>
            </div>
            
            {/* Progress Tracker */}
            <div className="mt-6 md:mt-0 text-right">
              <div className="flex items-center gap-4 justify-end mb-2">
                <div className="text-right">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block">Mastery Progress</span>
                  <span className="text-2xl font-black text-[#1e1e1e]">{Math.round((completedModules.length / program.curriculum.length) * 100)}%</span>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-[#e8e5e0] border-t-[#F16736] flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#F16736]" />
                </div>
              </div>
              <div className="w-48 h-2 bg-[#e8e5e0] rounded-full overflow-hidden ml-auto">
                <div 
                  className="h-full bg-[#F16736] transition-all duration-500 ease-out" 
                  style={{ width: `${(completedModules.length / program.curriculum.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sidebar Modules (Khan Academy Style) */}
            <div className="lg:col-span-4 flex flex-col gap-3 sticky top-32">
              <h3 className="text-sm font-black text-[#1e1e1e] uppercase tracking-widest mb-2 px-2">Course Units</h3>
              {program.curriculum.map((item, idx) => {
                const isCompleted = completedModules.includes(idx);
                const isActive = activeWeek === idx;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveWeek(idx)}
                    className={`flex items-start gap-4 p-4 text-left rounded-2xl transition-all duration-200 border-2 ${
                      isActive 
                        ? 'border-[#F16736] bg-white shadow-md' 
                        : 'border-transparent hover:bg-white hover:border-[#e8e5e0]'
                    }`}
                  >
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isCompleted ? 'bg-[#F16736] text-white' : isActive ? 'border-2 border-[#F16736] text-[#F16736]' : 'border-2 border-[#d0ccc5] text-[#d0ccc5]'
                    }`}>
                      {isCompleted ? <Check size={14} strokeWidth={4} /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                    </div>
                    <div>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] block mb-1 ${isActive ? 'text-[#F16736]' : 'text-neutral-500'}`}>
                        {item.week}
                      </span>
                      <p className={`font-bold text-sm leading-tight ${isActive ? 'text-[#1e1e1e]' : 'text-neutral-600'}`}>
                        {item.title}
                      </p>
                      
                      {/* Micro lesson indicators */}
                      <div className="flex items-center gap-2 mt-3">
                        {item.topics.map((_, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-[#F16736]' : isActive ? 'bg-[#F16736]/40' : 'bg-[#e8e5e0]'}`} />
                        ))}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Video & Content Area (Khan Academy Style) */}
            <div className="lg:col-span-8 bg-white border border-[#e8e5e0] rounded-[2.5rem] overflow-hidden shadow-sm">
              {/* Video Player Mock */}
              <div className="relative aspect-video bg-[#1e1e1e] group cursor-pointer overflow-hidden flex items-center justify-center">
                <img 
                  src={`https://picsum.photos/seed/${program.slug}-${activeWeek}/1200/600`}
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-transparent to-transparent opacity-80" />
                
                <div className="relative z-10 w-20 h-20 rounded-full bg-[#F16736] flex items-center justify-center pl-2 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_40px_rgba(241,103,54,0.4)]">
                  <Play className="w-8 h-8 text-white" fill="currentColor" />
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/80 text-xs font-mono">
                  <span>► 0:00 / 14:32</span>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded bg-white/10 uppercase tracking-widest text-[10px]">CC</span>
                    <span className="px-2 py-1 rounded bg-white/10 uppercase tracking-widest text-[10px]">1080p</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-12">
                <span className="text-xs font-black text-[#F16736] bg-[#fff1eb] border border-[#F16736]/10 px-4 py-2 rounded-full tracking-widest inline-block mb-6 shadow-sm">
                  {program.curriculum[activeWeek].week}
                </span>

                <h3 className="text-3xl md:text-4xl font-black text-[#1e1e1e] mb-6 tracking-tight">
                  {program.curriculum[activeWeek].title}
                </h3>
                <p className="text-[#6b6b6b] text-base md:text-lg leading-relaxed mb-10 font-medium max-w-3xl">
                  {program.curriculum[activeWeek].description}
                </p>

                {/* Lesson Topics as "Practice/Articles" */}
                <div className="space-y-4 mb-10">
                  <h4 className="text-sm font-black text-[#1e1e1e] uppercase tracking-widest border-b border-[#e8e5e0] pb-4 mb-6">Unit Lessons & Practice</h4>
                  
                  {program.curriculum[activeWeek].topics.map((t, index) => (
                    <button key={index} className="w-full flex items-center justify-between p-4 rounded-xl border border-[#e8e5e0] hover:border-[#F16736] hover:shadow-md transition-all group bg-white text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#faf9f7] flex items-center justify-center text-[#6b6b6b] group-hover:text-[#F16736] transition-colors">
                          {index % 3 === 0 ? <PlayCircle size={20} /> : index % 3 === 1 ? <FileText size={20} /> : <Dumbbell size={20} />}
                        </div>
                        <div>
                          <p className="font-bold text-[#1e1e1e] text-sm md:text-base group-hover:text-[#F16736] transition-colors">{t}</p>
                          <p className="text-xs text-neutral-500 mt-1 font-medium">
                            {index % 3 === 0 ? 'Video Lesson • 8 mins' : index % 3 === 1 ? 'Reading • 4 mins read' : 'Practice Exercise • 50 Mastery Points'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[#F16736] font-bold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">Start</span>
                    </button>
                  ))}
                </div>
                
                {/* Completion Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-8 border-t border-[#e8e5e0] gap-4">
                  <button 
                    onClick={() => handleComplete(activeWeek)}
                    disabled={completedModules.includes(activeWeek)}
                    className={`px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-3 w-full sm:w-auto ${
                      completedModules.includes(activeWeek) 
                        ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' 
                        : 'bg-[#1e1e1e] hover:bg-[#F16736] text-white hover:shadow-lg hover:-translate-y-1'
                    }`}
                  >
                     {completedModules.includes(activeWeek) ? 'Unit Mastered' : 'Master This Unit'} <CheckCircle2 size={18} className={completedModules.includes(activeWeek) ? "text-neutral-400" : "text-white"} />
                  </button>
                  
                  {activeWeek < program.curriculum.length - 1 && (
                    <button 
                      onClick={() => setActiveWeek(prev => prev + 1)}
                      className="text-sm font-bold text-[#F16736] hover:underline flex items-center justify-center gap-1 w-full sm:w-auto"
                    >
                      Next Unit <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action cohort match block */}
      <section className="py-32 bg-[#1e1e1e] relative overflow-hidden">
        {/* Animated Background Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F16736]/10 rounded-full blur-[100px] pointer-events-none" 
        />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-wider mb-8 backdrop-blur-sm">
            <Users size={12} className="text-[#F16736]" /> {program.cohortDate}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
            Ready to rewrite the rules <br className="hidden md:block" />of student success?
          </h2>
          <p className="text-white/70 text-lg md:text-xl xl:text-2xl mb-12 leading-relaxed font-medium max-w-2xl mx-auto">
            Apply today to secure a slot in our next cohort. Meet our leadership, receive immediate starter digital resources, and start executing beyond school limits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto md:w-auto group relative px-10 py-5 xl:px-12 xl:py-6 bg-[#F16736] text-white text-lg font-black rounded-full overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(241,103,54,0.4)] active:scale-95 flex items-center justify-center gap-3 hover:scale-105">
              <span className="relative z-10 flex items-center gap-3">
                {program.cta} <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="w-full sm:w-auto md:w-auto px-10 py-5 xl:px-12 xl:py-6 bg-transparent border border-white/20 hover:bg-white/10 text-white font-bold rounded-full transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
              <MessageCircle size={20} className="text-[#F16736]" /> Inquire via Telegram
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetail;
