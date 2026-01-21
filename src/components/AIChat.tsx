import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Minus, Trash2 } from 'lucide-react';
import { type ChatMessage } from '../types.ts';
import { generateAIResponse } from '../geminiService.ts';
import Typewriter from './Typewriter';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load history
    const saved = localStorage.getItem('portfolio_chat_history');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([{
        id: 'init',
        sender: 'ai',
        text: 'Greetings. I am Pepper. How can I assist you today?',
        timestamp: new Date()
      }]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('portfolio_chat_history', JSON.stringify(messages));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isTyping]);

  const handleReset = () => {
    const initialMsg: ChatMessage = {
      id: 'init',
      sender: 'ai',
      text: 'Greetings. I am Pepper. How can I assist you today?',
      timestamp: new Date()
    };
    setMessages([initialMsg]);
    setIsTyping(true);
    // Simulate re-initialization
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
    localStorage.removeItem('portfolio_chat_history');
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI delay and generation
    const response = await generateAIResponse(messages, userMsg.text);

    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: response,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 md:w-96 bg-slate-950 border border-indigo-500/30 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            style={{ boxShadow: '0 0 40px -10px rgba(79, 70, 229, 0.3)' }}
          >
            {/* Header */}
            <div className="p-3 bg-slate-900 border-b border-indigo-900/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Bot size={18} className="text-indigo-400" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-slate-900" />
                </div>
                <span className="text-indigo-100 font-mono text-sm tracking-wide">Pepper</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                  title="Reset Chat"
                >
                  <Trash2 size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white"><Minus size={16} /></button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-950" ref={scrollRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-2.5 rounded-lg text-sm whitespace-pre-wrap ${msg.sender === 'user'
                      ? 'bg-indigo-900/40 text-indigo-100 border border-indigo-700/50 font-mono'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 font-sans'
                      }`}
                  >
                    <span className="text-xs opacity-50 block mb-1">
                      {msg.sender === 'user' ? 'USER' : 'SYS'}
                    </span>
                    {msg.sender === 'ai' ? <Typewriter text={msg.text} speed={30} /> : msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl rounded-tl-none flex items-center gap-3">
                    <span className="text-xs text-indigo-400 font-mono animate-pulse">PROCESSING...</span>
                    <div className="flex gap-1 h-2 items-center">
                      <motion.div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} />
                      <motion.div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
                      <motion.div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length < 2 && (
              <div className="p-3 bg-slate-900/50 border-t border-indigo-900/30">
                <p className="text-xs text-slate-500 mb-2 font-mono">SUGGESTED COMMANDS:</p>
                <div className="flex flex-wrap gap-2">
                  {['Skills', 'Projects', 'About Me', 'Contact'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-md text-xs text-indigo-300 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-indigo-900/30">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Execute command..."
                  className="w-full bg-slate-950 text-indigo-100 rounded-md pl-3 pr-10 py-2 text-sm font-mono border border-slate-800 focus:border-indigo-500/50 focus:outline-none placeholder-slate-700"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 p-1 text-indigo-500 hover:text-indigo-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center border-2 border-indigo-500 shadow-lg shadow-indigo-500/30 overflow-hidden"
      >
        <div className="absolute inset-0 bg-indigo-500/20 group-hover:bg-indigo-500/40 transition-colors" />
        {/* Rotating Rings */}
        <div className="absolute inset-1 rounded-full border border-indigo-400/30 border-t-transparent animate-spin-slow" />
        <div className="absolute inset-2 rounded-full border border-cyan-400/30 border-b-transparent animate-spin-reverse-slower" />

        {isOpen ? <X className="text-white relative z-10" /> : <Bot className="text-white relative z-10" />}
      </motion.button>
    </div>
  );
};

export default AIChat;