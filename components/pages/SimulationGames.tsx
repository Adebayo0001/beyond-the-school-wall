'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { 
  Target, Award, Sparkles, Shield, Zap, Calendar, Video, Play, 
  ArrowRight, CheckCircle2, Trophy, Gamepad2, Brain, Dice5,
  Search, Star, Filter, Users, Clock, Compass, Layers, RefreshCw, X, 
  ChevronRight, School, MessageSquare, Flame, Check, HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { getSimulationEvents } from '@/lib/storage';
import { SimulationEvent } from '@/types';
import Breadcrumbs from '@/components/Breadcrumbs';

export interface SimulationGame {
  id: string;
  title: string;
  category: 'virtual' | 'tabletop' | 'hybrid';
  priceType: 'free' | 'paid';
  price: string;
  startTime: string;
  formatName: string;
  ageGroup: ('middle-school' | 'high-school' | 'tertiary')[];
  ageLabel: string;
  groupSize: 'solo' | 'squad' | 'cohort';
  groupSizeLabel: string;
  duration: string;
  primarySkill: 'negotiation' | 'crisis' | 'spatial' | 'speed';
  skills: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  hook: string;
  imageSrc: string;
  briefing: string;
  objectives: string[];
  rules: string[];
  tips: string[];
  ctaText: string;
  ctaLink: string;
}

const ALL_GAMES: SimulationGame[] = [
  {
    id: 'lagos-hustle',
    title: 'Lagos Hustle Arena: Commercial Negotiation',
    category: 'virtual',
    priceType: 'free',
    price: 'Free Entry',
    startTime: 'Next Session: Today, 5:00 PM (WAT)',
    formatName: 'Interactive Digital Lab',
    ageGroup: ['high-school', 'tertiary'],
    ageLabel: 'High School & Campus (14+)',
    groupSize: 'solo',
    groupSizeLabel: 'Solo or 1v1 Roleplay',
    duration: '45 Mins',
    primarySkill: 'negotiation',
    skills: ['Price Anchoring', 'High-Stakes Negotiation', 'Client Psychology'],
    rating: 4.9,
    reviewCount: 184,
    badge: 'MOST POPULAR',
    hook: 'Face realistic Nigerian clients and distributor actors. Defend profit margins and close creative retainers.',
    imageSrc: '/images/lagos_negotiation.jpg',
    briefing: 'Alhaji Musa, a busy wholesale distributor, has a rigid 100-pack minimum order at 2,000 NGN. You only have capital for 15 packs at 1,200 NGN. Negotiate an experimental consignment contract without depleting your working capital.',
    objectives: [
      'Pitch Alhaji Musa on exclusive student network distribution rights.',
      'Negotiate unit minimum down from 100 crates to 15 trial packs.',
      'Secure a structured low-deposit payment terms buffer.'
    ],
    rules: [
      'Real-time sentiment analyzer tracks defensive and assertive vocal tone.',
      'Three consecutive irrational price concessions triggers instant bankruptcy simulation.',
      'AI dialogue responds dynamically to respect, local context, and financial logic.'
    ],
    tips: [
      'Show high respect: address the counterpart properly while holding your margins.',
      'Anchor value on your verifiable student audience before discussing price.',
      'Never offer a discount without demanding an operational concession in return.'
    ],
    ctaText: 'Register for this game',
    ctaLink: '/portal'
  },
  {
    id: 'tabletop-chess',
    title: 'Strategic Tabletop Chess & Spatial Defense',
    category: 'tabletop',
    priceType: 'paid',
    price: '₦5,000',
    startTime: 'Starts: Saturday, 10:00 AM (WAT)',
    formatName: 'FIDE Spec Competition Board',
    ageGroup: ['middle-school', 'high-school', 'tertiary'],
    ageLabel: 'All Age Divisions (10+)',
    groupSize: 'solo',
    groupSizeLabel: '2 Players (Face-to-Face)',
    duration: '60 Mins',
    primarySkill: 'spatial',
    skills: ['Spatial Geometry', 'Long-Range Risk Calculation', 'Defensive Patience'],
    rating: 5.0,
    reviewCount: 96,
    badge: 'FLAGSHIP CHESS',
    hook: 'Weighted Staunton wooden sets with analog clock timing. Builds unflinching spatial awareness and composure.',
    imageSrc: '/images/tabletop_chess.jpg',
    briefing: 'Face off in classical and rapid time controls using the official BTSW positional handbook. Analyze pawn structures, center control, and multi-turn sacrificial tactics.',
    objectives: [
      'Maintain positional center equilibrium through opening phase.',
      'Identify and execute 3-move tactical combination traps.',
      'Demonstrate calm defensive stoicism under active time pressure.'
    ],
    rules: [
      'Official FIDE tournament touch-move ruleset strictly enforced.',
      'Analog competition clocks with rapid 5+3 time controls.',
      'Mandatory post-match algebraic notation self-audit.'
    ],
    tips: [
      'Control the four central squares before launching flank attacks.',
      'Never leave a piece undefended without calculated compensation.',
      'Observe your opponent\'s clock pacing and physical tell signatures.'
    ],
    ctaText: 'Register for this game',
    ctaLink: '/tabletop-games'
  },
  {
    id: 'agrotech-board',
    title: 'Cold-Chain AgroTech Logistics Board',
    category: 'tabletop',
    priceType: 'paid',
    price: '₦12,500 / Team Set',
    startTime: 'Starts: Saturday, 1:30 PM (WAT)',
    formatName: 'Modular Hexagonal Strategy Board',
    ageGroup: ['high-school', 'tertiary'],
    ageLabel: 'Ages 15+',
    groupSize: 'squad',
    groupSizeLabel: '3–5 Players',
    duration: '75 Mins',
    primarySkill: 'crisis',
    skills: ['Supply Logistics', 'Risk Hedging', 'Market Economics'],
    rating: 4.8,
    reviewCount: 64,
    badge: 'STRATEGY KIT',
    hook: 'Navigate unpredictable seasonal harvests, transit delays, and storage decay across Nigerian trade corridors.',
    imageSrc: '/images/agrotech_board.jpg',
    briefing: 'Manage an integrated network of agricultural processing hubs and transit links across agrarian trade basins. Safeguard perishable produce against spoilage while competing for export quotas.',
    objectives: [
      'Construct interconnected solar cold-storage transit corridors.',
      'Hedge commodity price volatility using spot board market contracts.',
      'Deliver high-yield crops to terminal export harbors before seasonal decay.'
    ],
    rules: [
      'Harvest weather dice rolled at the start of each production cycle.',
      'Decay mechanic degrades unpowered storage inventory every turn.',
      'Working capital debt compounds every three turns if cash reserves empty.'
    ],
    tips: [
      'Prioritize investment in central solar cold rooms before expanding acreage.',
      'Coordinate shared transport convoys with neighboring players to cut tolls.',
      'Never over-leverage credit immediately before rainy season rolls.'
    ],
    ctaText: 'Register for this game',
    ctaLink: '/tabletop-games'
  },
  {
    id: 'diplomatic-table',
    title: 'Diplomatic Coalition & Treaty Table',
    category: 'hybrid',
    priceType: 'free',
    price: 'Free Entry',
    startTime: 'Starts: Friday, 3:00 PM (WAT)',
    formatName: 'Council Arbitration Kit',
    ageGroup: ['middle-school', 'high-school'],
    ageLabel: 'Middle & High School (11–18)',
    groupSize: 'cohort',
    groupSizeLabel: '6–12 Delegates',
    duration: '90 Mins',
    primarySkill: 'negotiation',
    skills: ['Consensus Building', 'Conflict Resolution', 'Rhetorical Persuasion'],
    rating: 4.8,
    reviewCount: 88,
    badge: 'LEADERSHIP LAB',
    hook: 'Tactical roleplay where students represent conflicting student body factions to forge an unbreakable treaty.',
    imageSrc: '/images/diplomacy_table.jpg',
    briefing: 'A multi-stakeholder council must ratify a regional sustainability and budget pact. Each delegate carries hidden district priorities, scarce resources, and competing economic mandates.',
    objectives: [
      'Form a super-majority coalition holding at least 7 council votes.',
      'Protect core non-negotiable district assets from budget austerity.',
      'Draft and ratify a binding bilateral trade and resource treaty.'
    ],
    rules: [
      'Strict parliamentary procedure with timed caucus and podium sessions.',
      'Treaties require a super-majority vote and written consensus clauses.',
      'Hidden agenda cards disclose individual district scoring bonuses.'
    ],
    tips: [
      'Listen twice as much as you speak during early informal caucus sessions.',
      'Identify shared adversaries to build fast, durable voting blocs.',
      'Offer concessions that carry zero cost to you but high value to partners.'
    ],
    ctaText: 'Register for this game',
    ctaLink: '/tabletop-games'
  },
  {
    id: 'supply-crisis',
    title: 'The Lagos Supply Chain & Crisis Command',
    category: 'virtual',
    priceType: 'paid',
    price: '₦7,500 / Syndicate',
    startTime: 'Starts: Sunday, 2:00 PM (WAT)',
    formatName: 'Live Virtual Syndicate Event',
    ageGroup: ['high-school', 'tertiary'],
    ageLabel: 'Senior Secondary & Campus (15+)',
    groupSize: 'squad',
    groupSizeLabel: '4–6 per Syndicate',
    duration: '2 Hours',
    primarySkill: 'crisis',
    skills: ['Resource Allocation', 'Crisis Command', 'Emergency Logistics'],
    rating: 4.9,
    reviewCount: 142,
    badge: 'HIGH STAKES',
    hook: 'Multi-syndicate simulation under rapid shocks. Allocate delivery fleets and keep regional hospitals supplied.',
    imageSrc: '/images/bento_coral.jpg',
    briefing: 'A sudden transit corridor shutdown has blocked mainland-island delivery arteries. Your syndicate must manage fuel buffers, prevent inventory spoilage, and maintain pharmaceutical supply routes.',
    objectives: [
      'Coordinate distributed fleet logistics across 4 transit corridors.',
      'Mitigate decay factors on perishable cold-chain supplies.',
      'Deliver life-saving quotas within tight financial and fuel constraints.'
    ],
    rules: [
      'Live market shock bulletins released every 15 minutes by game masters.',
      'Multi-team cooperative trading channels open during designated windows.',
      'Arbitration flags issued for unhedged price gouging or contract breaches.'
    ],
    tips: [
      'Designate a single communications director to prevent contradictory orders.',
      'Build fuel and cash reserves before expanding to distant distribution points.',
      'Form non-aggression supply alliances with competing student syndicates.'
    ],
    ctaText: 'Register for this game',
    ctaLink: '/simulations'
  },
  {
    id: 'director-board-pitch',
    title: 'The Skeptical Director Board Pitch',
    category: 'virtual',
    priceType: 'free',
    price: 'Free Entry',
    startTime: 'Next Batch: Tomorrow, 4:00 PM (WAT)',
    formatName: 'Interactive Stoic Roleplay',
    ageGroup: ['high-school', 'tertiary'],
    ageLabel: 'Senior Youth & Undergrads (16+)',
    groupSize: 'solo',
    groupSizeLabel: 'Solo 1v1 Simulation',
    duration: '40 Mins',
    primarySkill: 'negotiation',
    skills: ['Stoic Poise', 'Systems Thinking', 'Grant Defense'],
    rating: 5.0,
    reviewCount: 112,
    badge: 'EXECUTIVE SIM',
    hook: 'Pitch the formidable Dr. Mrs. Adebayo to secure a 500,000 NGN grant. Overcome academic skepticism with Stoic poise.',
    imageSrc: '/images/lagos_negotiation.jpg',
    briefing: 'You stand before the university faculty board. The Director believes student-led projects are flash-in-the-pan distractions that collapse the second exam timetables drop. You have 3 rounds to prove institutional durability.',
    objectives: [
      'Demonstrate unflinching Stoic poise when challenged with cynical assumptions.',
      'Present a bulletproof governance and junior-successor delegation framework.',
      'Secure formal approval for the 500,000 NGN student initiative seed tranche.'
    ],
    rules: [
      'Real-time composure tracker detects emotional defensiveness.',
      'Strict 45-second clock window to address each direct objection.',
      'Scored across vocabulary precision, structured systems, and self-restraint.'
    ],
    tips: [
      'Disarm the interrogator by validating her critique before presenting counter-evidence.',
      'Present numbers and operational redundancies rather than emotional visions.',
      'Maintain an even, respectful cadence without raising your voice.'
    ],
    ctaText: 'Register for this game',
    ctaLink: '/portal'
  },
  {
    id: 'neuro-velocity',
    title: 'Neuro-Cognitive Velocity Sprint',
    category: 'virtual',
    priceType: 'free',
    price: 'Free Entry',
    startTime: 'Instant Start • Live 24/7',
    formatName: 'Browser Speed Lab',
    ageGroup: ['middle-school', 'high-school'],
    ageLabel: 'Ages 10–18',
    groupSize: 'solo',
    groupSizeLabel: 'Solo Speed Run',
    duration: '30 Mins',
    primarySkill: 'speed',
    skills: ['Deductive Reasoning', 'Pattern Recognition', 'Speed Logic'],
    rating: 4.9,
    reviewCount: 210,
    badge: 'SPEED RUN',
    hook: 'Time-pressured logic matrices, syllogisms, and spatial sequences that double critical deduction speed.',
    imageSrc: '/images/bento_blue.jpg',
    briefing: 'Compete through 24 rapid-fire cognitive hurdles under escalating time compression. Calibrate deduction speed without sacrificing precision across spatial and verbal logic.',
    objectives: [
      'Achieve 90%+ accuracy on deductive syllogism hurdles.',
      'Complete complex matrix transformations in under 4 seconds each.',
      'Unlock the official BTSW Cognitive Acceleration Level 1 certification.'
    ],
    rules: [
      'Countdown timers auto-shorten with each consecutive correct answer.',
      'Single error incurs an immediate 10-second penalty pause.',
      'Leaderboard positions update live against national age cohort.'
    ],
    tips: [
      'Maintain steady breathing to suppress adrenaline-induced panic.',
      'Eliminate absurd answer choices instantly before calculating remainder.',
      'Rely on intuitive spatial symmetry for fast geometric puzzle decoding.'
    ],
    ctaText: 'Register for this game',
    ctaLink: '/simulations'
  },
  {
    id: 'grandmaster-spatial',
    title: 'Grandmaster Spatial Tactics & Rapid Blitz',
    category: 'tabletop',
    priceType: 'paid',
    price: '₦3,500 / Contender',
    startTime: 'Starts: Saturday, 4:00 PM (WAT)',
    formatName: 'Competitive Tabletop Sprint',
    ageGroup: ['middle-school', 'high-school', 'tertiary'],
    ageLabel: 'All Age Divisions (10+)',
    groupSize: 'solo',
    groupSizeLabel: '2 Players (Competitive)',
    duration: '45 Mins',
    primarySkill: 'spatial',
    skills: ['Tactical Traps', 'Time Management', 'Positional Advantage'],
    rating: 4.9,
    reviewCount: 79,
    badge: 'TOURNAMENT',
    hook: 'High-intensity blitz chess testing spatial visualization, split-second risk calculations, and stamina.',
    imageSrc: '/images/classroom_chess.jpg',
    briefing: 'Enter round-robin blitz fixtures with 5-minute clocks. Test tactical instincts, pawn structure sacrifices, and end-game conversion under extreme clock constraints.',
    objectives: [
      'Execute clean opening book systems in under 15 seconds per move.',
      'Convert a single-pawn endgame advantage into forced checkmate.',
      'Earn regional BTSW ELO qualification points for the national youth cup.'
    ],
    rules: [
      'Touch-move rule strictly enforced by registered arbiters.',
      'FIDE digital competition clocks with zero delay increments.',
      'Player handshake and formal scorekeeping required for all participants.'
    ],
    tips: [
      'Prioritize piece coordination over greedy material grabs in open files.',
      'Activate your king early as an attacking weapon in endgame conversions.',
      'Regulate physical breathing to prevent clock-rush panic in blitz scrambles.'
    ],
    ctaText: 'Register for this game',
    ctaLink: '/tabletop-games'
  }
];

const TESTIMONIALS = [
  {
    quote: "Lagos Hustle Arena completely transformed how I handle negotiations. Standing firm on price while remaining respectful is an art every young entrepreneur needs to master early.",
    name: "Tobi Adeleke",
    role: "Senior Student & Young Founder",
    school: "Floral College, Lagos",
    rating: 5
  },
  {
    quote: "Introducing BTSW's tabletop chess and logistics boards into our prefect training built a level of strategic foresight and calm problem-solving that conventional lectures simply cannot match.",
    name: "Mrs. Folashade Okonjo",
    role: "Dean of Student Leadership",
    school: "Zenith International School",
    rating: 5
  },
  {
    quote: "The Lagos Supply Chain Shock simulation had our entire team on our feet. Managing market volatility and negotiating with live character actors felt terrifyingly real. Best 2 hours of the semester.",
    name: "Chinedu Eze",
    role: "President, Student Economics Society",
    school: "Victory School International",
    rating: 5
  }
];

export default function SimulationGames() {
  const events = getSimulationEvents();
  const catalogRef = useRef<HTMLDivElement>(null);

  // Catalog Filters State
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'virtual' | 'tabletop' | 'hybrid'>('all');
  const [selectedPrice, setSelectedPrice] = useState<'all' | 'free' | 'paid'>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals State
  const [selectedGameForModal, setSelectedGameForModal] = useState<SimulationGame | null>(null);
  const [selectedGameForRegistration, setSelectedGameForRegistration] = useState<SimulationGame | null>(null);

  // Registration Form State
  const [regParticipationType, setRegParticipationType] = useState<'individual' | 'team'>('individual');
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regSchool, setRegSchool] = useState('');
  const [regTeamName, setRegTeamName] = useState('');
  const [regTeamSize, setRegTeamSize] = useState('3');
  const [regDivision, setRegDivision] = useState('High School (14-18)');
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regReference, setRegReference] = useState('');

  // Event schedule filter tab
  const [eventTab, setEventTab] = useState<'all' | 'virtual-event' | 'tabletop'>('all');

  // Filter games for catalog
  const filteredCatalogGames = useMemo(() => {
    return ALL_GAMES.filter((game) => {
      // Category filter
      if (selectedFormat !== 'all') {
        if (selectedFormat === 'virtual' && game.category !== 'virtual') return false;
        if (selectedFormat === 'tabletop' && game.category !== 'tabletop') return false;
        if (selectedFormat === 'hybrid' && game.category !== 'hybrid') return false;
      }
      // Price filter
      if (selectedPrice !== 'all') {
        if (game.priceType !== selectedPrice) return false;
      }
      // Skill filter
      if (selectedSkill !== 'all' && game.primarySkill !== selectedSkill) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(query);
        const matchesHook = game.hook.toLowerCase().includes(query);
        const matchesFormat = game.formatName.toLowerCase().includes(query);
        const matchesSkills = game.skills.some(s => s.toLowerCase().includes(query));
        const matchesPrice = game.price.toLowerCase().includes(query);
        if (!matchesTitle && !matchesHook && !matchesFormat && !matchesSkills && !matchesPrice) {
          return false;
        }
      }
      return true;
    });
  }, [selectedFormat, selectedPrice, selectedSkill, searchQuery]);

  // Filtered Events for schedule
  const filteredEvents = useMemo(() => {
    if (eventTab === 'all') return events;
    return events.filter(e => e.type === eventTab);
  }, [events, eventTab]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedFormat('all');
    setSelectedPrice('all');
    setSelectedSkill('all');
  };

  const openRegistration = (game: SimulationGame) => {
    setSelectedGameForRegistration(game);
    setRegSubmitted(false);
    setRegReference(`BTSW-SIM-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegSubmitted(true);
  };

  return (
    <div className="bg-[#faf9f7] min-h-screen text-[#1e1e1e] pt-24 pb-20 font-sans selection:bg-[#F16736]/20">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: VISUAL-FIRST STRATEGY SIMULATION SHOWCASE                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 pt-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* Left Column: Crisp Value Prop & Generous Breathing Space */}
          <div className="lg:col-span-6 space-y-6">
            <Breadcrumbs variant="light" className="mb-2" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.06] text-neutral-900">
              Real decisions. <br />
              <span className="text-[#F16736]">Zero theory</span>.
            </h1>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
              Immersive virtual crisis command syndicates, high-stakes negotiation labs, and physical tournament tabletop chess designed to build unflinching leadership clarity.
            </p>

            {/* Visual Step Chips with Generous Breathing Space */}
            <div className="grid grid-cols-3 gap-2.5 pt-1 text-[11px] font-bold max-w-md">
              <div className="p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-center space-y-1 shadow-xs">
                <span className="text-[9px] uppercase text-neutral-400 block font-black">Step 1</span>
                <span className="text-neutral-800">Choose Game</span>
              </div>
              <div className="p-3.5 bg-white border border-[#e8e5e0] rounded-xl text-center space-y-1 shadow-xs">
                <span className="text-[9px] uppercase text-neutral-400 block font-black">Step 2</span>
                <span className="text-neutral-800">Register</span>
              </div>
              <div className="p-3.5 bg-[#fff1eb] border border-[#F16736]/30 text-[#F16736] rounded-xl text-center space-y-1 shadow-xs">
                <span className="text-[9px] uppercase text-[#F16736]/80 block font-black">Step 3</span>
                <span>Play & Debrief</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => {
                  catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="px-8 py-3.5 bg-[#F16736] hover:bg-[#e05423] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-[#F16736]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Browse Simulations ({filteredCatalogGames.length})</span>
                <ArrowRight size={14} />
              </button>

              <Link
                href="/game-recommendations"
                className="px-6 py-3.5 bg-white hover:bg-neutral-100 border border-[#e8e5e0] text-[#1e1e1e] font-bold text-xs uppercase tracking-wider rounded-lg transition-all hover:border-[#F16736]/40 cursor-pointer"
              >
                Personalized Matcher
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Dual Photographic Showcase Cards */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              
              {/* Virtual Simulation Highlight Card */}
              <div 
                onClick={() => setSelectedGameForModal(ALL_GAMES[0])}
                className="relative rounded-xl overflow-hidden border border-[#e8e5e0] shadow-md hover:shadow-xl group cursor-pointer bg-neutral-900 aspect-[4/5] transition-all"
              >
                <Image
                  src="/images/lagos_negotiation.jpg"
                  alt="Lagos Hustle Arena"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white space-y-1.5">
                  <span className="px-2 py-0.5 bg-[#F16736] text-white text-[9px] font-black uppercase rounded-md">
                    Virtual Lab
                  </span>
                  <h4 className="text-xs sm:text-sm font-black leading-snug line-clamp-2">
                    Lagos Hustle Negotiation
                  </h4>
                  <div className="flex items-center gap-1 text-amber-400 text-[10px] font-bold">
                    <Star size={10} className="fill-amber-400" />
                    <span>4.9 (184 Reviews)</span>
                  </div>
                </div>
              </div>

              {/* Tabletop Chess Highlight Card */}
              <div 
                onClick={() => setSelectedGameForModal(ALL_GAMES[1])}
                className="relative rounded-xl overflow-hidden border border-[#e8e5e0] shadow-md hover:shadow-xl group cursor-pointer bg-neutral-900 aspect-[4/5] transition-all"
              >
                <Image
                  src="/images/tabletop_chess.jpg"
                  alt="Tabletop Chess"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white space-y-1.5">
                  <span className="px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-black uppercase rounded-md">
                    Tabletop Board
                  </span>
                  <h4 className="text-xs sm:text-sm font-black leading-snug line-clamp-2">
                    Tabletop Chess & Defense
                  </h4>
                  <div className="flex items-center gap-1 text-amber-400 text-[10px] font-bold">
                    <Star size={10} className="fill-amber-400" />
                    <span>5.0 (96 Reviews)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TOP-RATED SIMULATIONS CATALOG WITH HIGH-RES PHOTOGRAPHY                */}
      {/* ========================================================================= */}
      <section ref={catalogRef} id="games-catalog" className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        
        {/* Header & Clean Minimalist Filters */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#F16736]">
                EXPERIENCE DIRECTORY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
                Top-Rated Simulations & Games
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Showing {filteredCatalogGames.length} of {ALL_GAMES.length} strategic experiences
              </p>
            </div>

            {/* Keyword Search */}
            <div className="relative w-full md:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games, skills, or formats..."
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#e8e5e0] rounded-lg text-xs font-semibold text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#F16736] shadow-xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#e8e5e0]">
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Format Pills */}
              <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-lg border border-[#e8e5e0] shadow-xs">
                {[
                  { id: 'all', label: `All Games (${ALL_GAMES.length})` },
                  { id: 'virtual', label: 'Virtual Labs' },
                  { id: 'tabletop', label: 'Tabletop Boards' },
                  { id: 'hybrid', label: 'Hybrid Council' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFormat(tab.id as any)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      selectedFormat === tab.id
                        ? 'bg-[#1e1e1e] text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Pricing Filter Pills */}
              <div className="flex flex-wrap gap-1 bg-white p-1 rounded-lg border border-[#e8e5e0] shadow-xs">
                {[
                  { id: 'all', label: 'All Pricing' },
                  { id: 'free', label: 'Free Entry' },
                  { id: 'paid', label: 'Paid Games' }
                ].map(pTab => (
                  <button
                    key={pTab.id}
                    onClick={() => setSelectedPrice(pTab.id as any)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      selectedPrice === pTab.id
                        ? 'bg-[#F16736] text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    {pTab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[10px] font-black uppercase text-neutral-400 mr-1 flex items-center gap-1">
                <Filter size={11} /> Focus:
              </span>
              {[
                { id: 'all', label: 'All' },
                { id: 'negotiation', label: 'Negotiation' },
                { id: 'crisis', label: 'Crisis Logistics' },
                { id: 'spatial', label: 'Chess / Spatial' },
                { id: 'speed', label: 'Speed Logic' }
              ].map(pill => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedSkill(pill.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-all cursor-pointer ${
                    selectedSkill === pill.id
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-600 border-[#e8e5e0] hover:border-neutral-400'
                  }`}
                >
                  {pill.label}
                </button>
              ))}

              {(searchQuery || selectedFormat !== 'all' || selectedPrice !== 'all' || selectedSkill !== 'all') && (
                <button
                  onClick={resetAllFilters}
                  className="px-2.5 py-1 text-[11px] font-bold text-neutral-500 hover:text-neutral-800 flex items-center gap-1 ml-1 cursor-pointer"
                >
                  <RefreshCw size={11} /> Reset
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Empty State */}
        {filteredCatalogGames.length === 0 && (
          <div className="text-center py-16 bg-white border border-[#e8e5e0] rounded-xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
              <Search size={22} />
            </div>
            <h3 className="text-base font-bold text-neutral-800">No matching simulations found</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Try adjusting your search keywords, clear specific filter tags, or reset all filters to view the complete catalog.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 bg-[#F16736] text-white text-xs font-bold rounded-lg shadow cursor-pointer"
            >
              Show All Games
            </button>
          </div>
        )}

        {/* Game Cards Grid: 16:10 Photographic Cards with Punchy Copy & Breathing Space */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCatalogGames.map((game) => (
            <div
              key={game.id}
              className="bg-white border border-[#e8e5e0] hover:border-[#F16736] rounded-xl shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* 16:10 Photographic Visual Banner */}
                <div 
                  onClick={() => setSelectedGameForModal(game)}
                  className="relative aspect-[16/10] bg-neutral-900 overflow-hidden cursor-pointer"
                >
                  <Image
                    src={game.imageSrc}
                    alt={game.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Floating Badges Top */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 text-neutral-900 shadow-sm truncate">
                      {game.formatName}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      {/* Price Pill */}
                      {game.priceType === 'free' ? (
                        <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-black uppercase rounded shadow-xs">
                          Free Entry
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase rounded shadow-xs">
                          {game.price}
                        </span>
                      )}

                      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-white text-[11px] font-bold">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        <span>{game.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  {game.badge && (
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#F16736] text-white shadow-xs">
                        {game.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content with Generous Breathing Space */}
                <div className="p-6 space-y-3.5">
                  <h3 
                    onClick={() => setSelectedGameForModal(game)}
                    className="text-base font-black text-neutral-900 leading-snug group-hover:text-[#F16736] transition-colors cursor-pointer"
                  >
                    {game.title}
                  </h3>

                  {/* Start Timing Indicator */}
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#F16736] bg-[#fff1eb] border border-[#F16736]/25 px-2.5 py-1.5 rounded-lg">
                    <Calendar size={12} className="text-[#F16736] shrink-0" />
                    <span className="truncate">{game.startTime}</span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    {game.hook}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {game.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions & Meta */}
              <div className="px-6 pb-6 pt-3 space-y-4 border-t border-neutral-100 mt-2">
                <div className="grid grid-cols-3 gap-2 text-[11px] text-neutral-600">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-neutral-400 block">Duration</span>
                    <span className="font-extrabold flex items-center gap-1 text-neutral-800">
                      <Clock size={11} className="text-[#F16736]" />
                      {game.duration}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-neutral-400 block">Squad</span>
                    <span className="font-extrabold flex items-center gap-1 text-neutral-800">
                      <Users size={11} className="text-[#F16736]" />
                      {game.groupSizeLabel.split(' ')[0]}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-neutral-400 block">Division</span>
                    <span className="font-extrabold text-neutral-800 truncate block">
                      {game.ageLabel.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Dual Action Buttons: Quick View & Register for this game */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setSelectedGameForModal(game)}
                    className="flex-1 py-2.5 px-3 bg-white hover:bg-neutral-50 text-neutral-800 border border-[#e8e5e0] hover:border-neutral-300 text-xs font-bold rounded-lg transition-all text-center cursor-pointer"
                  >
                    Quick View
                  </button>

                  <button
                    onClick={() => openRegistration(game)}
                    className="flex-1 py-2.5 px-3 bg-[#F16736] hover:bg-[#e05423] text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Register for this game</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. "BUILD CUSTOM SIMULATION GAMES" CALLOUT BANNER                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="p-8 sm:p-10 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white rounded-xl shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F16736]/20 rounded-full blur-[90px] pointer-events-none" />

          <div className="space-y-3 text-center lg:text-left relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#F16736] bg-[#F16736]/15 px-2.5 py-1 rounded">
              <Sparkles size={12} /> BESPOKE GAME DEVELOPMENT
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight uppercase">
              BUILD CUSTOM SIMULATION GAMES
            </h3>
            <div className="space-y-1.5 text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
              <p className="font-semibold text-white">
                We build custom simulation games for your Company Retreat, Training Programs, Events, Schools.
              </p>
              <p className="text-neutral-400">
                Do you have a curriculum you want to build a simulation training game out of?
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full sm:w-auto shrink-0">
            <a
              href="https://wa.me/2349016498377?text=Hello%20BTSW,%20I%20would%20like%20to%20inquire%20about%20building%20a%20custom%20simulation%20game%20for%20our%20organization%20or%20curriculum."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-[#25D366]/30 transition-all hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare size={16} />
              <span>Chat with an agent</span>
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. UPCOMING SIMULATION EVENT                                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-[#F16736]">
              ACTIVE COMPETITION CALENDAR
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
              Upcoming Simulation Event
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Secure your slot in scheduled live streams, crisis syndicates, or physical encounters.
            </p>
          </div>
          
          {/* Schedule Filter Tabs */}
          <div className="flex gap-1.5 p-1 bg-white border border-[#e8e5e0] rounded-lg w-max shadow-xs">
            {(['all', 'virtual-event', 'tabletop'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setEventTab(tab)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  eventTab === tab
                    ? 'bg-[#1e1e1e] text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {tab === 'virtual-event' ? 'Virtual Training' : tab === 'tabletop' ? 'Physical Event' : 'All Events'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div 
              key={ev.id}
              className="p-6 bg-white border border-[#e8e5e0] rounded-xl space-y-4 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#F16736] bg-[#fff1eb] px-2.5 py-0.5 rounded-md">
                    {ev.type === 'tabletop' ? 'PHYSICAL EVENT' : ev.type.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">{ev.date}</span>
                </div>

                <h4 className="text-base font-bold text-neutral-900 leading-snug">
                  {ev.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {ev.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 space-y-3">
                <div className="flex justify-between items-center text-xs text-neutral-500">
                  <span className="truncate">Host: {ev.host}</span>
                  {ev.capacity ? (
                    <span className="font-bold text-[#F16736] shrink-0">
                      {ev.capacity - (ev.enrolledCount || 0)} slots remaining
                    </span>
                  ) : (
                    <span className="font-bold text-emerald-600 shrink-0">Open Access</span>
                  )}
                </div>

                {/* Inactive Registration Button */}
                <button
                  type="button"
                  disabled
                  className="w-full py-2.5 bg-neutral-200 text-neutral-500 text-xs font-bold rounded-lg cursor-not-allowed flex items-center justify-center gap-1.5 opacity-80 select-none border border-neutral-300/40"
                >
                  <Calendar size={13} className="text-neutral-400" />
                  <span>Register for Event</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. STUDENT & EDUCATOR REVIEWS: AUTHENTIC SOCIAL PROOF                    */}
      {/* ========================================================================= */}
      <section className="bg-white border-y border-[#e8e5e0] py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#F16736]">
              REAL-WORLD IMPACT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
              What students, mentors & school heads say
            </h2>
            <div className="flex items-center justify-center gap-1.5 text-amber-500 pt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-bold text-neutral-700 ml-2">4.9/5.0 Average Participant Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, rIdx) => (
                      <Star key={rIdx} size={12} className="fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed font-medium italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-200/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F16736] text-white flex items-center justify-center font-bold text-xs">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-neutral-900">{t.name}</h5>
                    <p className="text-[10px] text-neutral-500">{t.role} • {t.school}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. "SEE SIMULATIONS IN ACTION" & KEY IMPACT METRICS                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-14 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Video / Media Preview Card */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl relative group min-h-[380px] flex items-end">
              <Image
                src="/images/student_holding_card.jpg"
                alt="Student holding strategic simulation card"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/25" />

              <div className="p-8 sm:p-10 space-y-5 text-white text-center sm:text-left relative z-10 w-full">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/50 backdrop-blur-md border border-white/15 text-[#F16736] text-[10px] font-black uppercase tracking-wider w-max">
                  <Flame size={12} /> REAL DECISIONS • ZERO THEORY
                </span>
                <h3 className="text-2xl sm:text-3xl font-black leading-tight max-w-lg">
                  Watch secondary students navigate high-pressure supply chain shocks
                </h3>
                <p className="text-xs text-neutral-200 max-w-md font-normal leading-relaxed">
                  In our live virtual simulations, teams analyze real-time market shifts, defend contracts with skeptical character actors, and receive immediate cognitive scorecards.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F16736] hover:bg-[#e05423] text-white text-xs font-bold rounded-lg transition-all shadow-md hover:scale-105 active:scale-95"
                  >
                    <Play size={13} className="fill-white" />
                    <span>Watch 2-Minute Simulation Showcase</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quantified Impact Metrics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
                Built for deep cognitive transformation
              </h3>
              <p className="text-xs text-neutral-500">
                BTSW tracks objective metrics across every decision lab and tabletop match to ensure permanent cognitive growth.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-[#e8e5e0] rounded-xl shadow-xs space-y-1">
                <span className="text-3xl font-black text-[#F16736]">100+</span>
                <h4 className="text-xs font-bold text-neutral-900">Participants</h4>
                <p className="text-[11px] text-neutral-500">Across secondary schools, student leaders and clubs</p>
              </div>

              <div className="p-5 bg-white border border-[#e8e5e0] rounded-xl shadow-xs space-y-1">
                <span className="text-3xl font-black text-emerald-600">98%</span>
                <h4 className="text-xs font-bold text-neutral-900">Engagement Score</h4>
                <p className="text-[11px] text-neutral-500">Voluntary match replay and tournament return rate</p>
              </div>

              <div className="p-5 bg-white border border-[#e8e5e0] rounded-xl shadow-xs space-y-1">
                <span className="text-3xl font-black text-purple-600">5+</span>
                <h4 className="text-xs font-bold text-neutral-900">Tournaments Hosted</h4>
                <p className="text-[11px] text-neutral-500">Physical chess and virtual syndicate rounds</p>
              </div>

              <div className="p-5 bg-white border border-[#e8e5e0] rounded-xl shadow-xs space-y-1">
                <span className="text-3xl font-black text-sky-600">100%</span>
                <h4 className="text-xs font-bold text-neutral-900">Hands-on Practice</h4>
                <p className="text-[11px] text-neutral-500">Zero passive lecturing; direct tactical play</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. HOW IT WORKS: 3 INTUITIVE STEPS                                        */}
      {/* ========================================================================= */}
      <section className="bg-white border-y border-[#e8e5e0] py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#F16736]">
              SIMPLE ONBOARDING
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
              How booking & playing works
            </h2>
            <p className="text-xs text-neutral-500">
              Get started in minutes, whether joining as a solo student, a team syndicate, or an entire school grade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-[#1e1e1e] text-white flex items-center justify-center font-black text-xs">
                1
              </span>
              <h4 className="text-base font-black text-neutral-900">Choose your Game</h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                Explore our interactive simulations across commercial negotiation, tabletop strategy, speed logic, and crisis syndicates. Pick the challenge that fits your focus.
              </p>
            </div>

            <div className="p-6 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-[#F16736] text-white flex items-center justify-center font-black text-xs">
                2
              </span>
              <h4 className="text-base font-black text-neutral-900">Register</h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                Lock in your slot as an individual contender or register with your school squad. Receive instant schedule details and match access.
              </p>
            </div>

            <div className="p-6 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                3
              </span>
              <h4 className="text-base font-black text-neutral-900">Play & Debrief</h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                Step into the live arena, test your tactical composure under real-time constraints, and receive detailed mentor feedback and AI performance debriefs.
              </p>
            </div>
          </div>

          {/* Value Props Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100 text-center text-xs font-bold text-neutral-600 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#F16736]" /> Zero Prior Experience Needed
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#F16736]" /> Real-time Performance Metrics
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. COMPREHENSIVE CATEGORY DIRECTORY LINKS                                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="p-8 bg-white border border-[#e8e5e0] rounded-xl space-y-8">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-[#F16736]">
              DIRECTORY INDEX
            </span>
            <h3 className="text-lg font-black text-neutral-900">
              Browse Simulations & Games by Category
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            
            {/* Column 1: Virtual Simulations */}
            <div className="space-y-2.5">
              <h5 className="font-extrabold text-neutral-900 uppercase text-[11px] tracking-wider border-b border-neutral-100 pb-1.5">
                Virtual Simulations
              </h5>
              <ul className="space-y-1.5 text-neutral-600">
                <li>
                  <Link href="/simulations" className="hover:text-[#F16736] transition-colors">
                    Lagos Hustle Negotiation
                  </Link>
                </li>
                <li>
                  <Link href="/simulations" className="hover:text-[#F16736] transition-colors">
                    Supply Chain Crisis Lab
                  </Link>
                </li>
                <li>
                  <Link href="/simulations" className="hover:text-[#F16736] transition-colors">
                    Neuro-Cognitive Velocity
                  </Link>
                </li>
                <li>
                  <Link href="/portal" className="hover:text-[#F16736] transition-colors">
                    Executive Boardroom Pitch
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Physical Simulation */}
            <div className="space-y-2.5">
              <h5 className="font-extrabold text-neutral-900 uppercase text-[11px] tracking-wider border-b border-neutral-100 pb-1.5">
                Physical Simulation
              </h5>
              <ul className="space-y-1.5 text-neutral-600">
                <li>
                  <Link href="/tabletop-games" className="hover:text-[#F16736] transition-colors">
                    Grandmaster Tournament Chess
                  </Link>
                </li>
                <li>
                  <Link href="/tabletop-games" className="hover:text-[#F16736] transition-colors">
                    Cold-Chain AgroTech Board
                  </Link>
                </li>
                <li>
                  <Link href="/tabletop-games" className="hover:text-[#F16736] transition-colors">
                    Diplomatic Treaty Table
                  </Link>
                </li>
                <li>
                  <Link href="/tabletop-games" className="hover:text-[#F16736] transition-colors">
                    Rapid Blitz Sprints
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Institutional Programs */}
            <div className="space-y-2.5">
              <h5 className="font-extrabold text-neutral-900 uppercase text-[11px] tracking-wider border-b border-neutral-100 pb-1.5">
                School Programs
              </h5>
              <ul className="space-y-1.5 text-neutral-600">
                <li>
                  <Link href="/bring-your-school" className="hover:text-[#F16736] transition-colors">
                    Secondary Prefect Retreats
                  </Link>
                </li>
                <li>
                  <Link href="/bring-your-school" className="hover:text-[#F16736] transition-colors">
                    Turnkey Classroom Game Kits
                  </Link>
                </li>
                <li>
                  <Link href="/bring-your-school" className="hover:text-[#F16736] transition-colors">
                    Inter-House Chess Leagues
                  </Link>
                </li>
                <li>
                  <Link href="/game-recommendations" className="hover:text-[#F16736] transition-colors">
                    Teacher Facilitation Guides
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FINAL HIGH-ENERGY CTA BANNER                                          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 pt-4">
        <div className="p-8 sm:p-12 bg-gradient-to-r from-[#F16736] via-[#ea580c] to-[#c2410c] text-white rounded-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          <div className="space-y-2 max-w-xl">
            <h3 className="text-3xl font-black tracking-tight">
              Join the Arena
            </h3>
            <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal">
              Book a live virtual simulation, register for a physical simulation event, or get custom game for your classroom, Team or Organization today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://wa.me/2349016498377?text=Hello%20BTSW,%20I%20would%20like%20to%20inquire%20about%20booking%20or%20customizing%20a%20simulation%20game%20for%20our%20classroom,%20team,%20or%20organization."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-[#F16736] hover:bg-neutral-100 font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare size={16} />
              <span>Contact us today</span>
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* QUICK VIEW DOSSIER MODAL                                                  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedGameForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#e8e5e0] shadow-2xl relative flex flex-col justify-between"
            >
              {/* Modal Header */}
              <div className="p-6 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border-b border-neutral-100 relative">
                <button
                  onClick={() => setSelectedGameForModal(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-[#fff1eb] text-[#F16736]">
                    {selectedGameForModal.formatName}
                  </span>
                  
                  {selectedGameForModal.priceType === 'free' ? (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-600 text-white">
                      Free Entry
                    </span>
                  ) : (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-neutral-900 text-white border border-neutral-700">
                      {selectedGameForModal.price}
                    </span>
                  )}

                  <span className="flex items-center text-xs font-bold text-amber-500 ml-auto">
                    <Star size={12} className="fill-amber-400 text-amber-400 mr-1" />
                    {selectedGameForModal.rating} ({selectedGameForModal.reviewCount} Reviews)
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-neutral-900 leading-tight pr-10">
                  {selectedGameForModal.title}
                </h3>

                {/* Start timing banner in modal */}
                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-[#F16736] bg-[#fff1eb] border border-[#F16736]/20 p-2.5 rounded-lg">
                  <Calendar size={14} className="shrink-0" />
                  <span>{selectedGameForModal.startTime}</span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 text-xs text-neutral-700">
                
                {/* Meta stats bar */}
                <div className="grid grid-cols-3 gap-3 p-3 bg-[#faf9f7] rounded-lg border border-[#e8e5e0]">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block">Duration</span>
                    <span className="font-black text-neutral-900">{selectedGameForModal.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block">Squad / Players</span>
                    <span className="font-black text-neutral-900">{selectedGameForModal.groupSizeLabel}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block">Target Division</span>
                    <span className="font-black text-neutral-900">{selectedGameForModal.ageLabel}</span>
                  </div>
                </div>

                {/* Scenario Briefing */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                    <Compass size={14} className="text-[#F16736]" />
                    Tactical Scenario Briefing
                  </h4>
                  <p className="text-neutral-600 leading-relaxed font-normal bg-neutral-50 p-3.5 rounded-lg border border-neutral-100">
                    {selectedGameForModal.briefing}
                  </p>
                </div>

                {/* Core Learning Objectives */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    Core Objectives & Milestones
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedGameForModal.objectives.map((obj, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span className="text-neutral-600">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rules of Engagement */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                    <Shield size={14} className="text-sky-600" />
                    Rules of Engagement
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedGameForModal.rules.map((rule, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                        <span className="text-neutral-600">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Strategy Tips */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                    <Zap size={14} className="text-amber-500" />
                    Arbiter Strategy Tips
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedGameForModal.tips.map((tip, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span className="text-neutral-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="p-5 bg-[#faf9f7] border-t border-[#e8e5e0] flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedGameForModal(null)}
                  className="px-4 py-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const g = selectedGameForModal;
                    setSelectedGameForModal(null);
                    openRegistration(g);
                  }}
                  className="px-6 py-2.5 bg-[#F16736] hover:bg-[#e05423] text-white text-xs font-bold rounded-lg shadow transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Register for this game</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* GAME REGISTRATION MODAL                                                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedGameForRegistration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-[#e8e5e0] shadow-2xl relative flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border-b border-neutral-100 relative">
                <button
                  onClick={() => setSelectedGameForRegistration(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-[#fff1eb] text-[#F16736]">
                    Game Registration
                  </span>

                  {selectedGameForRegistration.priceType === 'free' ? (
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-emerald-600 text-white">
                      Free Entry
                    </span>
                  ) : (
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-neutral-900 text-white">
                      {selectedGameForRegistration.price}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-neutral-900 leading-tight pr-10">
                  {selectedGameForRegistration.title}
                </h3>

                {/* Timing Indicator */}
                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-[#F16736] bg-[#fff1eb] border border-[#F16736]/20 p-2.5 rounded-lg">
                  <Calendar size={14} className="shrink-0" />
                  <span>{selectedGameForRegistration.startTime}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 text-xs text-neutral-700">
                {!regSubmitted ? (
                  <form onSubmit={handleRegistrationSubmit} className="space-y-5">
                    
                    {/* Step 1: Participation Type */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-wider text-neutral-800 block">
                        1. Are you registering as an Individual or a Team? *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setRegParticipationType('individual')}
                          className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                            regParticipationType === 'individual'
                              ? 'border-[#F16736] bg-[#fff1eb]/60 text-neutral-900 shadow-xs'
                              : 'border-[#e8e5e0] bg-white text-neutral-600 hover:border-neutral-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-xs text-neutral-900">Individual Contender</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${regParticipationType === 'individual' ? 'border-[#F16736] bg-[#F16736]' : 'border-neutral-300'}`}>
                              {regParticipationType === 'individual' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>
                          <p className="text-[11px] text-neutral-500 leading-tight">
                            Solo seat with live 1v1 AI roleplay or arbiter pairing.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setRegParticipationType('team')}
                          className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                            regParticipationType === 'team'
                              ? 'border-[#F16736] bg-[#fff1eb]/60 text-neutral-900 shadow-xs'
                              : 'border-[#e8e5e0] bg-white text-neutral-600 hover:border-neutral-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-xs text-neutral-900">Team / Syndicate Squad</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${regParticipationType === 'team' ? 'border-[#F16736] bg-[#F16736]' : 'border-neutral-300'}`}>
                              {regParticipationType === 'team' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>
                          <p className="text-[11px] text-neutral-500 leading-tight">
                            Group cohort entry with fellow students / squad mates.
                          </p>
                        </button>
                      </div>
                    </div>

                    {/* Team Specific Inputs */}
                    {regParticipationType === 'team' && (
                      <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                              Team / Syndicate Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={regTeamName}
                              onChange={(e) => setRegTeamName(e.target.value)}
                              placeholder="e.g. Lagos Vanguard Squad"
                              className="w-full px-3 py-2 bg-white border border-[#e8e5e0] rounded-lg text-xs focus:outline-none focus:border-[#F16736]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                              Squad Size (Players) *
                            </label>
                            <select
                              value={regTeamSize}
                              onChange={(e) => setRegTeamSize(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-[#e8e5e0] rounded-lg text-xs focus:outline-none focus:border-[#F16736]"
                            >
                              <option value="2">2 Players (Duo)</option>
                              <option value="3">3 Players (Trio)</option>
                              <option value="4">4 Players (Squad)</option>
                              <option value="5">5 Players (Syndicate)</option>
                              <option value="6+">6+ Players (Delegation)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Contact & Participant Info */}
                    <div className="space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-wider text-neutral-800 block">
                        2. Participant Contact & Institution Details *
                      </label>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-neutral-600 block mb-1">
                            {regParticipationType === 'team' ? 'Team Lead Full Name *' : 'Full Name *'}
                          </label>
                          <input
                            type="text"
                            required
                            value={regFullName}
                            onChange={(e) => setRegFullName(e.target.value)}
                            placeholder="e.g. Chinedu Adeleke"
                            className="w-full px-3 py-2 bg-white border border-[#e8e5e0] rounded-lg text-xs focus:outline-none focus:border-[#F16736]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-neutral-600 block mb-1">
                            Email Address * (for match invite)
                          </label>
                          <input
                            type="email"
                            required
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="e.g. student@gmail.com"
                            className="w-full px-3 py-2 bg-white border border-[#e8e5e0] rounded-lg text-xs focus:outline-none focus:border-[#F16736]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-neutral-600 block mb-1">
                            WhatsApp / Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            placeholder="e.g. +234 801 234 5678"
                            className="w-full px-3 py-2 bg-white border border-[#e8e5e0] rounded-lg text-xs focus:outline-none focus:border-[#F16736]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-neutral-600 block mb-1">
                            School / College / Organization *
                          </label>
                          <input
                            type="text"
                            required
                            value={regSchool}
                            onChange={(e) => setRegSchool(e.target.value)}
                            placeholder="e.g. Floral College Lagos"
                            className="w-full px-3 py-2 bg-white border border-[#e8e5e0] rounded-lg text-xs focus:outline-none focus:border-[#F16736]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-neutral-600 block mb-1">
                          Division / Academic Level *
                        </label>
                        <select
                          value={regDivision}
                          onChange={(e) => setRegDivision(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-[#e8e5e0] rounded-lg text-xs focus:outline-none focus:border-[#F16736]"
                        >
                          <option value="Middle School (10-13)">Junior Secondary / Middle School (Ages 10–13)</option>
                          <option value="High School (14-18)">Senior Secondary / High School (Ages 14–18)</option>
                          <option value="Undergraduate / Campus">Undergraduate / University Student</option>
                          <option value="Young Professional">Young Professional / Graduate</option>
                        </select>
                      </div>
                    </div>

                    {/* Step 3: Schedule & Price Summary Card */}
                    <div className="p-3.5 bg-[#faf9f7] rounded-xl border border-[#e8e5e0] space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-500 font-semibold">Scheduled Start Time:</span>
                        <span className="font-bold text-[#F16736]">{selectedGameForRegistration.startTime}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs border-t border-neutral-200/60 pt-2">
                        <span className="text-neutral-700 font-extrabold">Registration Fee:</span>
                        <span className="text-sm font-black text-neutral-900">
                          {selectedGameForRegistration.priceType === 'free' ? '₦0 (100% Free Entry)' : selectedGameForRegistration.price}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedGameForRegistration(null)}
                        className="px-4 py-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#F16736] hover:bg-[#e05423] text-white text-xs font-extrabold rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>
                          {selectedGameForRegistration.priceType === 'free'
                            ? 'Complete Free Registration'
                            : `Proceed with ${selectedGameForRegistration.price}`}
                        </span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Success State */
                  <div className="py-6 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 size={32} />
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                        CONFIRMED & RESERVED
                      </span>
                      <h4 className="text-2xl font-black text-neutral-900">
                        Registration Successful!
                      </h4>
                      <p className="text-xs text-neutral-500 max-w-md mx-auto">
                        Your slot for <strong className="text-neutral-900">{selectedGameForRegistration.title}</strong> has been locked in.
                      </p>
                    </div>

                    <div className="p-4 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl max-w-md mx-auto text-left space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500">Ticket Ref:</span>
                        <span className="font-mono font-bold text-neutral-900">{regReference}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500">Scheduled Time:</span>
                        <span className="font-bold text-[#F16736]">{selectedGameForRegistration.startTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500">Registration Mode:</span>
                        <span className="font-bold text-neutral-900">
                          {regParticipationType === 'team' ? `Team Squad (${regTeamName || 'Team'})` : `Individual (${regFullName})`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500">Confirmation Sent To:</span>
                        <span className="font-bold text-neutral-900 truncate max-w-[200px]">{regEmail || 'your email'}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => setSelectedGameForRegistration(null)}
                        className="w-full sm:w-auto px-6 py-2.5 bg-[#1e1e1e] hover:bg-neutral-800 text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
                      >
                        Done / Browse More Games
                      </button>
                      <Link
                        href="/simulations"
                        onClick={() => setSelectedGameForRegistration(null)}
                        className="w-full sm:w-auto px-6 py-2.5 bg-[#F16736] hover:bg-[#e05423] text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Go to Training Room</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
