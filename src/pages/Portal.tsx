import { useState, useEffect, useRef, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Menu, LayoutDashboard, Bookmark, Terminal, Award, User as UserIcon, LogOut,
  ChevronRight, Play, BookOpen, HelpCircle, Check, FileDown, Flame, Zap, ArrowLeft,
  MessageSquare, Send, ShieldAlert, Sparkles, CheckCircle, RefreshCcw, Lock, Eye
} from 'lucide-react';
import { getCurrentUser, setCurrentUser, getCourses, saveCourses, getScenarios, getSimulationHistory, saveSimulationHistory, getUsers, saveUsers } from '../lib/storage';
import { callSimulationAI, ChatMessage } from '../lib/anthropic';
import { User, SchoolContent, CourseModule, Lesson, PlaygroundScenario } from '../types';
import Logo from '../components/Logo';

const Portal = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [courses, setCourses] = useState(getCourses());
  const [scenarios, setScenarios] = useState(getScenarios());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schools' | 'playground' | 'certificates' | 'profile'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Router Protection
  useEffect(() => {
    const session = getCurrentUser();
    if (!session) {
      navigate('/login');
    } else if (session.role === 'admin') {
      navigate('/admin');
    } else {
      setUser(session);
    }
  }, [navigate]);

  // Handle local state reload/triggers
  const handleUserUpdate = (updated: typeof user) => {
    setUser(updated);
    setCurrentUser(updated);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#faf9f7] flex relative">
      {/* Sidebar with Navigation Links (Desktop) */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-[#e8e5e0] flex-col justify-between fixed h-full z-10">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-[#e8e5e0] flex items-center justify-between">
            <Link to="/">
              <Logo className="h-8 w-auto" textClassName="text-xl text-[#1e1e1e]" />
            </Link>
            <span className="text-[9px] font-black uppercase tracking-wider text-[#F16736] bg-[#fff1eb] border border-[#F16736]/10 px-2.5 py-0.5 rounded-full">
              PORTAL
            </span>
          </div>

          {/* User quick tag */}
          <div className="p-6 border-b border-[#e8e5e0] bg-[#faf9f7]">
            <p className="text-xs font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">STUDENT PROFILE</p>
            <h4 className="font-extrabold text-[#1e1e1e] tracking-tight truncate">{user.name}</h4>
            <div className="flex items-center gap-1.5 mt-2">
              <Flame size={14} className="text-[#F16736]" />
              <span className="text-xs font-bold text-neutral-600">{user.streak} Day Daily Streak</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
              { id: 'schools', label: 'My Schools', icon: <Bookmark size={18} /> },
              { id: 'playground', label: 'Playground', icon: <Terminal size={18} /> },
              { id: 'certificates', label: 'Certificates', icon: <Award size={18} /> },
              { id: 'profile', label: 'Profile', icon: <UserIcon size={18} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${
                  activeTab === item.id 
                    ? 'bg-[#1e1e1e] text-white shadow-md' 
                    : 'text-neutral-600 hover:text-[#1e1e1e] hover:bg-neutral-100'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#e8e5e0] space-y-2">
          {user.role === 'admin' && (
            <Link 
              to="/admin" 
              className="w-full py-2.5 px-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-all"
            >
              Director Panel
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center justify-center gap-1.5 border border-dotted border-transparent hover:border-rose-200 transition-all"
          >
            <LogOut size={14} />
            Disconnect Session
          </button>
        </div>
      </aside>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black z-30 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-white z-40 p-6 flex flex-col justify-between border-r border-[#e8e5e0] lg:hidden"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <Logo className="h-8 w-auto" textClassName="text-xl text-[#1e1e1e]" />
                  <button onClick={() => setSidebarOpen(false)} className="p-1.5"><X size={20} /></button>
                </div>

                <div className="p-4 bg-[#faf9f7] rounded-2xl mb-6">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-black">Student profile</p>
                  <p className="font-bold text-[#1e1e1e] truncate">{user.name}</p>
                </div>

                <nav className="space-y-1">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
                    { id: 'schools', label: 'My Schools', icon: <Bookmark size={18} /> },
                    { id: 'playground', label: 'Playground', icon: <Terminal size={18} /> },
                    { id: 'certificates', label: 'Certificates', icon: <Award size={18} /> },
                    { id: 'profile', label: 'Profile', icon: <UserIcon size={18} /> },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setSidebarOpen(false);
                      }}
                      className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${
                        activeTab === item.id 
                          ? 'bg-[#1e1e1e] text-white shadow-md' 
                          : 'text-neutral-600 hover:text-[#1e1e1e] hover:bg-neutral-100'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-3 text-sm font-bold text-rose-600 bg-rose-50 rounded-xl flex items-center justify-center gap-2"
              >
                <LogOut size={16} /> Disconnect
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Workspace Frame */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Mobile Header navbar */}
        <header className="lg:hidden p-4 bg-white border-b border-[#e8e5e0] flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="p-1 text-neutral-600">
            <Menu size={24} />
          </button>
          <Logo className="h-8 w-auto" textClassName="text-xl text-[#1e1e1e]" />
          <div className="w-8 h-8 rounded-full bg-[#fff1eb] border border-[#F16736]/20 flex items-center justify-center text-[#F16736]">
            <Flame size={16} />
          </div>
        </header>

        {/* Inner Content panels */}
        <main className="flex-1 p-6 md:p-10 max-w-5xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView user={user} courses={courses} onNavigate={setActiveTab} />
          )}

          {activeTab === 'schools' && (
            <SchoolsView user={user} courses={courses} onUserUpdate={handleUserUpdate} />
          )}

          {activeTab === 'playground' && (
            <PlaygroundView user={user} scenarios={scenarios} onUserUpdate={handleUserUpdate} />
          )}

          {activeTab === 'certificates' && (
            <CertificatesView user={user} />
          )}

          {activeTab === 'profile' && (
            <ProfileView user={user} scenarios={scenarios} />
          )}
        </main>
      </div>
    </div>
  );
};

/* ==========================================================
   SUB-VIEW COMPONENTS
   ========================================================== */

// 1. DASHBOARD VIEW
interface DashboardViewProps {
  user: User;
  courses: SchoolContent[];
  onNavigate: (tab: any) => void;
}
const DashboardView = ({ user, courses, onNavigate }: DashboardViewProps) => {
  // Compute overall enrolled schools progress
  const enrolledCourses = courses.filter(c => user.enrolledSchools.includes(c.slug));

  const countTotalLessonsInCourse = (course: SchoolContent) => {
    let total = 0;
    course.modules.forEach(m => total += m.lessons.length);
    return total;
  };

  const countCompletedInCourse = (course: SchoolContent) => {
    let completed = 0;
    course.modules.forEach(m => {
      m.lessons.forEach(l => {
        if (user.completedLessons.includes(l.id)) completed++;
      });
    });
    return completed;
  };

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Banner */}
      <div className="rounded-[2rem] bg-gradient-to-br from-[#1e1e1e] to-neutral-800 p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #F16736 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
        <div className="relative z-10 max-w-xl space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#F16736] bg-[#fff1eb]/15 border border-[#F16736]/20 px-3 py-1 rounded-full block w-max">
            Decentralised Cohorts Ecosystem
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
            How far, <span className="text-[#F16736]">{user.name}</span>?
          </h1>
          <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-medium">
            Beyond the School Wall equips you with genuine economic leverage. Continue practicing in the AI Playground or complete modules inside your cohorts list.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => onNavigate('playground')}
              className="px-6 py-3 bg-[#F16736] hover:bg-[#F16736]/90 text-white font-extrabold text-sm rounded-full transition-all flex items-center gap-2 hover:shadow-lg active:scale-95"
            >
              <Terminal size={16} /> Open AI Playground Arena
            </button>
          </div>
        </div>
      </div>

      {/* Progress Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Left Column: Enrolled Schools */}
        <div className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#1e1e1e] flex items-center justify-between">
            <span>Enrolled Curriculums</span>
            <button onClick={() => onNavigate('schools')} className="text-xs font-bold text-[#F16736] hover:underline normal-case tracking-normal">Explore more</button>
          </h2>

          {enrolledCourses.length === 0 ? (
            <div className="border border-dashed border-[#e8e5e0] rounded-2.5xl p-8 text-center bg-white">
              <BookOpen className="text-zinc-300 mx-auto mb-3" size={32} />
              <p className="text-sm font-bold text-neutral-500 mb-4">You have not registered into any cohorts yet.</p>
              <button 
                onClick={() => onNavigate('schools')}
                className="px-5 py-2.5 bg-[#1e1e1e] text-white text-xs font-bold rounded-full hover:bg-[#F16736] transition-all"
              >
                Join Five Schools
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {enrolledCourses.map(course => {
                const total = countTotalLessonsInCourse(course);
                const done = countCompletedInCourse(course);
                const pct = total === 0 ? 0 : Math.round((done / total) * 100);

                return (
                  <div key={course.slug} className="p-5 border border-[#e8e5e0] rounded-2xl bg-white hover:border-[#F16736]/50 transition-all group shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-extrabold text-neutral-800 text-sm group-hover:text-[#F16736] transition-colors">{course.title}</h4>
                        <p className="text-xs font-bold text-[#6b6b6b]">{done} of {total} items finished</p>
                      </div>
                      <span className="text-xs font-bold text-[#F16736]">{pct}% Done</span>
                    </div>

                    <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden mt-3">
                      <div className="bg-[#F16736] h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-2 border-t border-neutral-50">
                      <span className="text-[10px] font-mono text-zinc-400">COHORT PROGRESS</span>
                      <button 
                        onClick={() => onNavigate('schools')}
                        className="text-xs font-extrabold text-[#F16736] flex items-center gap-1 hover:underline"
                      >
                        Enter school <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Mini Checklist / Board Update */}
        <div className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#1e1e1e]">Student Activity Metrics</h2>
          <div className="border border-[#e8e5e0] rounded-3xl p-6 bg-white space-y-6 shadow-sm">
            {/* Streak card */}
            <div className="flex items-center gap-4 bg-[#fff1eb]/40 border border-[#F16736]/15 rounded-2xl p-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#F16736] shadow-sm flex-shrink-0">
                <Flame size={24} className="animate-pulse" />
              </div>
              <div>
                <h4 className="font-extrabold text-neutral-800 text-sm">Consistent Progress</h4>
                <p className="text-xs font-bold text-neutral-500">Your current streak is {user.streak} days. Keep completing tasks daily to defend your position.</p>
              </div>
            </div>

            {/* Quick analytics info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#faf9f7] rounded-xl text-center">
                <span className="text-[9px] uppercase font-black text-neutral-400 block tracking-wider">Completed Lessons</span>
                <span className="text-3xl font-black text-[#1e1e1e] mt-1 block">{user.completedLessons.length}</span>
              </div>
              <div className="p-4 bg-[#faf9f7] rounded-xl text-center">
                <span className="text-[9px] uppercase font-black text-neutral-400 block tracking-wider">Playground Attempts</span>
                <span className="text-3xl font-black text-[#1e1e1e] mt-1 block">{user.playgroundScores.length} Runs</span>
              </div>
            </div>

            {/* Micro Announcement */}
            <div className="text-xs font-semibold text-neutral-500 border-t border-neutral-100 pt-4 leading-relaxed">
              💡 <strong className="text-neutral-700">Decentralized Badge Audit:</strong> If you secure above 9/10 in any AI simulation, a soulbound badge of achievement automatically triggers under your certificates dashboard.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. SCHOOLS VIEW
interface SchoolsViewProps {
  user: User;
  courses: SchoolContent[];
  onUserUpdate: (updated: User) => void;
}
const SchoolsView = ({ user, courses, onUserUpdate }: SchoolsViewProps) => {
  const [selectedSchool, setSelectedSchool] = useState<SchoolContent | null>(null);
  const [activeSchoolTab, setActiveSchoolTab] = useState<'curriculum' | 'resources' | 'progress'>('curriculum');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // For Interactive Quiz States
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleRequestAccess = (slug: string) => {
    const updated = {
      ...user,
      enrolledSchools: [...user.enrolledSchools, slug]
    };
    onUserUpdate(updated);
  };

  const isEnrolled = (slug: string) => user.enrolledSchools.includes(slug);

  const toggleLessonComplete = (lessonId: string) => {
    const isDone = user.completedLessons.includes(lessonId);
    let updatedLessons = [...user.completedLessons];
    if (isDone) {
      updatedLessons = updatedLessons.filter(id => id !== lessonId);
    } else {
      updatedLessons.push(lessonId);
    }

    const updated = {
      ...user,
      completedLessons: updatedLessons,
      streak: user.streak + (isDone ? -1 : 1) // simple adjustment
    };
    onUserUpdate(updated);
  };

  const startQuiz = (lesson: Lesson) => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setActiveLesson(lesson);
  };

  const handleQuizSubmit = (lesson: Lesson) => {
    if (!lesson.quizQuestions) return;
    let score = 0;
    lesson.quizQuestions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctOption) score++;
    });

    setQuizScore(score);
    setQuizSubmitted(true);
    
    // Automatically flag complete if they passed
    if (score === lesson.quizQuestions.length) {
      if (!user.completedLessons.includes(lesson.id)) {
        toggleLessonComplete(lesson.id);
      }
    }
  };

  // If inside a specific school interface
  if (selectedSchool) {
    // Calculative metrics
    let totalLessons = 0;
    let completedLessons = 0;
    selectedSchool.modules.forEach(m => {
      totalLessons += m.lessons.length;
      m.lessons.forEach(l => {
        if (user.completedLessons.includes(l.id)) completedLessons++;
      });
    });
    const completionPercentage = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

    return (
      <div className="space-y-6 text-left">
        {/* Back Link */}
        <button 
          onClick={() => { setSelectedSchool(null); setActiveLesson(null); }}
          className="flex items-center gap-1.5 text-xs font-black text-neutral-500 hover:text-[#F16736] uppercase tracking-wider bg-white px-4 py-2 rounded-xl border border-[#e8e5e0] cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Cohorts List
        </button>

        {/* School Header Panel */}
        <div className="p-6 md:p-8 rounded-[2rem] border border-[#e8e5e0] bg-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="text-[10px] font-black uppercase text-[#F16736] bg-[#fff1eb] border border-[#F16736]/10 px-2.5 py-1 rounded-full inline-block mb-2">
              ACTIVE COHORT
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-neutral-800 tracking-tight">{selectedSchool.title}</h1>
            <p className="text-xs font-semibold text-neutral-500 mt-1 max-w-xl">
              Certified pathway under decentralized authority. Learn visual design rules, Stoic character grids, and sustainable financial assets.
            </p>
          </div>

          <div className="flex-shrink-0 text-left md:text-right bg-[#faf9f7] p-4 rounded-2xl border border-neutral-100 min-w-36">
            <span className="text-[9px] uppercase font-black text-neutral-400 block tracking-wider">Completion Rate</span>
            <span className="text-3xl font-black text-[#1e1e1e] mt-1 block">{completionPercentage}%</span>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#F16736] h-full rounded-full transition-all duration-300" style={{ width: `${completionPercentage}%` }} />
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#e8e5e0] gap-4">
          {[
            { id: 'curriculum', label: 'Curriculum' },
            { id: 'resources', label: 'Resources' },
            { id: 'progress', label: 'My Progress' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveSchoolTab(tab.id as any); setActiveLesson(null); }}
              className={`py-3.5 px-2 font-black text-xs uppercase tracking-wider relative transition-all ${
                activeSchoolTab === tab.id ? 'text-[#F16736]' : 'text-neutral-500 hover:text-[#1e1e1e]'
              }`}
            >
              {tab.label}
              {activeSchoolTab === tab.id && (
                <motion.div layoutId="schoolActiveTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#F16736]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Rendering */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* LEFT: Tab details list (covers 2 cols on wide, or 3 cols if no active lesson selected) */}
          <div className={`space-y-4 ${activeLesson ? 'md:col-span-1' : 'md:col-span-3'}`}>
            {activeSchoolTab === 'curriculum' && (
              <div className="space-y-6">
                {selectedSchool.modules.map((mod, modIdx) => (
                  <div key={mod.id} className="space-y-3">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-[10px] uppercase font-black tracking-widest text-[#F16736] bg-[#fff1eb] border border-[#F16736]/10 px-2 py-0.5 rounded">{mod.week}</span>
                      <h4 className="font-extrabold text-[#1e1e1e] text-sm leading-tight">{mod.title}</h4>
                    </div>

                    <div className="space-y-2 pl-2">
                      {mod.lessons.map(lesson => {
                        const done = user.completedLessons.includes(lesson.id);
                        const isCurrent = activeLesson?.id === lesson.id;
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson)}
                            className={`p-3.5 border rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                              isCurrent 
                                ? 'bg-zinc-900 border-zinc-900 text-white shadow' 
                                : done 
                                  ? 'bg-emerald-50/40 border-emerald-200 text-neutral-800' 
                                  : 'bg-white border-[#e8e5e0] text-neutral-800 hover:border-[#F16736]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {done ? (
                                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white flex-shrink-0 shadow-sm animate-scale">
                                  <Check size={12} strokeWidth={3} />
                                </div>
                              ) : (
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-black flex-shrink-0 ${isCurrent ? 'border-white/50 bg-white/10' : 'border-zinc-300 bg-[#faf9f7]'}`}>
                                  {lesson.type === 'video' ? 'V' : lesson.type === 'reading' ? 'R' : 'Q'}
                                </div>
                              )}
                              <div>
                                <h5 className="font-bold text-xs leading-snug line-clamp-1">{lesson.title}</h5>
                                <p className={`text-[10px] font-semibold mt-0.5 ${isCurrent ? 'text-zinc-300' : 'text-zinc-400'}`}>{lesson.duration}</p>
                              </div>
                            </div>
                            <ChevronRight size={14} className={isCurrent ? 'text-zinc-300' : 'text-zinc-400'} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSchoolTab === 'resources' && (
              <div className="space-y-3">
                <p className="text-xs text-neutral-500 font-semibold mb-4 leading-normal">Download high-leverage frameworks, style kits, contract blueprints, and stoic templates authenticated by the School Director Board.</p>
                {selectedSchool.modules.flatMap(m => m.resources).length === 0 ? (
                  <p className="p-8 border border-neutral-200 border-dashed rounded-2xl bg-white text-center text-neutral-400 font-bold text-sm">No downloadable assets uploaded for this school yet.</p>
                ) : (
                  selectedSchool.modules.flatMap(m => m.resources).map(res => (
                    <a
                      key={res.id}
                      href="#"
                      className="p-4 border border-[#e8e5e0] bg-white rounded-xl hover:border-[#F16736] transition-all flex items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#faf9f7] rounded-lg border border-neutral-100 flex items-center justify-center text-[#F16736]">
                          <FileDown size={20} />
                        </div>
                        <div>
                          <p className="font-extrabold text-neutral-800 text-xs truncate group-hover:text-[#F16736]">{res.name}</p>
                          <span className="text-[10px] uppercase font-mono text-zinc-400 font-bold">{res.type} • {res.size}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#F16736] group-hover:underline">Secure Download</span>
                    </a>
                  ))
                )}
              </div>
            )}

            {activeSchoolTab === 'progress' && (
              <div className="space-y-4">
                <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
                    <span className="text-xs font-black text-neutral-500">CURRICULUM ITEM COVERED</span>
                    <span className="text-sm font-black text-[#1e1e1e]">{completedLessons} / {totalLessons} Lessons</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
                    <span className="text-xs font-black text-neutral-500">CURRENT STREAK</span>
                    <span className="text-sm font-black text-emerald-600 flex items-center gap-1"><Flame size={16} /> {user.streak} Active Days</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-[10px] font-black uppercase tracking-wider text-neutral-400">Completed Materials</h5>
                  {selectedSchool.modules.flatMap(m => m.lessons).filter(l => user.completedLessons.includes(l.id)).length === 0 ? (
                    <p className="text-xs text-neutral-400 font-bold font-mono">No lessons marked complete yet.</p>
                  ) : (
                    selectedSchool.modules.flatMap(m => m.lessons).filter(l => user.completedLessons.includes(l.id)).map(les => (
                      <div key={les.id} className="p-3 bg-emerald-50/20 border border-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                        <CheckCircle size={14} className="text-emerald-500" />
                        <span>{les.title}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Active Lesson Interactive Player/Viewer Panel (covers 2 cols) */}
          {activeLesson && (
            <div className="md:col-span-2 border border-[#e8e5e0] rounded-2xl bg-white p-6 space-y-6 shadow-sm flex flex-col justify-between">
              
              {/* Content Panel */}
              <div className="space-y-5 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F16736] bg-[#fff1eb] border border-[#F16736]/10 px-2 py-0.5 rounded">
                    {activeLesson.type.toUpperCase()} MATERIAL
                  </span>
                  <button 
                    onClick={() => setActiveLesson(null)}
                    className="text-neutral-400 hover:text-neutral-700 p-1"
                  >
                    <X size={16} />
                  </button>
                </div>

                <h3 className="text-xl font-black text-[#1e1e1e] leading-snug">{activeLesson.title}</h3>
                <p className="text-xs text-neutral-500 leading-normal font-medium">{activeLesson.description}</p>

                {/* Specific Lesson Interface types */}
                {activeLesson.type === 'video' && (
                  <div className="space-y-4">
                    {/* Embedded Frame Layout */}
                    <div className="w-full aspect-video bg-neutral-900 rounded-xl overflow-hidden relative border border-neutral-800 flex items-center justify-center">
                      <iframe 
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      />
                    </div>
                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-[11px] font-mono text-zinc-500">
                      🔗 Pasted video source link: <span className="font-bold underline text-[#F16736]">{activeLesson.content || 'None provided'}</span>
                    </div>
                  </div>
                )}

                {activeLesson.type === 'reading' && (
                  <div className="p-5 bg-[#faf9f7] rounded-xl border border-neutral-200 max-h-96 overflow-y-auto text-sm leading-relaxed prose prose-neutral text-neutral-700 font-medium">
                    <div className="whitespace-pre-line">{activeLesson.content}</div>
                  </div>
                )}

                {activeLesson.type === 'quiz' && activeLesson.quizQuestions && (
                  <div className="space-y-6">
                    {activeLesson.quizQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="space-y-2.5">
                        <p className="text-sm font-extrabold text-neutral-800">{q.question}</p>
                        <div className="space-y-1.5 pl-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedAnswers[qIdx] === optIdx;
                            const isCorrect = q.correctOption === optIdx;
                            return (
                              <button
                                key={optIdx}
                                disabled={quizSubmitted}
                                onClick={() => setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx })}
                                className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all border flex items-center gap-3 ${
                                  isSelected 
                                    ? quizSubmitted 
                                      ? isCorrect 
                                        ? 'bg-emerald-50 border-emerald-400 text-emerald-800' 
                                        : 'bg-rose-50 border-rose-400 text-rose-800'
                                      : 'bg-[#fff1eb] border-[#F16736] text-[#1e1e1e]'
                                    : quizSubmitted && isCorrect
                                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                                      : 'bg-white border-neutral-200 hover:border-neutral-400 text-neutral-700'
                                }`}
                              >
                                <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] ${isSelected ? 'border-[#F16736] bg-[#F16736] text-white' : 'border-neutral-400 bg-neutral-50'}`}>
                                  {optIdx + 1}
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    {!quizSubmitted ? (
                      <button
                        onClick={() => handleQuizSubmit(activeLesson)}
                        disabled={Object.keys(selectedAnswers).length < activeLesson.quizQuestions!.length}
                        className="w-full py-3.5 bg-neutral-900 text-white hover:bg-[#F16736] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-40"
                      >
                        Submit Answers & Verify Grade
                      </button>
                    ) : (
                      <div className="p-4 rounded-xl border text-center flex flex-col items-center justify-center gap-3 bg-[#faf9f7]">
                        <p className="text-xs font-black text-neutral-500">QUIZ VERDICT</p>
                        <span className="text-2xl font-black">{quizScore} / {activeLesson.quizQuestions.length} Score</span>
                        {quizScore === activeLesson.quizQuestions.length ? (
                          <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
                            <CheckCircle size={14} /> Passed! Lesson successfully compiled.
                          </span>
                        ) : (
                          <div className="space-y-2">
                            <span className="text-xs font-semibold text-rose-600">Incorrect answers flagged. Please review and try again.</span>
                            <button 
                              onClick={() => startQuiz(activeLesson)}
                              className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-extrabold text-xs rounded-lg block mx-auto transition-all"
                            >
                              Reset and Retry
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mark Complete Check Controls */}
              {activeLesson.type !== 'quiz' && (
                <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400">MARK COMPLETED WHEN FINISHED</span>
                  <button
                    onClick={() => toggleLessonComplete(activeLesson.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                      user.completedLessons.includes(activeLesson.id)
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                        : 'bg-neutral-900 text-white hover:bg-[#F16736]'
                    }`}
                  >
                    <CheckCircle size={14} />
                    {user.completedLessons.includes(activeLesson.id) ? 'Completed and Compiled' : 'Mark as Complete'}
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    );
  }

  // List of all 5 Schools / Cohorts
  return (
    <div className="space-y-6 text-left animate-fade">
      <div>
        <h1 className="text-3xl font-black text-neutral-100 mb-2 invisible h-0">Schools</h1>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-[#1e1e1e]">The Five BTSW Schools</h2>
        <p className="text-sm font-semibold text-neutral-500 mt-1 max-w-xl">
          Each school specializes in raising specific vectors of student resourcefulness: from Stoic character leadership to real-world capital and digital mastery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {courses.map(course => {
          const enrolled = isEnrolled(course.slug);
          return (
            <div 
              key={course.slug} 
              className={`border rounded-[2rem] p-6 flex flex-col justify-between min-h-[300px] shadow-sm transition-all ${
                enrolled 
                  ? 'bg-white border-[#F16736]/20 hover:shadow-lg' 
                  : 'bg-white border-neutral-200/80 saturate-[0.85]'
              }`}
            >
              <div className="space-y-4">
                <span className="text-[9px] font-black tracking-widest text-[#F16736] uppercase bg-[#fff1eb] border border-[#F16736]/10 px-2.5 py-1 rounded-full block w-max">
                  {enrolled ? 'ENROLLED & ACTIVE' : 'OPEN COHORT'}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-[#1e1e1e] leading-snug">{course.title}</h3>
                  <p className="text-xs font-bold text-neutral-400 mt-1 uppercase">5-Module Track</p>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                  {course.slug === 'the-skill-hut' && "Master typographic scale grids, mobile-first CSS styling, and client-outreach vectors."}
                  {course.slug === 'the-magnet-school' && "Deconstruct political/dialectical platforms, and study stoic ethical blueprints."}
                  {course.slug === 'cash-on-campus' && "Build student logistics arbitrage networks and manage your seed investments."}
                  {course.slug === 'the-mental-application-study' && "Optimize cognitive bandwidth and study peak neurological execution limits."}
                  {course.slug === 'crash-course' && "Unlock rapid supermarket appointment schedulers and micro-innovation frameworks."}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-100 mt-6">
                {enrolled ? (
                  <button
                    onClick={() => { setSelectedSchool(course); setActiveSchoolTab('curriculum'); }}
                    className="w-full py-3 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow"
                  >
                    Open Syllabus & Lessons
                  </button>
                ) : (
                  <button
                    onClick={() => handleRequestAccess(course.slug)}
                    className="w-full py-3 bg-[#faf9f7] hover:bg-[#fff1eb] text-neutral-700 hover:text-[#F16736] border border-[#e8e5e0] hover:border-[#F16736]/30 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all"
                  >
                    Request Cohort Access
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 3. PLAYGROUND VIEW (AI simulation list + Simulator Entry)
interface PlaygroundViewProps {
  user: User;
  scenarios: PlaygroundScenario[];
  onUserUpdate: (updated: User) => void;
}
const PlaygroundView = ({ user }: PlaygroundViewProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 text-left animate-fade">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-[#1e1e1e]">AI Simulation Playground</h2>
          <p className="text-sm font-semibold text-neutral-500 mt-1 max-w-xl">
            Our sandbox has migrated to an immersive, full-screen sandboxed simulation cage for absolute scenario realism.
          </p>
        </div>
        <button
          onClick={() => navigate('/portal/playground')}
          className="px-6 py-3 bg-[#F16736] hover:bg-[#F16736]/90 text-white font-black text-xs uppercase tracking-widest rounded-xl transition duration-200 shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Terminal size={14} /> Enter Full-Screen Vector Cage
        </button>
      </div>

      <div className="p-8 border border-[#F16736]/20 rounded-[2.5rem] bg-[#1e1e1e] text-white text-left space-y-6 relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <span className="text-[10px] font-black tracking-[0.2em] text-[#F16736] uppercase bg-[#F16736]/10 border border-[#F16736]/20 px-3 py-1 rounded-full w-max block">
            IMMERSIVE VECTORED PLAYGROUND
          </span>
          <h3 className="text-2xl font-black text-white">Full-Screen Simulation Cage</h3>
          <p className="text-xs text-neutral-450 leading-relaxed max-w-2xl font-semibold opacity-90">
            Every simulation now takes place in a dedicated fullscreen space that mimics real-world scenarios. It features an <strong>Environment Monitor Feed</strong> on the left, an <strong>Action Command Interface</strong> in the center, and your <strong>Live Coach performance tracker</strong> with a stress intensity index on the right.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 relative z-10 border-t border-neutral-800">
          <div className="space-y-2">
            <h4 className="text-sm font-black text-white">1. Environment Panel (30%)</h4>
            <p className="text-[11px] text-neutral-400 font-semibold leading-normal">Live video call screens, supplier offices, podium views, and mental biofeedback graphs that shift based on your performance.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-black text-[#F16736]">2. Tactical Action Panel (40%)</h4>
            <p className="text-[11px] text-neutral-400 font-semibold leading-normal">Select strategic action paths, fine-tune transaction metrics, and document your direct stance/defense rationale.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-black text-white">3. Live Coach Panel (30%)</h4>
            <p className="text-[11px] text-neutral-400 font-semibold leading-normal">Live feedback bullets, a running score updated after every active move, and a real-time stress intensity thermometer.</p>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-800 flex justify-end relative z-10">
          <button
            onClick={() => navigate('/portal/playground')}
            className="px-8 py-3.5 bg-[#F16736] hover:bg-[#F16736]/90 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition duration-200 hover:scale-102 flex items-center gap-2 cursor-pointer shadow-lg animate-pulse"
          >
            <Play size={12} fill="white" /> Enter Sandbox Environment
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. CERTIFICATES VIEW
const CertificatesView = ({ user }: { user: User }) => {
  return (
    <div className="space-y-6 text-left animate-fade">
      <div>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-[#1e1e1e]">Soulbound On-chain Certificates</h2>
        <p className="text-sm font-semibold text-neutral-500 mt-1 max-w-xl">
          Complete individual school programs to earn soulbound achievements compiled securely in your personalized ledger profile.
        </p>
      </div>

      {user.playgroundScores.length === 0 ? (
        <div className="p-12 border border-dashed border-[#e8e5e0] rounded-3xl bg-white text-center">
          <Award className="text-zinc-300 mx-auto mb-4" size={48} />
          <h4 className="font-extrabold text-neutral-700 text-lg mb-2">No badges unlocked yet</h4>
          <p className="text-xs font-semibold text-neutral-500 leading-normal max-w-sm mx-auto">
            Secure at least 8/10 on any Playground negotiations, or complete all course modules to trigger secure cryptographically validated badges.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {user.playgroundScores.map((score, sIdx) => (
            <div 
              key={sIdx} 
              className="p-6 border border-[#e8e5e0] bg-white rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm group hover:border-[#F16736]"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#fff1eb] to-orange-50 border border-[#F16736]/15 rounded-full flex items-center justify-center text-[#F16736]">
                  <Award size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">VERIFIED EARNED BADGE</span>
                    <span className="text-[10px] font-mono text-[#F16736] font-black bg-[#fff1eb] px-1.5 py-0.5 rounded">NFT-SLB-{sIdx + 482}</span>
                  </div>
                  <h4 className="text-lg font-black text-neutral-800 leading-snug group-hover:text-[#F16736] mt-1">
                    {score.scenarioId === 'scenario-skill-hut' && 'Visual Layout & Pricing Command Badge'}
                    {score.scenarioId === 'scenario-cash-on-campus' && 'Logistics Supply Arbitrage Badge'}
                    {score.scenarioId === 'scenario-magnet-school' && 'Stoic Platform Leadership Shield'}
                    {!['scenario-skill-hut', 'scenario-cash-on-campus', 'scenario-magnet-school'].includes(score.scenarioId) && 'Playground Scenario badge'}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Passed with score of {score.score}/10 on {score.date}. Certified proficiency in direct business negotiation and strategic value definition.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => alert(`Certificate verification block details:\nIssuer: Beyond the School Wall Academic Board\nRecipient: ${user.name}\nTxHash: 0x${Math.random().toString(16).substr(2, 40)}`)}
                  className="px-4 py-2 border border-[#e8e5e0] hover:border-[#1e1e1e] bg-white hover:bg-neutral-50 text-[#1e1e1e] font-extrabold text-xs rounded-xl"
                >
                  Verify Hash
                </button>
                <button 
                  onClick={() => alert('Soulbound credential compiled for download.')}
                  className="px-4 py-2 bg-[#F16736] hover:bg-[#F16736]/90 text-white font-extrabold text-xs rounded-xl"
                >
                  Export PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 5. PROFILE VIEW
const ProfileView = ({ user, scenarios }: { user: User; scenarios: PlaygroundScenario[] }) => {
  return (
    <div className="space-y-6 text-left animate-fade">
      <div>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-[#1e1e1e]">Student Portal Profile</h2>
        <p className="text-sm font-semibold text-neutral-500 mt-1 max-w-xl">
          Manage your personal details and audit your lifetime simulation grades.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        {/* Left Col: Core stats card */}
        <div className="border border-[#e8e5e0] bg-white rounded-3xl p-6 shadow-sm space-y-6">
          <div className="text-center pb-6 border-b border-neutral-100">
            <div className="w-16 h-16 bg-neutral-900 mx-auto rounded-full flex items-center justify-center text-white text-xl font-bold border-2 border-[#F16736] mb-3">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <h4 className="font-extrabold text-[#1e1e1e] truncate">{user.name}</h4>
            <p className="text-xs text-neutral-400 mt-1 truncate">{user.email}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-neutral-500">
              <span>LEDGER COMPATIBILITY</span>
              <span className="text-[#F16736]">Soulbound standard</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold text-neutral-500">
              <span>REGISTERED SINCE</span>
              <span className="text-neutral-700">{user.joinedDate}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold text-neutral-500">
              <span>MEMBER ROLE</span>
              <span className="text-neutral-700 uppercase">{user.role}</span>
            </div>
          </div>
        </div>

        {/* Right Col: Saved Arena results */}
        <div className="md:col-span-2 border border-[#e8e5e0] bg-white rounded-3xl p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#1e1e1e]">SIMULATION PERFORMANCE JOURNAL</h4>

          {user.playgroundScores.length === 0 ? (
            <p className="p-10 border border-dashed border-neutral-200 rounded-2xl bg-neutral-50/50 text-center text-neutral-400 font-bold text-xs">
              No simulation results saved. Enter an AI Playground scenario and submit to compile feedback into your profile.
            </p>
          ) : (
            <div className="space-y-3">
              {user.playgroundScores.map((log, lIdx) => {
                const scenario = scenarios.find(s => s.id === log.scenarioId);
                return (
                  <div key={lIdx} className="p-4 bg-[#faf9f7] border border-neutral-200 rounded-2xl space-y-2.5">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-extrabold text-neutral-800 text-xs">Scenario Target: {scenario?.title || log.scenarioId}</h5>
                        <p className="text-[10px] font-mono text-zinc-400">{log.date}</p>
                      </div>
                      <span className="text-lg font-black text-[#F16736]">{log.score} / 10</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-neutral-200 text-[11px] font-sans text-neutral-500 whitespace-pre-line leading-relaxed">
                      {log.feedback}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Portal;
