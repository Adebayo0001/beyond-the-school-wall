import fs from 'fs';
import path from 'path';

const routes = [
  { path: 'app/page.tsx', component: 'Home', importFrom: '@/components/pages/Home' },
  { path: 'app/programs/page.tsx', component: 'Programs', importFrom: '@/components/pages/Programs' },
  { path: 'app/programs/cash-on-campus/page.tsx', component: 'CashOnCampus', importFrom: '@/components/pages/CashOnCampus' },
  { 
    path: 'app/programs/cash-on-campus/detail/page.tsx', 
    code: `import ProgramDetail from '@/components/pages/ProgramDetail';\n\nexport default function CashOnCampusDetailPage() {\n  return <ProgramDetail overrideSlug="cash-on-campus" />;\n}\n` 
  },
  { 
    path: 'app/programs/[slug]/page.tsx', 
    code: `import ProgramDetail from '@/components/pages/ProgramDetail';\n\nexport default async function ProgramDetailPage({\n  params,\n}: {\n  params: Promise<{ slug: string }>;\n}) {\n  const { slug } = await params;\n  return <ProgramDetail slug={slug} />;\n}\n` 
  },
  { path: 'app/login/page.tsx', component: 'Login', importFrom: '@/components/pages/Login' },
  { path: 'app/register/page.tsx', component: 'Register', importFrom: '@/components/pages/Register' },
  { path: 'app/portal/page.tsx', component: 'Portal', importFrom: '@/components/pages/Portal' },
  { path: 'app/portal/playground/page.tsx', component: 'Playground', importFrom: '@/components/pages/Playground' },
  { path: 'app/admin/page.tsx', component: 'Admin', importFrom: '@/components/pages/Admin' },
  { path: 'app/luminaire/page.tsx', component: 'Luminaire', importFrom: '@/components/pages/Luminaire' },
  { 
    path: 'app/luminaire/login/page.tsx', 
    code: `import Login from '@/components/pages/Login';\n\nexport default function LuminaireLoginPage() {\n  return <Login isLuminaire={true} />;\n}\n` 
  },
  { path: 'app/luminaire/portal/page.tsx', component: 'Luminaire', importFrom: '@/components/pages/Luminaire' },
  { path: 'app/career-path-ai/page.tsx', component: 'CareerPathAI', importFrom: '@/components/pages/CareerPathAI' },
  { path: 'app/game-based-learning/page.tsx', component: 'GameBasedLearning', importFrom: '@/components/pages/GameBasedLearning' },
  { path: 'app/thryb8/page.tsx', component: 'Thryb8', importFrom: '@/components/pages/Thryb8' },
  { path: 'app/tools/scholarship-finder/page.tsx', component: 'ScholarshipFinderAI', importFrom: '@/components/pages/ScholarshipFinderAI' },
  { path: 'app/tools/university-match/page.tsx', component: 'UniversityMatchAI', importFrom: '@/components/pages/UniversityMatchAI' },
  { path: 'app/tools/learnin-star/page.tsx', component: 'LearninStarAI', importFrom: '@/components/pages/LearninStarAI' },
  { path: 'app/tools/project-generator/page.tsx', component: 'AIProjectGenerator', importFrom: '@/components/pages/AIProjectGenerator' },
  { path: 'app/tools/industry-explorer/page.tsx', component: 'AIIndustryExplorer', importFrom: '@/components/pages/AIIndustryExplorer' },
  { path: 'app/tools/career-path/page.tsx', component: 'CareerPathAI', importFrom: '@/components/pages/CareerPathAI' },
  { path: 'app/events/catalyst-conference/page.tsx', component: 'CatalystConference', importFrom: '@/components/pages/CatalystConference' },
  { path: 'app/events/prefect-conference/page.tsx', component: 'PrefectConference', importFrom: '@/components/pages/PrefectConference' },
  { path: 'app/events/game-tech-convention/page.tsx', component: 'GameTechConvention', importFrom: '@/components/pages/GameTechConvention' },
  { path: 'app/echelon/page.tsx', component: 'EchelonProject', importFrom: '@/components/pages/EchelonProject' },
  { path: 'app/echelon/brain-game-training/page.tsx', component: 'VirtualSimulation', importFrom: '@/components/pages/VirtualSimulation' },
  { path: 'app/echelon/tabletop-games/page.tsx', component: 'TabletopGames', importFrom: '@/components/pages/TabletopGames' },
  { path: 'app/echelon-project-africa/simulation/page.tsx', component: 'VirtualSimulation', importFrom: '@/components/pages/VirtualSimulation' },
  { path: 'app/echelon-project-africa/tabletop/page.tsx', component: 'TabletopGames', importFrom: '@/components/pages/TabletopGames' },
];

for (const r of routes) {
  const fullPath = path.resolve(r.path);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let code = r.code;
  if (!code) {
    const fnName = path.basename(path.dirname(r.path)).replace(/[^a-zA-Z0-9]/g, '') + 'Page';
    const cleanFn = fnName === 'appPage' ? 'HomePage' : fnName.charAt(0).toUpperCase() + fnName.slice(1);
    code = `import ${r.component} from '${r.importFrom}';\n\nexport default function ${cleanFn}() {\n  return <${r.component} />;\n}\n`;
  }

  fs.writeFileSync(fullPath, code, 'utf8');
  console.log(`Created route: ${r.path}`);
}

console.log(`Successfully generated ${routes.length} Next.js route entrypoints.`);
