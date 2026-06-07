import { User, SchoolContent, CourseModule, Lesson, CourseResource, PlaygroundScenario, SimulationRun } from '../types';

// Standard Initial Users
const DEFAULT_USERS: User[] = [
  {
    id: 'user-abidemi',
    name: 'Abidemi',
    email: 'student@btsw.com',
    password: 'password123',
    role: 'student',
    enrolledSchools: ['the-skill-hut', 'cash-on-campus'],
    completedLessons: ['skill-hut-l1', 'cash-on-campus-l1'],
    playgroundScores: [
      {
        scenarioId: 'scenario-skill-hut',
        score: 8,
        feedback: "Outstanding command of value-based pricing arguments. Your explanation of visual grid theory was sound, but you could negotiate even more assertively on upfront payment terms.",
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
    slug: 'the-skill-hut',
    title: 'The Skill Hut',
    modules: [
      {
        id: 'skill-m1',
        week: 'Weeks 1-2',
        title: 'Visual Hierarchy & Layout Psychology',
        description: 'Understanding color theory, negative space, and typographic scale. We train your eye to recognize high-end international digital assets.',
        lessons: [
          {
            id: 'skill-hut-l1',
            title: 'Figma Grids & Layout Hierarchy Principles',
            type: 'video',
            description: 'Master the 8px grid system and spatial margins to layout complex applications cleanly.',
            duration: '12 mins',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          },
          {
            id: 'skill-hut-l2',
            title: 'Analyzing High-End Typographic Scales',
            type: 'reading',
            description: 'A study on pairing type, tracking margins, and implementing golden ratios in digital UI.',
            duration: '8 mins read',
            content: '# Typographic Scale & Visual Balance\n\nTypography is 95% of digital design. Implementing a robust type hierarchy transforms generic pages into Swiss modernist structures...\n\n### The Rules of Scale:\n* Display Headings: Large tracking-tight font pairings.\n* Body spacing: 150% line-height to maximize scannability.\n* Neutral space: Allow content to breathe; avoid margin overload.'
          }
        ],
        resources: [
          {
            id: 'skill-r1',
            name: 'The Ultimate Figma Layout UI Kit',
            type: 'toolkit',
            url: '#',
            size: '14.2 MB'
          },
          {
            id: 'skill-r2',
            name: 'Typographic Pairings & Rulesheet',
            type: 'pdf',
            url: '#',
            size: '2.1 MB'
          }
        ]
      },
      {
        id: 'skill-m2',
        week: 'Weeks 3-4',
        title: 'Technical Translation & Execution',
        description: 'Converting Figma mockups into live, responsive, accessible web environments without getting bogged down by useless academic overhead.',
        lessons: [
          {
            id: 'skill-hut-l3',
            title: 'Responsive Semantic Styling with Tailwind CSS',
            type: 'video',
            description: 'A hands-on video illustrating mobile-first breakpoints and robust layout translation.',
            duration: '22 mins',
            content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          }
        ],
        resources: [
          {
            id: 'skill-r3',
            name: 'Responsive Layout Tailwind Cheat Sheet',
            type: 'template',
            url: '#',
            size: '1.5 MB'
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
  }
];

// Standard Playground Scenarios as described in specifications.
const DEFAULT_SCENARIOS: PlaygroundScenario[] = [
  {
    id: 'scenario-skill-hut',
    schoolSlug: 'the-skill-hut',
    title: 'The Skeptical Tech Client',
    difficulty: 'Intermediate',
    requiredLessonId: 'skill-hut-l1',
    requiredLessonTitle: 'Figma Grids & Layout Hierarchy Principles',
    briefing: 'A local Lagos startups tech founder, Damilola, is questioning your invoice estimate of $1,500 for a custom visual redesign. He claims his developers can just use a cheap $15 template to achieve the same business impact. You must professionally defend your pricing, explain design value, and secure the contract.',
    objectives: [
      "Argue design by business 'value' and conversions, not raw hours of drafting.",
      "Explain layout psychology (grid systems, typographic scale) to build extreme product confidence.",
      "Deflect their objection: 'Let's just copy this competitor's open-source UI.'"
    ],
    tips: [
      "Acknowledge their anxiety about costs, but pivot instantly to their SaaS trial drop-off numbers.",
      "Use technical terms like 'visual hierarchy', 'scannability barriers', and 'cognitive visual load' with absolute confidence.",
      "Be stoic, firm, and fully commercial. Do not offer immediate discounts."
    ],
    partnerName: 'Damilola',
    partnerRole: 'Skeptical Tech Start-up Client',
    partnerPrompt: `You are Damilola, a budget-conscious Web3/SaaS startup founder in Lagos. You have hired a young freelance digital designer (the student) to quote for your customer dashboard interface. They just quoted a flat $1,500. You think this is outrageously high because they're 'just aligning boxes'. You are fast-talking, skeptical, and slightly aggressive about costs. You will argue: 'Can't a standard Tailwind templates do this?' or 'Can't we just copy our competitor?'.
    - ONLY write your dialogue in brief, direct paragraphs like a real direct messaging conversation.
    - Stay 100% in character. DO NOT assist them. Challenge them on value, ROI, and design logic.
    - If they provide exceptional business justifications, acknowledge and push them for the delivery timeframe.
    - When they finish (after at least 3-4 messages) or when you feel the argument is resolved, if they ask you for a score or if the conversation wraps up, you will output: [SIMULATION_COMPLETE] with your evaluation.`,
    initialMessage: "Look, I got your invoice for $1,500. Honestly, visual layouts are just boxes and buttons. There are thousands of standard Tailwind UI blocks out there for $15 that look decent. Why should I pay you $1,500 for a custom file? Convince me this isn't a massive luxury expense."
  },
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
  if (!localStorage.getItem('btsw_users')) {
    localStorage.setItem('btsw_users', JSON.stringify(DEFAULT_USERS));
  }
  if (!localStorage.getItem('btsw_courses')) {
    localStorage.setItem('btsw_courses', JSON.stringify(DEFAULT_COURSES));
  }
  if (!localStorage.getItem('btsw_scenarios')) {
    localStorage.setItem('btsw_scenarios', JSON.stringify(DEFAULT_SCENARIOS));
  }
};

export const getUsers = (): User[] => {
  initializeStorage();
  const value = localStorage.getItem('btsw_users');
  return value ? JSON.parse(value) : [];
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem('btsw_users', JSON.stringify(users));
};

export const getCourses = (): SchoolContent[] => {
  initializeStorage();
  const value = localStorage.getItem('btsw_courses');
  return value ? JSON.parse(value) : [];
};

export const saveCourses = (courses: SchoolContent[]) => {
  localStorage.setItem('btsw_courses', JSON.stringify(courses));
};

export const getScenarios = (): PlaygroundScenario[] => {
  initializeStorage();
  const value = localStorage.getItem('btsw_scenarios');
  return value ? JSON.parse(value) : [];
};

export const saveScenarios = (scenarios: PlaygroundScenario[]) => {
  localStorage.setItem('btsw_scenarios', JSON.stringify(scenarios));
};

export const getCurrentUser = (): User | null => {
  const value = localStorage.getItem('btsw_current_user');
  if (!value) return null;
  // Hydrate user from overall users list to ensure progress is strictly synced
  const basic = JSON.parse(value) as User;
  const allUsers = getUsers();
  const matched = allUsers.find(u => u.id === basic.id);
  return matched || basic;
};

export const setCurrentUser = (user: User | null) => {
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
  const value = localStorage.getItem('btsw_simulations_runs');
  return value ? JSON.parse(value) : [];
};

export const saveSimulationHistory = (runs: SimulationRun[]) => {
  localStorage.setItem('btsw_simulations_runs', JSON.stringify(runs));
};
