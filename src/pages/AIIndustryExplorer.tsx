import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Compass, Network, Cpu, FileSpreadsheet } from 'lucide-react';
import { callToolAI, ChatMessage } from '../lib/anthropic';

export default function AIIndustryExplorer() {
  const [industry, setIndustry] = useState('fintech');
  const [region, setRegion] = useState('nigeria');
  const [metric, setMetric] = useState('growth');
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
    
    const initialPrompt = `Hi! I want to explore the ${industry} industry in ${region}. Tell me about typical starting salaries, high growth subsectors, and necessary skills associated with the ${metric} metric.`;

    const initialHistory: ChatMessage[] = [
      { sender: 'student', text: initialPrompt, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];

    setChatHistory(initialHistory);

    const reply = await callToolAI('industry-explorer', [], initialPrompt);
    
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

    const reply = await callToolAI('industry-explorer', chatHistory, userMsg);

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
            <Compass size={14} /> Core Educational Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            AI Industry Explorer
          </h1>
          <p className="text-neutral-500 font-medium text-sm md:text-base leading-relaxed">
            Demystify modern technical fields. Find out which specific skills and toolchains are actually valued in sectors from digital finance to cold-chain agriculture.
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
                <label className="block text-xs font-black uppercase text-neutral-600 tracking-wider">Target Industry</label>
                <select 
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full p-4 bg-white border border-[#e8e5e0] rounded-2xl text-xs font-bold focus:border-[#F16736] focus:outline-none focus:ring-1 focus:ring-[#F16736]/20"
                >
                  <option value="fintech">FinTech & Payments Ecosystem</option>
                  <option value="agrotech">AgroTech Logistics & Supply Chain</option>
                  <option value="renewables">Solar Energy & CleanTech Infrastructure</option>
                  <option value="creatives">Creative Media, Post-Production & Ads</option>
                </select>
              </div>

              {/* Selector 2 */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-neutral-600 tracking-wider">Geography Target</label>
                <select 
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full p-4 bg-white border border-[#e8e5e0] rounded-2xl text-xs font-bold focus:border-[#F16736] focus:outline-none focus:ring-1 focus:ring-[#F16736]/20"
                >
                  <option value="nigeria">Lagos & Nigeria Tech Hubs</option>
                  <option value="ghana">Accra & Ghana Initiatives</option>
                  <option value="global">Remote International Matches</option>
                </select>
              </div>

              {/* Selector 3 */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-neutral-600 tracking-wider">Core Interest Metric</label>
                <select 
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                  className="w-full p-4 bg-white border border-[#e8e5e0] rounded-2xl text-xs font-bold focus:border-[#F16736] focus:outline-none focus:ring-1 focus:ring-[#F16736]/20"
                >
                  <option value="growth">Accelerated Market Growth</option>
                  <option value="jobs">Entry-Level Volume (Ease of Landing Roles)</option>
                  <option value="salaries">Highest Retainer Benchmarks</option>
                </select>
              </div>

            </div>

            <div className="pt-4 border-t border-[#e8e5e0]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-neutral-500 font-medium text-xs">
                <Sparkles size={16} className="text-[#F16736]" />
                <span>Provides detailed market trends and typical starting pay grades.</span>
              </div>
              <button 
                onClick={handleLaunch}
                className="px-8 py-4 bg-[#1e1e1e] hover:bg-[#F16736] text-white font-extrabold text-sm rounded-full transition-all flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              >
                Scan Industry Map
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
                <span className="text-xs font-black uppercase tracking-wider text-neutral-600">Active Scan Session</span>
              </div>
              <button 
                onClick={() => setLaunched(false)}
                className="text-xs font-extrabold text-[#F16736] hover:underline"
              >
                Choose Another Industry
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
                    <span>Analyzing Industry Cohorts...</span>
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
                placeholder="Ask about active startups, entry requirements, certifications..."
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
