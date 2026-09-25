'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { 
  Sparkles, Target, ArrowRight, Brain, Shield, CheckCircle2, 
  Gamepad2, Users, Clock, Filter, RefreshCw, Search, Star,
  X, ChevronRight, Check, ArrowUpRight, Smartphone,
  Layers, Cpu, Coins, Truck, Landmark, Download, BookOpen, ExternalLink, Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export interface AppStoreSimGame {
  id: string;
  title: string;
  developer: string;
  genre: 'business' | 'logistics' | 'governance' | 'engineering' | 'tactics';
  genreLabel: string;
  platforms: ('ios' | 'android')[];
  rating: number;
  reviewCount: string;
  downloads: string;
  priceModel: string;
  ageRecommendation: string;
  appStoreUrl: string;
  playStoreUrl: string;
  imageSrc: string;
  tagline: string;
  summary: string;
  skillsTrained: string[];
  realWorldApplication: string;
  classroomFacilitationPrompt: string;
  keyMechanics: string[];
  badge?: string;
}

export const REAL_SIMULATION_GAMES: AppStoreSimGame[] = [
  {
    id: 'game-dev-tycoon',
    title: 'Game Dev Tycoon',
    developer: 'Greenheart Games',
    genre: 'business',
    genreLabel: 'Business & Entrepreneurship',
    platforms: ['ios', 'android'],
    rating: 4.8,
    reviewCount: '120K+',
    downloads: '1M+ Downloads',
    priceModel: 'Premium ($4.99) • Zero Pay-to-Win',
    ageRecommendation: 'Ages 12+ (Secondary & Campus)',
    appStoreUrl: 'https://apps.apple.com/app/game-dev-tycoon/id1162589760',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.greenheartgames.gdt',
    imageSrc: '/images/sim_tycoon_management.jpg',
    tagline: 'Run a tech studio from your 80s garage to global enterprise scale.',
    summary: 'Build your custom game development company from the ground up. Manage cashflow, balance staff specializations, allocate R&D budgets across technology and design, and survive shifting market trends.',
    skillsTrained: ['Product-Market Fit', 'Cashflow Runway Management', 'R&D Budget Allocation', 'Talent Hiring & Morale'],
    realWorldApplication: 'Teaches students how real tech startups balance capital burn rates against iterative product cycles before exhausting their cash reserves.',
    classroomFacilitationPrompt: 'Have students track their profit margins across 3 product release cycles and explain what causes a game to flop despite high production costs.',
    keyMechanics: ['Dynamic Market Review Algorithms', 'Staff Training & Skill Matrix', 'Custom Game Engine Development', 'Office Relocation & Expansion'],
    badge: 'TOP BUSINESS SIM'
  },
  {
    id: 'mini-motorways',
    title: 'Mini Motorways',
    developer: 'Dinosaur Polo Club',
    genre: 'logistics',
    genreLabel: 'Logistics & Traffic Flow',
    platforms: ['ios', 'android'],
    rating: 4.9,
    reviewCount: '85K+',
    downloads: 'Apple Arcade & Mobile',
    priceModel: 'Apple Arcade / Premium',
    ageRecommendation: 'Ages 10+ (All Divisions)',
    appStoreUrl: 'https://apps.apple.com/app/mini-motorways/id1453901000',
    playStoreUrl: 'https://play.google.com/store/search?q=mini+motorways&c=apps',
    imageSrc: '/images/sim_logistics_transit.jpg',
    tagline: 'Engineer city traffic arteries and solve dynamic supply chain bottlenecks.',
    summary: 'Draw roads and transit networks in growing metropolises across the world. Balance roundabouts, motorways, traffic lights, and bridge connections as residential and commercial hubs expand exponentially.',
    skillsTrained: ['Bottleneck Elimination', 'Dynamic Queuing Theory', 'Urban Route Optimization', 'Scalability Planning'],
    realWorldApplication: 'Directly mirrors the logistical challenges of port congestion, transit arteries, and distribution hubs in fast-growing cities like Lagos and London.',
    classroomFacilitationPrompt: 'Ask students to describe the exact point where their road network suffered systemic failure and what infrastructure investment would have prevented it.',
    keyMechanics: ['Real-Time Queuing Simulator', 'Weekly Asset Allocation Upgrades', 'Organic Urban Sprawl Algorithms', 'Highways & Bridge Routing'],
    badge: 'EDITOR CHOICE'
  },
  {
    id: 'rebel-inc',
    title: 'Rebel Inc.',
    developer: 'Ndemic Creations',
    genre: 'governance',
    genreLabel: 'Governance & Diplomacy',
    platforms: ['ios', 'android'],
    rating: 4.7,
    reviewCount: '340K+',
    downloads: '10M+ Downloads',
    priceModel: 'Free to Play • Premium Upgrades',
    ageRecommendation: 'Ages 13+ (Secondary & Campus)',
    appStoreUrl: 'https://apps.apple.com/app/rebel-inc/id1439643448',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.ndemiccreations.rebelinc',
    imageSrc: '/images/sim_governance_diplomacy.jpg',
    tagline: 'Balance civilian trust, economic stability, and counter-insurgency.',
    summary: 'A political/military simulation from the creators of Plague Inc. Stabilize war-torn regions by funding schools, clean water, and roads while managing inflation, combating corruption, and brokering peace accords.',
    skillsTrained: ['Multi-Stakeholder Negotiation', 'Inflation Control', 'Anti-Corruption Measures', 'Peace Accord Diplomacy'],
    realWorldApplication: 'Created in consultation with international development economists and peacebuilders to simulate the fragile trade-offs of post-crisis state stabilization.',
    classroomFacilitationPrompt: 'Discuss why spending all government funds immediately triggers inflation and anger among local citizens, despite good intentions.',
    keyMechanics: ['Regional Civilian Support Metrics', 'Inflation & Corruption Risk Hedging', 'Tactical Security Deployments', 'Bilateral Peace Negotiations'],
    badge: 'POLICY & DIPLOMACY'
  },
  {
    id: 'pocket-city-2',
    title: 'Pocket City 2',
    developer: 'Codebrew Games',
    genre: 'business',
    genreLabel: 'Urban Economics & City Sim',
    platforms: ['ios', 'android'],
    rating: 4.8,
    reviewCount: '45K+',
    downloads: '500K+ Downloads',
    priceModel: 'Premium ($4.99) • Zero Microtransactions',
    ageRecommendation: 'Ages 11+ (Middle & High School)',
    appStoreUrl: 'https://apps.apple.com/app/pocket-city-2/id1533708108',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.codebrewgames.pocketcity2',
    imageSrc: '/images/mobile_sim_games_hero.jpg',
    tagline: 'Manage municipal tax rates, infrastructure zoning, and citizen happiness.',
    summary: 'Design and manage a thriving 3D city without timers or pay-to-win locks. Balance residential, commercial, and industrial zoning while funding emergency services, healthcare, energy grids, and green tourism.',
    skillsTrained: ['Municipal Tax Policy', 'Zoning & Land Use Strategy', 'Crisis Response & Emergency Services', 'Debt vs Capital Reserves'],
    realWorldApplication: 'Provides a clean sandbox for learning macroeconomics, municipal revenue generation, and sustainable public infrastructure development.',
    classroomFacilitationPrompt: 'Challenge students to maintain a 90%+ citizen happiness rating while running a balanced municipal surplus without foreign loans.',
    keyMechanics: ['Comprehensive Fiscal Budget Panel', 'Disaster Recovery Protocols', 'Zoning Synergy Bonuses', 'Full Free-Roam 3D City View'],
    badge: 'NO PAY-TO-WIN'
  },
  {
    id: 'poly-bridge-2',
    title: 'Poly Bridge 2',
    developer: 'Dry Cactus',
    genre: 'engineering',
    genreLabel: 'Engineering & Physics',
    platforms: ['ios', 'android'],
    rating: 4.8,
    reviewCount: '30K+',
    downloads: '1M+ Downloads',
    priceModel: 'Premium ($1.99)',
    ageRecommendation: 'Ages 10+ (All Divisions)',
    appStoreUrl: 'https://apps.apple.com/app/poly-bridge-2/id1530756777',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.drycactus.polybridge2',
    imageSrc: '/images/sim_logistics_transit.jpg',
    tagline: 'Stress-test physics and build bridges under strict budget caps.',
    summary: 'A physics-based bridge construction simulator. Use steel, hydraulics, wooden trusses, and cables to guide cars, heavy trucks, and double-decker buses across treacherous rivers without structural collapse.',
    skillsTrained: ['Tensile Stress Calculation', 'Material Cost Optimization', 'Structural Triangulation', 'Iterative Engineering Test Loops'],
    realWorldApplication: 'Translates theoretical STEM and mechanical physics formulas into tactile engineering tests with hard financial budget constraints.',
    classroomFacilitationPrompt: 'Have students design a bridge that passes testing with at least 15% budget remaining under the maximum cost cap.',
    keyMechanics: ['Custom Physics Simulation Engine', 'Hydraulic Lift Scheduling', 'Visual Stress Heatmaps', 'Leaderboards & Creative Sandbox'],
    badge: 'STEM & PHYSICS'
  },
  {
    id: 'polytopia',
    title: 'The Battle of Polytopia',
    developer: 'Midjiwan AB',
    genre: 'tactics',
    genreLabel: '4X Strategy & Resource Expansion',
    platforms: ['ios', 'android'],
    rating: 4.7,
    reviewCount: '2.1M+',
    downloads: '20M+ Downloads',
    priceModel: 'Free to Play • Optional Tribes',
    ageRecommendation: 'Ages 10+ (All Divisions)',
    appStoreUrl: 'https://apps.apple.com/app/the-battle-of-polytopia/id1006393168',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.midjiwan.polytopia',
    imageSrc: '/images/tabletop_hero_visual.jpg',
    tagline: 'Master 4X civilization strategy: eXplore, eXpand, eXploit, and eXterminate.',
    summary: 'A fast-paced turn-based tactical strategy game. Lead your unique tribe through procedural map exploration, unlock agricultural and navigation technologies, manage harvest economies, and form strategic alliances.',
    skillsTrained: ['Tech Tree Prioritization', 'Turn-Based Capital Compounding', 'Reconnaissance & Fog of War', 'Territorial Defense'],
    realWorldApplication: 'Introduces students to high-level strategic planning, opportunity cost evaluation, and economic leverage in a distraction-free turn-based system.',
    classroomFacilitationPrompt: 'Ask students why investing in early economic tech yields 10x more strategic advantage than early military unit spam.',
    keyMechanics: ['Procedural Hex Grid Generation', 'Branching Research Tech Tree', 'Multiplayer Turn-Based Matches', 'Diplomatic Treaties & Embassies'],
    badge: 'FLAGSHIP 4X'
  },
  {
    id: 'mindustry',
    title: 'Mindustry',
    developer: 'Anuke (Open Source)',
    genre: 'logistics',
    genreLabel: 'Industrial Automation & Logistics',
    platforms: ['ios', 'android'],
    rating: 4.8,
    reviewCount: '180K+',
    downloads: '5M+ Downloads',
    priceModel: '100% Free on Android • Low Cost on iOS',
    ageRecommendation: 'Ages 12+ (Secondary & Campus)',
    appStoreUrl: 'https://apps.apple.com/app/mindustry/id1385258953',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=io.anuke.mindustry',
    imageSrc: '/images/sim_logistics_transit.jpg',
    tagline: 'Build automated conveyor pipelines, supply chains, and power grids.',
    summary: 'A hybrid factory management and tower defense game. Mine raw minerals, refine them into advanced alloys using automated conveyor networks, manage power grid distribution, and supply defense turrets with ammunition.',
    skillsTrained: ['Automated Supply Chain Architecture', 'Resource Processing Pipelines', 'Energy Grid Load Balancing', 'Throughput Optimization'],
    realWorldApplication: 'Directly mirrors the logistical design of automated modern manufacturing plants, fulfillment centers, and electrical microgrids.',
    classroomFacilitationPrompt: 'Challenge students to diagram their automated factory conveyor layout on paper before launching production.',
    keyMechanics: ['Conveyor & Pipeline Routing', 'Logic Processor Programming', 'Power Distribution Grids', 'Cross-Platform Multiplayer Co-op'],
    badge: 'AUTOMATION LEADER'
  },
  {
    id: 'motorsport-manager-3',
    title: 'Motorsport Manager Mobile 3',
    developer: 'Playsport Games',
    genre: 'business',
    genreLabel: 'High-Performance Team & Data Operations',
    platforms: ['ios', 'android'],
    rating: 4.8,
    reviewCount: '90K+',
    downloads: '1M+ Downloads',
    priceModel: 'Premium ($3.99)',
    ageRecommendation: 'Ages 12+ (Secondary & Campus)',
    appStoreUrl: 'https://apps.apple.com/app/motorsport-manager-mobile-3/id1346580540',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.playsportgames.mmm3',
    imageSrc: '/images/sim_tycoon_management.jpg',
    tagline: 'Lead engineers, drivers, and real-time telemetry strategy to the podium.',
    summary: 'Take full command of a high-stakes racing franchise. Hire drivers, negotiate sponsor retainers, invest in wind tunnel engineering, and make split-second pitstop decisions during unpredictable weather shifts.',
    skillsTrained: ['Real-Time Telemetry Analytics', 'Sponsor Contract Negotiation', 'High-Pressure Decision Making', 'R&D Factory Upgrades'],
    realWorldApplication: 'Teaches data-driven resource management, risk hedging during live operational crises, and human talent retention in competitive industries.',
    classroomFacilitationPrompt: 'Ask students how they adjusted their race pit strategy when rainfall odds spiked from 10% to 80% on lap 15.',
    keyMechanics: ['Live Race Telemetry Screen', 'Part Reliability vs Performance Sliders', 'Driver Ego & Morale Systems', 'Dynamic Weather Radar'],
    badge: 'DATA-DRIVEN SIM'
  },
  {
    id: 'plague-inc',
    title: 'Plague Inc.',
    developer: 'Ndemic Creations',
    genre: 'governance',
    genreLabel: 'Global Systems & Epidemiology',
    platforms: ['ios', 'android'],
    rating: 4.7,
    reviewCount: '3.6M+',
    downloads: '100M+ Downloads',
    priceModel: 'Free (Android) • $0.99 (iOS)',
    ageRecommendation: 'Ages 12+ (Secondary & Campus)',
    appStoreUrl: 'https://apps.apple.com/app/plague-inc/id525818839',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.miniclip.plagueinc',
    imageSrc: '/images/sim_governance_diplomacy.jpg',
    tagline: 'Model global transmission vectors, climate resistance, and public policy.',
    summary: 'A world-famous realistic global epidemiological simulation. Understand how diseases spread through air, water, and livestock vectors across countries with varying healthcare budgets, climates, and border closures.',
    skillsTrained: ['Complex Systems Thinking', 'Global Public Health Dynamics', 'Geographic Vector Analysis', 'Evolutionary Adaptation'],
    realWorldApplication: 'Praised by the US Centers for Disease Control (CDC) as a powerful interactive tool to teach public health epidemiology and global mobility patterns.',
    classroomFacilitationPrompt: 'Have students play "Cure Mode" to simulate vaccine distribution logistics and global border quarantine policies.',
    keyMechanics: ['Real-World Country Demographics', 'Transmission & Mutation Tech Trees', 'Global News Feed Events', 'Cure Research Race Tracker'],
    badge: 'CDC RECOGNIZED'
  },
  {
    id: 'human-resource-machine',
    title: 'Human Resource Machine',
    developer: 'Tomorrow Corporation',
    genre: 'engineering',
    genreLabel: 'Algorithmic Thinking & Workflow Logic',
    platforms: ['ios', 'android'],
    rating: 4.8,
    reviewCount: '25K+',
    downloads: '500K+ Downloads',
    priceModel: 'Premium ($4.99)',
    ageRecommendation: 'Ages 11+ (Middle, Secondary & Campus)',
    appStoreUrl: 'https://apps.apple.com/app/human-resource-machine/id1005098314',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.tomorrowcorporation.humanresourcemachine',
    imageSrc: '/images/banner_puzzles_timers.jpg',
    tagline: 'Program corporate office workers to solve algorithmic puzzles.',
    summary: 'A visual programming puzzle game. Program little office employees to execute logic tasks using real assembly instructions (INBOX, OUTBOX, COPYTO, JUMP IF ZERO) to automate corporate workflow pipelines.',
    skillsTrained: ['Computational Thinking', 'Assembly-Level Logic', 'Workflow Automation', 'Algorithm Optimization'],
    realWorldApplication: 'Provides the foundation for computer programming, logic flowcharts, and automated business process re-engineering without overwhelming syntax.',
    classroomFacilitationPrompt: 'Challenge students to optimize their code solutions to achieve the Speed Optimization Challenge badge for shortest step execution.',
    keyMechanics: ['Visual Assembly Instruction Blocks', 'Step-by-Step Execution Debugger', 'Speed & Size Optimization Goals', 'Progressive Algorithm Complexity'],
    badge: 'LOGIC & CODE'
  },
  {
    id: 'terra-nil',
    title: 'Terra Nil',
    developer: 'Free Lives / Devolver Digital',
    genre: 'logistics',
    genreLabel: 'Ecological Restoration & Green Systems',
    platforms: ['ios', 'android'],
    rating: 4.7,
    reviewCount: '35K+',
    downloads: 'Netflix Games Exclusive',
    priceModel: 'Included with Netflix Subscription',
    ageRecommendation: 'Ages 10+ (All Divisions)',
    appStoreUrl: 'https://apps.apple.com/app/terra-nil/id1612089456',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.netflix.NGP.TerraNil',
    imageSrc: '/images/mobile_sim_games_hero.jpg',
    tagline: 'Reverse city builder: transform a dead wasteland into a self-sustaining ecosystem.',
    summary: 'A meditative environmental strategy game. Purify soil, cultivate wetlands and rainforests, reintroduce wildlife, and recycle all your constructed equipment to leave the pristine wilderness untouched.',
    skillsTrained: ['Circular Economy Principles', 'Climate Thermodynamics', 'Ecological Balance Management', 'Sustainable Deconstruction'],
    realWorldApplication: 'Inverts traditional extractive city builder tropes to teach circular economics, environmental restoration, and zero-waste engineering.',
    classroomFacilitationPrompt: 'Ask students what principles from Terra Nil can be applied to industrial cleanup projects and green urban planning.',
    keyMechanics: ['Soil Toxicity Purification', 'Biodiversity Reintroduction Goals', 'Weather & Rainfall Generation', 'Total Infrastructure Recycling'],
    badge: 'GREEN ECONOMY'
  },
  {
    id: 'chess-com',
    title: 'Chess.com: Play & Learn',
    developer: 'Chess.com',
    genre: 'tactics',
    genreLabel: 'Spatial Positional Defense & Tactics',
    platforms: ['ios', 'android'],
    rating: 4.8,
    reviewCount: '5.4M+',
    downloads: '100M+ Downloads',
    priceModel: 'Free to Play • Optional Premium Coach',
    ageRecommendation: 'Ages 8+ (All Divisions)',
    appStoreUrl: 'https://apps.apple.com/app/chess-play-learn/id329218549',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.chess',
    imageSrc: '/images/tabletop_chess.jpg',
    tagline: 'The timeless cognitive sport of positional calculation and defensive composure.',
    summary: 'The world’s premier chess platform. Play live blitz, rapid, and classical matches, solve daily tactical puzzles, review games with AI grandmaster engines, and cultivate unflinching composure under active clock pressure.',
    skillsTrained: ['Long-Range Spatial Calculation', 'Center Control Strategy', 'Calculated Sacrificial Combinations', 'Composure Under Time Pressure'],
    realWorldApplication: 'Universally recognized as the foundational cognitive sport for training deep analytical thinking, anti-distraction stamina, and strategic patience.',
    classroomFacilitationPrompt: 'Pair students for 10-minute rapid matches with mandatory written post-game blunder analysis.',
    keyMechanics: ['Interactive Puzzle Rush', 'Deep AI Game Review Engine', 'Grandmaster Video Lessons', 'Global School Ladder Leagues'],
    badge: 'ESSENTIAL STRATEGY'
  }
];

export default function GameRecommendations() {
  const catalogRef = useRef<HTMLDivElement>(null);

  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'ios' | 'android'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGameForModal, setSelectedGameForModal] = useState<AppStoreSimGame | null>(null);

  // AI Interactive Simulation Matcher
  const [userGoalQuery, setUserGoalQuery] = useState('');
  const [aiMatchResult, setAiMatchResult] = useState<{
    game: AppStoreSimGame;
    rationale: string;
    learningFocus: string;
  } | null>(null);
  const [isAiMatching, setIsAiMatching] = useState(false);

  const filteredGames = useMemo(() => {
    return REAL_SIMULATION_GAMES.filter((game) => {
      if (selectedGenre !== 'all' && game.genre !== selectedGenre) return false;
      if (selectedPlatform !== 'all' && !game.platforms.includes(selectedPlatform)) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return game.title.toLowerCase().includes(q) || 
               game.developer.toLowerCase().includes(q) || 
               game.tagline.toLowerCase().includes(q) || 
               game.skillsTrained.some(s => s.toLowerCase().includes(q));
      }
      return true;
    });
  }, [selectedGenre, selectedPlatform, searchQuery]);

  const handleAiSimMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userGoalQuery.trim()) return;
    setIsAiMatching(true);

    setTimeout(() => {
      const q = userGoalQuery.toLowerCase();
      let matched = REAL_SIMULATION_GAMES[0]; // default: Game Dev Tycoon
      let rationale = 'Matches your request for entrepreneurial and capital allocation training with realistic market feedback loops.';
      let learningFocus = 'Cashflow runway management and iterative product releases under real budget constraints.';

      if (q.includes('traffic') || q.includes('transit') || q.includes('route') || q.includes('road') || q.includes('motor')) {
        matched = REAL_SIMULATION_GAMES[1]; // Mini Motorways
        rationale = 'Recommended for exploring real-time urban congestion and dynamic route optimization under rapid metropolitan growth.';
        learningFocus = 'Dynamic queuing theory and infrastructure bottleneck mitigation.';
      } else if (q.includes('diplomacy') || q.includes('politics') || q.includes('government') || q.includes('war') || q.includes('peace') || q.includes('rebel')) {
        matched = REAL_SIMULATION_GAMES[2]; // Rebel Inc.
        rationale = 'The definitive political-economic simulation created with development economists to balance public trust and stability.';
        learningFocus = 'Multi-stakeholder negotiation, anti-corruption safeguards, and regional inflation management.';
      } else if (q.includes('city') || q.includes('urban') || q.includes('tax') || q.includes('pocket') || q.includes('building')) {
        matched = REAL_SIMULATION_GAMES[3]; // Pocket City 2
        rationale = 'Best-in-class mobile city simulation that teaches macroeconomics and municipal tax policy without pay-to-win mechanics.';
        learningFocus = 'Zoning synergy, municipal capital debt management, and emergency response allocation.';
      } else if (q.includes('bridge') || q.includes('physics') || q.includes('engineering') || q.includes('stem') || q.includes('structur')) {
        matched = REAL_SIMULATION_GAMES[4]; // Poly Bridge 2
        rationale = 'Excellent hands-on physics sandbox where students test structural tensile stress under strict project cost limits.';
        learningFocus = 'Triangulation geometry, material cost optimization, and iterative test-fail-refine loops.';
      } else if (q.includes('polytopia') || q.includes('expand') || q.includes('turn') || q.includes('tribe') || q.includes('4x')) {
        matched = REAL_SIMULATION_GAMES[5]; // The Battle of Polytopia
        rationale = 'Ideal turn-based 4X strategy game for teaching compound economic growth, tech trees, and long-range recon.';
        learningFocus = 'Early capital compounding and strategic opportunity cost evaluation.';
      } else if (q.includes('factory') || q.includes('conveyor') || q.includes('automation') || q.includes('supply chain') || q.includes('pipeline')) {
        matched = REAL_SIMULATION_GAMES[6]; // Mindustry
        rationale = 'Deep open-source industrial simulation modeling automated assembly conveyor pipelines and energy grid balance.';
        learningFocus = 'Automated supply chain throughput, mineral refinement pipelines, and energy distribution.';
      } else if (q.includes('racing') || q.includes('f1') || q.includes('team') || q.includes('data') || q.includes('sponsor')) {
        matched = REAL_SIMULATION_GAMES[7]; // Motorsport Manager 3
        rationale = 'Teaches high-performance data analytics, sponsor retainer negotiations, and live weather contingency management.';
        learningFocus = 'Live telemetry analysis and high-pressure strategic pivots during volatile race conditions.';
      } else if (q.includes('health') || q.includes('virus') || q.includes('plague') || q.includes('biology') || q.includes('epidemi')) {
        matched = REAL_SIMULATION_GAMES[8]; // Plague Inc.
        rationale = 'CDC-recognized simulation for modeling global disease vectors, border policies, and public health economics.';
        learningFocus = 'Global mobility transmission dynamics and international pandemic response policies.';
      } else if (q.includes('code') || q.includes('program') || q.includes('logic') || q.includes('algorithm') || q.includes('puzzle')) {
        matched = REAL_SIMULATION_GAMES[9]; // Human Resource Machine
        rationale = 'Teaches assembly-level computational logic and business workflow automation through visual programming puzzles.';
        learningFocus = 'Algorithmic efficiency, process de-duplication, and flowchart problem solving.';
      } else if (q.includes('green') || q.includes('eco') || q.includes('climate') || q.includes('nature') || q.includes('clean')) {
        matched = REAL_SIMULATION_GAMES[10]; // Terra Nil
        rationale = 'A reverse city-builder that models ecological restoration, biodiversity revitalization, and zero-waste recycling.';
        learningFocus = 'Circular economics and sustainable deconstruction engineering.';
      } else if (q.includes('chess') || q.includes('tactics') || q.includes('spatial') || q.includes('checkmate') || q.includes('board')) {
        matched = REAL_SIMULATION_GAMES[11]; // Chess.com
        rationale = 'The gold standard for training patience, spatial calculation, center control, and defensive stoicism under active time pressure.';
        learningFocus = 'Positional calculation, center equilibrium control, and calculated sacrificial tactics.';
      }

      setAiMatchResult({ game: matched, rationale, learningFocus });
      setIsAiMatching(false);
    }, 450);
  };

  const resetFilters = () => {
    setSelectedGenre('all');
    setSelectedPlatform('all');
    setSearchQuery('');
    setAiMatchResult(null);
    setUserGoalQuery('');
  };

  return (
    <div className="bg-[#faf9f7] min-h-screen text-[#1e1e1e] pt-24 pb-20 font-sans selection:bg-[#F16736]/20">
      
      {/* ========================================================================= */}
      {/* 1. HERO: APP STORE & PLAY STORE SIMULATION GAMES DIRECTORY                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-12">
        <div className="relative rounded-3xl bg-[#141118] border border-orange-500/20 shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden text-white">
          
          {/* Ambient Glowing Background Lights */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F16736]/20 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
          
          {/* Top Bar: Breadcrumb + Store Badges */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <Breadcrumbs variant="dark" className="text-xs" />
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-neutral-300 flex items-center gap-1.5">
                <Smartphone size={13} className="text-amber-400" />
                <span>iOS App Store & Google Play</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-[#F16736]/20 border border-[#F16736]/40 text-[#F16736] text-[11px] font-black uppercase tracking-wider">
                CURATED SIMULATIONS
              </span>
            </div>
          </div>

          {/* Main Hero Row */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8">
            
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
                <Brain size={13} className="text-[#F16736]" />
                <span>REAL-WORLD SKILLS THROUGH REAL GAMES</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-[#F16736] to-orange-500">
                Top Mobile Simulation Games for Real Skills.
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                Turn passive mobile screen time into high-impact strategic training. We curate the highest-rated real simulation games from the <strong>Apple App Store</strong> and <strong>Google Play Store</strong> that teach cashflow, logistics, crisis diplomacy, engineering physics, and systems leadership.
              </p>

              {/* Fast Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-7 py-3.5 bg-gradient-to-r from-[#F16736] via-[#ea580c] to-amber-500 hover:from-[#e05423] hover:to-orange-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Download size={14} />
                  <span>Browse App Catalog ({REAL_SIMULATION_GAMES.length})</span>
                </button>

                <button
                  onClick={() => {
                    const matcherElem = document.getElementById('ai-sim-matcher');
                    matcherElem?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-neutral-200 border border-white/20 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles size={14} className="text-amber-400" />
                  <span>AI Game Matcher</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Graphic Visual */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] sm:aspect-video rounded-2xl overflow-hidden border border-orange-500/30 shadow-2xl group">
                <Image
                  src="/images/mobile_sim_games_hero.jpg"
                  alt="Real Mobile Simulation Games on App Store and Google Play Store"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-bold flex items-center gap-1.5 text-amber-300">
                    <CheckCircle2 size={14} className="text-[#F16736]" /> Direct Download Links Included
                  </span>
                  <span className="text-[11px] font-black uppercase text-neutral-300">
                    Curated by BTSW Faculty
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Pillar Categories Row */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-center">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-amber-400 font-black text-sm block">Business & Tycoons</span>
              <span className="text-[10px] text-neutral-400">Cashflow, Runway, Growth</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-amber-400 font-black text-sm block">Supply Chain & Transit</span>
              <span className="text-[10px] text-neutral-400">Bottlenecks, Pipelines</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-amber-400 font-black text-sm block">Governance & Crisis</span>
              <span className="text-[10px] text-neutral-400">Diplomacy, Policy, Trust</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-amber-400 font-black text-sm block">Engineering & Logic</span>
              <span className="text-[10px] text-neutral-400">Physics, Code, Algorithms</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE AI SIMULATION MATCHER SECTION                              */}
      {/* ========================================================================= */}
      <section id="ai-sim-matcher" className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="p-6 sm:p-8 bg-white border border-[#e8e5e0] rounded-2xl shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#fff1eb] text-[#F16736] flex items-center justify-center font-bold shadow-xs">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-[#F16736]">
                <span>AI SOURCING & FACILITATION ENGINE</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-neutral-900">
                What skill or topic do you want to master?
              </h3>
              <p className="text-xs text-neutral-500 font-normal">
                Type what you or your students want to practice (e.g. startup cashflow on Android, bridge physics on iPad, crisis diplomacy, supply chain pipelines).
              </p>
            </div>
          </div>

          <form onSubmit={handleAiSimMatch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={userGoalQuery}
                onChange={(e) => setUserGoalQuery(e.target.value)}
                placeholder="e.g. 'I want a simulation game to teach 15-year-olds how supply chain bottlenecks work on Android'"
                className="w-full p-3.5 pl-4 pr-10 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-medium text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#F16736]"
              />
              {userGoalQuery && (
                <button
                  type="button"
                  onClick={() => setUserGoalQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={isAiMatching || !userGoalQuery.trim()}
              className="px-7 py-3.5 bg-[#F16736] hover:bg-[#e05423] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shrink-0"
            >
              {isAiMatching ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
              <span>Match Game & Sourcing</span>
            </button>
          </form>

          {/* Quick Goal Shortcut Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
            <span className="text-[10px] font-black uppercase text-neutral-400 mr-1 flex items-center gap-1">
              <Lightbulb size={11} className="text-amber-500" /> Quick Prompts:
            </span>
            {[
              'Tech startup cashflow & hiring',
              'Supply chain & highway gridlock',
              'Crisis diplomacy & post-conflict peace',
              'Engineering structural stress test',
              'Industrial factory automation pipelines'
            ].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setUserGoalQuery(prompt);
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#faf9f7] border border-[#e8e5e0] text-neutral-600 hover:border-[#F16736]/40 hover:text-[#F16736] transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* AI Result Card */}
          {aiMatchResult && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-r from-[#fff1eb] to-[#fff7f4] border border-[#F16736]/30 rounded-xl space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#F16736] text-white text-[9px] font-black uppercase tracking-wider">
                      AI TOP MATCH
                    </span>
                    <span className="text-xs font-bold text-neutral-500">
                      By {aiMatchResult.game.developer}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-neutral-900">
                    {aiMatchResult.game.title}
                  </h4>
                </div>

                {/* Direct Store Download Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={aiMatchResult.game.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-black hover:bg-neutral-800 text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>App Store</span>
                    <ExternalLink size={11} />
                  </a>
                  <a
                    href={aiMatchResult.game.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#01875f] hover:bg-[#00704e] text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>Google Play</span>
                    <ExternalLink size={11} />
                  </a>
                  <button
                    onClick={() => setSelectedGameForModal(aiMatchResult.game)}
                    className="px-3 py-1.5 bg-white border border-[#e8e5e0] hover:bg-neutral-50 text-neutral-800 rounded-lg text-[11px] font-bold"
                  >
                    Full Dossier
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1 border-t border-[#F16736]/15">
                <div className="bg-white/80 p-3 rounded-lg border border-[#F16736]/10">
                  <span className="font-bold text-neutral-900 block mb-0.5">Why This Game:</span>
                  <p className="text-neutral-600 leading-relaxed font-normal">{aiMatchResult.rationale}</p>
                </div>
                <div className="bg-white/80 p-3 rounded-lg border border-[#F16736]/10">
                  <span className="font-bold text-neutral-900 block mb-0.5">Classroom / Personal Learning Focus:</span>
                  <p className="text-neutral-600 leading-relaxed font-normal">{aiMatchResult.learningFocus}</p>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CURATED APP STORE & PLAY STORE CATALOG                                  */}
      {/* ========================================================================= */}
      <section ref={catalogRef} id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        
        {/* Header & Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#F16736]">
                VERIFIED REAL MOBILE SIMULATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
                Official Download Directory
              </h2>
            </div>

            {/* Keyword Search */}
            <div className="relative w-full md:w-80">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games, developers, or skills..."
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-semibold text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#F16736]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e8e5e0]">
            
            {/* Genre Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-xl border border-[#e8e5e0] shadow-xs">
              {[
                { id: 'all', label: `All Games (${REAL_SIMULATION_GAMES.length})` },
                { id: 'business', label: 'Business & Tycoon' },
                { id: 'logistics', label: 'Logistics & Transit' },
                { id: 'governance', label: 'Governance & Diplomacy' },
                { id: 'engineering', label: 'Engineering & STEM' },
                { id: 'tactics', label: '4X & Tactics' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedGenre(tab.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedGenre === tab.id
                      ? 'bg-[#1e1e1e] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Platform & Reset Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[10px] font-black uppercase text-neutral-400 mr-1 flex items-center gap-1">
                <Filter size={11} /> Platform:
              </span>
              {[
                { id: 'all', label: 'All Stores' },
                { id: 'ios', label: 'App Store (iOS)' },
                { id: 'android', label: 'Google Play (Android)' }
              ].map(pill => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedPlatform(pill.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                    selectedPlatform === pill.id
                      ? 'bg-[#F16736] text-white border-[#F16736]'
                      : 'bg-white text-neutral-600 border-[#e8e5e0] hover:border-neutral-400'
                  }`}
                >
                  {pill.label}
                </button>
              ))}

              {(searchQuery || selectedGenre !== 'all' || selectedPlatform !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="px-2.5 py-1 text-[11px] font-bold text-neutral-500 hover:text-neutral-800 flex items-center gap-1 ml-1 cursor-pointer"
                >
                  <RefreshCw size={11} /> Reset
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-white border border-[#e8e5e0] rounded-xl overflow-hidden shadow-xs hover:shadow-xl hover:border-[#F16736] transition-all flex flex-col justify-between group"
            >
              {/* Card Visual Header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                <Image
                  src={game.imageSrc}
                  alt={game.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                  <span className="px-1.5 py-0.5 bg-white/95 backdrop-blur-md text-neutral-900 text-[9px] font-black uppercase rounded shadow-xs">
                    {game.genreLabel.split('&')[0]}
                  </span>
                  {game.badge && (
                    <span className="px-1.5 py-0.5 bg-[#F16736] text-white text-[8.5px] font-black uppercase rounded shadow-xs">
                      {game.badge}
                    </span>
                  )}
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <div className="flex items-center gap-0.5 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-amber-400 text-[10px] font-bold">
                    <Star size={9} className="fill-amber-400" />
                    <span>{game.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <span className="text-[9px] uppercase font-bold text-amber-300 block truncate">
                    {game.developer}
                  </span>
                  <h3 className="text-sm font-black leading-snug drop-shadow-sm line-clamp-1">
                    {game.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal line-clamp-2">
                    {game.tagline}
                  </p>

                  {/* Skills Chips */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400 block">
                      Skills Trained
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {game.skillsTrained.slice(0, 2).map((skill, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-[#faf9f7] border border-[#e8e5e0] text-neutral-700 text-[9.5px] font-bold rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Downloads Metadata */}
                  <div className="flex items-center justify-between text-[10.5px] text-neutral-500 font-medium pt-0.5">
                    <span className="truncate max-w-[100px]">{game.priceModel.split('•')[0]}</span>
                    <span>{game.downloads}</span>
                  </div>
                </div>

                {/* Direct Store Download Action Buttons */}
                <div className="pt-2.5 border-t border-neutral-100 space-y-1.5">
                  <div className="grid grid-cols-2 gap-1.5">
                    <a
                      href={game.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2.5 bg-black hover:bg-neutral-800 text-white text-[11px] font-extrabold rounded-xl transition-colors flex items-center justify-center gap-1.5 text-center shadow-xs"
                    >
                      <span>App Store</span>
                      <ExternalLink size={11} />
                    </a>
                    <a
                      href={game.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2.5 bg-[#01875f] hover:bg-[#00704e] text-white text-[11px] font-extrabold rounded-xl transition-colors flex items-center justify-center gap-1.5 text-center shadow-xs"
                    >
                      <span>Google Play</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>

                  <button
                    onClick={() => setSelectedGameForModal(game)}
                    className="w-full py-2 px-3 bg-white hover:bg-neutral-50 text-neutral-800 border border-[#e8e5e0] text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
                  >
                    View Educational Analysis & Prompts
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. SCHOOL & TEACHER CURRICULUM INTEGRATION CTA                            */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="p-8 sm:p-12 bg-gradient-to-r from-[#F16736] via-[#ea580c] to-[#c2410c] text-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-black uppercase tracking-widest text-white/80">
              EDUCATOR & PARENT RESOURCE
            </span>
            <h3 className="text-3xl font-black tracking-tight">
              Bring Simulation-Based Learning to Your School
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
              BTSW designs structured game debrief rubrics, physical classroom tournament boards, and live negotiation events for secondary schools and university campuses.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/bring-your-school"
              className="px-8 py-4 bg-white text-[#F16736] hover:bg-neutral-100 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 text-center cursor-pointer"
            >
              Partner with BTSW
            </Link>
            <Link
              href="/tabletop-games"
              className="px-8 py-4 bg-[#1e1e1e] hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 text-center cursor-pointer"
            >
              Get Physical Board Sets
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. DETAILED EDUCATIONAL DOSSIER MODAL                                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedGameForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#e8e5e0] shadow-2xl relative p-6 sm:p-8 space-y-6"
            >
              <button
                onClick={() => setSelectedGameForModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-[#F16736]">
                    {selectedGameForModal.genreLabel} &bull; {selectedGameForModal.developer}
                  </span>
                  <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1">
                    <Star size={10} className="fill-amber-400" /> {selectedGameForModal.rating} ({selectedGameForModal.downloads})
                  </span>
                </div>
                <h3 className="text-2xl font-black text-neutral-900 pr-8">
                  {selectedGameForModal.title}
                </h3>
                <p className="text-xs text-neutral-500 font-medium">
                  {selectedGameForModal.ageRecommendation} &bull; {selectedGameForModal.priceModel}
                </p>
              </div>

              {/* Game Overview */}
              <div className="space-y-2">
                <h5 className="text-xs font-black uppercase tracking-wider text-neutral-900">Game Overview & Mechanics</h5>
                <p className="text-xs text-neutral-600 leading-relaxed bg-[#faf9f7] p-3.5 rounded-xl border border-[#e8e5e0]">
                  {selectedGameForModal.summary}
                </p>
              </div>

              {/* Real World Application */}
              <div className="space-y-2">
                <h5 className="text-xs font-black uppercase tracking-wider text-neutral-900">Real-World Business & Systems Application</h5>
                <p className="text-xs text-neutral-700 leading-relaxed bg-[#fff1eb]/60 p-3.5 rounded-xl border border-[#F16736]/20 font-medium">
                  {selectedGameForModal.realWorldApplication}
                </p>
              </div>

              {/* Classroom Facilitation Prompt */}
              <div className="space-y-2">
                <h5 className="text-xs font-black uppercase tracking-wider text-neutral-900">Teacher & Student Debrief Prompt</h5>
                <p className="text-xs text-neutral-600 leading-relaxed bg-[#faf9f7] p-3.5 rounded-xl border border-[#e8e5e0]">
                  {selectedGameForModal.classroomFacilitationPrompt}
                </p>
              </div>

              {/* Key Skills & Mechanics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="text-xs font-black uppercase tracking-wider text-neutral-900">Cognitive Skills Trained</h5>
                  <ul className="space-y-1.5 text-xs text-neutral-600">
                    {selectedGameForModal.skillsTrained.map((skill, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F16736] mt-1.5 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs font-black uppercase tracking-wider text-neutral-900">Core Simulation Mechanics</h5>
                  <ul className="space-y-1.5 text-xs text-neutral-600">
                    {selectedGameForModal.keyMechanics.map((mech, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{mech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Store Download Action Row */}
              <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedGameForModal(null)}
                  className="px-4 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 cursor-pointer"
                >
                  Close
                </button>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={selectedGameForModal.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-xl shadow cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Download on App Store</span>
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href={selectedGameForModal.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#01875f] hover:bg-[#00704e] text-white text-xs font-bold rounded-xl shadow cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Get on Google Play</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
