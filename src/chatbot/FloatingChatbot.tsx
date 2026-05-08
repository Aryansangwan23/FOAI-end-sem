import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Trash2, MessageSquare } from 'lucide-react';
import { ChatMessage } from '../types';
import { useData } from '../context/DataContext';

export const FloatingChatbot = (): JSX.Element => {
  const { currentISS, astronauts, news } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatbot_history');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: "Systems Online. I am the A.I.D.A unit. Ask me about the ISS telemetry, astronauts, or latest space news.",
        timestamp: Date.now()
      }]);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot_history', JSON.stringify(messages.slice(-30)));
    }
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const clearChat = () => {
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: "Memory cleared. How can I assist you?",
      timestamp: Date.now()
    }]);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      if (!apiKey) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: 'OpenRouter API Key missing. Set VITE_OPENROUTER_API_KEY in .env', timestamp: Date.now() }]);
        setIsTyping(false);
        return;
      }

      const systemPrompt = 'You are A.I.D.A, a helpful AI assistant on a live ISS Tracker Dashboard. Here is real-time data: ' +
        'ISS Location: Lat ' + (currentISS?.latitude || 'N/A') + ', Lon ' + (currentISS?.longitude || 'N/A') + ', Speed ' + (currentISS?.speed?.toFixed(0) || '27600') + ' km/h. ' +
        'Astronauts in space: ' + astronauts.length + ' total (' + astronauts.map(a => a.name).join(', ') + '). ' +
        'Latest News: ' + news.slice(0, 3).map(n => n.title).join(' | ') + '. ' +
        'ONLY answer based on this data. Politely decline unrelated questions. Be concise and friendly.';

      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openrouter/auto',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMsg.content }
          ],
          max_tokens: 200,
          temperature: 0.3
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('OpenRouter error:', res.status, errorData);
        throw new Error('API error ' + res.status + ': ' + (errorData?.error?.message || JSON.stringify(errorData)));
      }

      const data = await res.json();
      const aiText = data.choices?.[0]?.message?.content?.trim() || 'No response.';

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: aiText, timestamp: Date.now() }]);
    } catch (error: any) {
      console.error('Chatbot error:', error);
      const errorMsg = error?.message || 'Unknown error';
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: 'Error: ' + errorMsg, timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 p-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-cyan-500/50 shadow-lg z-50 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] dark:bg-slate-900/95 bg-white/95 backdrop-blur-xl dark:border-slate-700 border-slate-200 border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/50">
              <div className="flex items-center gap-3">
                <Bot className="text-cyan-400" />
                <div>
                  <h3 className="font-semibold text-slate-100">A.I.D.A. Core</h3>
                  <p className="text-xs text-cyan-400 animate-pulse">Online</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={clearChat} className="text-slate-400 hover:text-red-400 transition-colors" title="Clear Chat">
                  <Trash2 size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-200 transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-cyan-600/20 text-cyan-100 border border-cyan-500/30 rounded-br-none' : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-3 text-cyan-400 rounded-2xl border border-slate-700 rounded-bl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-700 bg-slate-800/30 relative">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Query database..."
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl py-2.5 pl-4 pr-10 focus:outline-none focus:border-cyan-500/50 text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-cyan-500 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
