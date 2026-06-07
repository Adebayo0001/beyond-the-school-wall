import { User, SchoolContent, Lesson } from '../types';

export interface DynamicScenarioSetup {
  schoolSlug: string;
  schoolTitle: string;
  simulationType: 'The Argument' | 'The Brief' | 'The Deal' | 'The Decision' | 'The Pitch';
  situation: string;
  characterName: string;
  characterRole: string;
  objectives: string[];
  openingMove: string;
  difficultyDescription: string;
  startingPressure: number; // based on course completion
  completedLessonsInfo: { title: string; concepts: string; skills: string }[];
}

export interface SimulationTurnResponse {
  environment_update: string;
  scenario_response: string;
  feedback: string[]; // exactly 3 points
  score: number; // running score out of 10
  objectives_status: boolean[]; // custom status for each of the objectives
  is_complete: boolean;
  surprise_event?: string; // a surprise event if triggered
}

// Extract completed lessons for a school
export function getCompletedLessonsForSchool(schoolSlug: string, user: User, courses: SchoolContent[]): Lesson[] {
  const school = courses.find((c) => c.slug === schoolSlug);
  if (!school) return [];
  
  const allLessons: Lesson[] = [];
  school.modules.forEach((mod) => {
    mod.lessons.forEach((les) => {
      allLessons.push(les);
    });
  });

  return allLessons.filter((les) => user.completedLessons.includes(les.id));
}

// Calculate course completion percentage and label week-level status
export function getSchoolCompletionStats(schoolSlug: string, user: User, courses: SchoolContent[]) {
  const school = courses.find((c) => c.slug === schoolSlug);
  if (!school) {
    return {
      total: 0,
      completed: 0,
      percentage: 0,
      availableWeeksLabel: 'Locked',
      isUnlocked: false,
    };
  }

  const isUnlocked = user.enrolledSchools.includes(schoolSlug);
  
  const allLessons: { id: string; weekName: string }[] = [];
  school.modules.forEach((mod) => {
    mod.lessons.forEach((les) => {
      allLessons.push({ id: les.id, weekName: mod.week });
    });
  });

  const total = allLessons.length;
  const completedList = allLessons.filter((les) => user.completedLessons.includes(les.id));
  const completedCount = completedList.length;
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  // Week availability capping text (e.g., "Simulation available up to Week 4 content")
  let availableWeeksLabel = 'No lessons finished';
  if (completedCount > 0) {
    // Find the latest week completed
    const completedWeeks = completedList.map((c) => c.weekName);
    if (completedWeeks.includes('Weeks 4-6') || completedWeeks.includes('Weeks 3-4')) {
      availableWeeksLabel = 'Simulation available up to Week 4+ content';
    } else {
      availableWeeksLabel = 'Simulation available up to Week 2 content';
    }
  }

  return {
    total,
    completed: completedCount,
    percentage,
    availableWeeksLabel,
    isUnlocked,
  };
}

// High Fidelity Mock Handler to give an exquisite local experience when CORS occurs or key is omitted
function getMockSetup(schoolSlug: string, completionPercent: number, completedLessons: Lesson[]): DynamicScenarioSetup {
  const schoolNames: Record<string, string> = {
    'the-magnet-school': 'The Magnet School',
    'the-skill-hut': 'The Skill Hut',
    'cash-on-campus': 'Cash On Campus',
    'the-mental-application-study': 'The Mental Application Study',
    'crash-course': 'Crash Course',
  };

  const simulationTypes: Record<string, 'The Argument' | 'The Brief' | 'The Deal' | 'The Decision' | 'The Pitch'> = {
    'the-magnet-school': 'The Argument',
    'the-skill-hut': 'The Brief',
    'cash-on-campus': 'The Deal',
    'the-mental-application-study': 'The Decision',
    'crash-course': 'The Pitch',
  };

  const lessonSummary = completedLessons.map((l) => ({
    title: l.title,
    concepts: l.description,
    skills: l.title.split(' ').slice(0, 3).join(' ') + ' execution',
  }));

  const textConcepts = completedLessons.map(l => l.title).join(', ') || 'foundation principles';

  // Specific content calibration based on complete lessons
  let situation = '';
  let characterName = '';
  let characterRole = '';
  let objectives: string[] = [];
  let openingMove = '';
  let difficultyDescription = '';
  const startingPressure = completionPercent <= 30 ? 25 : completionPercent <= 60 ? 50 : 85;

  const simType = simulationTypes[schoolSlug] || 'The Brief';

  if (schoolSlug === 'the-magnet-school') {
    difficultyDescription = completionPercent <= 50 ? 'Lighter Audience Resistance (Entry Stoic level)' : 'Formidable Audience Pushback (Complex Stoic + Dialectic level)';
    situation = `You are presenting your new student-led tutoring launch scheme at the Faculty board. The audience consists of skeptical departmental directors who are convinced you will quit when exam periods arrive. You have prepared using Stoic Poise and core logic.`;
    characterName = 'Dr. Mrs. Adebayo';
    characterRole = 'Director of Student Affairs & Faculty Chair';
    openingMove = `Welcome, student. I have read your proposal. Frankly, student platforms on this campus represent short-term entertainment. The moment exams get booked, your tutors will panic, your leaders will vanish, and parents will sue us. Explain how you expect to handle exam block exhaustion without sliding.`;
    objectives = [
      `Maintain unconditional Stoic emotional poise without getting offended or loud.`,
      `Detail a systematic reserve tutoring roster that covers the exam block gaps.`,
      `Connect character resilience directly to higher varsity GPAs, neutralizing her doubts.`
    ];
  } else if (schoolSlug === 'the-skill-hut') {
    difficultyDescription = completionPercent <= 50 ? 'Simple Visual Briefing (Week 1-2 Grid & Typography standards)' : 'Complex Client Scope Negotiation (Week 4 full web layout validation)';
    situation = `You are on a Zoom client review call with Damilola, a high-growth Web3 SaaS founder in Lagos who wants their signup dashboard redesigned. You proposed a flat $1,500 quote. He is actively questioning your invoice, insisting his intern can clone it onto a $15 theme.`;
    characterName = 'Damilola';
    characterRole = 'Budget-Conscious Web3 Tech Founder';
    openingMove = `Look, layout design is just boxes on a screen. Why on earth should I pay $1,500 for a custom file when we can buy a $15 template on ThemeForest? Make me understand how this translates to revenue.`;
    objectives = [
      `Argue design value from conversion optimization and page dropoff metrics, not labor hours.`,
      `Explain the geometric grid setup (using 8px system) to prove custom premium credibility.`,
      `Deflect his custom copying plans: explaining how clone products dilute venture capital trust.`
    ];
  } else if (schoolSlug === 'cash-on-campus') {
    difficultyDescription = completionPercent <= 50 ? 'Basic Inventory Deal (Cooperative micro-distributor level)' : 'Severe Capital Cracks Negotiation (Aggressive wholesalers margin push)';
    situation = `You are trying to secure a low-cost wholesale deal to lock beverage and snack crates for hostel delivery. You only have cash capital for 15 packs, but the distributor Alhaji Musa demands a 100-pack minimum order. Negotiate a partial drop scheme.`;
    characterName = 'Alhaji Musa';
    characterRole = 'Traditional Wholesale Importer';
    openingMove = `Welcome to my warehouse. I have four heavy trucks to load this morning. I don\'t do retail or student chats. Minimum order here is 100 crates. You come representing nothing. Why should I disrupt my packers for 15 crates?`;
    objectives = [
      `Greet Alhaji Musa with cultural respect and pitch direct dorm market placement.`,
      `Negotiate the unit rate down toward 1,200 NGN or reduce the first test minimum crates limit.`,
      `Set up a low-risk cash deposit scheme to protect your active student capital.`
    ];
  } else if (schoolSlug === 'the-mental-application-study') {
    difficultyDescription = 'High-Stakes Decision Matrix (Incomplete board data room)';
    situation = `The campus is suffering from severe attention dropoffs in week 6. You are in the Administrator\'s War Room pitching an Extreme Focus scheduling protocol. One document in your brief contains a mental blind-spot trap. Analyze and decide.`;
    characterName = 'Dr. Kunle';
    characterRole = 'Chief System Analyst';
    openingMove = `Our analytics clearly show that students are losing capacity to focus. Sentiment-based appeals won\'t save our board targets. Show me your neuro-focus protocols and prove they shield the brain from digital notification noise.`;
    objectives = [
      `Outline your daily block-time scheduling system backed by alpha-state rest waves.`,
      `Explain how you regulate neural dopamine and cortisol limits to increase executive focus.`,
      `Unmask the hidden statistical bias (blind-spot trap) presented inside the admin folders.`
    ];
  } else {
    difficultyDescription = 'Investor Pitch Room (Polish calibrated to study progress)';
    situation = `You are pitching a local zero-code WhatsApp automation logistics startup to venture partner Adaora. She is highly skeptical about competitors copying your scheduling layout.`;
    characterName = 'Partner Adaora';
    characterRole = 'Managing Partner at MicroVenture Capital';
    openingMove = `These micro student ideas sound fun. But why can\'t any standard tech house build this inside 4 hours? What is your structural moat and what is your 7-day validation proof?`;
    objectives = [
      `Present a neat 7-day client-side WhatsApp scheduling hack with no software overhead.`,
      `Propose a clean transactional margin split (flat 25%) to incentivize micro-operators.`,
      `Highlight how your dorm corridor relationship network acts as an organic distribution moat.`
    ];
  }

  return {
    schoolSlug,
    schoolTitle: schoolNames[schoolSlug] || 'VECTORS Arena',
    simulationType: simType,
    situation,
    characterName,
    characterRole,
    objectives,
    openingMove,
    difficultyDescription,
    startingPressure,
    completedLessonsInfo: lessonSummary,
  };
}

// Generate the scenario setup dynamically
export async function generateScenarioSetup(
  schoolSlug: string,
  user: User,
  courses: SchoolContent[]
): Promise<DynamicScenarioSetup> {
  const completedLessons = getCompletedLessonsForSchool(schoolSlug, user, courses);
  const stats = getSchoolCompletionStats(schoolSlug, user, courses);
  
  const apiKey = (import.meta as any).env?.VITE_ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === '') {
    return getMockSetup(schoolSlug, stats.percentage, completedLessons);
  }

  try {
    const lessonsDetailString = completedLessons
      .map((l, i) => `${i + 1}. Lesson: "${l.title}"\n   - Description: ${l.description}\n   - Materials studied: ${l.content.substring(0, 500)}...`)
      .join('\n\n');

    const prompt = `You are a curriculum-aligned simulation generator. Your task is to generate starting setup details for an educational role-play simulation session in a school program.
    
The student is enrolled in "${schoolSlug}".
Their course completion level is ${stats.percentage}%.
Here are the specific lessons they have ALREADY completed:
${lessonsDetailString}

You MUST calibrate the simulation to ONLY test concepts, frameworks, skills, and knowledge from these specific completed lessons. NEVER introduce content or terminology from modules the student hasn't reached yet!

Simulation Type format for this school slug is:
- "the-magnet-school" -> format: The Argument (defending Stoic posture and formal rhetoric logic in front of Dr. Mrs. Adebayo)
- "the-skill-hut" -> format: The Brief (defending design billing or UI grids layout standards to client Damilola)
- "cash-on-campus" -> format: The Deal (negotiating wholesale supply metrics with traditional distributor Alhaji Musa)
- "the-mental-application-study" -> format: The Decision (solving attention focus crises with incomplete folders before Dr. Kunle, with a blind-spot mental trap)
- "crash-course" -> format: The Pitch (pitching a WhatsApp scheduling proof of work model to VC partner Adaora)

Please return a robust JSON object containing the exact scenario setup calibration. The JSON must have these exact keys and format:
{
  "situation": "A concise paragraph detailing the physical or virtual setting, the context, and what's at stake",
  "character_name": "Name of the AI character they will speak with (use the official name corresponding to the school format)",
  "character_role": "Their professional title/role",
  "objectives": [
    "Objective 1: Actionable and directly verifiable based on studied lessons",
    "Objective 2: Detail...",
    "Objective 3: Detail..."
  ],
  "opening_move": "Their sharp opening statement (speech) addressing the student immediately and throwing a clear objection/question based on the student's completed lessons.",
  "difficulty_description": "A short level calibration line indicating the scope of concepts allowed (e.g. 'Fitted to Weeks 1-2 visual criteria')",
  "starting_pressure": 20 // integer between 10 and 100 based on course completion percent
}

Remember to output ONLY the valid JSON block. Do not add any conversational text before or after the JSON.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        system: "You are an automated curriculum simulator that generates JSON-only objects. Never write markdown conversation or preambles.",
        messages: [{ role: 'user', content: prompt }]
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic setup status error: ${response.status}`);
    }

    const data = await response.json();
    const replyText = data.content?.[0]?.text || '';
    
    // Parse the JSON blocks
    const match = replyText.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      
      const simTypes: Record<string, 'The Argument' | 'The Brief' | 'The Deal' | 'The Decision' | 'The Pitch'> = {
        'the-magnet-school': 'The Argument',
        'the-skill-hut': 'The Brief',
        'cash-on-campus': 'The Deal',
        'the-mental-application-study': 'The Decision',
        'crash-course': 'The Pitch',
      };

      return {
        schoolSlug,
        schoolTitle: schoolSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        simulationType: simTypes[schoolSlug] || 'The Brief',
        situation: parsed.situation,
        characterName: parsed.character_name,
        characterRole: parsed.character_role,
        objectives: parsed.objectives,
        openingMove: parsed.opening_move,
        difficultyDescription: parsed.difficulty_description,
        startingPressure: parsed.starting_pressure || 30,
        completedLessonsInfo: completedLessons.map(l => ({ title: l.title, concepts: l.description, skills: l.title.split(' ').slice(0, 3).join(' ') + ' execution' }))
      };
    }
    
    throw new Error("No JSON matching pattern back from Claude.");
  } catch (e) {
    console.warn("Generating setup failed, using offline high-fidelity simulator setup", e);
    return getMockSetup(schoolSlug, stats.percentage, completedLessons);
  }
}

// Generate simulated local responses for turns
export function generateLocalMockResponse(
  schoolSlug: string,
  completedLessons: Lesson[],
  stats: any,
  setup: DynamicScenarioSetup,
  history: any[],
  studentMessage: string,
  turnNumber: number
): SimulationTurnResponse {
  const lcMsg = studentMessage.toLowerCase();
  
  let score = 5.0;
  let feedback: string[] = [];
  let environment_update = "";
  let scenario_response = "";
  let is_complete = turnNumber >= 3;
  let surprise_event: string | undefined;

  // Let's analyze if they did specific actions
  const containsConcepts = completedLessons.some(l => 
    lcMsg.includes(l.title.toLowerCase().split(' ')[0]) || 
    lcMsg.includes(l.description.toLowerCase().split(' ')[0])
  );

  let scoreDelta = containsConcepts ? 1.8 : 0.8;
  score = Math.min(10, 5.0 + (turnNumber * scoreDelta));

  // Determine Objectives status
  const objectives_status = setup.objectives.map((obj, index) => {
    // Dynamically match if they mentioned things related to the goals
    if (index === 0 && (lcMsg.includes('value') || lcMsg.includes('focus') || lcMsg.includes('poise') || lcMsg.includes('respect') || lcMsg.includes('alhaji'))) {
      return true;
    }
    if (index === 1 && (lcMsg.includes('grid') || lcMsg.includes('roster') || lcMsg.includes('schedule') || lcMsg.includes('1,200') || lcMsg.includes('25%') || lcMsg.includes('dopamine'))) {
      return true;
    }
    if (index === 2 && (lcMsg.includes('conversion') || lcMsg.includes('conversions') || lcMsg.includes('trust') || lcMsg.includes('deposit') || lcMsg.includes('gpa') || lcMsg.includes('trap'))) {
      return true;
    }
    return turnNumber >= 2;
  });

  // Surprise event on turn 2
  if (turnNumber === 2) {
    if (schoolSlug === 'the-magnet-school') {
      surprise_event = "Sudden disruption! A board member reveals parents phoned complaining that leadership initiatives eat into study time. Respond elegantly.";
    } else if (schoolSlug === 'the-skill-hut') {
      surprise_event = "Instant objection! Client Damilola claims that speed is everything, and asks if you can do it half price if he supplies a competitor's exact files.";
    } else if (schoolSlug === 'cash-on-campus') {
      surprise_event = "Supply curveball! Alhaji Musa warns that another campus organization offered 2,000 NGN prepaid cash. Do you yield?";
    } else if (schoolSlug === 'the-mental-application-study') {
      surprise_event = "System failure! A dopamine crash triggers low focus across hostels. Pivot your scheduling block model now.";
    } else {
      surprise_event = "Venture lock! Launch partner Adaora mentions a competing startup in Nigeria just filed a similar scheduling utility.";
    }
  }

  if (schoolSlug === 'the-magnet-school') {
    if (turnNumber === 1) {
      environment_update = "Dr. Mrs. Adebayo leans backward, checking your emotional breathing balance in the meeting area.";
      scenario_response = `I hear your rhetoric about active character self-reliance, young lead. It is neat. But you cannot bypass academic fact: students fail exam grades because they are disorganized. Who monitors the quality of your tutor schedules during finals?`;
      feedback = [
        "Excellent breathing posture! You managed to agree with her structural critiques without getting defensive.",
        "To increase your score, try to detail your peer-ledger system to prove accountability.",
        "Framework to try: Use 'Stoic objective boundaries' to distinguish personal GPAs from group support."
      ];
    } else {
      environment_update = "The room falls into a quiet hush. One secretary opens their ledger to take notes.";
      scenario_response = `Your system is surprisingly rigorous. I appreciate that you are taking extreme owner authority over student failures. Let\'s lock down the direct seed funding of 500,000 NGN with a weekly audit report. Please sign.`;
      feedback = [
        "Unbelievable Stoic command! You handled the sudden parent disruption flawlessly using system metrics.",
        "You firmly held the character-building theme as a functional aid to GPAs.",
        "Great execution. You have proven deep mastery over Weeks 1-3 content."
      ];
    }
  } else if (schoolSlug === 'the-skill-hut') {
    if (turnNumber === 1) {
      environment_update = "Damilola shares his screen, illustrating a generic free theme he downloaded online.";
      scenario_response = `See this landing layout? It is clean and cost zero naira. Web3 users only care about deposit speed, not your typographic ratios. Why should we invest $1,500 on custom Figma grid alignments?`;
      feedback = [
        "Stellar focus pointing out that template copies dilute visual authority for tech brands.",
        "Excellent explanation of scannability paths. You taught him how visual balance stops user bounce.",
        "Next concept to try: Pivot to '8px layout grids boundaries' to secure code transition confidence."
      ];
    } else {
      environment_update = "Damilola terminates his screen share and starts checking his corporate calendar.";
      scenario_response = `Okay, the visual layout argument is bulletproof. I don't want us looking like a cheap copycat to Lagos venture funds. I'll authorize the $1,500 budget with a 50% upfront retainer deposit. Provide your payment lines.`;
      feedback = [
        "World-class value anchor maintained! You secured the full redesign invoice without giving double discounts.",
        "Pragmatic translation pairing the 8px grid system to their actual conversion signups.",
        "Milestone reached. Click Save to log this design contract."
      ];
    }
  } else if (schoolSlug === 'cash-on-campus') {
    if (turnNumber === 1) {
      environment_update = "Alhaji Musa sips cold water and watches your numbers on his clipboard ledger.";
      scenario_response = `Direct access to freshman groups sounds fine, but direct marketing does not load my dispatch boxes. I need inventory speed. If I give you 15 crates, how do I know I will see the cash?`;
      feedback = [
        "Deeply respectful greeting (using Alhaji Musa). Nigerian trade anchors open on cultural honor.",
        "Clear leverage illustration showing how freshmen dormitory channels bypass standard billboards.",
        "Pragmatic pivot: Try proposing an order-flow pre-sale block to secure payment."
      ];
    } else {
      environment_update = "Alhaji Musa stamps your order book sheet, stamping the deal ledger with his ink mark.";
      scenario_response = `Your trading logic is sharp. You didn\'t bend when the competitor tried to block you. I will let you lift 15 packs of water at 1,350 NGN with a partial invoice deposit. Carry on, young trader!`;
      feedback = [
        "Brilliant arbitrage defense. You secured wholesale pricing margins on a tiny batch quota.",
        "You held your retail price target firms while keeping the supplier cooperative.",
        "Completed! You showed full cash-on-campus distribution proficiency."
      ];
    }
  } else if (schoolSlug === 'the-mental-application-study') {
    if (turnNumber === 1) {
      environment_update = "The war room digital displays flicker. Dr. Kunle taps his electronic stylus.";
      scenario_response = `Focus levels are critical. But student bodies resist strict schedules. If your neuro-blocks are too painful, they will discard them. How does block-time accommodate sudden family or academic emergency shocks?`;
      feedback = [
        "Incredible scientific alignment describing alpha-state cortisol depletion cycles.",
        "You properly unmasked the cognitive blind spot trap presented inside the folders.",
        "To maximize score, define a flexible 10% reserve rest-ratio."
      ];
    } else {
      environment_update = "Systems show stable attention indices across dorm arrays.";
      scenario_response = `This attention optimization system is highly functional. We will implement this focus shield across the academic council portals. Congratulations!`;
      feedback = [
        "Great unmasking of the blind spot bias in the data brief.",
        "Excellent response handling the sudden dopamine crisis shock.",
        "Simulation resolved. You scored an amazing ${score}/10."
      ];
    }
  } else {
    if (turnNumber === 1) {
      environment_update = "Partner Adaora shifts her browser window to review some competitive pricing lists.";
      scenario_response = `These scheduling apps are everywhere. Why should we invest rapid validation capital when other founders can clone your layouts? Prove your unique margin advantage.`;
      feedback = [
        "Brilliant detail of the 7-day zero-code validation hack.",
        "Great demonstration showing that corridor word-of-mouth is your strongest moat.",
        "Pitch structure: Anchor flat commission schedules rather than custom subscriptions."
      ];
    } else {
      environment_update = "Adaora closes her computer and extends her hand with a smile.";
      scenario_response = `Your zero-overhead WhatsApp schedule model is elegant. You have proven direct demand traction with zero code cost. I'm backing this sprint validation program.`;
      feedback = [
        "Exceptional pitch! You demonstrated clear, resource-efficient market sizing.",
        "Calibrated expected return rate perfectly to your current study progress.",
        "Success. Click Save to upload your pitch certificate!"
      ];
    }
  }

  return {
    environment_update,
    scenario_response,
    feedback,
    score: Number(score.toFixed(1)),
    objectives_status,
    is_complete,
    surprise_event,
  };
}

// Core simulation turn sender
export async function sendSimulationTurn(
  schoolSlug: string,
  user: User,
  courses: SchoolContent[],
  setup: DynamicScenarioSetup,
  history: { sender: 'ai' | 'student'; text: string; timestamp: string }[],
  newStance: string
): Promise<SimulationTurnResponse> {
  const completedLessons = getCompletedLessonsForSchool(schoolSlug, user, courses);
  const stats = getSchoolCompletionStats(schoolSlug, user, courses);
  const turnCount = history.filter(h => h.sender === 'student').length + 1;

  const apiKey = (import.meta as any).env?.VITE_ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === '') {
    return generateLocalMockResponse(schoolSlug, completedLessons, stats, setup, history, newStance, turnCount);
  }

  try {
    const lessonsDetailString = completedLessons
      .map((l, i) => `- Lesson: "${l.title}"\n  Concepts: ${l.description}\n  Studied rules: ${l.content.substring(0, 300)}...`)
      .join('\n\n');

    // Build system instructions dynamically
    const systemInstruction = `You are playing ${setup.characterName}, whose role is ${setup.characterRole} in the educational simulation type: ${setup.simulationType}. 
Always stay 100% in character under any circumstances. Never break frame.

CRITICAL CURRICULUM BOUNDARY:
The student has completed exactly these lessons in this course program:
${lessonsDetailString}

You MUST ONLY test the student on concepts, frameworks, skills, and knowledge from these specific completed lessons. NEVER introduce, quiz, or request knowledge of frameworks, math formulas, rules, or design strategies taught in uncompleted weeks!
If the student study completion is low (e.g. they only completed Week 1 or 2), the level of complexity must remain lighter and cooperative. If they have completed more, escalate the complexity and pressure to match!

CORE OBJECTIVES TO VERIFY (Dynamic):
${setup.objectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

DIRECTIONS:
- Calibrate the characters behavior to be challenging and realistic.
- Calibrate difficulty. Starting pressure level: ${setup.startingPressure}/100.
${turnCount === 2 ? `- INTRODUCE A SUDDEN SURPRISE EVENT mid-simulation immediately related to the lesson content (e.g., severe client objection, supplier curveball, blind-spot document crisis, etc.). Include details in your response.` : ''}

CRITICAL: Return a structured JSON response AFTER EVERY STUDENT INPUT. 
Your output MUST be a VALID JSON object with these EXACT keys:
{
  "environment_update": "A descriptive narration of changes in the visual and atmospheric environment or character body posture / charts (e.g., 'Damilola leans forward, cutting his phone call...'). Keep it extremely immersive.",
  "scenario_response": "The characters dialogue or physical reaction spoken in dialogue format. Rooted strictly in the skills and concepts the student should know from completed lessons.",
  "feedback": [
    "Point 1: Exactly what they applied correctly from completed lessons, citing lessons specifically.",
    "Point 2: Exactly what they missed that they should know from completed lessons.",
    "Point 3: Which specific concept or framework from their completed lessons to try next on their next turn."
  ],
  "score": 6.5, // Float out of 10.0 running score on how well they are applying what they studied.
  "objectives_status": [true, false, false], // Array of booleans of size matching setup.objectives tracking whether they have hit each objective.
  "is_complete": false // Set to true ONLY if they completed 3-4 turns or if they successfully resolved the simulation goals.
}

Output ONLY the raw JSON block. Do not write text wrapping the JSON.`;

    const chatPayload = [
      ...history.map((m) => ({
        role: m.sender === 'student' ? 'user' as const : 'assistant' as const,
        content: m.text,
      })),
      {
        role: 'user' as const,
        content: newStance,
      },
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: systemInstruction,
        messages: chatPayload,
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic status error: ${response.status}`);
    }

    const data = await response.json();
    const replyText = data.content?.[0]?.text || '';
    
    const match = replyText.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      
      let surprise_event: string | undefined;
      // If we are on turn 2 and they didn't explicitly return surprise_event key, we can pull it or mock it
      if (turnCount === 2) {
        surprise_event = parsed.surprise_event || "OBJECTION INSTANT: Character suddenly raises standard cost barrier. Pivot your valuation argument!";
      }

      return {
        environment_update: parsed.environment_update,
        scenario_response: parsed.scenario_response,
        feedback: parsed.feedback || [],
        score: parsed.score || 5.0,
        objectives_status: parsed.objectives_status || [false, false, false],
        is_complete: parsed.is_complete || turnCount >= 3,
        surprise_event: parsed.surprise_event || surprise_event,
      };
    }

    throw new Error("Match failed for JSON format.");
  } catch (err) {
    console.warn("API turn failed, using local fallback turn generation.", err);
    return generateLocalMockResponse(schoolSlug, completedLessons, stats, setup, history, newStance, turnCount);
  }
}
