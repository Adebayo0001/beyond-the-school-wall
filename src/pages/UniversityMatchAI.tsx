import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Landmark, GraduationCap, Coins, Search } from 'lucide-react';
import { callToolAI, ChatMessage } from '../lib/anthropic';

export default function UniversityMatchAI() {
  const [budget, setBudget] = useState('low');
  const [interest, setInterest] = useState('engineering');
  const [gpa, setGpa] = useState('excellent');
  const [launched, setLaunched] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleLaunch = async () => {
    setLaunched(true);
    setIsLoading(true);
    
    const initialPrompt = `Hi! I want to find the perfect university match. My budget tier is ${budget} budget, my primary academic interest relates to ${interest}, and my high school/UTME grading benchmark is ${gpa}. List some good matching options and clarify instructions.`;

    const initialHistory: ChatMessage[] = [
      { sender: 'student', text: initialPrompt, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];

    setChatHistory(initialHistory);

    const reply = await callToolAI('university-match', [], initialPrompt);
    
    setChatHistory([
      ...initialHistory,
      { sender: 'ai', text: reply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setIsLoading(false);
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg = inputText.trim();
    setInputText('');

    const newHistory: ChatMessage[] = [
      ...chatHistory,
      { sender: 'student', text: userMsg, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];

    setChatHistory(newHistory);
    setIsLoading(true);

    const reply = await callToolAI('university-match', chatHistory, userMsg);

    setChatHistory([
      ...newHistory,
      { sender: 'ai', text: reply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setIsLoading(false);
  };

  return (
    <div className="bg-white min-h-screen text-[#1e1e1e] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Banner Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff1eb] border border-[#F16736]/10 text-[#F16736] text-xs font-black tracking-widest uppercase">
            <Landmark size={14} /> Core Educational Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            University Match <span className="text-[#F16736]">AI</span>
          </h1>
          <p className="text-neutral-500 font-medium text-sm md:text-base leading-relaxed">
            Discover the best federal, state, and private institutions in Nigeria or overseas that match your academic track, budget boundaries, and long-term career goals.
          </p>
        </div>

        {/* Action Panel */}
        {!launched ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 border border-[#e8e5e0] rounded-[2.5rem] bg-[#faf9f7] space-y-8 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Selector 1 */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-neutral-600 tracking-wider">Annual Fee Budget</label>
                <select 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-4 bg-white border border-[#e8e5e0] rounded-2xl text-xs font-bold focus:border-[#F16736] focus:outline-none focus:ring-1 focus:ring-[#F16736]/20"
                >
                  <option value="low">Under 150,000 NGN (Federal/State)</option>
                  <option value="medium">150k - 800k NGN (Affordable Private)</option>
                  <option value="high">Above 800k NGN (Covenant / Babcock / Foreign)</option>
                </select>
              </div>

              {/* Selector 2 */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-neutral-600 tracking-wider">Interest Vertical</label>
                <select 
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full p-4 bg-white border border-[#e8e5e0] rounded-2xl text-xs font-bold focus:border-[#F16736] focus:outline-none focus:ring-1 focus:ring-[#F16736]/20"
                >
                  <option value="engineering">Engineering & Computer Science</option>
                  <option value="business">Business, Accounting & Finance</option>
                  <option value="medicine">Medicine, Nursing & Biology</option>
                  <option value="creative">Creative Design, Media & Law</option>
                </select>
              </div>

              {/* Selector 3 */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-neutral-600 tracking-wider">JAMB/UTME/WAEC Grade</label>
                <select 
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  className="w-full p-4 bg-white border border-[#e8e5e0] rounded-2xl text-xs font-bold focus:border-[#F16736] focus:outline-none focus:ring-1 focus:ring-[#F16736]/20"
                >
                  <option value="excellent">Very Strong (JAMB 280+ / WAEC A's)</option>
                  <option value="good">Competitive (JAMB 220+ / Credit WAEC)</option>
                  <option value="basic">Standard (JAMB 180+ / Basic WAEC Pass)</option>
                </select>
              </div>

            </div>

            <div className="pt-4 border-t border-[#e8e5e0]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-neutral-500 font-medium text-xs">
                <Sparkles size={16} className="text-[#F16736]" />
                <span>AI recommendation map updates as parameters shift.</span>
              </div>
              <button 
                onClick={handleLaunch}
                className="px-8 py-4 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-extrabold text-sm rounded-full transition-all flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              >
                Launch Match Assistant
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col border border-[#e8e5e0] rounded-[2.5rem] bg-white overflow-hidden shadow-lg h-[600px]"
          >
            {/* Header section */}
            <div className="p-4 bg-[#faf9f7] border-b border-[#e8e5e0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F16736]" />
                <span className="text-xs font-black uppercase tracking-wider text-neutral-600">Unified Uni Match Session</span>
              </div>
              <button 
                onClick={() => setLaunched(false)}
                className="text-xs font-extrabold text-[#F16736] hover:underline"
              >
                Review Preferences
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-neutral-50/50">
              {chatHistory.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'} animate-fade`}
                >
                  <div 
                    className={`max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed ${
                      msg.sender === 'student' 
                        ? 'bg-[#1e1e1e] text-white rounded-br-none' 
                        : 'bg-white text-neutral-800 border border-[#e8e5e0] rounded-bl-none shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line font-medium">{msg.text}</div>
                    <span className={`text-[9px] block text-right mt-1.5 font-bold ${msg.sender === 'student' ? 'text-zinc-400' : 'text-neutral-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-4 bg-white border border-[#e8e5e0] rounded-3xl rounded-bl-none shadow-sm text-neutral-500 font-medium text-xs flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#F16736] animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-[#F16736] animate-bounce delay-100" />
                    <div className="w-2 h-2 rounded-full bg-[#F16736] animate-bounce delay-200" />
                    <span>Mapping Universities...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input form */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-[#e8e5e0] flex items-center gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask details about UTME targets, host country options..."
                className="flex-1 px-4 py-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-sm focus:border-[#F16736] focus:outline-none font-medium"
              />
              <button 
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-3 bg-[#1e1e1e] hover:bg-[#F16736] text-white rounded-xl transition-all disabled:opacity-30 self-stretch flex items-center justify-center flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}

      </div>
    </div>
  );
}
