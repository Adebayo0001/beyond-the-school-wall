import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Portal from './pages/Portal';
import Playground from './pages/Playground';
import Admin from './pages/Admin';
import Luminaire from './pages/Luminaire';

// Middle & High school programs
import CareerPathAI from './pages/CareerPathAI';
import GameBasedLearning from './pages/GameBasedLearning';
import Thryb8 from './pages/Thryb8';

// Tools pages
import ScholarshipFinderAI from './pages/ScholarshipFinderAI';
import UniversityMatchAI from './pages/UniversityMatchAI';
import LearninStarAI from './pages/LearninStarAI';
import AIProjectGenerator from './pages/AIProjectGenerator';
import AIIndustryExplorer from './pages/AIIndustryExplorer';

// Events pages
import CatalystConference from './pages/CatalystConference';
import PrefectConference from './pages/PrefectConference';
import GameTechConvention from './pages/GameTechConvention';

// Echelon Project Africa pages
import EchelonProject from './pages/EchelonProject';
import VirtualSimulation from './pages/VirtualSimulation';
import TabletopGames from './pages/TabletopGames';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:slug" element={<ProgramDetail />} />
        
        {/* Authentication Gateways */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Student Ecosystems */}
        <Route path="/portal" element={<Portal />} />
        <Route path="/portal/playground" element={<Playground />} />
        
        {/* Director Panel */}
        <Route path="/admin" element={<Admin />} />
        
        {/* Luminaire Virtual Academy */}
        <Route path="/luminaire" element={<Luminaire />} />
        <Route path="/luminaire/login" element={<Login isLuminaire={true} />} />
        <Route path="/luminaire/portal" element={<Luminaire />} />

        {/* Middle & High School Tracks */}
        <Route path="/career-path-ai" element={<CareerPathAI />} />
        <Route path="/game-based-learning" element={<GameBasedLearning />} />
        <Route path="/thryb8" element={<Thryb8 />} />

        {/* Tools Pathways */}
        <Route path="/tools/scholarship-finder" element={<ScholarshipFinderAI />} />
        <Route path="/tools/university-match" element={<UniversityMatchAI />} />
        <Route path="/tools/learnin-star" element={<LearninStarAI />} />
        <Route path="/tools/project-generator" element={<AIProjectGenerator />} />
        <Route path="/tools/industry-explorer" element={<AIIndustryExplorer />} />
        <Route path="/tools/career-path" element={<CareerPathAI />} />

        {/* Events Pathways */}
        <Route path="/events/catalyst-conference" element={<CatalystConference />} />
        <Route path="/events/prefect-conference" element={<PrefectConference />} />
        <Route path="/events/game-tech-convention" element={<GameTechConvention />} />

        {/* Echelon Project Africa Pathways */}
        <Route path="/echelon" element={<EchelonProject />} />
        <Route path="/echelon/brain-game-training" element={<VirtualSimulation />} />
        <Route path="/echelon/tabletop-games" element={<TabletopGames />} />
      </Routes>
    </Layout>
  );
}
