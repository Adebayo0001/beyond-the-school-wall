export interface ProgramDetailData {
  slug: string;
  title: string;
  kicker: string;
  duration: string;
  difficulty: string;
  audience: string;
  intro: string;
  description: string;
  image: string;
  cta: string;
  features: string[];
  curriculum: {
    week: string;
    title: string;
    description: string;
    topics: string[];
  }[];
  accentColor: string;
  bgDecorative: string;
  cohortDate: string;
}

export interface ParentConsent {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  consentedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'student' | 'admin';
  enrolledSchools: string[]; // e.g. ['the-magnet-school', 'cash-on-campus', 'ai-secondary']
  completedLessons: string[]; // e.g. ['lesson-1', 'lesson-2']
  isLuminaireUser?: boolean;
  luminaireTrack?: 'middle' | 'high';
  juniorTrack?: 'ai-secondary' | 'design-arts' | 'creative-writing' | 'public-speaking' | 'trade-skills' | 'business-skills' | string;
  age?: number;
  grade?: string;
  parentConsent?: ParentConsent;
  playgroundScores: {
    scenarioId: string;
    score: number;
    feedback: string;
    date: string;
  }[];
  streak: number;
  lastActiveDate?: string;
  joinedDate: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctOption: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  description: string;
  content: string;
  duration: string;
  level?: 'novice' | 'intermediate' | 'advanced';
  isLocked?: boolean;
  videoUrl?: string;
  quizQuestions?: QuizQuestion[];
}

export interface CourseResource {
  id: string;
  name: string;
  type: 'pdf' | 'template' | 'toolkit';
  url: string;
  size: string;
}

export interface CourseModule {
  id: string;
  week: string;
  title: string;
  description: string;
  level?: 'novice' | 'intermediate' | 'advanced';
  isLocked?: boolean;
  lessons: Lesson[];
  resources: CourseResource[];
}

export interface SchoolContent {
  slug: string;
  title: string;
  subtitle?: string;
  targetAudience?: string;
  ageRange?: string;
  level?: 'novice' | 'intermediate' | 'advanced';
  modules: CourseModule[];
}

export interface SchoolLead {
  id: string;
  schoolName: string;
  contactName: string;
  role: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  studentCount?: string;
  selectedPrograms: string[];
  notes?: string;
  bookingSlot?: {
    date: string;
    time: string;
    type: 'phone' | 'google-meet' | 'in-person';
  };
  createdAt: string;
}

export interface LiveSession {
  id: string;
  courseSlug: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  joinUrl?: string;
  isReplay?: boolean;
  replayUrl?: string;
}

export interface SimulationEvent {
  id: string;
  title: string;
  type: 'virtual-event' | 'ai-simulation' | 'tabletop';
  date: string;
  time: string;
  description: string;
  host: string;
  replayUrl?: string;
  joinUrl?: string;
  capacity?: number;
  enrolledCount?: number;
}

export interface PlaygroundScenario {
  id: string;
  schoolSlug: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  requiredLessonId: string;
  requiredLessonTitle: string;
  briefing: string;
  objectives: string[];
  tips: string[];
  partnerName: string;
  partnerRole: string;
  partnerPrompt: string;
  initialMessage: string;
}

export interface SimulationRun {
  id: string;
  scenarioId: string;
  studentId: string;
  messages: { sender: 'ai' | 'student'; text: string; timestamp: string }[];
  score?: number;
  feedback?: string;
  completed: boolean;
  date: string;
}
