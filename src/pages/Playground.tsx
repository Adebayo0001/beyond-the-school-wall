import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, Lock, Terminal, Award, Flame, Zap, ArrowLeft, Send, 
  RefreshCw, Play, Volume2, ShieldAlert, BadgeInfo, Cpu, Trophy, Eye, Briefcase
} from 'lucide-react';
import { getCurrentUser, setCurrentUser, getCourses } from '../lib/storage';
import { 
  getCompletedLessonsForSchool, 
  getSchoolCompletionStats, 
  generateScenarioSetup, 
  sendSimulationTurn, 
  DynamicScenarioSetup, 
  SimulationTurnResponse 
} from '../lib/simulationEngine';
import Logo from '../components/Logo';
import { User, SchoolContent } from '../types';

interface Message {
  sender: 'ai' | 'student';
  text: string;
  timestamp: string;
}

interface TimelineEvent {
  turn: number;
  stance: string;
  reaction: string;
  score: number;
  intensity: number;
}

export default function Playground() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<SchoolContent[]>([]);

  // Selection Screen State
  const [isGeneratingSetup, setIsGeneratingSetup] = useState(false);
  const [activeSetup, setActiveSetup] = useState<DynamicScenarioSetup | null>(null);
  const [simulationActive, setSimulationActive] = useState(false);
  const [debriefActive, setDebriefActive] = useState(false);

  // Active Simulation states
  const [history, setHistory] = useState<TimelineEvent[]>([]);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [turnCount, setTurnCount] = useState(1);
  const [stanceInput, setStanceInput] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);

  // Dynamic States from the 3-zone model
  const [envState, setEnvState] = useState<string>('');
  const [partnerSpeech, setPartnerSpeech] = useState<string>('');
  const [coachFeedback, setCoachFeedback] = useState<string[]>([]);
  const [currentScore, setCurrentScore] = useState<number>(5.0);
  const [intensityLevel, setIntensityLevel] = useState<number>(30); // stress thermometer
  const [objCompleted, setObjCompleted] = useState<boolean[]>([]);
  const [surpriseEventActive, setSurpriseEventActive] = useState<string | null>(null);

  // Sliders and forms inputs for visual interactivity
  const [formParams, setFormParams] = useState<any>({});

  useEffect(() => {
    const session = getCurrentUser();
    if (!session) {
      navigate('/login');
    } else {
      setUser(session);
      setCourses(getCourses());
    }
  }, [navigate]);

  const getHighestScoreForSchool = (schoolSlug: string) => {
    if (!user) return 0;
    // Map existing playgroundScores to dynamic setup if they have scores
    const scores = user.playgroundScores.filter(s => s.scenarioId.includes(schoolSlug) || s.feedback.toLowerCase().includes(schoolSlug.replace('-', ' ')));
    if (scores.length === 0) return 0;
    return Math.max(...scores.map(s => s.score));
  };

  // Triggers generating setup asynchronously from Claude-Sonnet
  const handleEnterSchoolSimulation = async (schoolSlug: string) => {
    if (!user) return;
    setIsGeneratingSetup(true);

    try {
      // Create initial setup via Anthropic API Engine
      const setup = await generateScenarioSetup(schoolSlug, user, courses);
      setActiveSetup(setup);
      
      // Initialize layout sliders matching simulation type
      if (setup.simulationType === 'The Argument') {
        setFormParams({ presentationFocus: 'Academic Security', delegationFailsafe: 60 });
      } else if (setup.simulationType === 'The Brief') {
        setFormParams({ targetPrice: 1500, deliveryTimeWeeks: 5 });
      } else if (setup.simulationType === 'The Deal') {
        setFormParams({ supplyVolumeCrates: 20, proposedUnitPrice: 1300 });
      } else if (setup.simulationType === 'The Decision') {
        setFormParams({ blockTimeHrs: 3 });
      } else {
        setFormParams({ marginSplitPercentage: 25 });
      }

      // Transition to cockpit setup
      setSimulationActive(true);
      setDebriefActive(false);
      setHistory([]);
      setChatHistory([]);
      setTurnCount(1);
      setStanceInput('');
      setEnvState('Environment prepared. Looking for student opening arguments.');
      setPartnerSpeech(setup.openingMove);
      
      setCoachFeedback([
        `Welcome to ${setup.simulationType} cockpit!`,
        'Check your dynamic learning Objectives.',
        'Use lessons completed as high leverage anchors.'
      ]);

      setCurrentScore(5.0);
      setIntensityLevel(setup.startingPressure);
      setObjCompleted(new Array(setup.objectives.length).fill(false));
      setSurpriseEventActive(null);

    } catch (err) {
      console.error("Failed to boot simulation", err);
    } finally {
      setIsGeneratingSetup(false);
    }
  };

  // Submit student strategic stance turn
  const handleActionSubmit = async () => {
    if (!stanceInput.trim() || isAILoading || !activeSetup || !user) return;

    setIsAILoading(true);
    const textEntered = stanceInput.trim();
    setStanceInput('');

    // Prepend to chat history
    const updatedChat: Message[] = [
      ...chatHistory,
      { sender: 'student', text: textEntered, timestamp: new Date().toLocaleTimeString() }
    ];
    setChatHistory(updatedChat);

    try {
      // Query Claude-Sonnet for next simulation turn
      const response: SimulationTurnResponse = await sendSimulationTurn(
        activeSetup.schoolSlug,
        user,
        courses,
        activeSetup,
        updatedChat,
        textEntered
      );

      // Save AI Turn payload
      setChatHistory(prev => [
        ...prev,
        { sender: 'ai', text: response.scenario_response, timestamp: new Date().toLocaleTimeString() }
      ]);

      // Update Zones Simultaneously
      setEnvState(response.environment_update);
      setPartnerSpeech(response.scenario_response);
      setCoachFeedback(response.feedback);
      setCurrentScore(response.score);
      
      // Update stress/intensity dynamically
      const completionStats = getSchoolCompletionStats(activeSetup.schoolSlug, user, courses);
      const completionFactor = completionStats.percentage;
      const intensityDelta = Math.round(activeSetup.startingPressure + (turnCount * 12) + (response.surprise_event ? 15 : -5));
      setIntensityLevel(Math.min(100, Math.max(10, intensityDelta)));

      setObjCompleted(response.objectives_status);

      if (response.surprise_event) {
        setSurpriseEventActive(response.surprise_event);
      } else {
        setSurpriseEventActive(null);
      }

      // Record History Event for the Replay Graph
      const event: TimelineEvent = {
        turn: turnCount,
        stance: textEntered,
        reaction: response.scenario_response,
        score: response.score,
        intensity: Math.min(100, Math.max(10, intensityDelta))
      };
      setHistory(prev => [...prev, event]);

      // Handle wrapping up or capping max turns
      if (response.is_complete || turnCount >= 3) {
        setTimeout(() => {
          setSimulationActive(false);
          setDebriefActive(true);
          handleSaveScore(response.score, response.feedback.join('\n'));
        }, 4000);
      } else {
        setTurnCount(prev => prev + 1);
      }

    } catch (e) {
      console.error("Error submitting dynamic turn", e);
    } finally {
      setIsAILoading(false);
    }
  };

  const handleSaveScore = (finalScore: number, summaryFeedback: string) => {
    if (!user || !activeSetup) return;

    const existingScores = [...user.playgroundScores];
    existingScores.push({
      scenarioId: `sim-${activeSetup.schoolSlug}-${Date.now()}`,
      score: finalScore,
      feedback: `Dynamic simulation of type ${activeSetup.simulationType}. Completed under level metrics.\nFeedback:\n${summaryFeedback}`,
      date: new Date().toISOString().split('T')[0]
    });

    const updatedUser: User = {
      ...user,
      playgroundScores: existingScores
    };

    setUser(updatedUser);
    setCurrentUser(updatedUser);
  };

  const getCoachMetaInfo = (schoolSlug: string) => {
    switch (schoolSlug) {
      case 'the-magnet-school':
        return { name: 'Chairman Marcus', role: 'Stoic Logic Coach', avatar: '🏛️' };
      case 'the-skill-hut':
        return { name: 'Coach Tunde', role: 'UI/UX Specialist Mentor', avatar: '💻' };
      case 'cash-on-campus':
        return { name: 'Aunty Ngozi', role: 'Campus Merchant Advisor', avatar: '📦' };
      case 'the-mental-application-study':
        return { name: 'Dr. Kunle', role: 'Neuro-Cognitive Advisor', avatar: '🛡️' };
      default:
        return { name: 'Partner Adaora', role: 'VC Pitch Mentor', avatar: '💡' };
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col text-white font-sans relative overflow-x-hidden selection:bg-[#F16736]/20">
      
      {/* Background Matrix Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f1f1f_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none z-0" />

      {/* HEADER BAR */}
      <header className="border-b border-neutral-850 bg-[#171717] px-6 py-3.5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <Link to="/portal" className="text-neutral-400 hover:text-[#F16736] transition-all p-1">
            <ArrowLeft size={18} />
          </Link>
          <div className="w-px h-5 bg-neutral-800" />
          <Logo className="h-6 w-auto" textClassName="text-lg text-white" />
          <span className="text-[10px] font-mono font-black uppercase text-[#F16736] bg-[#F16736]/10 px-2.5 py-0.5 rounded border border-[#F16736]/30 tracking-wider">
            AI SIMULATOR COCKPIT
          </span>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-neutral-400">
              <Trophy size={14} className="text-[#F16736]" />
              <span>Vocational Master Badges: {user.playgroundScores.length >= 3 ? '🏆 UNLOCKED' : '🔒 LOCK'}</span>
            </div>
          )}
          <button 
            onClick={() => navigate('/portal')}
            className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-extrabold px-3 py-1.5 rounded-lg border border-neutral-700 transition cursor-pointer"
          >
            Exits
          </button>
        </div>
      </header>

      {/* =============== SETUP GENERATION OVERLAY =============== */}
      <AnimatePresence>
        {isGeneratingSetup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#121212]/95 flex flex-col items-center justify-center z-50 p-6"
          >
            <div className="space-y-6 text-center max-w-md">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-[#F16736]/20 animate-pulse" />
                <div className="absolute inset-x-0 top-0 h-16 w-16 border-4 border-t-[#F16736] border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">Calibrating System Prompts...</h3>
                <p className="text-xs text-neutral-450 leading-relaxed">
                  Reading completed lessons from your learning history in localStorage and compiling dynamic objections with Claude Sonnet AI...
                </p>
              </div>
              <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl font-mono text-[10px] text-[#F16736]">
                MODEL: anthropic/claude-sonnet-4-20250514
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col relative z-10 overflow-y-auto">
        
        {/* =============== ENTRY SCREEN =============== */}
        {!simulationActive && !debriefActive && (
          <div className="max-w-6xl w-full mx-auto p-6 md:p-12 space-y-10 animate-fade">
            
            {/* Title & Stats Deck */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-800 pb-10">
              <div className="space-y-3 text-left">
                <span className="text-xs font-black uppercase tracking-widest text-[#F16736] font-mono">
                  🔥 Contextual Learning Arena
                </span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
                  AI Vocational Simulations
                </h1>
                <p className="text-sm font-semibold text-neutral-400 max-w-2xl leading-relaxed">
                  Simulations dynamically scale, objection parameters unlock, and scenarios mutate based entirely on lessons you have finished. Study more to unlock deeper tactical trials.
                </p>
              </div>

              {/* Stats board */}
              <div className="flex gap-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800/80 min-w-[280px]">
                <div className="text-center flex-1 text-left md:text-center">
                  <span className="text-[10px] font-mono text-neutral-500 block uppercase">STUDIED SCHOOLS</span>
                  <span className="text-2xl font-black text-white">
                    {user ? user.enrolledSchools.length : 0} / 5
                  </span>
                </div>
                <div className="w-px bg-neutral-800" />
                <div className="text-center flex-1 text-left md:text-center">
                  <span className="text-[10px] font-mono text-neutral-500 block uppercase">COMPLETED MEETS</span>
                  <span className="text-2xl font-black text-[#F16736] flex items-center justify-center gap-1">
                    {user ? user.playgroundScores.length : 0}
                  </span>
                </div>
              </div>
            </div>

            {/* HIGH FIDELITY SCHOOL SIMULATION MAP */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {courses.map((school, scIdx) => {
                const stats = getSchoolCompletionStats(school.slug, user!, courses);
                const isStarted = stats.isUnlocked;
                const highestScore = getHighestScoreForSchool(school.slug);
                const isPassed = highestScore >= 7;

                // Match layout style config
                const iconMap: Record<string, string> = {
                  'the-magnet-school': '🏛️',
                  'the-skill-hut': '💻',
                  'cash-on-campus': '📦',
                  'the-mental-application-study': '🛡️',
                  'crash-course': '💡',
                };

                const simTypeLabels: Record<string, string> = {
                  'the-magnet-school': 'The Argument',
                  'the-skill-hut': 'The Brief',
                  'cash-on-campus': 'The Deal',
                  'the-mental-application-study': 'The Decision',
                  'crash-course': 'The Pitch',
                };

                const backgroundGradientClass = isStarted
                  ? 'bg-[#181818] border-neutral-800 hover:border-[#F16736] hover:shadow-[0_0_20px_rgba(241,103,54,0.1)]'
                  : 'bg-[#141414]/90 border-dashed border-neutral-800 opacity-60 select-none';

                return (
                  <div 
                    key={school.slug}
                    className={`group relative border rounded-3xl p-6 flex flex-col justify-between min-h-[350px] transition-all duration-300 ${backgroundGradientClass}`}
                  >
                    {isStarted && (
                      <div className="absolute inset-0 bg-radial-gradient from-[#F16736]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    )}

                    <div className="space-y-4">
                      {/* Top metadata info */}
                      <div className="flex justify-between items-center relative z-10">
                        <span className="text-[10px] font-mono uppercase bg-[#1e1e1e] px-2.5 py-1 rounded-md border border-neutral-800 text-[#F16736] font-bold">
                          {simTypeLabels[school.slug]}
                        </span>

                        {isStarted ? (
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isPassed ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                          }`}>
                            {isPassed ? 'PASSED ✅' : 'ACTIVE ⚡'}
                          </span>
                        ) : (
                          <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-neutral-400 rounded-full px-2.5 py-0.5 text-[9px] font-mono">
                            <Lock size={10} /> LOCKED
                          </div>
                        )}
                      </div>

                      {/* Header details */}
                      <div className="text-left space-y-1 relative z-10">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{iconMap[school.slug]}</span>
                          <h3 className="text-lg font-black tracking-tight text-white leading-snug group-hover:text-[#F16736] transition-colors">
                            {school.title}
                          </h3>
                        </div>
                        <p className="text-[10px] font-mono text-neutral-400 uppercase">
                          Capped difficulty: <span className="text-[#F16736] font-bold">{stats.availableWeeksLabel}</span>
                        </p>
                      </div>

                      <p className="text-xs text-neutral-450 font-semibold leading-relaxed text-left relative z-10">
                        {school.modules[0]?.description || 'Complete standard lesson tasks to qualify for simulated challenges.'}
                      </p>

                      {/* Micro Progress Bar */}
                      {isStarted && (
                        <div className="space-y-1.5 pt-2 relative z-10">
                          <div className="flex justify-between text-[11px] font-mono text-neutral-500 leading-none">
                            <span>Syllabus Progress:</span>
                            <span>{stats.percentage}%</span>
                          </div>
                          <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#F16736] h-full" style={{ width: `${stats.percentage}%` }} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom controls */}
                    <div className="pt-6 border-t border-neutral-900 mt-6 relative z-10 text-left">
                      {isStarted ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-[10px] font-mono uppercase text-neutral-500">MAX SCORE LOG</p>
                              <p className="text-sm font-black text-white">{highestScore > 0 ? `${highestScore} / 10 Avg` : 'No runs logged'}</p>
                            </div>
                            <button
                              onClick={() => handleEnterSchoolSimulation(school.slug)}
                              disabled={stats.percentage === 0}
                              className="px-4 py-2 bg-[#F16736] hover:bg-[#F16736]/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition duration-200 hover:scale-103 shadow-lg flex items-center gap-1.5 cursor-pointer"
                            >
                              <Play size={12} fill="white" /> Run Simulator
                            </button>
                          </div>
                          {stats.percentage === 0 && (
                            <p className="text-[9px] font-mono text-rose-450 italic leading-snug">
                              ⚠️ Check at least one lesson as completed in the Study Portal to calibrate this schools prompts first!
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <button
                            disabled
                            className="w-full py-2.5 bg-neutral-900 border border-neutral-800 text-neutral-600 font-extrabold text-xs uppercase tracking-widest rounded-xl cursor-not-allowed flex items-center justify-center gap-1.5"
                          >
                            <Lock size={12} /> Course Not Started
                          </button>
                          <p className="text-[10px] font-mono text-neutral-500 leading-normal">
                            🔒 Complete your first quiz or read curriculum materials inside this school to automatically initiate simulator authority.
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* =============== ACTIVE SIMULATION INTERACTIVE DASHBOARD =============== */}
        {simulationActive && activeSetup && (
          <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden animate-fade">
            
            {/* ZONE 1: ENVIRONMENT VIEWER PANEL (LEFT, 30%) */}
            <div className="w-full md:w-3/10 bg-[#161616] border-r border-[#1e1e1e] flex flex-col justify-between overflow-y-auto p-6 relative select-none">
              <div className="space-y-6">
                
                {/* Meta info */}
                <div className="flex items-center justify-between border-b border-neutral-850 pb-3 text-left">
                  <span className="text-[9px] font-mono bg-neutral-900 text-neutral-450 px-2 py-0.5 rounded border border-neutral-800 font-black">
                    LEVEL: {activeSetup.difficultyDescription || 'Syllabus Calibration'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F16736] animate-pulse" />
                    <span className="text-[10px] font-mono text-[#F16736] tracking-wider uppercase">SIMULATING</span>
                  </div>
                </div>

                {/* Scenario details */}
                <div className="text-left space-y-2">
                  <span className="text-[10px] font-bold text-[#F16736] uppercase tracking-[0.15em]">
                    {activeSetup.schoolTitle}
                  </span>
                  <h2 className="text-lg font-black leading-tight tracking-tight text-white">
                    {activeSetup.simulationType} : Case Briefing
                  </h2>
                  <div className="p-3 bg-neutral-900 border border-neutral-850 rounded-xl text-xs text-neutral-400 leading-relaxed font-semibold">
                    {activeSetup.situation}
                  </div>
                </div>

                {/* DYNAMIC THEMED VISUAL ENV PANEL */}
                <div className="rounded-2xl border border-neutral-800 bg-[#1e1e1e] p-4 text-left space-y-4 shadow-inner relative overflow-hidden h-44 flex flex-col justify-between">
                  <div className="absolute inset-0 bg-radial-gradient from-neutral-800/10 to-transparent pointer-events-none" />
                  
                  <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500">
                    <span>LIVE ENVIRONMENT FEED</span>
                    <span className="text-[#F16736] font-bold">STATE METRICS</span>
                  </div>

                  {activeSetup.simulationType === 'The Argument' && (
                    <div className="space-y-2 flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🏛️</span>
                        <div>
                          <p className="font-mono text-[11px] text-neutral-300">Audience Argument Pressure</p>
                          <p className="text-[9px] font-bold text-neutral-450 uppercase">Current: {turnCount === 1 ? 'Hostile Inquiry' : turnCount === 2 ? 'High Skepticism' : 'Syllabus Alignment'}</p>
                        </div>
                      </div>
                      <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#F16736] h-full transition-all duration-300" style={{ width: `${currentScore * 10}%` }} />
                      </div>
                    </div>
                  )}

                  {activeSetup.simulationType === 'The Brief' && (
                    <div className="space-y-2 flex-1 flex flex-col justify-center">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">💼</span>
                          <div>
                            <p className="font-mono text-[10px] text-zinc-300">Design Contract Review</p>
                            <p className="text-[9px] text-[#F16736] font-bold">Active Proposal: ${formParams.targetPrice ?? 1500}</p>
                          </div>
                        </div>
                        <span className="text-xs bg-neutral-900 border border-neutral-850 p-1.5 rounded text-neutral-400 font-mono">
                          {turnCount}/3
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-bold bg-neutral-950 p-1 rounded border border-neutral-850 italic text-center">
                        &quot;Damilola is analyzing typography scale...&quot;
                      </p>
                    </div>
                  )}

                  {activeSetup.simulationType === 'The Deal' && (
                    <div className="space-y-2 flex-1 flex flex-col justify-center">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">📦</span>
                          <div>
                            <p className="font-mono text-[11px] text-neutral-300">Unit Order Sheet</p>
                            <p className="text-[9px] text-emerald-400 font-bold">Price: {formParams.proposedUnitPrice ?? 1200} NGN</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 font-bold">Vol: {formParams.supplyVolumeCrates ?? 15} Crates</span>
                      </div>
                      <p className="text-[9px] text-neutral-450 italic">&quot;Alhaji Musa checking inventory records...&quot;</p>
                    </div>
                  )}

                  {activeSetup.simulationType === 'The Decision' && (
                    <div className="space-y-2 flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                        <div className="bg-neutral-950 p-1.5 rounded border border-neutral-850">
                          <p className="text-[8px] text-neutral-500 uppercase leading-none">ALPHA</p>
                          <p className="text-xs text-[#F16736] font-bold mt-1">9.4 Hz</p>
                        </div>
                        <div className="bg-neutral-950 p-1.5 rounded border border-neutral-850">
                          <p className="text-[8px] text-neutral-500 uppercase leading-none">PEAK FOCUS</p>
                          <p className="text-xs text-xs text-emerald-400 font-bold mt-1">Regulated</p>
                        </div>
                        <div className="bg-neutral-950 p-1.5 rounded border border-neutral-850">
                          <p className="text-[8px] text-neutral-500 uppercase leading-none">TIRED TIME</p>
                          <p className="text-xs text-purple-400 font-bold mt-1">{formParams.blockTimeHrs ?? 2}h block</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSetup.simulationType === 'The Pitch' && (
                    <div className="space-y-2 flex-1 flex flex-col justify-center text-center">
                      <div className="p-2 bg-neutral-950 rounded-lg border border-neutral-850 text-[10px] font-mono flex justify-between">
                        <span className="text-neutral-400">Investor Margin Share:</span>
                        <strong className="text-white">{formParams.marginSplitPercentage ?? 20}%</strong>
                      </div>
                      <p className="text-[9px] text-[#F16736] font-mono">⚡ Delivery tracking verified via WhatsApp bots</p>
                    </div>
                  )}

                  <span className="text-[8px] font-mono text-neutral-550 block text-right">
                    SECURE-SYLLABUS-VECTORS-OK
                  </span>
                </div>

              </div>

              {/* Verified Completed Syllabus Reference */}
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-850 text-left space-y-2 mt-6">
                <span className="text-[10px] font-black tracking-wider text-[#F16736] uppercase font-mono block">
                  📚 ACTIVE SYLLABUS REFERENCE:
                </span>
                <div className="space-y-1 max-h-24 overflow-y-auto">
                  {activeSetup.completedLessonsInfo.map((l, i) => (
                    <div key={i} className="text-[11px] text-neutral-300 leading-snug font-medium">
                      • <strong className="text-neutral-200">{l.title}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ZONE 2: ACTION INTERFACE PANEL (CENTER, 40%) */}
            <div className="flex-1 bg-[#121212] flex flex-col justify-between overflow-y-auto relative p-6 border-b md:border-b-0 border-neutral-850">
              
              <div className="mx-auto max-w-xl w-full space-y-6">

                {/* Partners Speech Header */}
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-850 text-left space-y-3 relative overflow-hidden shadow-lg">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-[10px] bg-red-950 text-[#F16736] border border-red-900 font-black px-2 py-0.5 rounded-md uppercase">
                      🗯️ {activeSetup.characterName} ({activeSetup.characterRole}) Stance:
                    </span>
                    <span className="text-neutral-550 font-mono text-[9px]">Turn {turnCount}/3 Max</span>
                  </div>
                  
                  <div className="text-sm text-neutral-200 leading-relaxed font-sans font-medium">
                    {partnerSpeech}
                  </div>

                  {/* Warning Surprise Event Badge if triggered */}
                  <AnimatePresence>
                    {surpriseEventActive && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2.5 text-xs text-red-300"
                      >
                        <ShieldAlert size={14} className="mt-0.5 flex-shrink-0 text-red-500" />
                        <div className="text-left">
                          <strong className="block text-red-500 text-[10px] font-black uppercase tracking-wider">⚠️ DYNAMIC EVENT DETECTED:</strong>
                          {surpriseEventActive}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ENVIRONMENT STATE LOG */}
                <div className="p-3 rounded-xl bg-orange-950/20 border border-[#F16736]/10 text-[11px] text-[#F16736] font-mono text-left leading-normal flex items-start gap-2">
                  <Cpu size={14} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="uppercase">ENVIRONMENT UPDATE LOG:</strong> {envState}
                  </div>
                </div>

                {/* Tactical Slider inputs to calibrate choices */}
                <div className="p-4 bg-neutral-900 border border-neutral-850 rounded-2xl text-left space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-500">
                    DIAL IN TRANSACTION PARAMETERS:
                  </h4>

                  {activeSetup.simulationType === 'The Argument' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-450">Focus Argument vector:</span>
                        <span className="text-[#F16736] font-bold">{formParams.presentationFocus}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {['Academic Security', 'Stoic Leadership', 'Ego Demolition'].map((focus) => (
                          <button
                            key={focus}
                            onClick={() => setFormParams({ ...formParams, presentationFocus: focus })}
                            className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition ${
                              formParams.presentationFocus === focus 
                                ? 'bg-neutral-800 border-neutral-600 text-white' 
                                : 'bg-neutral-950 border-neutral-900 text-neutral-500 hover:text-white'
                            }`}
                          >
                            {focus}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSetup.simulationType === 'The Brief' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-neutral-400">
                          <span>Quote Billing Price ($):</span>
                          <span className="text-[#F16736] font-black">${formParams.targetPrice ?? 1500}</span>
                        </div>
                        <input 
                          type="range" 
                          min={500} 
                          max={2500} 
                          step={100}
                          value={formParams.targetPrice ?? 1500}
                          onChange={(e) => setFormParams({ ...formParams, targetPrice: parseInt(e.target.value) })}
                          className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#F16736]"
                        />
                      </div>
                    </div>
                  )}

                  {activeSetup.simulationType === 'The Deal' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-neutral-500 block uppercase">Crate Volume:</label>
                        <input 
                          type="number"
                          min={5}
                          max={100}
                          value={formParams.supplyVolumeCrates ?? 15}
                          onChange={(e) => setFormParams({ ...formParams, supplyVolumeCrates: parseInt(e.target.value) || 10 })}
                          className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#F16736]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-neutral-500 block uppercase">Unit Rate (NGN):</label>
                        <input 
                          type="number"
                          value={formParams.proposedUnitPrice ?? 1200}
                          onChange={(e) => setFormParams({ ...formParams, proposedUnitPrice: parseInt(e.target.value) || 1000 })}
                          className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#F16736]"
                        />
                      </div>
                    </div>
                  )}

                  {activeSetup.simulationType === 'The Decision' && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs text-neutral-450">
                        <span>Block study hour buffer:</span>
                        <strong className="text-white">{formParams.blockTimeHrs ?? 3} Hours</strong>
                      </div>
                      <input 
                        type="range" 
                        min={1} 
                        max={8} 
                        value={formParams.blockTimeHrs ?? 3}
                        onChange={(e) => setFormParams({ ...formParams, blockTimeHrs: parseInt(e.target.value) })}
                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#F16736]"
                      />
                    </div>
                  )}

                  {activeSetup.simulationType === 'The Pitch' && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs text-neutral-450">
                        <span>Royalty Commission split percentage:</span>
                        <strong className="text-[#F16736]">{formParams.marginSplitPercentage ?? 20}%</strong>
                      </div>
                      <input 
                        type="range" 
                        min={5} 
                        max={60} 
                        value={formParams.marginSplitPercentage ?? 20}
                        onChange={(e) => setFormParams({ ...formParams, marginSplitPercentage: parseInt(e.target.value) })}
                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#F16736]"
                      />
                    </div>
                  )}
                </div>

              </div>

              {/* ACTION STANCE INPUT ZONE (BOTTOM) */}
              <div className="p-4 bg-neutral-900 border-t border-neutral-850 mt-6 rounded-2xl relative text-left">
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
                    <span>✏️ FORMULATE ARGUMENT / STANCE PIVOT:</span>
                    <span>PRESSURE IMPACT x1.5</span>
                  </div>

                  <div className="relative">
                    <textarea 
                      rows={2}
                      disabled={isAILoading}
                      value={stanceInput}
                      onChange={(e) => setStanceInput(e.target.value)}
                      placeholder="Write your verbal strategic argument with reference to completed lessons..."
                      className="w-full bg-neutral-950 border border-neutral-850 rounded-xl pl-4 pr-14 py-3 text-xs md:text-sm focus:outline-none focus:border-[#F16736]/60 text-neutral-100 placeholder-neutral-600 font-semibold"
                    />

                    <button
                      onClick={handleActionSubmit}
                      disabled={isAILoading || !stanceInput.trim()}
                      className="absolute right-3.5 bottom-3.5 w-9 h-9 rounded-lg bg-[#F16736] hover:bg-[#F16736]/90 flex items-center justify-center text-white transition-all disabled:opacity-35 cursor-pointer"
                    >
                      {isAILoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* ZONE 3: MASTER FEEDBACK PANEL (RIGHT, 30%) */}
            <div className="w-full md:w-3/10 bg-[#161616] border-l border-[#1e1e1e] flex flex-col justify-between overflow-y-auto p-6 text-left select-none relative">
              <div className="space-y-6">

                {/* Coach details */}
                {(() => {
                  const coach = getCoachMetaInfo(activeSetup.schoolSlug);
                  return (
                    <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-850 flex items-start gap-3 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-orange-900/20 border border-[#F16736]/30 flex items-center justify-center text-2xl">
                        {coach.avatar}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-xs text-white uppercase tracking-wider">{coach.name}</h3>
                        <p className="text-[10px] text-[#F16736] font-mono leading-none mt-1">{coach.role}</p>
                        <div className="mt-2 flex items-center gap-1">
                          <Volume2 size={10} className="text-neutral-500 animate-pulse" />
                          <span className="text-[9px] font-bold text-neutral-550">Analysing stance response...</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* LIVE SCORING METRIC */}
                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-850/80 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-neutral-550 uppercase block mb-0.5">CURRENT RUN SCORE</span>
                    <span className="text-2xl font-black text-[#F16736]">{currentScore.toFixed(1)} / 10</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-neutral-550 uppercase block mb-0.5">TURNS</span>
                    <span className="text-sm font-extrabold text-neutral-300">{turnCount} / 3 Max</span>
                  </div>
                </div>

                {/* PRESSURE PROGRESS BAR */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] font-mono">
                    <span className="text-neutral-500">CHALLENGE PRESSURE THERMOMETER</span>
                    <span className="text-red-400 font-black">{intensityLevel}%</span>
                  </div>
                  <div className="w-full bg-neutral-950 h-2.5 rounded-full overflow-hidden border border-neutral-850">
                    <div 
                      className="bg-gradient-to-r from-orange-400 via-[#F16736] to-red-600 h-full transition-all duration-300"
                      style={{ width: `${intensityLevel}%` }}
                    />
                  </div>
                </div>

                {/* DYNAMIC REAL-TIME OBJECTIVES TRACKER */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                    CORE STUDY OBJECTIVES:
                  </h4>
                  <div className="space-y-2">
                    {activeSetup.objectives.map((obj, i) => (
                      <div 
                        key={i}
                        className={`p-2.5 rounded-xl text-[10.5px] font-semibold leading-relaxed border flex gap-2.5 items-start ${
                          objCompleted[i] 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                            : 'bg-neutral-900 border-neutral-850 text-neutral-500'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          objCompleted[i] ? 'bg-emerald-500 text-neutral-900' : 'bg-neutral-950 border border-neutral-800'
                        }`}>
                          {objCompleted[i] && <Check size={10} strokeWidth={3} />}
                        </div>
                        <span className="text-left">{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LIVE COACH FEEDBACK PANEL */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                    REALTIME COACH FEEDBACK:
                  </h4>
                  <div className="space-y-2">
                    {coachFeedback.map((item, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-xl text-[11px] leading-relaxed flex gap-2 border ${
                          idx === 0 
                            ? 'bg-emerald-500/5 border-emerald-500/15 text-neutral-300' 
                            : idx === 1 
                              ? 'bg-neutral-900 border-neutral-850 text-neutral-350'
                              : 'bg-orange-500/5 border-orange-500/15 text-[#F16736]'
                        }`}
                      >
                        <span className="text-xs font-bold leading-none mt-0.5">
                          {idx === 0 ? '✓' : idx === 1 ? '•' : '➔'}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Exit Panel */}
              <div className="mt-8 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => {
                    setSimulationActive(false);
                    setDebriefActive(true);
                    handleSaveScore(currentScore, "User force exited simulation draft run.");
                  }}
                  className="w-full py-2.5 bg-neutral-900 border border-neutral-850 hover:border-red-500/30 text-rose-450 hover:text-rose-400 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition cursor-pointer"
                >
                  🚩 Discard & Exit Simulation
                </button>
              </div>

            </div>

          </div>
        )}

        {/* =============== FULL SCREEN DEBRIEF VIEW =============== */}
        {debriefActive && activeSetup && (
          <div className="max-w-4xl w-full mx-auto p-6 md:p-12 space-y-8 animate-fade text-left">
            
            {/* Header Title alignment */}
            <div className="border-b border-neutral-800 pb-6 flex items-center gap-4">
              <span className="text-4xl">🎓</span>
              <div>
                <span className="text-[10px] font-mono text-[#F16736] tracking-widest font-black uppercase">
                  SIMULATION AUDIT VERDICT
                </span>
                <h1 className="text-3xl font-black text-white">{activeSetup.schoolTitle}</h1>
                <p className="text-xs text-neutral-450 mt-1 uppercase">SIMULATOR FORMAT: {activeSetup.simulationType}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left Score stats Card */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-850 text-center space-y-4 flex flex-col justify-center min-h-[220px]">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
                  VERIFIED EVALUATION SCORE
                </span>
                <div className="text-5xl font-black text-[#F16736]">
                  {currentScore.toFixed(1)} <span className="text-sm text-neutral-400 font-medium block mt-1">out of 10.0</span>
                </div>
                <div className={`p-2 rounded-xl text-xs font-black uppercase tracking-wider ${
                  currentScore >= 7 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                }`}>
                  {currentScore >= 7 ? 'PASS ACHIEVEMENT UNLOCKED' : 'NEEDS TACTICAL RE-ANCHOR'}
                </div>
              </div>

              {/* Right Performance Narrative summarizer */}
              <div className="md:col-span-2 p-6 rounded-3xl bg-[#161616] border border-neutral-850 text-left space-y-4">
                <span className="text-[10px] font-mono text-neutral-500 block uppercase font-bold tracking-widest">
                  SUMMARY REPORT BY MENTOR:
                </span>
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-850 text-xs md:text-sm text-neutral-200 leading-relaxed font-sans whitespace-pre-line font-medium">
                  {coachFeedback.length > 0 ? (
                    <div className="space-y-2.5">
                      <p>✨ <strong className="text-white">Applied successfully:</strong> {coachFeedback[0]}</p>
                      <p>⚠️ <strong className="text-white">Gap feedback:</strong> {coachFeedback[1]}</p>
                      <p>💡 <strong className="text-white">Next milestone concept:</strong> {coachFeedback[2]}</p>
                    </div>
                  ) : (
                    "Simulation score committed successfully on-chain."
                  )}
                </div>
              </div>

            </div>

            {/* REPLAY TIMELINE GRAPH */}
            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-850 space-y-4">
              <h3 className="text-sm font-black uppercase text-neutral-400 tracking-wider">
                📈 REPLAY TIMELINE RUN PROGRESS:
              </h3>
              
              {history.length === 0 ? (
                <p className="text-xs text-neutral-500 italic block py-4 text-center">No timeline stats saved during session.</p>
              ) : (
                <div className="space-y-4 relative pl-4 border-l border-neutral-800">
                  {history.map((evt, idx) => (
                    <div key={idx} className="relative space-y-1.5 text-left">
                      
                      {/* Timeline dot */}
                      <span className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-[#F16736] border-2 border-[#121212] " />

                      <div className="flex justify-between items-center text-xs font-bold text-neutral-400">
                        <span className="text-[#F16736] font-mono">MOVE {evt.turn}: Tactical Pivot</span>
                        <span>Stance Score: {evt.score} / 10 | Tension Pressure: {evt.intensity}%</span>
                      </div>

                      <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850 text-xs text-neutral-300">
                        <p className="leading-relaxed"><strong className="text-white">Your Stance Argument:</strong> &quot;{evt.stance}&quot;</p>
                        <p className="mt-2 text-neutral-400 leading-relaxed"><strong className="text-neutral-300">Reaction Response:</strong> {evt.reaction}</p>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DEBRIEF BUTTON BAR CONTROLS */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate('/portal')}
                className="flex-1 py-4 bg-[#F16736] hover:bg-[#F16736]/90 text-white font-black text-xs uppercase tracking-widest rounded-xl transition shadow-lg text-center cursor-pointer"
              >
                Save to Portfolio & Return
              </button>
              
              <button
                onClick={() => {
                  if (activeSetup) {
                    handleEnterSchoolSimulation(activeSetup.schoolSlug);
                  }
                }}
                className="px-6 py-4 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 font-extrabold text-xs uppercase tracking-widest rounded-xl border border-neutral-800 transition cursor-pointer"
              >
                Replay Simulator Set
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
