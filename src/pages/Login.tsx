import { useState, FormEvent } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Wallet, LogIn, Mail, Lock, Shield, AlertCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { getUsers, setCurrentUser } from '../lib/storage';
import Logo from '../components/Logo';

interface LoginProps {
  isLuminaire?: boolean;
}

const Login = ({ isLuminaire = false }: LoginProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const users = getUsers();
    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (matchedUser) {
      // Check if trying to log into Luminaire and mismatching roles
      if (isLuminaire) {
        matchedUser.isLuminaireUser = true;
        matchedUser.luminaireTrack = matchedUser.luminaireTrack || 'middle';
      }
      
      setCurrentUser(matchedUser);
      if (matchedUser.role === 'admin') {
        navigate('/admin');
      } else if (isLuminaire) {
        navigate('/luminaire/portal');
      } else {
        navigate('/portal');
      }
    } else {
      setError('Invalid email address or passcode. Try student@btsw.com with password123 or admin@btsw.com with adminpassword.');
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setError(null);
    setTimeout(() => {
      // Simulate OAuth redirect or mock google user creation
      const mockGoogleEmail = isLuminaire ? 'kid.genius@gmail.com' : 'resourceful.mind@gmail.com';
      const users = getUsers();
      let matched = users.find((u) => u.email === mockGoogleEmail);

      if (!matched) {
        matched = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          name: isLuminaire ? 'Kid Genius' : 'Resourceful Student',
          email: mockGoogleEmail,
          role: 'student',
          enrolledSchools: isLuminaire ? [] : ['the-skill-hut', 'cash-on-campus'],
          completedLessons: isLuminaire ? [] : ['skill-hut-l1'],
          playgroundScores: [],
          streak: 1,
          isLuminaireUser: isLuminaire,
          luminaireTrack: 'high',
          joinedDate: new Date().toISOString().split('T')[0]
        };
        users.push(matched);
      }
      
      setCurrentUser(matched);
      setIsGoogleLoading(false);
      
      if (isLuminaire) {
        navigate('/luminaire/portal');
      } else {
        navigate('/portal');
      }
    }, 1200);
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${isLuminaire ? 'bg-[#faf9f7]' : 'bg-white'}`}>
      {/* Side Brand panel */}
      <div className={`hidden md:flex md:w-5/12 p-12 flex-col justify-between relative overflow-hidden ${isLuminaire ? 'bg-[#fff1eb] text-[#1e1e1e]' : 'bg-[#1e1e1e] text-white'}`}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #F16736 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />
        <Link to="/" className="flex items-center gap-2 z-10">
          <Logo className="h-10 w-auto" textClassName={`text-2xl font-black ${isLuminaire ? 'text-[#1e1e1e]' : 'text-white'}`} />
        </Link>

        <div className="space-y-6 z-10 max-w-sm">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#F16736]">
            {isLuminaire ? 'LUMINAIRE ACADEMY' : 'BEYOND THE SCHOOL WALL'}
          </span>
          <h2 className="text-4xl font-black leading-tight">
            {isLuminaire ? 'A friendlier pathway to real-world capability.' : 'Raise your execution bar.'}
          </h2>
          <p className={`text-sm leading-relaxed ${isLuminaire ? 'text-neutral-600' : 'text-zinc-400'}`}>
            {isLuminaire 
              ? 'Designed specifically for middle and high school students to explore practical skills early with a light, secure, game-like experience.' 
              : 'Our curriculum focuses on core Stoic character development, software design, and actual campus revenue streams.'
            }
          </p>
        </div>

        <div className={`text-[10px] uppercase tracking-widest font-mono ${isLuminaire ? 'text-neutral-400' : 'text-zinc-500'} z-10`}>
          © 2026 BTSW Nigeria • Educational Innovation Unit
        </div>
      </div>

      {/* Login Form panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-between items-center md:hidden">
            <Link to="/" className="flex items-center gap-2">
              <Logo className="h-8 w-auto" textClassName="text-xl text-[#1e1e1e]" />
            </Link>
            <Link to={isLuminaire ? '/luminaire' : '/'} className="text-xs font-bold text-neutral-500 flex items-center gap-1">
              <ArrowLeft size={14} /> Back
            </Link>
          </div>

          <div>
            <span className="text-xs font-black text-[#F16736] bg-[#fff1eb] border border-[#F16736]/10 px-3 py-1.5 rounded-full tracking-widest uppercase inline-block mb-4 shadow-sm">
              {isLuminaire ? 'Luminaire Student Space' : 'Main Academy Entrance'}
            </span>
            <h1 className="text-3xl font-black text-[#1e1e1e] tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-neutral-500 font-medium">
              Enter your credentials below to access your courses and AI Playground tasks.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-rose-800 text-xs font-medium">
              <AlertCircle size={16} className="text-rose-500 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-600 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="email"
                  required
                  placeholder="name@student.domain"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 border border-[#e8e5e0] rounded-2xl text-sm focus:border-[#F16736] focus:outline-none focus:ring-1 focus:ring-[#F16736]/30 font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-600">Password</label>
                <a href="#" className="text-xs font-bold text-[#F16736] hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 border border-[#e8e5e0] rounded-2xl text-sm focus:border-[#F16736] focus:outline-none focus:ring-1 focus:ring-[#F16736]/30 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-extrabold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98]"
            >
              <LogIn size={16} />
              Verify credentials & Log In
            </button>
          </form>

          {/* Google Login block */}
          <div className="space-y-4 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e8e5e0]"></div>
              </div>
              <span className="relative px-4 bg-white text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                Or secure log in
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full py-4 bg-[#faf9f7] border border-[#e8e5e0] hover:bg-[#1e1e1e] hover:border-[#1e1e1e] hover:text-white text-neutral-700 font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isGoogleLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#F16736] border-t-transparent rounded-full animate-spin" />
                  Verifying Account...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  Connect Google Account
                </>
              )}
            </button>
          </div>

          <div className="text-center text-xs font-semibold text-neutral-500 pt-2">
            Don't have a secure workspace?{' '}
            <Link to={isLuminaire ? `/luminaire/login` : '/register'} className="text-[#F16736] font-extrabold hover:underline">
              Create an account
            </Link>
          </div>

          {/* Quick Login Helpers for testing */}
          <div className="bg-[#faf9f7] p-4 rounded-2xl border border-dotted border-neutral-300">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#F16736] block mb-2 flex items-center justify-between">
              <span>Testing Accounts</span>
              <span>⚡ Easy Access</span>
            </span>
            <div className="space-y-1 text-[11px] text-neutral-600 font-mono">
              <div>Student: <span className="font-bold">student@btsw.com</span> / <span className="font-bold">password123</span></div>
              <div>Admin: <span className="font-bold">admin@btsw.com</span> / <span className="font-bold">adminpassword</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
