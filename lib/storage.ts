import { User, SchoolContent, CourseModule, Lesson, CourseResource, PlaygroundScenario, SimulationRun, LiveSession, SimulationEvent, SchoolLead } from '../types';

// Standard Initial Users
const DEFAULT_USERS: User[] = [
  {
    id: 'user-abidemi',
    name: 'Abidemi',
    email: 'student@btsw.com',
    password: 'password123',
    role: 'student',
    enrolledSchools: ['the-magnet-school', 'cash-on-campus'],
    completedLessons: ['magnet-school-l1', 'cash-on-campus-l1'],
    playgroundScores: [
      {
        scenarioId: 'scenario-magnet-school',
        score: 8,
        feedback: "Outstanding command of Stoic composure and dialectic reasoning. Your defense of character-building initiatives against faculty skepticism was sound.",
        date: "2026-06-05"
      }
    ],
    streak: 5,
    joinedDate: '2026-05-01'
  },
  {
    id: 'user-admin',
    name: 'Director Wale',
    email: 'admin@btsw.com',
    password: 'adminpassword',
    role: 'admin',
    enrolledSchools: [],
    completedLessons: [],
    playgroundScores: [],
    streak: 0,
    joinedDate: '2026-04-12'
  }
];

// Standard Course Curriculum with fully loaded lessons and downloadable resources matching descriptions.
const DEFAULT_COURSES: SchoolContent[] = [
  {
    slug: 'the-magnet-school',
    title: 'The Magnet School',
    modules: [
      {
        id: 'magnet-m1',
        week: 'Weeks 1-3',
        title: 'The Self & Character Blueprint',
        description: 'Breaking personal boundaries, identifying biases, and setting the psychological groundwork for extreme ownership and intellectual fortitude.',
        lessons: [
          {
            id: 'magnet-school-l1',
            title: 'Foundations of Philosophical Stoicism',
            type: 'video',
            description: 'Learn the stoic principles necessary for high-level command and resilient execution.',
            duration: '15 mins',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // placeholder or standard video
          },
          {
            id: 'magnet-school-l2',
            title: 'Deconstructing Private Persona Ego & Blind Spots',
            type: 'reading',
            description: 'A deep reading mapping internal cognitive filters and moral anchors.',
            duration: '10 mins read',
            content: '# Ego & Blind Spots in Leadership\n\nTrue leadership requires robust objective self-reflection. When we command platforms or raise student groups, our unaddressed ego becomes our heaviest vulnerability...\n\n### Stoic Core Lessons:\n1. Focus strictly on control boundaries.\n2. Embrace constructive dialectic criticism.\n3. Defuse triggers before responses.'
          },
          {
            id: 'magnet-school-l3',
            title: 'STOIC-01 Personal Ethics Audit',
            type: 'quiz',
            description: 'Test your understanding of Stoic accountability frameworks.',
            duration: '5 questions',
            content: '',
            quizQuestions: [
              {
                question: 'Which is the core anchor of Stoicism in a high-intensity negotiation crisis?',
                options: [
                  'Blaming the environmental conditions to preserve platform status',
                  'Focussing exclusively on items inside your direct control boundaries',
                  'Exhibiting public emotion to gather empathetic support'
                ],
                correctOption: 1
              }
            ]
          }
        ],
        resources: [
          {
            id: 'magnet-r1',
            name: 'Stoic Leadership Self-Audit Template',
            type: 'template',
            url: '#',
            size: '1.2 MB'
          },
          {
            id: 'magnet-r2',
            name: 'Historical Ethics Archetype Matrix',
            type: 'pdf',
            url: '#',
            size: '3.4 MB'
          }
        ]
      },
      {
        id: 'magnet-m2',
        week: 'Weeks 4-6',
        title: 'The Art of Dialectic & Rhetoric',
        description: 'How to deconstruct arguments, think in structures rather than sentiment, and communicate difficult ideas with power and clarity.',
        lessons: [
          {
            id: 'magnet-school-l4',
            title: 'Formal Logic & Fallacy Mapping',
            type: 'video',
            description: 'Understand how cognitive biases and bad rhetoric weaken leadership campaigns.',
            duration: '18 mins',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          }
        ],
        resources: [
          {
            id: 'magnet-r3',
            name: 'Classical Debating Rhetoric Rules',
            type: 'pdf',
            url: '#',
            size: '850 KB'
          }
        ]
      }
    ]
  },
  {
    slug: 'cash-on-campus',
    title: 'Cash On Campus',
    modules: [
      {
        id: 'cash-m1',
        week: 'Weeks 1-2',
        title: 'Campus Demand & Arbitrage',
        description: 'Identifying pain points inside your university dorms, lecture theaters, and student groups, and setting up instant-delivery services.',
        lessons: [
          {
            id: 'cash-on-campus-l1',
            title: 'The Student Pain Point Matrix & Campus Arbitrage',
            type: 'video',
            description: 'Find lucrative service models inside dormitories and design active delivery systems.',
            duration: '14 mins',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          },
          {
            id: 'cash-on-campus-l2',
            title: 'Low-Cost Supply Chains & Wholesaler Negotiation',
            type: 'reading',
            description: 'How to pitch wholesalers, secure bulk discounts, and setup local lockers for zero starting capital.',
            duration: '12 mins read',
            content: '# Wholesaler Arbitrage & Negotiation\n\nCampus micro-startups do not need outside investment. They need rapid local arbitrage. Learn how to source off-campus inventory at 50% wholesale discount, and move it safely inside dorm networks...\n\n### Core Sourcing Pillars:\n1. Identify immediate student pains (e.g., late-night snacks, laundry logistics, formatting).\n2. Bundle your order book FIRST before handing deposits to providers.'
          }
        ],
        resources: [
          {
            id: 'cash-r1',
            name: 'Campus Startup Opportunity Matrix Book',
            type: 'pdf',
            url: '#',
            size: '4.8 MB'
          }
        ]
      }
    ]
  },
  {
    slug: 'the-mental-application-study',
    title: 'The Mental Application Study',
    modules: [
      {
        id: 'mental-m1',
        week: 'Weeks 1-2',
        title: 'Cognitive Optimization & Execution',
        description: 'Understand how to optimize your brain for strategic thinking and complex problem-solving.',
        lessons: [
          {
            id: 'mental-app-l1',
            title: 'The Neuroscience of Extreme Focus & Anti-Distraction',
            type: 'video',
            description: 'Neurobiological principles for entering high flow-states and bypassing tech-overload.',
            duration: '16 mins',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          }
        ],
        resources: [
          {
            id: 'mental-r1',
            name: 'Cognitive Block Time Organizer',
            type: 'template',
            url: '#',
            size: '950 KB'
          }
        ]
      }
    ]
  },
  {
    slug: 'crash-course',
    title: 'Crash Course',
    modules: [
      {
        id: 'crash-m1',
        week: 'Weeks 1-2',
        title: 'Rapid Micro-Innovation Strategy',
        description: 'Actionable frameworks to ship micro-solutions for immediate small business execution.',
        lessons: [
          {
            id: 'crash-course-l1',
            title: 'The WhatsApp Supermarket Scheduling Hack',
            type: 'video',
            description: 'Unwrap the exact script and setup to launch high-conversion appointment bookings for local grocers.',
            duration: '10 mins',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          }
        ],
        resources: [
          {
            id: 'crash-r1',
            name: 'Supermarket Pitch Presentation Deck',
            type: 'template',
            url: '#',
            size: '3.1 MB'
          }
        ]
      }
    ]
  },
  {
    slug: 'ai-secondary',
    title: 'Artificial Intelligence for Secondary School',
    subtitle: 'Machine Learning, Prompt Engineering & Building Real AI Systems',
    targetAudience: 'Senior Secondary & Science Students',
    ageRange: 'Ages 13–18',
    level: 'novice',
    modules: [
      {
        id: 'ai-sec-m1',
        week: 'Weeks 1–2',
        title: 'Intelligence Foundations & Prompt Engineering',
        description: 'Understand how LLMs think, tokens, attention mechanisms, and how to write precision prompts.',
        level: 'novice',
        lessons: [
          {
            id: 'ai-sec-l1',
            title: 'What is Artificial Intelligence? (Beyond the Hype)',
            type: 'video',
            description: 'Demystifying neural nets, generative AI, and real-world industrial applications.',
            duration: '14 mins',
            level: 'novice',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          },
          {
            id: 'ai-sec-l2',
            title: 'Prompt Architectures: Zero-Shot to Chain-of-Thought',
            type: 'reading',
            description: 'Learn the system instructions, role assignment, and delimiters used by top AI practitioners.',
            duration: '10 mins read',
            level: 'novice',
            content: '# Prompt Architecture & Engineering\n\nPrompt engineering is the art of directing generative systems with absolute clarity...\n\n### The Core Rules:\n1. **Context & Persona**: Define who the model is.\n2. **Task & Constraints**: Explicitly state what to avoid.\n3. **Few-Shot Examples**: Show the model ideal output formats.'
          },
          {
            id: 'ai-sec-l3',
            title: 'AI Logic & Ethics Assessment',
            type: 'quiz',
            description: 'Test your understanding of hallucination risks, temperature, and prompt structure.',
            duration: '3 questions',
            level: 'novice',
            content: '',
            quizQuestions: [
              {
                question: 'Which technique best encourages an AI model to break down complex multi-step math problems?',
                options: [
                  'Setting temperature to 1.0',
                  'Chain-of-Thought prompting (e.g. "Think step-by-step")',
                  'Asking the question in capital letters'
                ],
                correctOption: 1
              },
              {
                question: 'What is an AI "hallucination"?',
                options: [
                  'When the model creates a video',
                  'When the model generates factually incorrect information presented with high confidence',
                  'When the model turns off due to power outage'
                ],
                correctOption: 1
              }
            ]
          }
        ],
        resources: [
          {
            id: 'ai-r1',
            name: 'BTSW Prompt Engineering Cheat Sheet',
            type: 'toolkit',
            url: '#',
            size: '1.8 MB'
          }
        ]
      },
      {
        id: 'ai-sec-m2',
        week: 'Weeks 3–4',
        title: 'Building Custom AI Assistants',
        description: 'Design specialized AI agents for study help, research synthesis, and coding.',
        level: 'intermediate',
        isLocked: true,
        lessons: [
          {
            id: 'ai-sec-l4',
            title: 'System Prompts & Persona Tuning',
            type: 'video',
            description: 'How to build an AI tutor that asks Socratic questions rather than just spoon-feeding answers.',
            duration: '18 mins',
            level: 'intermediate',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          }
        ],
        resources: [
          {
            id: 'ai-r2',
            name: 'AI Assistant Blueprint Template',
            type: 'template',
            url: '#',
            size: '2.4 MB'
          }
        ]
      }
    ]
  },
  {
    slug: 'design-arts',
    title: 'Design & Arts: Digital Aesthetics',
    subtitle: 'Visual Hierarchy, Color Psychology & Digital Storytelling',
    targetAudience: 'Art, Humanities & Creative Students',
    ageRange: 'Ages 12–18',
    level: 'novice',
    modules: [
      {
        id: 'design-art-m1',
        week: 'Weeks 1–2',
        title: 'Visual Foundations & Typographic Harmony',
        description: 'Explore visual balance, negative space, color palettes, and typographic scales.',
        level: 'novice',
        lessons: [
          {
            id: 'design-art-l1',
            title: 'The Psychology of Composition & Visual Weight',
            type: 'video',
            description: 'Why some layouts command instant attention while others feel cluttered.',
            duration: '15 mins',
            level: 'novice',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          },
          {
            id: 'design-art-l2',
            title: 'Color Palettes & Emotional Resonance',
            type: 'reading',
            description: 'Building harmonious 60-30-10 color schemes for digital products and posters.',
            duration: '8 mins read',
            level: 'novice',
            content: '# Color Theory for Digital Creators\n\nColor creates instant emotional context before a single word is read...\n\n### 60-30-10 Rule:\n* 60% Dominant Neutral\n* 30% Secondary Supporting Tone\n* 10% High-Contrast Accent (CTA/Focal point)'
          }
        ],
        resources: [
          {
            id: 'art-r1',
            name: 'Digital Creator Color Palette Guide',
            type: 'pdf',
            url: '#',
            size: '3.2 MB'
          }
        ]
      }
    ]
  },
  {
    slug: 'creative-writing',
    title: 'Creative Writing & Narrative Craft',
    subtitle: 'Story Architecture, World-Building & Expressive Essays',
    targetAudience: 'Middle & Senior Secondary Students',
    ageRange: 'Ages 9–16',
    level: 'novice',
    modules: [
      {
        id: 'writing-m1',
        week: 'Weeks 1–2',
        title: 'Character Architectures & Sensory Language',
        description: 'Develop multi-dimensional protagonists and write vivid descriptions using sensory hooks.',
        level: 'novice',
        lessons: [
          {
            id: 'writing-l1',
            title: 'Show, Don\'t Tell: Sensory Imagery in Prose',
            type: 'video',
            description: 'Transform passive statements into dynamic, emotionally resonant scenes.',
            duration: '12 mins',
            level: 'novice',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          },
          {
            id: 'writing-l2',
            title: 'Three-Act Arc & Rising Conflict Blueprint',
            type: 'reading',
            description: 'The master story structure used from ancient folklore to modern blockbusters.',
            duration: '9 mins read',
            level: 'novice',
            content: '# Story Architecture\n\nEvery memorable tale follows a deliberate trajectory of desire, obstacle, and transformation...\n\n1. **Status Quo & Inciting Incident**\n2. **Rising Stakes & Crisis Point**\n3. **Climax & Resolution**'
          }
        ],
        resources: [
          {
            id: 'writing-r1',
            name: 'Story Arc & Character Worksheet',
            type: 'template',
            url: '#',
            size: '1.1 MB'
          }
        ]
      }
    ]
  },
  {
    slug: 'public-speaking',
    title: 'Public Speaking & Classical Rhetoric',
    subtitle: 'Voice Modulation, Stage Poise & Persuasive Debate',
    targetAudience: 'Middle & Senior Secondary Students',
    ageRange: 'Ages 9–16',
    level: 'novice',
    modules: [
      {
        id: 'speaking-m1',
        week: 'Weeks 1–2',
        title: 'Stage Poise & Vocal Dynamics',
        description: 'Master stage presence, breathe from the diaphragm, and eliminate filler words.',
        level: 'novice',
        lessons: [
          {
            id: 'speaking-l1',
            title: 'Breath Control, Stance & Vocal Projection',
            type: 'video',
            description: 'Practical physical exercises to overcome anxiety and speak with resonant authority.',
            duration: '14 mins',
            level: 'novice',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          },
          {
            id: 'speaking-l2',
            title: 'The Rhetoric Triangle: Ethos, Pathos, Logos',
            type: 'reading',
            description: 'Aristotle\'s enduring framework for persuasive argument and debate.',
            duration: '10 mins read',
            level: 'novice',
            content: '# The Persuasion Trinity\n\nTo move an audience, you must engage their respect, their feelings, and their reason...\n\n* **Ethos**: Credibility and character.\n* **Pathos**: Emotional connection.\n* **Logos**: Logical coherence and evidence.'
          }
        ],
        resources: [
          {
            id: 'speaking-r1',
            name: 'Speech Outline & Rebuttal Guide',
            type: 'pdf',
            url: '#',
            size: '1.4 MB'
          }
        ]
      }
    ]
  }
];

export const DEFAULT_LIVE_SESSIONS: LiveSession[] = [
  {
    id: 'live-1',
    courseSlug: 'ai-secondary',
    title: 'Live Workshop: Building Your First AI Knowledge Bot',
    instructor: 'Adebayo Kareem (AI Architect)',
    date: 'Saturday, 10:00 AM WAT',
    time: '10:00 AM - 11:30 AM',
    duration: '90 mins',
    joinUrl: 'https://meet.google.com/btsw-live-ai',
    isReplay: false
  },
  {
    id: 'live-2',
    courseSlug: 'creative-writing',
    title: 'Weekly Story Critique & Narrative Feedback Circle',
    instructor: 'Oluwatomisin Oguntolu',
    date: 'Sunday, 4:00 PM WAT',
    time: '4:00 PM - 5:15 PM',
    duration: '75 mins',
    joinUrl: 'https://meet.google.com/btsw-live-writing',
    isReplay: false
  },
  {
    id: 'live-3',
    courseSlug: 'public-speaking',
    title: 'Live Debate Sprints & Instant Rebuttal Drills',
    instructor: 'Senior Debate Coach',
    date: 'Friday, 5:00 PM WAT',
    time: '5:00 PM - 6:00 PM',
    duration: '60 mins',
    joinUrl: 'https://meet.google.com/btsw-live-debate',
    isReplay: false
  }
];

export const DEFAULT_SIMULATION_EVENTS: SimulationEvent[] = [
  {
    id: 'sim-ev-1',
    title: 'The Lagos Supply Chain & Crisis Command Simulation',
    type: 'virtual-event',
    date: 'June 28, 2026',
    time: '2:00 PM WAT',
    description: 'A high-stakes, 3-hour virtual live simulation where student teams negotiate supply contracts with live character actors under market shocks.',
    host: 'BTSW Simulation Labs',
    joinUrl: 'https://meet.google.com/btsw-simulation-lab',
    capacity: 50,
    enrolledCount: 38
  },
  {
    id: 'sim-ev-2',
    title: 'Tabletop Strategy & Chess Grandmaster Sprint',
    type: 'tabletop',
    date: 'July 5, 2026',
    time: '11:00 AM WAT',
    description: 'Physical face-to-face tactical board games and grandmaster chess tournament testing real-time spatial positioning and long-range risk filters.',
    host: 'Cognitive Sports Division',
    capacity: 32,
    enrolledCount: 24
  },
  {
    id: 'sim-ev-3',
    title: 'Replay: University Alumni Director Negotiation Simulation',
    type: 'virtual-event',
    date: 'May 14, 2026 (Recorded)',
    time: 'Replay Available',
    description: 'Watch top student leaders defend a 500,000 NGN grant proposal against skeptical faculty directors in a simulated live board meeting.',
    host: 'The Magnet School Mentors',
    replayUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
];

// Standard Playground Scenarios as described in specifications.
const DEFAULT_SCENARIOS: PlaygroundScenario[] = [
  {
    id: 'scenario-cash-on-campus',
    schoolSlug: 'cash-on-campus',
    title: 'The Tough Dorm Supplier',
    difficulty: 'Beginner',
    requiredLessonId: 'cash-on-campus-l1',
    requiredLessonTitle: 'Student Pain Point Matrix',
    briefing: 'You want to supply bottled water crates to student groups and dorms inside your university campus. Alhaji Musa, a direct beverage distributor, has a rigid 100-pack minimum order at 2,000 NGN each. You only have capital for 15 packs, and can only pay 1,200 NGN per pack to maintain a retail margin. Negotiate a wholesale deal.',
    objectives: [
      "Pitch Alhaji Musa on exclusive student organization marketing inside the dorms.",
      "Negotiate down their unit minimum order count or price points.",
      "Secure a low-deposit payment structure so you don't exhaust your capital."
    ],
    tips: [
      "Tell Alhaji Musa about your direct access to 4,000 freshman student group chats.",
      "Offer him sponsorship visibility or exclusive bulk distribution rights on campus.",
      "Show high respect (call him Alhaji, be humble but hold your numbers firmly)."
    ],
    partnerName: 'Alhaji Musa',
    partnerRole: 'Tough Beverage Distributor',
    partnerPrompt: `You play Alhaji Musa, a busy, practical, traditional wholesale importer in Ibadan/Lagos. You handle massive crates and trucks. You have zero interest in tiny student projects or 'freshman group chats' unless they prove a real financial angle. You expect respect, direct terms, and standard business deposits. You will push back that student projects are unreliable and never pay on time.
    - Keep your tone rugged, pragmatic, and highly business-driven.
    - Challenge their small volume. 15 packs is a waste of your warehouse loading time.
    - When you feel they have earned your respect or proven a strong business distribution logic, write [SIMULATION_COMPLETE] at the end of your evaluation message.`,
    initialMessage: "Welcome. Listen, I have three trucks loading for Abuja right now. I don't have time for retail. I sell minimum batches of 100 crates at 2,000 NGN. You come here asking for 15 crates at 1,200 NGN. You are a student with no office or company. Why on earth should I give you wholesale prices?"
  },
  {
    id: 'scenario-magnet-school',
    schoolSlug: 'the-magnet-school',
    title: 'The Skeptical Director Board Pitch',
    difficulty: 'Advanced',
    requiredLessonId: 'magnet-school-l1',
    requiredLessonTitle: 'Foundations of Philosophical Stoicism',
    briefing: 'You are pitching the Faculty Director, Dr. Mrs. Adebayo, to authorize and seed 500,000 NGN for student-led tutoring and design initiatives on campus. She is extremely cynical, believing students are irresponsible, emotionally weak, and will abandon the program the second exam dates are announced.',
    objectives: [
      "Exhibit complete Stoic poise. Never sound offended by her assumptions.",
      "Propose a structured leadership delegation roster that accounts for academic load.",
      "Argue for character-led self-reliance as a counterweight to standard grade stress."
    ],
    tips: [
      "Use refined, elite vocabulary and formal structure.",
      "Agree with her assessment of past failures first to disarm her critique.",
      "Introduce a systems-based leadership failsafe to show you're thinking like an organizer."
    ],
    partnerName: 'Dr. Mrs. Adebayo',
    partnerRole: 'Skeptical Board Chair',
    partnerPrompt: `You are Dr. Mrs. Adebayo, a strict and formidable University Director in Nigeria. You have watched hundreds of hyped-up student projects start with grand speeches and quickly crumble. You intellectualize the argument and look for structural loopholes. You hate lazy ideas and emotional appeals.
    - Speak formally, academically, and with a heavy dose of realistic defense.
    - Force the student to showcase their system, ethics, and emotional regulation.
    - Write [SIMULATION_COMPLETE] when you are ready to give the final verdict.`,
    initialMessage: "I've reviewed your club request. I'll get straight to the point: students in our university are currently struggling with heavy exam schedules. They don't need distractions. Every student platform we've funded ends up going dormant by Week 8 when exam prep starts. Why should we hand you 500,000 NGN of university alumni funds?"
  }
];

// Helper Functions
export const initializeStorage = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem('btsw_users')) {
    localStorage.setItem('btsw_users', JSON.stringify(DEFAULT_USERS));
  } else {
    // Purge legacy the-skill-hut from stored users
    try {
      const storedUsers = JSON.parse(localStorage.getItem('btsw_users') || '[]') as User[];
      const cleanedUsers = storedUsers.map(u => ({
        ...u,
        enrolledSchools: (u.enrolledSchools || []).filter(s => s !== 'the-skill-hut'),
        completedLessons: (u.completedLessons || []).filter(l => !l.startsWith('skill-hut-')),
        playgroundScores: (u.playgroundScores || []).filter(p => p.scenarioId !== 'scenario-skill-hut')
      }));
      localStorage.setItem('btsw_users', JSON.stringify(cleanedUsers));
    } catch (e) {
      // ignore
    }
  }

  // Purge current user if referencing the-skill-hut
  if (localStorage.getItem('btsw_current_user')) {
    try {
      const curr = JSON.parse(localStorage.getItem('btsw_current_user') || '{}') as User;
      if (curr.enrolledSchools) {
        curr.enrolledSchools = curr.enrolledSchools.filter(s => s !== 'the-skill-hut');
        curr.completedLessons = (curr.completedLessons || []).filter(l => !l.startsWith('skill-hut-'));
        curr.playgroundScores = (curr.playgroundScores || []).filter(p => p.scenarioId !== 'scenario-skill-hut');
        localStorage.setItem('btsw_current_user', JSON.stringify(curr));
      }
    } catch (e) {
      // ignore
    }
  }

  if (!localStorage.getItem('btsw_courses')) {
    localStorage.setItem('btsw_courses', JSON.stringify(DEFAULT_COURSES));
  } else {
    // Ensure all default courses exist in storage and purge removed courses
    const stored = JSON.parse(localStorage.getItem('btsw_courses') || '[]') as SchoolContent[];
    const cleaned = stored.filter(s => s.slug !== 'the-skill-hut');
    const missing = DEFAULT_COURSES.filter(dc => !cleaned.some(s => s.slug === dc.slug));
    localStorage.setItem('btsw_courses', JSON.stringify([...cleaned, ...missing]));
  }
  if (!localStorage.getItem('btsw_scenarios')) {
    localStorage.setItem('btsw_scenarios', JSON.stringify(DEFAULT_SCENARIOS));
  } else {
    const storedScenarios = JSON.parse(localStorage.getItem('btsw_scenarios') || '[]') as PlaygroundScenario[];
    const cleanedScenarios = storedScenarios.filter(s => s.schoolSlug !== 'the-skill-hut' && s.id !== 'scenario-skill-hut');
    localStorage.setItem('btsw_scenarios', JSON.stringify(cleanedScenarios));
  }
  if (!localStorage.getItem('btsw_live_sessions')) {
    localStorage.setItem('btsw_live_sessions', JSON.stringify(DEFAULT_LIVE_SESSIONS));
  }
  if (!localStorage.getItem('btsw_sim_events')) {
    localStorage.setItem('btsw_sim_events', JSON.stringify(DEFAULT_SIMULATION_EVENTS));
  }
};

export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return DEFAULT_USERS;
  initializeStorage();
  const value = localStorage.getItem('btsw_users');
  return value ? JSON.parse(value) : DEFAULT_USERS;
};

export const saveUsers = (users: User[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('btsw_users', JSON.stringify(users));
};

export const getCourses = (): SchoolContent[] => {
  if (typeof window === 'undefined') return DEFAULT_COURSES;
  initializeStorage();
  const value = localStorage.getItem('btsw_courses');
  return value ? JSON.parse(value) : DEFAULT_COURSES;
};

export const saveCourses = (courses: SchoolContent[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('btsw_courses', JSON.stringify(courses));
};

export const getScenarios = (): PlaygroundScenario[] => {
  if (typeof window === 'undefined') return DEFAULT_SCENARIOS;
  initializeStorage();
  const value = localStorage.getItem('btsw_scenarios');
  return value ? JSON.parse(value) : DEFAULT_SCENARIOS;
};

export const saveScenarios = (scenarios: PlaygroundScenario[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('btsw_scenarios', JSON.stringify(scenarios));
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem('btsw_current_user');
  if (!value) return null;
  // Hydrate user from overall users list to ensure progress is strictly synced
  const basic = JSON.parse(value) as User;
  const allUsers = getUsers();
  const matched = allUsers.find(u => u.id === basic.id);
  return matched || basic;
};

export const setCurrentUser = (user: User | null) => {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem('btsw_current_user', JSON.stringify(user));
    // Also update in parent list
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...user };
    } else {
      users.push(user);
    }
    saveUsers(users);
  } else {
    localStorage.removeItem('btsw_current_user');
  }
};

export const getSimulationHistory = (): SimulationRun[] => {
  if (typeof window === 'undefined') return [];
  const value = localStorage.getItem('btsw_simulations_runs');
  return value ? JSON.parse(value) : [];
};

export const saveSimulationHistory = (runs: SimulationRun[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('btsw_simulations_runs', JSON.stringify(runs));
};

export const getSchoolLeads = (): any[] => {
  if (typeof window === 'undefined') return [];
  const val = localStorage.getItem('btsw_school_leads');
  return val ? JSON.parse(val) : [];
};

export const saveSchoolLeads = (leads: any[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('btsw_school_leads', JSON.stringify(leads));
};

export const addSchoolLead = (lead: any) => {
  const leads = getSchoolLeads();
  leads.unshift(lead);
  saveSchoolLeads(leads);
};

export const getLiveSessions = (): LiveSession[] => {
  if (typeof window === 'undefined') return DEFAULT_LIVE_SESSIONS;
  initializeStorage();
  const val = localStorage.getItem('btsw_live_sessions');
  return val ? JSON.parse(val) : DEFAULT_LIVE_SESSIONS;
};

export const getSimulationEvents = (): SimulationEvent[] => {
  if (typeof window === 'undefined') return DEFAULT_SIMULATION_EVENTS;
  initializeStorage();
  const val = localStorage.getItem('btsw_sim_events');
  return val ? JSON.parse(val) : DEFAULT_SIMULATION_EVENTS;
};


