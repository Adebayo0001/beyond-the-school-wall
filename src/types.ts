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

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'student' | 'admin';
  enrolledSchools: string[]; // e.g. ['the-magnet-school', 'the-skill-hut']
  completedLessons: string[]; // e.g. ['lesson-1', 'lesson-2']
  isLuminaireUser?: boolean;
  luminaireTrack?: 'middle' | 'high';
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
  correctOption: number; // Index in options
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  description: string;
  content: string; // The text content or URL
  duration: string; // e.g. "12 mins"
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
  week: string; // e.g. "Week 1-2"
  title: string;
  description: string;
  lessons: Lesson[];
  resources: CourseResource[];
}

export interface SchoolContent {
  slug: string;
  title: string;
  modules: CourseModule[];
}

export interface PlaygroundScenario {
  id: string;
  schoolSlug: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  requiredLessonId: string; // e.g. 'lesson-1' (scenario is unlocked if lesson is in user.completedLessons)
  requiredLessonTitle: string;
  briefing: string;
  objectives: string[];
  tips: string[];
  partnerName: string;
  partnerRole: string; // e.g. "Skeptical Enterprise Client"
  partnerPrompt: string; // system behavior instructions
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
