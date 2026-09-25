'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Menu, LayoutDashboard, Bookmark, Terminal, Award, User as UserIcon, LogOut,
  ChevronRight, Play, BookOpen, HelpCircle, Check, FileDown, Flame, Zap, ArrowLeft, ArrowRight,
  MessageSquare, Send, ShieldAlert, Sparkles, CheckCircle, RefreshCcw, Lock, Eye,
  Target, Video, Printer, Download, Bot, CheckSquare, Calendar, ShieldCheck, ExternalLink
} from 'lucide-react';
import { 
  getCurrentUser, setCurrentUser, getCourses, saveCourses, getScenarios, 
  getSimulationHistory, saveSimulationHistory, getUsers, saveUsers, getLiveSessions 
} from '@/lib/storage';
import { callSimulationAI, ChatMessage } from '@/lib/anthropic';
import { User, SchoolContent, CourseModule, Lesson, PlaygroundScenario, LiveSession } from '@/types';
import Breadcrumbs from '@/components/Breadcrumbs';
import Logo from '@/components/Logo';

const Portal = () => {
  const router = useRouter();
  const [user, setUser] = useState(getCurrentUser());
  const [courses, setCourses] = useState(getCourses());
  const [scenarios, setScenarios] = useState(getScenarios());
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>(getLiveSessions());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schools' | 'sandbox' | 'playground' | 'certificates' | 'profile'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Router Protection
  useEffect(() => {
    const session = getCurrentUser();
    if (!session) {
      router.push('/login');
    } else if (session.role === 'admin') {
      router.push('/admin');
    } else {
      setUser(session);
    }
  }, [router]);

  // Handle local state reload/triggers
  const handleUserUpdate = (updated: typeof user) => {
    setUser(updated);
    setCurrentUser(updated);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#faf9f7] flex relative">
      {/* Sidebar with Navigation Links (Desktop) */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-[#e8e5e0] flex-col justify-between fixed h-full z-10">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-[#e8e5e0] flex items-center justify-between">
            <Link href="/">
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
            {user.parentConsent && (
              <div className="flex items-center gap-1.5 mt-2 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <ShieldCheck size={12} /> Parent Verified
              </div>
            )}
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
              { id: 'schools', label: 'My Courses', icon: <Bookmark size={18} /> },
              { id: 'sandbox', label: 'Practice Sandbox', icon: <Terminal size={18} /> },
              { id: 'playground', label: 'Simulations', icon: <Target size={18} /> },
              { id: 'certificates', label: 'Certificates', icon: <Award size={18} /> },
              { id: 'profile', label: 'Profile', icon: <UserIcon size={18} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center gap-3 transition-all cursor-pointer ${
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
            <Link href="/admin" 
              className="w-full py-2.5 px-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-all"
            >
              Director Panel
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center justify-center gap-1.5 border border-dotted border-transparent hover:border-rose-200 transition-all cursor-pointer"
          >
            <LogOut size={14} />
            Disconnect Session
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
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

                <nav className="space-y-1">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
                    { id: 'schools', label: 'My Courses', icon: <Bookmark size={18} /> },
                    { id: 'sandbox', label: 'Practice Sandbox', icon: <Terminal size={18} /> },
                    { id: 'playground', label: 'Simulations', icon: <Target size={18} /> },
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
                className="w-full py-3 text-sm font-bold text-rose-600 bg-rose-50 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut size={16} /> Disconnect
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Workspace Frame */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <header className="lg:hidden p-4 bg-white border-b border-[#e8e5e0] flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="p-1 text-neutral-600">
            <Menu size={24} />
          </button>
          <Logo className="h-8 w-auto" textClassName="text-xl text-[#1e1e1e]" />
          <div className="w-8 h-8 rounded-full bg-[#fff1eb] border border-[#F16736]/20 flex items-center justify-center text-[#F16736]">
            <Flame size={16} />
          </div>
        </header>

        {/* Content View Router */}
        <main className="flex-1 p-6 md:p-10 max-w-5xl w-full mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <Breadcrumbs 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Student Portal', href: activeTab === 'dashboard' ? undefined : '#' },
                ...(activeTab !== 'dashboard' ? [{ label: activeTab === 'schools' ? 'My Schools' : activeTab === 'sandbox' ? 'Interactive Sandbox' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1) }] : [])
              ]}
              variant="light"
            />
          </div>

          {activeTab === 'dashboard' && (
            <DashboardView 
              user={user} 
              courses={courses} 
              liveSessions={liveSessions}
              onNavigate={setActiveTab} 
            />
          )}

          {activeTab === 'schools' && (
            <SchoolsView 
              user={user} 
              courses={courses} 
              onUserUpdate={handleUserUpdate} 
            />
          )}

          {activeTab === 'sandbox' && (
            <SandboxView user={user} onUserUpdate={handleUserUpdate} />
          )}

          {activeTab === 'playground' && (
            <PlaygroundView 
              user={user} 
              scenarios={scenarios} 
              onUserUpdate={handleUserUpdate} 
            />
          )}

          {activeTab === 'certificates' && (
            <CertificatesView user={user} courses={courses} />
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
   1. DASHBOARD VIEW (With Live Sessions & Quick Sandbox)
   ========================================================== */
interface DashboardViewProps {
  user: User;
  courses: SchoolContent[];
  liveSessions: LiveSession[];
  onNavigate: (tab: any) => void;
}
const DashboardView = ({ user, courses, liveSessions, onNavigate }: DashboardViewProps) => {
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
        <div className="space-y-3 max-w-xl relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F16736] bg-[#F16736]/20 border border-[#F16736]/30 px-3 py-1 rounded-full">
            STUDENT HEADQUARTERS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed">
            Your learning portal is synced with live modules, practice sandboxes, and scheduled Q&A sessions. Advance through your enrolled courses to unlock completion credentials.
          </p>
          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('schools')}
              className="px-6 py-2.5 bg-[#F16736] hover:bg-[#e05423] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Continue Lessons</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => onNavigate('sandbox')}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <Terminal size={14} />
              <span>Launch Practice Sandbox</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Enrolled Courses & Live Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Enrolled Courses (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#1e1e1e]">Enrolled Learning Tracks</h2>
            <button 
              onClick={() => onNavigate('schools')}
              className="text-xs font-bold text-[#F16736] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Browse All Courses <ChevronRight size={14} />
            </button>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="p-8 border border-dashed border-[#e8e5e0] rounded-3xl bg-white text-center space-y-3">
              <Bookmark className="mx-auto text-neutral-300" size={32} />
              <p className="text-sm font-bold text-neutral-700">No tracks actively enrolled</p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">Explore the course catalog to enroll in AI, Design, Writing, or Leadership cohorts.</p>
              <button
                onClick={() => onNavigate('schools')}
                className="px-5 py-2 bg-[#F16736] text-white text-xs font-bold rounded-full"
              >
                Enroll in a Course
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {enrolledCourses.map((course) => {
                const total = countTotalLessonsInCourse(course);
                const completed = countCompletedInCourse(course);
                const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

                return (
                  <div key={course.slug} className="p-6 bg-white border border-[#e8e5e0] rounded-3xl space-y-4 shadow-sm hover:border-[#F16736] transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black uppercase text-[#F16736] bg-[#fff1eb] px-2.5 py-0.5 rounded-full">
                          {course.level ? `${course.level.toUpperCase()} LEVEL` : 'ACTIVE COHORT'}
                        </span>
                        <h3 className="text-lg font-black text-neutral-800 mt-1">{course.title}</h3>
                        <p className="text-xs text-neutral-500 font-medium">{course.subtitle || 'Beyond the School Wall Specialized Syllabus'}</p>
                      </div>
                      <span className="text-sm font-black text-[#F16736]">{pct}%</span>
                    </div>

                    <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-[#F16736] h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>

                    <div className="flex justify-between items-center pt-2 text-xs">
                      <span className="text-neutral-400 font-mono">{completed} of {total} lessons completed</span>
                      <button 
                        onClick={() => onNavigate('schools')}
                        className="text-xs font-bold text-[#F16736] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Enter Course <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Live Q&A Sessions & Activity (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Live Q&A Sessions */}
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#1e1e1e] flex items-center gap-2">
              <Calendar size={14} className="text-[#F16736]" />
              <span>Upcoming Live Workshops</span>
            </h2>

            <div className="bg-white border border-[#e8e5e0] rounded-3xl p-5 space-y-4 shadow-sm">
              {liveSessions.map((session) => (
                <div key={session.id} className="p-3.5 bg-[#faf9f7] border border-[#e8e5e0]/60 rounded-2xl space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-black uppercase text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                      {session.date}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">{session.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-neutral-800">{session.title}</h4>
                  <p className="text-[11px] text-neutral-500">Instructor: <strong>{session.instructor}</strong></p>
                  {session.joinUrl && (
                    <a
                      href={session.joinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#F16736] hover:underline pt-1"
                    >
                      <Video size={12} />
                      <span>Join Workshop Link</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Activity Metrics */}
          <div className="bg-white border border-[#e8e5e0] rounded-3xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400">Activity Metrics</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#faf9f7] rounded-xl text-center">
                <span className="text-[9px] font-black uppercase text-neutral-400 block">Streak</span>
                <span className="text-2xl font-black text-[#F16736] mt-0.5 block">{user.streak} Days</span>
              </div>
              <div className="p-3 bg-[#faf9f7] rounded-xl text-center">
                <span className="text-[9px] font-black uppercase text-neutral-400 block">Completed</span>
                <span className="text-2xl font-black text-neutral-800 mt-0.5 block">{user.completedLessons.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================
   2. SCHOOLS VIEW (Curriculum, Progression Gating & Content)
   ========================================================== */
interface SchoolsViewProps {
  user: User;
  courses: SchoolContent[];
  onUserUpdate: (updated: User) => void;
}
const SchoolsView = ({ user, courses, onUserUpdate }: SchoolsViewProps) => {
  const [selectedSchool, setSelectedSchool] = useState<SchoolContent | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Interactive Quiz States
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleEnroll = (slug: string) => {
    if (!user.enrolledSchools.includes(slug)) {
      const updated = {
        ...user,
        enrolledSchools: [...user.enrolledSchools, slug]
      };
      onUserUpdate(updated);
    }
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
      streak: user.streak + (isDone ? -1 : 1)
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
    
    if (score === lesson.quizQuestions.length) {
      if (!user.completedLessons.includes(lesson.id)) {
        toggleLessonComplete(lesson.id);
      }
    }
  };

  // If inside a specific school interface
  if (selectedSchool) {
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
        <button 
          onClick={() => { setSelectedSchool(null); setActiveLesson(null); }}
          className="flex items-center gap-1.5 text-xs font-black text-neutral-500 hover:text-[#F16736] uppercase tracking-wider bg-white px-4 py-2 rounded-xl border border-[#e8e5e0] cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to All Tracks
        </button>

        {/* School Header Panel */}
        <div className="p-6 md:p-8 rounded-[2rem] border border-[#e8e5e0] bg-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="text-[10px] font-black uppercase text-[#F16736] bg-[#fff1eb] border border-[#F16736]/10 px-2.5 py-1 rounded-full inline-block mb-2">
              {selectedSchool.level ? `${selectedSchool.level.toUpperCase()} LEVEL TRACK` : 'ACTIVE COHORT'}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-neutral-800 tracking-tight">{selectedSchool.title}</h1>
            <p className="text-xs font-semibold text-neutral-500 mt-1 max-w-xl">
              {selectedSchool.subtitle || 'Master practical intelligence through pre-recorded lessons, quizzes, and live workshops.'}
            </p>
          </div>

          <div className="flex-shrink-0 text-left md:text-right bg-[#faf9f7] p-4 rounded-2xl border border-neutral-100 min-w-36">
            <span className="text-[10px] font-black uppercase text-neutral-400 block tracking-widest">Progress</span>
            <span className="text-2xl font-black text-[#F16736]">{completionPercentage}%</span>
            <span className="text-[10px] font-mono text-neutral-500 block">{completedLessons}/{totalLessons} Complete</span>
          </div>
        </div>

        {/* Modules & Lessons List */}
        <div className="space-y-6">
          {selectedSchool.modules.map((module, mIdx) => {
            // Progression Gating: If module is intermediate and novice lessons are not completed, lock it!
            const isPriorNoviceIncomplete = module.level === 'intermediate' && mIdx > 0 && selectedSchool.modules[0].lessons.some(l => !user.completedLessons.includes(l.id));
            const isLocked = module.isLocked || isPriorNoviceIncomplete;

            return (
              <div key={module.id} className={`bg-white border rounded-3xl p-6 shadow-sm space-y-4 ${isLocked ? 'border-neutral-200 opacity-80' : 'border-[#e8e5e0]'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                        {module.week}
                      </span>
                      {module.level && (
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                          module.level === 'novice' ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'
                        }`}>
                          {module.level}
                        </span>
                      )}
                      {isLocked && (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <Lock size={11} /> Locked (Complete Prerequisites)
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-black text-neutral-800 mt-1">{module.title}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">{module.description}</p>
                  </div>
                </div>

                {/* Lessons in this module */}
                <div className="space-y-3">
                  {module.lessons.map((lesson) => {
                    const isDone = user.completedLessons.includes(lesson.id);
                    return (
                      <div 
                        key={lesson.id} 
                        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                          isDone 
                            ? 'bg-emerald-50/40 border-emerald-200' 
                            : isLocked 
                              ? 'bg-neutral-50 border-neutral-200' 
                              : 'bg-[#faf9f7] border-[#e8e5e0] hover:border-neutral-400'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mt-0.5 ${
                            isDone ? 'bg-emerald-500 text-white' : 'bg-white border border-neutral-200 text-neutral-600'
                          }`}>
                            {lesson.type === 'video' ? <Play size={15} /> : lesson.type === 'quiz' ? <HelpCircle size={15} /> : <BookOpen size={15} />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase text-neutral-400">{lesson.type}</span>
                              <span className="text-[10px] text-neutral-400">&bull; {lesson.duration}</span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-neutral-900">{lesson.title}</h4>
                            <p className="text-[11px] text-neutral-500 mt-0.5">{lesson.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          {!isLocked ? (
                            <>
                              <button
                                onClick={() => lesson.type === 'quiz' ? startQuiz(lesson) : setActiveLesson(lesson)}
                                className="px-4 py-2 bg-[#1e1e1e] hover:bg-[#F16736] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                              >
                                {lesson.type === 'quiz' ? 'Take Assessment' : 'Open Lesson'}
                              </button>
                              <button
                                onClick={() => toggleLessonComplete(lesson.id)}
                                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                                  isDone ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-neutral-400 hover:text-neutral-700 border-neutral-200'
                                }`}
                                title={isDone ? 'Mark as Incomplete' : 'Mark as Complete'}
                              >
                                <Check size={16} />
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-neutral-400 flex items-center gap-1 font-bold">
                              <Lock size={13} /> Locked
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Lesson Modal / Viewer */}
        <AnimatePresence>
          {activeLesson && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-[#e8e5e0] rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative"
              >
                <button
                  onClick={() => setActiveLesson(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
                >
                  <X size={20} />
                </button>

                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#F16736] bg-[#fff1eb] px-3 py-1 rounded-full">
                      {activeLesson.type.toUpperCase()} LESSON
                    </span>
                    <h2 className="text-2xl font-black text-neutral-900 mt-2">{activeLesson.title}</h2>
                    <p className="text-xs text-neutral-500 mt-1">{activeLesson.description}</p>
                  </div>

                  {/* Video Lesson */}
                  {activeLesson.type === 'video' && (
                    <div className="space-y-4">
                      <div className="aspect-video bg-neutral-900 rounded-2xl overflow-hidden flex items-center justify-center relative">
                        <iframe
                          className="w-full h-full"
                          src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0"
                          title={activeLesson.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <p className="text-xs text-neutral-500">
                        Take detailed notes during the video. Once watched, mark the lesson complete to log your daily streak.
                      </p>
                    </div>
                  )}

                  {/* Reading Lesson */}
                  {activeLesson.type === 'reading' && (
                    <div className="p-6 bg-[#faf9f7] rounded-2xl border border-[#e8e5e0] font-sans text-xs text-neutral-700 leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto">
                      {activeLesson.content}
                    </div>
                  )}

                  {/* Quiz Lesson */}
                  {activeLesson.type === 'quiz' && activeLesson.quizQuestions && (
                    <div className="space-y-6">
                      {quizSubmitted ? (
                        <div className="p-6 bg-[#faf9f7] rounded-2xl text-center space-y-3 border border-[#e8e5e0]">
                          <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center ${
                            quizScore === activeLesson.quizQuestions.length ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                          }`}>
                            <Award size={28} />
                          </div>
                          <h3 className="text-lg font-black text-neutral-900">
                            Assessment Score: {quizScore} / {activeLesson.quizQuestions.length}
                          </h3>
                          <p className="text-xs text-neutral-500">
                            {quizScore === activeLesson.quizQuestions.length 
                              ? 'Perfect score! This lesson has been validated and marked completed.'
                              : 'Review the module reading and retry to achieve 100% mastery.'}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-5">
                          {activeLesson.quizQuestions.map((q, qIdx) => (
                            <div key={qIdx} className="space-y-2 p-4 bg-[#faf9f7] rounded-2xl border border-[#e8e5e0]">
                              <p className="text-xs font-black text-neutral-800">{qIdx + 1}. {q.question}</p>
                              <div className="space-y-2">
                                {q.options.map((opt, oIdx) => (
                                  <button
                                    key={oIdx}
                                    type="button"
                                    onClick={() => setSelectedAnswers({ ...selectedAnswers, [qIdx]: oIdx })}
                                    className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                                      selectedAnswers[qIdx] === oIdx 
                                        ? 'bg-[#1e1e1e] text-white border-[#1e1e1e]' 
                                        : 'bg-white text-neutral-700 border-[#e8e5e0] hover:bg-neutral-50'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                          <button
                            onClick={() => handleQuizSubmit(activeLesson)}
                            className="w-full py-3 bg-[#F16736] hover:bg-[#e05423] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                          >
                            Submit Assessment
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-[#e8e5e0]">
                    <button
                      onClick={() => setActiveLesson(null)}
                      className="px-5 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900"
                    >
                      Close
                    </button>
                    {!user.completedLessons.includes(activeLesson.id) && (
                      <button
                        onClick={() => {
                          toggleLessonComplete(activeLesson.id);
                          setActiveLesson(null);
                        }}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check size={14} /> Mark Lesson Complete
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // School Selection Cards
  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-[#1e1e1e]">Course Curriculum Library</h2>
        <p className="text-sm font-semibold text-neutral-500 mt-1 max-w-xl">
          Structured learning tracks spanning AI, UI/UX Design, Creative Writing, Stoic Leadership, and Campus Venture Building.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => {
          const enrolled = isEnrolled(course.slug);
          return (
            <div 
              key={course.slug} 
              className={`p-8 bg-white border rounded-3xl space-y-4 shadow-sm transition-all flex flex-col justify-between ${
                enrolled ? 'border-[#e8e5e0] hover:border-[#F16736]' : 'border-dashed border-neutral-300 bg-neutral-50/50'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase text-[#F16736] bg-[#fff1eb] px-2.5 py-0.5 rounded-full">
                    {course.targetAudience || 'ALL PARTICIPANTS'}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-400">
                    {course.ageRange || 'COHORT BASED'}
                  </span>
                </div>

                <h3 className="text-xl font-black text-neutral-800">{course.title}</h3>
                <p className="text-xs text-neutral-600 mt-1 font-medium leading-relaxed">
                  {course.subtitle || 'Equipping students with practical real-world execution capacity.'}
                </p>

                <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center gap-4 text-xs font-bold text-neutral-500">
                  <span>{course.modules.length} Modules</span>
                  <span>&bull;</span>
                  <span>{course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                {enrolled ? (
                  <button
                    onClick={() => setSelectedSchool(course)}
                    className="w-full py-3 bg-[#1e1e1e] hover:bg-[#F16736] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Enter Course Modules</span>
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(course.slug)}
                    className="w-full py-3 bg-white hover:bg-neutral-100 text-[#F16736] border border-[#F16736] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Enroll In Track (Free)</span>
                    <ArrowRight size={14} />
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

/* ==========================================================
   3. PRACTICE SANDBOX VIEW (Agreed in Meeting Transcript)
   ========================================================== */
interface SandboxViewProps {
  user: User;
  onUserUpdate: (updated: User) => void;
}
const SandboxView = ({ user }: SandboxViewProps) => {
  const [sandboxMode, setSandboxMode] = useState<'ai-prompt' | 'story-lab'>('ai-prompt');

  // AI Prompt Lab States
  const [systemPrompt, setSystemPrompt] = useState('You are an expert Socratic tutor for high school students. Never give direct answers. Guide the student with thoughtful questions.');
  const [userQuery, setUserQuery] = useState('How do I build a simple webpage with HTML?');
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);
  const [promptScore, setPromptScore] = useState<number | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Story Lab States
  const [storyText, setStoryText] = useState('The heavy wooden gates of the compound creaked open before dawn. Kwame stepped onto the dusty gravel, his fingers gripping the worn leather envelope tightly.');

  const handleEvaluatePrompt = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      // Prompt evaluation heuristics
      const hasRole = systemPrompt.toLowerCase().includes('you are');
      const hasConstraints = systemPrompt.toLowerCase().includes('never') || systemPrompt.toLowerCase().includes('avoid') || systemPrompt.toLowerCase().includes('guide');
      const queryLength = userQuery.trim().length;

      let score = 70;
      if (hasRole) score += 15;
      if (hasConstraints) score += 10;
      if (queryLength > 20) score += 5;

      setPromptScore(score);
      setSimulatedResponse(
        `[Simulated AI Socratic Output]:\n"Welcome to web architecture! Before writing a single tag, think about the skeleton of a physical newspaper. What do you think is the very first structural block needed to hold a headline?"`
      );
      setIsEvaluating(false);
    }, 800);
  };

  const wordCount = storyText.trim() ? storyText.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#F16736] bg-[#fff1eb] px-3 py-1 rounded-full">
            EXPERIMENTAL WORKBENCH
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mt-2">
            Interactive Practice Sandbox
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
            Test prompt architectures, write narrative arcs, and observe real-time simulated diagnostics.
          </p>
        </div>

        <div className="inline-flex p-1 bg-white border border-[#e8e5e0] rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setSandboxMode('ai-prompt')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              sandboxMode === 'ai-prompt' ? 'bg-[#1e1e1e] text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            AI Prompt Lab
          </button>
          <button
            onClick={() => setSandboxMode('story-lab')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              sandboxMode === 'story-lab' ? 'bg-[#F16736] text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Writing & Rhetoric Studio
          </button>
        </div>
      </div>

      {sandboxMode === 'ai-prompt' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Input Sandbox */}
          <div className="lg:col-span-7 bg-white border border-[#e8e5e0] rounded-3xl p-6 space-y-4 shadow-sm">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5 flex items-center justify-between">
                <span>1. System Prompt (AI Persona & Boundaries)</span>
                <span className="text-[10px] text-neutral-400 font-normal">Sets role instructions</span>
              </label>
              <textarea
                rows={4}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-mono text-neutral-800 focus:border-[#F16736] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5 flex items-center justify-between">
                <span>2. User Query (Input Instruction)</span>
                <span className="text-[10px] text-neutral-400 font-normal">What the learner asks</span>
              </label>
              <textarea
                rows={3}
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-sans text-neutral-800 focus:border-[#F16736] focus:bg-white focus:outline-none"
              />
            </div>

            <button
              onClick={handleEvaluatePrompt}
              disabled={isEvaluating}
              className="w-full py-3.5 bg-[#F16736] hover:bg-[#e05423] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              <Bot size={15} />
              <span>{isEvaluating ? 'Simulating AI Model Run...' : 'Execute Prompt Simulation'}</span>
            </button>
          </div>

          {/* Right: Output & Evaluation */}
          <div className="lg:col-span-5 bg-white border border-[#e8e5e0] rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-700">Sandbox Diagnostics</h4>
                {promptScore !== null && (
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    Prompt Score: {promptScore}/100
                  </span>
                )}
              </div>

              {simulatedResponse ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-neutral-900 text-neutral-100 font-mono text-xs leading-relaxed whitespace-pre-line">
                    {simulatedResponse}
                  </div>
                  <div className="space-y-1.5 text-xs text-neutral-600 bg-[#faf9f7] p-3.5 rounded-xl border border-[#e8e5e0]">
                    <p className="font-bold text-neutral-800">Prompt Analysis Feedback:</p>
                    <p className="text-[11px] text-emerald-600 font-semibold">&bull; Persona clear: Model role successfully framed.</p>
                    <p className="text-[11px] text-sky-600 font-semibold">&bull; Socratic directive maintained: Promotes critical thinking.</p>
                  </div>
                </div>
              ) : (
                <div className="p-10 border border-dashed border-neutral-200 rounded-2xl text-center text-neutral-400 text-xs">
                  Click "Execute Prompt Simulation" to run your prompt through the simulated tokenizer.
                </div>
              )}
            </div>

            <div className="text-[11px] text-neutral-400 font-mono border-t border-neutral-100 pt-3">
              Tokenizer Mode: GPT/Claude Standard Token Estimates
            </div>
          </div>
        </div>
      ) : (
        /* Story & Rhetoric Studio */
        <div className="bg-white border border-[#e8e5e0] rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-neutral-900">Prose & Speech Craft Studio</h3>
              <p className="text-xs text-neutral-500">Draft your story chapter or speech manuscript with live structure indicators.</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#F16736] bg-[#fff1eb] px-3 py-1 rounded-full">
              {wordCount} Words Drafted
            </span>
          </div>

          <textarea
            rows={8}
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            className="w-full p-4 bg-[#faf9f7] border border-[#e8e5e0] rounded-2xl text-sm leading-relaxed text-neutral-800 focus:border-[#F16736] focus:bg-white focus:outline-none"
            placeholder="Begin drafting your story or speech here..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">Sensory Hook</span>
              <span className="text-xs font-bold text-emerald-900 mt-1 block">Active Opening Detected</span>
            </div>
            <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100 text-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 block">Character Anchor</span>
              <span className="text-xs font-bold text-sky-900 mt-1 block">Kwame (Protagonist)</span>
            </div>
            <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100 text-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">Rhetoric Stance</span>
              <span className="text-xs font-bold text-amber-900 mt-1 block">Ethos: 85% &bull; Pathos: 90%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ==========================================================
   4. PLAYGROUND VIEW (AI Scenario Simulations)
   ========================================================== */
const PlaygroundView = ({ user, scenarios }: { user: User; scenarios: PlaygroundScenario[]; onUserUpdate: (u: User) => void }) => {
  const router = useRouter();
  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-[#1e1e1e]">AI Simulation Arena</h2>
          <p className="text-sm font-semibold text-neutral-500 mt-1 max-w-xl">
            Immersive scenario-based negotiations and executive leadership defenses with live AI partners.
          </p>
        </div>
        <button
          onClick={() => router.push('/portal/playground')}
          className="px-6 py-3 bg-[#F16736] hover:bg-[#e05423] text-white font-black text-xs uppercase tracking-widest rounded-xl transition duration-200 shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Terminal size={14} /> Enter Full-Screen Arena
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((scen) => (
          <div key={scen.id} className="p-6 bg-white border border-[#e8e5e0] rounded-3xl space-y-4 shadow-sm flex flex-col justify-between hover:border-[#F16736] transition-colors">
            <div>
              <span className="text-[10px] font-black uppercase text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full">
                {scen.difficulty}
              </span>
              <h3 className="text-lg font-black text-neutral-900 mt-2">{scen.title}</h3>
              <p className="text-xs text-neutral-500 mt-1 line-clamp-3 leading-relaxed">{scen.briefing}</p>
            </div>
            <button
              onClick={() => router.push('/portal/playground')}
              className="w-full py-2.5 bg-[#1e1e1e] hover:bg-[#F16736] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Start Roleplay
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================================
   5. CERTIFICATES VIEW (With Official Printable Certificate)
   ========================================================== */
interface CertificatesViewProps {
  user: User;
  courses: SchoolContent[];
}
const CertificatesView = ({ user, courses }: CertificatesViewProps) => {
  const [selectedCertificate, setSelectedCertificate] = useState<{
    courseName: string;
    issueDate: string;
    credentialId: string;
  } | null>(null);

  const completedSchools = courses.filter(c => {
    return c.modules.every(m => m.lessons.every(l => user.completedLessons.includes(l.id)));
  });

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-[#1e1e1e]">Certificates & Verified Credentials</h2>
        <p className="text-sm font-semibold text-neutral-500 mt-1 max-w-xl">
          Complete course tracks and earn verified Beyond the School Wall graduation certificates and badges.
        </p>
      </div>

      {/* Available Course Completion Certificates */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400">Course Graduation Certificates</h3>
        {user.enrolledSchools.map((slug) => {
          const course = courses.find(c => c.slug === slug);
          if (!course) return null;
          const credId = `BTSW-CERT-${slug.toUpperCase()}-${user.id.slice(-4)}`;

          return (
            <div key={slug} className="p-6 bg-white border border-[#e8e5e0] rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-[#F16736] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#fff1eb] text-[#F16736] flex items-center justify-center shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400">{credId}</span>
                  <h4 className="text-base font-bold text-neutral-800">{course.title}</h4>
                  <p className="text-xs text-neutral-500">Issued to: <strong>{user.name}</strong></p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCertificate({
                    courseName: course.title,
                    issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    credentialId: credId
                  })}
                  className="px-5 py-2.5 bg-[#1e1e1e] hover:bg-[#F16736] text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Eye size={13} /> View Certificate
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-8 border-double border-[#F16736] rounded-[2rem] max-w-3xl w-full p-8 md:p-12 shadow-2xl relative text-center space-y-6 print:border-none print:shadow-none"
            >
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 print:hidden cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-3">
                <Logo className="h-10 w-auto mx-auto" textClassName="text-2xl text-[#1e1e1e]" />
                <span className="text-xs font-serif italic text-neutral-400 tracking-widest uppercase block">
                  Beyond The School Wall Academic Directorate
                </span>
              </div>

              <div className="space-y-2 py-4 border-t border-b border-neutral-200">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-[#F16736]">
                  CERTIFICATE OF COMPLETION
                </span>
                <p className="text-xs text-neutral-500">This credential certifies that</p>
                <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 font-serif">
                  {user.name}
                </h2>
                <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed pt-2">
                  has demonstrated rigorous mastery, analytical stoicism, and practical execution in the certified track:
                </p>
                <h3 className="text-xl sm:text-2xl font-black text-[#F16736] pt-1">
                  {selectedCertificate.courseName}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left text-xs pt-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Credential ID</span>
                  <span className="font-mono font-bold text-neutral-800">{selectedCertificate.credentialId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Issue Date</span>
                  <span className="font-mono font-bold text-neutral-800">{selectedCertificate.issueDate}</span>
                </div>
              </div>

              <div className="pt-6 flex justify-center gap-3 print:hidden">
                <button
                  onClick={handlePrint}
                  className="px-6 py-3 bg-[#1e1e1e] hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Printer size={15} /> Print / Save as PDF
                </button>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ==========================================================
   6. PROFILE VIEW (With Parent Consent Records)
   ========================================================== */
const ProfileView = ({ user, scenarios }: { user: User; scenarios: PlaygroundScenario[] }) => {
  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-[#1e1e1e]">Student Portal Profile</h2>
        <p className="text-sm font-semibold text-neutral-500 mt-1 max-w-xl">
          Manage your personal details, parent consent record, and lifetime simulation records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Left Column: Account Details */}
        <div className="border border-[#e8e5e0] bg-white rounded-3xl p-6 shadow-sm space-y-6">
          <div className="text-center pb-6 border-b border-neutral-100">
            <div className="w-16 h-16 bg-neutral-900 mx-auto rounded-full flex items-center justify-center text-white text-xl font-bold border-2 border-[#F16736] mb-3">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <h4 className="font-extrabold text-[#1e1e1e] truncate">{user.name}</h4>
            <p className="text-xs text-neutral-400 mt-1 truncate">{user.email}</p>
            {user.grade && (
              <span className="text-[10px] font-bold text-[#F16736] bg-[#fff1eb] px-2.5 py-0.5 rounded-full mt-2 inline-block">
                {user.grade} (Age {user.age || '—'})
              </span>
            )}
          </div>

          <div className="space-y-4 text-xs font-bold text-neutral-500">
            <div className="flex justify-between items-center">
              <span>MEMBER ROLE</span>
              <span className="text-neutral-800 uppercase">{user.role}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>REGISTERED SINCE</span>
              <span className="text-neutral-800">{user.joinedDate}</span>
            </div>
            {user.juniorTrack && (
              <div className="flex justify-between items-center">
                <span>JUNIOR TRACK</span>
                <span className="text-[#F16736]">{user.juniorTrack}</span>
              </div>
            )}
          </div>

          {/* Parent Consent Card if available */}
          {user.parentConsent && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold">
                <ShieldCheck size={16} />
                <span>Parent Consent On Record</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Guardian: <strong>{user.parentConsent.parentName}</strong>
              </p>
              <p className="text-[11px] text-emerald-700">
                Contact: {user.parentConsent.parentPhone}
              </p>
              <p className="text-[10px] text-emerald-600 font-mono">
                Verified: {new Date(user.parentConsent.consentedAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Simulation & Practice Records */}
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
