'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Bot, Palette, Feather, Mic, ArrowRight, CheckCircle2, 
  ShieldCheck, Star, Users, Calendar, Clock, Lock, BookOpen, AlertCircle,
  ChevronRight, X, User, Heart, Compass, Wrench, Briefcase, Award
} from 'lucide-react';
import { getUsers, saveUsers, setCurrentUser } from '@/lib/storage';
import { User as UserType } from '@/types';
import Breadcrumbs from '@/components/Breadcrumbs';
import Logo from '@/components/Logo';

interface StarterCourse {
  id: string;
  title: string;
  category: string;
  categorySlug: 'trade' | 'business' | 'ai' | 'design';
  badge: string;
  icon: typeof Bot;
  image: string;
  age: string;
  level: string;
  color: string;
  accentBg: string;
  borderHover: string;
  summary: string;
  outcomes: string[];
  curriculum: { week: string; topic: string; details: string }[];
  schedule: string;
}

export default function InterJuniorWorkspace() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const starterCourses: StarterCourse[] = [
    {
      id: 'trade-skills',
      title: 'Practical Trade & Technical Adaptive Skills',
      category: 'Trade Skills',
      categorySlug: 'trade',
      badge: 'Trade & Technical',
      icon: Wrench,
      image: '/images/sec_student_trade.jpg',
      age: 'Ages 9–18',
      level: 'Foundational → Advanced',
      color: '#059669',
      accentBg: 'bg-emerald-50 text-emerald-600',
      borderHover: 'hover:border-emerald-500',
      summary: 'Hands-on starter training in practical tradecraft, hardware fabrication, workshop tool competence, and technical problem solving.',
      outcomes: [
        'Master essential workshop tools, mechanical materials, and safety protocols',
        'Design, assemble, and test functional physical trade prototypes',
        'Build technical discipline, dexterity, and adaptive hardware troubleshooting'
      ],
      curriculum: [
        { week: 'Week 1', topic: 'Workshop Tools & Safety Fundamentals', details: 'Tool taxonomy, precision measurement, and hazard-free crafting.' },
        { week: 'Week 2', topic: 'Materials, Wiring & Fabrication Basics', details: 'Understanding electrical circuits, joins, carpentry, and hardware assembly.' },
        { week: 'Week 3', topic: 'Prototyping & Adaptive Maintenance', details: 'Diagnosing mechanical failures and assembling practical utility builds.' },
        { week: 'Week 4', topic: 'Trade Exhibition & Practical Showcase', details: 'Demonstrating working physical deliverables before mentors.' }
      ],
      schedule: 'Saturdays, 9:00 AM WAT (Live Workshop) + Practical Kit Guide'
    },
    {
      id: 'business-skills',
      title: 'Student Business & Campus Entrepreneurship',
      category: 'Business Skills',
      categorySlug: 'business',
      badge: 'Financial Intelligence',
      icon: Briefcase,
      image: '/images/sec_student_finance.jpg',
      age: 'Ages 12–18',
      level: 'Novice → Practitioner',
      color: '#0284c7',
      accentBg: 'bg-sky-50 text-sky-600',
      borderHover: 'hover:border-sky-500',
      summary: 'Foundational business principles, personal budgeting, unit economics, campus venture creation, and persuasive sales negotiation.',
      outcomes: [
        'Draft a functional Lean Business Model Canvas from scratch',
        'Master personal budgeting, cash flow forecasting, and unit pricing models',
        'Practice realistic commercial deal negotiation and live customer pitching'
      ],
      curriculum: [
        { week: 'Week 1', topic: 'Opportunity Discovery & Idea Validation', details: 'Spotting real community problems and defining high-value commercial solutions.' },
        { week: 'Week 2', topic: 'Unit Economics, Pricing & Cash Flow', details: 'Cost of goods sold, profit margins, and personal ledger management.' },
        { week: 'Week 3', topic: 'Sales Pitching & Stakeholder Negotiation', details: 'The art of the persuasive pitch, objection handling, and contract closing.' },
        { week: 'Week 4', topic: 'Junior Venture Pitch Day', details: 'Presenting a validated business model to angel judges and parents.' }
      ],
      schedule: 'Wednesdays, 5:00 PM WAT (Live Masterclass) + Case Study Vault'
    },
    {
      id: 'ai-secondary',
      title: 'Artificial Intelligence & Prompt Engineering',
      category: 'AI Skills',
      categorySlug: 'ai',
      badge: 'Applied AI & Code',
      icon: Bot,
      image: '/images/sec_student_robotics.jpg',
      age: 'Ages 12–18',
      level: 'Novice → Intermediate',
      color: '#38bdf8',
      accentBg: 'bg-cyan-50 text-cyan-600',
      borderHover: 'hover:border-cyan-400',
      summary: 'Move from being a passive consumer of tech to an active AI creator. Understand neural networks, prompt architectures, and build custom AI assistants.',
      outcomes: [
        'Master Chain-of-Thought and zero-shot prompt engineering',
        'Build and deploy a functional custom AI study tutor bot',
        'Learn ethical boundaries, bias mitigation, and hallucination checks'
      ],
      curriculum: [
        { week: 'Week 1', topic: 'Demystifying AI & Token Systems', details: 'How LLMs read words, generate probabilities, and compute tokens.' },
        { week: 'Week 2', topic: 'Precision Prompt Engineering', details: 'Context framing, delimiter protocols, and role-based instruction sets.' },
        { week: 'Week 3', topic: 'AI Agents & Socratic Assistants', details: 'Building an interactive assistant that coaches rather than cheats.' },
        { week: 'Week 4', topic: 'Capstone Demo Day', details: 'Showcasing custom AI tools to peers and mentors.' }
      ],
      schedule: 'Saturdays, 11:30 AM WAT (Live Q&A) + Interactive AI Sandbox'
    },
    {
      id: 'design-arts',
      title: 'Design & Arts: Digital Aesthetics & UI/UX',
      category: 'Design & Creative Writing',
      categorySlug: 'design',
      badge: 'Visual Design',
      icon: Palette,
      image: '/images/sec_student_design.jpg',
      age: 'Ages 12–18',
      level: 'Novice → Intermediate',
      color: '#F16736',
      accentBg: 'bg-[#fff1eb] text-[#F16736]',
      borderHover: 'hover:border-[#F16736]',
      summary: 'Turn your creative instincts into high-value digital artistry. Learn visual balance, golden ratios, color psychology, and modern UI design in Figma.',
      outcomes: [
        'Master visual hierarchy, spatial spacing, and typography scales',
        'Design complete mobile and desktop web interfaces in Figma',
        'Curate a professional portfolio of real-world design deliverables'
      ],
      curriculum: [
        { week: 'Week 1', topic: 'Visual Weight & Typographic Scales', details: 'The 8px grid system, font pairing, and negative space psychology.' },
        { week: 'Week 2', topic: 'Color Harmonies & Contrast Ratios', details: '60-30-10 palette architecture and accessibility standards.' },
        { week: 'Week 3', topic: 'Figma Components & Auto-Layout', details: 'Professional digital UI prototyping techniques.' },
        { week: 'Week 4', topic: 'Portfolio Showcase', details: 'Packaging your work for freelance or university admissions.' }
      ],
      schedule: 'Tuesdays, 4:30 PM WAT (Live Critique) + Self-Paced Video Vault'
    },
    {
      id: 'creative-writing',
      title: 'Creative Writing & Narrative Architecture',
      category: 'Design & Creative Writing',
      categorySlug: 'design',
      badge: 'Storytelling & Rhetoric',
      icon: Feather,
      image: '/images/sec_student_lead.jpg',
      age: 'Ages 9–16',
      level: 'Novice → Intermediate',
      color: '#9333ea',
      accentBg: 'bg-purple-50 text-purple-600',
      borderHover: 'hover:border-purple-400',
      summary: 'Craft stories and oratory speeches that enchant and persuade. Explore three-act story arcs, sensory description hooks, dynamic dialogue, and rhetoric.',
      outcomes: [
        'Write emotionally compelling narrative prose using "show, don\'t tell"',
        'Construct multidimensional character profiles with distinct motivations',
        'Produce an original published anthology piece for the BTSW Junior Journal'
      ],
      curriculum: [
        { week: 'Week 1', topic: 'Sensory Imagery & Narrative Hooks', details: 'Activating the reader\'s senses through visceral description.' },
        { week: 'Week 2', topic: 'The Three-Act Plot Blueprint', details: 'Inciting incidents, escalating stakes, and emotional climaxes.' },
        { week: 'Week 3', topic: 'Dialogue & Rhetorical Devices', details: 'Subtext, voice rhythm, ethos, pathos, and logos in spoken delivery.' },
        { week: 'Week 4', topic: 'Manuscript Workshop & Anthology', details: 'Live editorial feedback and publication preparation.' }
      ],
      schedule: 'Sundays, 4:00 PM WAT (Live Reading Circle) + Self-Paced Video Vault'
    }
  ];

  // Selected course for viewing details modal
  const [selectedCourse, setSelectedCourse] = useState<StarterCourse | null>(null);

  // Selected course for enrollment modal
  const [enrollCourse, setEnrollCourse] = useState<StarterCourse | null>(null);

  // Registration Form States (Student + Parent Consent)
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('14');
  const [studentGrade, setStudentGrade] = useState('SS 1 / Grade 10');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  
  // Parent Consent Fields
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenEnrollment = (course: StarterCourse) => {
    setSelectedCourse(null);
    setEnrollCourse(course);
    setErrorMessage(null);
  };

  const handleEnrollmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!consentAgreed) {
      setErrorMessage('Parental consent is required for junior learners. Please review and check the consent box.');
      return;
    }

    if (studentPassword.length < 6) {
      setErrorMessage('Student password must be at least 6 characters long.');
      return;
    }

    if (!parentEmail || !parentPhone || !parentName) {
      setErrorMessage('Please provide complete parent or guardian contact information.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const users = getUsers();
      const existing = users.find(u => u.email.toLowerCase() === studentEmail.toLowerCase().trim());

      const chosenCourseSlug = enrollCourse?.id || 'ai-secondary';

      let userToLogin: UserType;

      if (existing) {
        // Enroll in course if not already enrolled
        if (!existing.enrolledSchools.includes(chosenCourseSlug)) {
          existing.enrolledSchools.push(chosenCourseSlug);
        }
        existing.parentConsent = {
          parentName: parentName.trim(),
          parentEmail: parentEmail.trim(),
          parentPhone: parentPhone.trim(),
          consentedAt: new Date().toISOString()
        };
        existing.juniorTrack = chosenCourseSlug;
        userToLogin = existing;
        saveUsers(users);
      } else {
        userToLogin = {
          id: 'junior-' + Math.random().toString(36).substring(2, 9),
          name: studentName.trim(),
          email: studentEmail.toLowerCase().trim(),
          password: studentPassword,
          role: 'student',
          enrolledSchools: [chosenCourseSlug],
          completedLessons: [],
          playgroundScores: [],
          streak: 1,
          isLuminaireUser: true,
          juniorTrack: chosenCourseSlug,
          age: parseInt(studentAge) || 14,
          grade: studentGrade,
          parentConsent: {
            parentName: parentName.trim(),
            parentEmail: parentEmail.trim(),
            parentPhone: parentPhone.trim(),
            consentedAt: new Date().toISOString()
          },
          joinedDate: new Date().toISOString().split('T')[0]
        };
        users.push(userToLogin);
        saveUsers(users);
      }

      setCurrentUser(userToLogin);
      setLoading(false);
      router.push('/portal');
    }, 600);
  };

  const filteredCourses = activeCategory === 'all'
    ? starterCourses
    : starterCourses.filter(c => c.categorySlug === activeCategory);

  const categoryFilters = [
    { id: 'all', label: 'All Courses' },
    { id: 'trade', label: 'Trade Skills' },
    { id: 'business', label: 'Business Skills' },
    { id: 'ai', label: 'AI Skills' },
    { id: 'design', label: 'Design & Creative Writing' }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1e1e1e] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12 sm:space-y-16">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Breadcrumbs variant="light" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff1eb] border border-[#F16736]/20 text-[#F16736] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            <span>Junior Innovators Lab (Ages 9–18)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#1e1e1e] leading-[1.08]">
            Junior <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F16736] via-[#e05423] to-[#ff8254]">
              Workspace
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            A world-class digital learning ecosystem for secondary and middle school minds. 
            Choose from high-impact starter courses in trade skills, entrepreneurship, artificial intelligence, and creative design to groom extreme resourcefulness before you finish school.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-neutral-500 pt-2">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-500" /> Hybrid Pre-Recorded Modules</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-500" /> Weekly Live Instructor Workshops</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-500" /> Interactive Practice Sandbox</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-500" /> Parental Consent Enforced</span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categoryFilters.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-[#1e1e1e] text-white border-[#1e1e1e] shadow-md scale-105'
                  : 'bg-white text-neutral-600 border-[#e8e5e0] hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Starter Course Cards with Supporting Visuals/Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const Icon = course.icon;
            return (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`group relative bg-white border border-[#e8e5e0] ${course.borderHover} rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between`}
              >
                {/* Supporting Visual Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 border-b border-[#e8e5e0]">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Floating Track Badge & Age */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white">
                      {course.category}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-neutral-800 shadow-sm">
                      {course.age}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                    <div className={`w-8 h-8 rounded-lg ${course.accentBg} flex items-center justify-center shadow`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-bold drop-shadow-sm text-white/95">
                      {course.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-black text-[#1e1e1e] group-hover:text-[#F16736] transition-colors leading-snug mb-2.5">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed mb-5 font-normal line-clamp-3">
                      {course.summary}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-6 bg-[#faf9f7] p-3.5 rounded-xl border border-[#e8e5e0]/60">
                      <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400">What You Will Master:</p>
                      {course.outcomes.slice(0, 2).map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-neutral-700">
                          <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                          <span className="leading-tight">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-4 border-t border-[#e8e5e0] flex items-center justify-between gap-3 mt-auto">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Syllabus</span>
                      <ChevronRight size={14} />
                    </button>

                    <button
                      onClick={() => handleOpenEnrollment(course)}
                      className="px-5 py-2.5 bg-[#1e1e1e] hover:bg-[#F16736] text-white text-xs font-bold rounded-lg transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Enroll Now</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Course Detail Modal */}
        <AnimatePresence>
          {selectedCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-[#e8e5e0] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-6 right-6 p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${selectedCourse.accentBg} flex items-center justify-center`}>
                      <selectedCourse.icon size={24} />
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase text-[#F16736] tracking-widest">{selectedCourse.category}</span>
                      <h2 className="text-2xl font-black text-[#1e1e1e]">{selectedCourse.title}</h2>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                    {selectedCourse.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-[#faf9f7] p-4 rounded-2xl border border-[#e8e5e0]">
                    <div>
                      <span className="text-neutral-400 block font-bold uppercase text-[10px]">Target Audience</span>
                      <span className="font-bold text-neutral-800">{selectedCourse.age}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block font-bold uppercase text-[10px]">Skill Progression</span>
                      <span className="font-bold text-neutral-800">{selectedCourse.level}</span>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-[#e8e5e0]">
                      <span className="text-neutral-400 block font-bold uppercase text-[10px]">Live Session Timetable</span>
                      <span className="font-bold text-[#F16736]">{selectedCourse.schedule}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-neutral-700 mb-3">4-Week Curriculum Roadmap:</h3>
                    <div className="space-y-3">
                      {selectedCourse.curriculum.map((c, i) => (
                        <div key={i} className="p-3.5 bg-neutral-50 border border-[#e8e5e0] rounded-xl flex items-start gap-3">
                          <span className="px-2.5 py-1 rounded-md bg-white border border-[#e8e5e0] font-black text-[10px] text-neutral-700">{c.week}</span>
                          <div>
                            <h4 className="text-xs font-bold text-neutral-900">{c.topic}</h4>
                            <p className="text-[11px] text-neutral-500 mt-0.5">{c.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-4 border-t border-[#e8e5e0]">
                    <button
                      onClick={() => setSelectedCourse(null)}
                      className="px-6 py-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      Close Window
                    </button>
                    <button
                      onClick={() => handleOpenEnrollment(selectedCourse)}
                      className="px-8 py-3.5 bg-[#F16736] hover:bg-[#e05423] text-white text-xs font-extrabold uppercase tracking-wider rounded-lg shadow-lg shadow-[#F16736]/20 transition-all hover:scale-105"
                    >
                      Proceed to Registration
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Enrollment Modal with Parent Consent */}
        <AnimatePresence>
          {enrollCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white border border-[#e8e5e0] rounded-xl max-w-xl w-full my-8 p-8 sm:p-10 shadow-2xl relative"
              >
                <button
                  onClick={() => setEnrollCourse(null)}
                  className="absolute top-6 right-6 p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#F16736] bg-[#fff1eb] px-3 py-1 rounded-full">
                      COURSE REGISTRATION & CONSENT
                    </span>
                    <h2 className="text-2xl font-black text-[#1e1e1e] mt-2">
                      Enroll in {enrollCourse.title}
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      Students under 18 require parental/guardian consent to activate their learning portal.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-start gap-2.5">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleEnrollmentSubmit} className="space-y-6">
                    {/* Student Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-[#e8e5e0]">
                        <User size={16} className="text-[#F16736]" />
                        <h3 className="text-xs font-black uppercase tracking-wider text-neutral-700">1. Student Details</h3>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Student Full Name *</label>
                        <input
                          type="text"
                          required
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="e.g. Dapo Adeleke"
                          className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Age *</label>
                          <input
                            type="number"
                            required
                            min="8"
                            max="19"
                            value={studentAge}
                            onChange={(e) => setStudentAge(e.target.value)}
                            className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Current Class / Grade</label>
                          <select
                            value={studentGrade}
                            onChange={(e) => setStudentGrade(e.target.value)}
                            className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:bg-white focus:outline-none"
                          >
                            <option value="JSS 1 / Grade 7">JSS 1 / Grade 7</option>
                            <option value="JSS 2 / Grade 8">JSS 2 / Grade 8</option>
                            <option value="JSS 3 / Grade 9">JSS 3 / Grade 9</option>
                            <option value="SS 1 / Grade 10">SS 1 / Grade 10</option>
                            <option value="SS 2 / Grade 11">SS 2 / Grade 11</option>
                            <option value="SS 3 / Grade 12">SS 3 / Grade 12</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Student Portal Email / Login *</label>
                        <input
                          type="email"
                          required
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          placeholder="e.g. dapo@student.com"
                          className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Portal Password (min 6 characters) *</label>
                        <input
                          type="password"
                          required
                          value={studentPassword}
                          onChange={(e) => setStudentPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Parent Consent Section */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-2 pb-2 border-b border-[#e8e5e0]">
                        <ShieldCheck size={16} className="text-[#F16736]" />
                        <h3 className="text-xs font-black uppercase tracking-wider text-neutral-700">2. Parent / Guardian Consent</h3>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Parent/Guardian Full Name *</label>
                        <input
                          type="text"
                          required
                          value={parentName}
                          onChange={(e) => setParentName(e.target.value)}
                          placeholder="e.g. Chief (Mrs.) Bolanle Adeleke"
                          className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Parent Email Address *</label>
                          <input
                            type="email"
                            required
                            value={parentEmail}
                            onChange={(e) => setParentEmail(e.target.value)}
                            placeholder="e.g. b.adeleke@gmail.com"
                            className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Parent Phone / WhatsApp *</label>
                          <input
                            type="tel"
                            required
                            value={parentPhone}
                            onChange={(e) => setParentPhone(e.target.value)}
                            placeholder="e.g. +234 803 456 7890"
                            className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-semibold focus:border-[#F16736] focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Explicit Consent Checkbox */}
                      <div 
                        onClick={() => setConsentAgreed(!consentAgreed)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                          consentAgreed ? 'border-[#F16736] bg-[#fff1eb]/40' : 'border-[#e8e5e0] bg-[#faf9f7]'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 transition-colors ${
                          consentAgreed ? 'bg-[#F16736] text-white' : 'border border-neutral-300'
                        }`}>
                          {consentAgreed && <CheckCircle2 size={14} />}
                        </div>
                        <p className="text-[11px] text-neutral-700 leading-snug">
                          <strong>Parental Authorization:</strong> I verify that I am the parent or legal guardian of this student. I give full consent for them to enroll in the BTSW Inter Junior Workspace, participate in supervised online workshops, and access practical sandboxes.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#F16736] hover:bg-[#e05423] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-[#F16736]/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                      >
                        {loading ? 'Creating Student Account...' : 'Complete Enrollment & Enter Portal'}
                      </button>
                      <p className="text-center text-[11px] text-neutral-400 mt-3">
                        Already have an account? <Link href="/login" className="text-[#F16736] font-bold hover:underline">Log in directly</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
