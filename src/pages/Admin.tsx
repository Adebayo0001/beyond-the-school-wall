import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, LayoutDashboard, Database, Users, TrendingUp, Plus, Edit, Trash, Check, 
  Settings, LogOut, ChevronRight, Play, BookOpen, AlertCircle, FilePlus, Sparkles, BarChart2
} from 'lucide-react';
import { getCurrentUser, setCurrentUser, getCourses, saveCourses, getUsers, saveUsers, getScenarios, getSimulationHistory } from '../lib/storage';
import Logo from '../components/Logo';

const Admin = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(getCurrentUser());
  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'courses' | 'cohorts'>('analytics');
  
  // Storage local state
  const [courses, setCourses] = useState(getCourses());
  const [students, setStudents] = useState<any[]>([]);

  // Selection states for Course Editor
  const [activeCourseIndex, setActiveCourseIndex] = useState(0);

  // Forms
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');
  const [newModuleWeek, setNewModuleWeek] = useState('');
  const [newModuleDesc, setNewModuleDesc] = useState('');

  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonType, setLessonType] = useState<'video' | 'reading' | 'quiz'>('video');
  const [lessonDesc, setLessonDesc] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [lessonDuration, setLessonDuration] = useState('15 mins');

  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [resourceName, setResourceName] = useState('');
  const [resourceType, setResourceType] = useState<'pdf' | 'template' | 'toolkit'>('pdf');
  const [resourceSize, setResourceSize] = useState('1.5 MB');

  // Router Protection
  useEffect(() => {
    const session = getCurrentUser();
    if (!session || session.role !== 'admin') {
      navigate('/login');
    } else {
      setAdminUser(session);
      // Hydrate all student users
      const all = getUsers();
      setStudents(all.filter(u => u.role === 'student'));
    }
  }, [navigate]);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  // ----------------------------------------------------
  // ADMIN UPDATE ROUTINES (Syncs direct to localStorage)
  // ----------------------------------------------------
  
  const handleAddModule = () => {
    if (!newModuleName.trim() || !newModuleWeek.trim()) return;

    const updatedCourses = [...courses];
    const targetCourse = updatedCourses[activeCourseIndex];
    
    const newModule = {
      id: 'mod-' + Math.random().toString(36).substr(2, 9),
      week: newModuleWeek.trim(),
      title: newModuleName.trim(),
      description: newModuleDesc.trim(),
      lessons: [],
      resources: []
    };

    targetCourse.modules.push(newModule);
    saveCourses(updatedCourses);
    setCourses(updatedCourses);

    // Reset forms
    setIsModuleModalOpen(false);
    setNewModuleName('');
    setNewModuleWeek('');
    setNewModuleDesc('');
  };

  const handleAddLesson = () => {
    if (!lessonTitle.trim()) return;

    const updatedCourses = [...courses];
    const targetCourse = updatedCourses[activeCourseIndex];
    const targetModule = targetCourse.modules.find(m => m.id === selectedModuleId);

    if (targetModule) {
      const newLesson = {
        id: 'lesson-' + Math.random().toString(36).substr(2, 9),
        title: lessonTitle.trim(),
        type: lessonType,
        description: lessonDesc.trim(),
        content: lessonContent.trim() || (lessonType === 'video' ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' : 'Reading content details.'),
        duration: lessonDuration,
        quizQuestions: lessonType === 'quiz' ? [
          {
            question: "Choose correct option mapping for this business vector?",
            options: ["Incorrect option A", "First-class execution answer (Correct)", "Incorrect option C"],
            correctOption: 1
          }
        ] : undefined
      };

      targetModule.lessons.push(newLesson);
      saveCourses(updatedCourses);
      setCourses(updatedCourses);
    }

    // Reset forms
    setIsLessonModalOpen(false);
    setLessonTitle('');
    setLessonDesc('');
    setLessonContent('');
    setLessonDuration('15 mins');
  };

  const handleAddResource = () => {
    if (!resourceName.trim()) return;

    const updatedCourses = [...courses];
    const targetCourse = updatedCourses[activeCourseIndex];
    const targetModule = targetCourse.modules.find(m => m.id === selectedModuleId);

    if (targetModule) {
      const newResource = {
        id: 'res-' + Math.random().toString(36).substr(2, 9),
        name: resourceName.trim(),
        type: resourceType,
        url: '#',
        size: resourceSize
      };

      targetModule.resources.push(newResource);
      saveCourses(updatedCourses);
      setCourses(updatedCourses);
    }

    setIsResourceModalOpen(false);
    setResourceName('');
  };

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    const updatedCourses = [...courses];
    const targetCourse = updatedCourses[activeCourseIndex];
    const targetModule = targetCourse.modules.find(m => m.id === moduleId);

    if (targetModule) {
      targetModule.lessons = targetModule.lessons.filter(l => l.id !== lessonId);
      saveCourses(updatedCourses);
      setCourses(updatedCourses);
    }
  };

  const handleAdjustEnrollment = (studentId: string, slug: string) => {
    const allUsers = getUsers();
    const target = allUsers.find(u => u.id === studentId);
    if (target) {
      if (target.enrolledSchools.includes(slug)) {
        target.enrolledSchools = target.enrolledSchools.filter(s => s !== slug);
      } else {
        target.enrolledSchools.push(slug);
      }
      saveUsers(allUsers);
      setStudents(allUsers.filter(u => u.role === 'student'));
    }
  };

  if (!adminUser) return null;

  return (
    <div className="min-h-screen bg-[#faf9f7] flex relative">
      
      {/* Sidebar navigation list */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-[#e8e5e0] flex-col justify-between fixed h-full z-10">
        <div>
          {/* Header branding */}
          <div className="p-6 border-b border-[#e8e5e0] flex items-center justify-between">
            <Link to="/">
              <Logo className="h-8 w-auto" textClassName="text-xl text-[#1e1e1e]" />
            </Link>
            <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
              DIRECTOR
            </span>
          </div>

          <div className="p-6 border-b border-[#e8e5e0] bg-[#faf9f7]">
            <p className="text-xs font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">SYSTEM CONTROLLER</p>
            <h4 className="font-extrabold text-[#1e1e1e] tracking-tight">{adminUser.name}</h4>
          </div>

          {/* Admin tabs */}
          <nav className="p-4 space-y-1">
            {[
              { id: 'analytics', label: 'Analytics Board', icon: <LayoutDashboard size={18} /> },
              { id: 'courses', label: 'Manage Courses', icon: <Database size={18} /> },
              { id: 'cohorts', label: 'Student Cohorts', icon: <Users size={18} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveAdminTab(item.id as any)}
                className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${
                  activeAdminTab === item.id 
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

        {/* Action tags bottom */}
        <div className="p-4 border-t border-[#e8e5e0] space-y-2">
          <Link 
            to="/portal" 
            className="w-full py-2.5 px-4 bg-orange-50 text-[#F16736] border border-orange-100 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#fff1eb]"
          >
            Switch to Student Space
          </Link>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center justify-center gap-1.5 transition-all"
          >
            <LogOut size={14} /> Close Admin Panel
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        
        {/* Simple desktop header details */}
        <header className="hidden lg:flex p-6 border-b border-[#e8e5e0] bg-white items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-800">Decentralised Director Assembly Workspace</h2>
          <span className="text-xs text-neutral-500 font-mono">SECURE ACCESS TOKEN APPROVED</span>
        </header>

        {/* Content routing container */}
        <main className="flex-1 p-6 md:p-10 max-w-5xl w-full mx-auto">
          
          {/* 1. ANALYTICS BOARD PANEL */}
          {activeAdminTab === 'analytics' && (
            <div className="space-y-8 text-left animate-fade">
              <div>
                <h2 className="text-3xl font-black leading-tight tracking-tight text-[#1e1e1e]">System Analytics</h2>
                <p className="text-sm font-semibold text-neutral-500 mt-1">Real-time stats from Nigerians learning on-the-scene.</p>
              </div>

              {/* Stats Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 bg-white border border-[#e8e5e0] rounded-3xl shadow-sm">
                  <span className="text-[10px] uppercase font-black tracking-wider text-neutral-400 block">Total Students Onboarded</span>
                  <span className="text-4xl font-black block mt-1.5">{students.length} Active</span>
                  <span className="text-[10px] font-bold text-emerald-600 block mt-2">↑ 100% Organic sign up</span>
                </div>

                <div className="p-6 bg-white border border-[#e8e5e0] rounded-3xl shadow-sm">
                  <span className="text-[10px] uppercase font-black tracking-wider text-neutral-400 block">Course Completion Ratio</span>
                  <span className="text-4xl font-black block mt-1.5">62.8%</span>
                  <span className="text-[10px] font-bold text-[#F16736] block mt-2">Across 5 different curricula</span>
                </div>

                <div className="p-6 bg-white border border-[#e8e5e0] rounded-3xl shadow-sm">
                  <span className="text-[10px] uppercase font-black tracking-wider text-neutral-400 block">Avg Playground Score</span>
                  <span className="text-4xl font-black block mt-1.5">8.1 / 10</span>
                  <span className="text-[10px] font-bold text-neutral-500 block mt-2">From recorded simulation files</span>
                </div>
              </div>

              {/* Scenarios Used / Runs List */}
              <div className="border border-[#e8e5e0] rounded-3xl p-6 bg-white shadow-sm space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#1e1e1e] flex items-center gap-1.5">
                  <BarChart2 size={16} className="text-[#F16736]" /> MOST FREQUENTED PLAYGROUND SCENARIOS
                </h3>
                
                <div className="space-y-3">
                  {[
                    { id: 'scenario-skill-hut', title: 'The Skeptical Tech Client (The Skill Hut)', rate: '52% engagement', count: '14 runs completed' },
                    { id: 'scenario-cash-on-campus', title: 'The Tough Dorm Supplier (Cash On Campus)', rate: '35% engagement', count: '9 runs completed' },
                    { id: 'scenario-magnet-school', title: 'Skeptical Director Pitch (The Magnet School)', rate: '13% engagement', count: '3 runs completed' },
                  ].map((scStat, scIdx) => (
                    <div key={scIdx} className="p-4 border border-[#e8e5e0] rounded-2xl flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-xs text-neutral-800">{scStat.title}</h4>
                        <span className="text-[10px] uppercase font-bold text-zinc-400">{scStat.count}</span>
                      </div>
                      <span className="text-xs font-black text-[#F16736] bg-[#fff1eb] border border-[#F16736]/15 px-2.5 py-1 rounded-full">{scStat.rate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. MANAGE COURSES PANEL */}
          {activeAdminTab === 'courses' && (
            <div className="space-y-8 text-left animate-fade">
              <div>
                <h2 className="text-3xl font-black leading-tight tracking-tight text-[#1e1e1e]">Course Curriculum Editor</h2>
                <p className="text-sm font-semibold text-neutral-500 mt-1">Directly add weeks, modules, resource attachments, and paste video lessons.</p>
              </div>

              {/* Choose School selector */}
              <div className="flex gap-2.5 border-b border-zinc-200 overflow-x-auto pb-2">
                {courses.map((course, cIdx) => (
                  <button
                    key={course.slug}
                    onClick={() => setActiveCourseIndex(cIdx)}
                    className={`py-2.5 px-4 font-bold text-xs uppercase tracking-wider rounded-xl border flex-shrink-0 transition-all ${
                      activeCourseIndex === cIdx
                        ? 'bg-zinc-900 border-zinc-900 text-white'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {course.title}
                  </button>
                ))}
              </div>

              {/* List Modules and adding controls */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#1e1e1e]">Weeks and Custom Modules</h3>
                  <button
                    onClick={() => setIsModuleModalOpen(true)}
                    className="px-4 py-2 bg-[#F16736] text-white hover:bg-[#F16736]/90 text-xs font-black uppercase tracking-wider rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Plus size={14} /> Add new module week
                  </button>
                </div>

                {courses[activeCourseIndex].modules.length === 0 ? (
                  <p className="p-8 border border-neutral-200 border-dashed rounded-2xl bg-white text-center text-neutral-400 font-bold text-sm">No structured weeks initialized inside this course yet.</p>
                ) : (
                  courses[activeCourseIndex].modules.map((mod) => (
                    <div key={mod.id} className="p-6 border border-[#e8e5e0] bg-white rounded-[2rem] space-y-4 shadow-sm">
                      <div className="flex justify-between items-baseline border-b border-neutral-100 pb-3 gap-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest font-mono text-[#F16736] font-black bg-[#fff1eb] px-2 py-0.5 rounded">{mod.week}</span>
                          <h4 className="text-lg font-black text-neutral-800 leading-snug mt-1.5">{mod.title}</h4>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setSelectedModuleId(mod.id); setIsLessonModalOpen(true); }}
                            className="px-3 py-1.5 border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 text-neutral-700 text-xs font-bold rounded-lg flex items-center gap-1"
                          >
                            <FilePlus size={12} /> Add Lesson
                          </button>
                          <button
                            onClick={() => { setSelectedModuleId(mod.id); setIsResourceModalOpen(true); }}
                            className="px-3 py-1.5 border border-dashed border-neutral-300 hover:border-neutral-500 text-neutral-700 text-xs font-bold rounded-lg flex items-center gap-1 bg-neutral-50"
                          >
                            <Plus size={12} /> Add Resource PDF/toolkit
                          </button>
                        </div>
                      </div>

                      {/* Display lessons inside module */}
                      <div className="space-y-2">
                        <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold block mb-1">active material assets</span>
                        {mod.lessons.length === 0 ? (
                          <p className="text-xs text-neutral-400 font-bold font-mono">No lessons added inside this module block yet.</p>
                        ) : (
                          mod.lessons.map(lesson => (
                            <div key={lesson.id} className="p-3 border border-neutral-100 rounded-xl bg-[#faf9f7] flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <span className="text-[9px] font-mono bg-zinc-900 text-white font-extrabold px-1.5 py-0.5 rounded">
                                  {lesson.type.toUpperCase()}
                                </span>
                                <div>
                                  <h6 className="font-extrabold text-xs text-neutral-800">{lesson.title}</h6>
                                  {lesson.type === 'video' ? (
                                    <span className="text-[8px] font-semibold text-neutral-400 truncate max-w-sm block">Video Frame URL: {lesson.content}</span>
                                  ) : (
                                    <span className="text-[8px] font-semibold text-neutral-400 line-clamp-1">Reading content size: {lesson.content.length} characters</span>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => handleDeleteLesson(mod.id, lesson.id)}
                                className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                              >
                                <Trash size={14} />
                              </button>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Resources display */}
                      <div className="pt-2">
                        <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold block mb-1">linked toolkit documents</span>
                        {mod.resources?.length === 0 ? (
                          <span className="text-[10px] text-zinc-400 font-bold font-mono">No PDFs or spreadsheets appended yet.</span>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {mod.resources?.map(res => (
                              <div key={res.id} className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 rounded px-2.5 py-1 flex items-center gap-1.5">
                                <span>{res.name} (Zip/{res.type})</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 3. STUDENT COHORTS PANEL */}
          {activeAdminTab === 'cohorts' && (
            <div className="space-y-8 text-left animate-fade">
              <div>
                <h2 className="text-3xl font-black leading-tight tracking-tight text-[#1e1e1e]">Cohort Registration Lists</h2>
                <p className="text-sm font-semibold text-neutral-500 mt-1">View individual student progress indexes and manually enroll them in curricula tracks.</p>
              </div>

              {/* Student Cohort Grid mapping */}
              <div className="space-y-4">
                {students.map(student => (
                  <div key={student.id} className="p-6 border border-[#e8e5e0] bg-white rounded-[2rem] space-y-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-neutral-100 gap-4">
                      <div>
                        <h4 className="font-extrabold text-neutral-800 text-sm">{student.name}</h4>
                        <p className="text-xs text-neutral-500 font-medium">{student.email}</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-center min-w-16">
                          <span className="text-[9px] uppercase font-black text-neutral-400 block tracking-wider">Streak count</span>
                          <span className="text-sm font-black text-emerald-600 block">{student.streak} Days</span>
                        </div>
                        <div className="text-center min-w-20">
                          <span className="text-[9px] uppercase font-black text-neutral-400 block tracking-wider">Lessons Done</span>
                          <span className="text-sm font-black text-neutral-800 block">{student.completedLessons.length} items</span>
                        </div>
                      </div>
                    </div>

                    {/* Manage enrollment subpanel */}
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold block">Enrolled curricula tracks</span>
                      <div className="flex flex-wrap gap-2">
                        {courses.map(course => {
                          const hasit = student.enrolledSchools.includes(course.slug);
                          return (
                            <button
                              key={course.slug}
                              onClick={() => handleAdjustEnrollment(student.id, course.slug)}
                              className={`text-[10px] font-black rounded px-2.5 py-1.5 transition-all ${
                                hasit 
                                  ? 'bg-[#fff1eb] text-[#F16736] border border-[#F16736]/25' 
                                  : 'bg-neutral-50 text-neutral-400 border border-neutral-200 hover:bg-neutral-100'
                              }`}
                            >
                              {hasit ? `✓ ${course.title}` : `+ Connect ${course.title}`}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Simulation Records */}
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold block">SAVED PLAYGROUND SCORECARDS</span>
                      {student.playgroundScores?.length === 0 ? (
                        <span className="text-[10px] text-zinc-400 font-bold font-mono mt-1 block">No scorecards posted yet.</span>
                      ) : (
                        <div className="space-y-1.5 mt-1.5">
                          {student.playgroundScores?.map((scoreObj: any, indexKey: number) => (
                            <div key={indexKey} className="text-[10px] p-2 rounded bg-neutral-50 flex items-center justify-between gap-4">
                              <span className="font-semibold text-zinc-600 truncate">{scoreObj.scenarioId.split('-').join(' ')}</span>
                              <span className="font-extrabold text-[#F16736]">{scoreObj.score} / 10 Score</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ==========================================================
         FORM MODALS FOR COURSE AND LESSON MODIFICATION
         ========================================================== */}
      
      {/* 1. Add Week/Module Modal */}
      <AnimatePresence>
        {isModuleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={() => setIsModuleModalOpen(false)} className="absolute inset-0 bg-black/50" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white p-6 md:p-8 rounded-[2rem] border border-[#e8e5e0] w-full max-w-md shadow-2xl z-10 text-left">
              <h4 className="text-xl font-black mb-1">Add Module Block</h4>
              <p className="text-xs text-neutral-400 mb-6 font-semibold">Assign a timeline week and core learning curriculum title.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-neutral-600 mb-1">Module Week Range</label>
                  <input type="text" placeholder="e.g. Weeks 5-6" value={newModuleWeek} onChange={(e) => setNewModuleWeek(e.target.value)} className="w-full border border-[#e8e5e0] rounded-xl px-4 py-3 text-xs md:text-sm font-medium focus:outline-none focus:border-[#F16736]" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-neutral-600 mb-1">Module Core Title</label>
                  <input type="text" placeholder="e.g. Invoicing Mechanics" value={newModuleName} onChange={(e) => setNewModuleName(e.target.value)} className="w-full border border-[#e8e5e0] rounded-xl px-4 py-3 text-xs md:text-sm font-medium focus:outline-none focus:border-[#F16736]" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-neutral-600 mb-1">Brief Description</label>
                  <textarea rows={3} placeholder="Provide overview..." value={newModuleDesc} onChange={(e) => setNewModuleDesc(e.target.value)} className="w-full border border-[#e8e5e0] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#F16736]" />
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={handleAddModule} className="flex-1 py-3.5 bg-neutral-900 hover:bg-[#F16736] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all">Create Week Module</button>
                  <button onClick={() => setIsModuleModalOpen(false)} className="px-4 py-3.5 border border-zinc-200 text-zinc-500 font-extrabold text-xs uppercase tracking-wider rounded-xl">Cancel</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Add Lesson Asset Modal */}
      <AnimatePresence>
        {isLessonModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={() => setIsLessonModalOpen(false)} className="absolute inset-0 bg-black/50" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white p-6 md:p-8 rounded-[2rem] border border-[#e8e5e0] w-full max-w-md shadow-2xl z-10 text-left">
              <h4 className="text-xl font-black mb-1">Add Content Asset</h4>
              <p className="text-xs text-neutral-400 mb-6 font-semibold">Decide if it represents a reading task, video screen, or interactive quiz checklist.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-neutral-600 mb-1">Task Type</label>
                  <select value={lessonType} onChange={(e) => setLessonType(e.target.value as any)} className="w-full border border-[#e8e5e0] rounded-xl px-4 py-3 text-xs font-mono focus:outline-none">
                    <option value="video">VIDEO SCREEN</option>
                    <option value="reading">READING PAGE</option>
                    <option value="quiz">CHECKLIST QUIZ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-neutral-600 mb-1">Lesson Name</label>
                  <input type="text" placeholder="e.g. Master Spatial Columns" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} className="w-full border border-[#e8e5e0] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#F16736]" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-neutral-600 mb-1">Description</label>
                  <input type="text" placeholder="Brief tagline..." value={lessonDesc} onChange={(e) => setLessonDesc(e.target.value)} className="w-full border border-[#e8e5e0] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#F16736]" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-neutral-600 mb-1">Content Detail (e.g. Video Link, Text Markdown)</label>
                  <textarea rows={4} placeholder={lessonType === 'video' ? 'Paste YouTube watch Link here...' : 'Write reading chapters here...'} value={lessonContent} onChange={(e) => setLessonContent(e.target.value)} className="w-full border border-[#e8e5e0] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#F16736]" />
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={handleAddLesson} className="flex-1 py-3.5 bg-neutral-900 hover:bg-[#F16736] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all">Compile Content Asset</button>
                  <button onClick={() => setIsLessonModalOpen(false)} className="px-4 py-3.5 border border-zinc-200 text-zinc-500 font-extrabold text-xs uppercase tracking-wider rounded-xl">Cancel</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Add Resource PDF Modal */}
      <AnimatePresence>
        {isResourceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={() => setIsResourceModalOpen(false)} className="absolute inset-0 bg-black/50" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white p-6 md:p-8 rounded-[2rem] border border-[#e8e5e0] w-full max-w-md shadow-2xl z-10 text-left">
              <h4 className="text-xl font-black mb-1">Add downloadable document</h4>
              <p className="text-xs text-neutral-400 mb-6 font-semibold">Upload toolkit frameworks with size limits.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-neutral-600 mb-1">Document Name</label>
                  <input type="text" placeholder="e.g. Direct Invoice Template" value={resourceName} onChange={(e) => setResourceName(e.target.value)} className="w-full border border-[#e8e5e0] rounded-xl px-4 py-3 text-xs focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-neutral-600 mb-1">Document Type</label>
                  <select value={resourceType} onChange={(e) => setResourceType(e.target.value as any)} className="w-full border border-[#e8e5e0] rounded-xl px-4 py-3 text-xs text-neutral-700">
                    <option value="pdf">PDF REPORT</option>
                    <option value="template">EDITABLE TEMPLATE</option>
                    <option value="toolkit">SOFTWARE TOOLKIT</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={handleAddResource} className="flex-1 py-3.5 bg-neutral-900 hover:bg-[#F16736] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all">Compile Document</button>
                  <button onClick={() => setIsResourceModalOpen(false)} className="px-4 py-3.5 border border-zinc-200 text-[#6b6b6b] font-extrabold text-xs uppercase tracking-wider rounded-xl">Cancel</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Admin;
