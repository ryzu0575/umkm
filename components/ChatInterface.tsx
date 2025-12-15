import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, AlertCircle, RefreshCw, Copy, Check } from 'lucide-react';
import { ChatMessage, ToolConfig } from '../types';
import { geminiService } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  config: ToolConfig;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ config, onBack }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    setMessages([
      {
        id: 'init-1',
        role: 'model',
        text: `Halo! Saya asisten ${config.title} Anda. ${config.description} Ada yang bisa saya bantu hari ini?`,
        timestamp: new Date()
      }
    ]);
  }, [config]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for context
    const history = messages.map(m => ({ role: m.role, text: m.text }));

    const result = await geminiService.generateResponse(
      text,
      config.systemInstruction,
      history
    );

    setIsLoading(false);

    if (result.error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi.",
        timestamp: new Date(),
        isError: true
      }]);
    } else {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: result.text,
        timestamp: new Date()
      }]);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3">
            <button onClick={onBack} className="text-slate-400 hover:text-slate-600 transition-colors" title="Kembali">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    {config.title}
                </h2>
                <p className="text-xs text-slate-500">Ditenagai oleh Gemini AI</p>
            </div>
        </div>
        <div className="hidden md:block">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                AI Aktif
            </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-indigo-600' : 'bg-brand-500'
              }`}>
                {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
              </div>

              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                    className={`relative p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                    } ${msg.isError ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
                >
                    {msg.role === 'model' ? (
                        <div className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-700 prose-strong:text-slate-900 prose-ul:list-disc prose-ul:pl-4">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                    ) : (
                        <p>{msg.text}</p>
                    )}
                    
                    {msg.role === 'model' && !msg.isError && (
                        <button 
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            className="absolute top-2 right-2 text-slate-300 hover:text-slate-500 transition-colors p-1"
                            title="Salin jawaban"
                        >
                            {copiedId === msg.id ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                    )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
             <div className="flex max-w-[80%] gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center animate-pulse">
                    <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts (only if no messages sent yet or last was from bot) */}
      {!isLoading && messages.length > 0 && messages[messages.length - 1].role === 'model' && (
          <div className="bg-slate-50 px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {config.suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="flex-shrink-0 px-3 py-1.5 bg-white border border-indigo-100 text-indigo-600 text-xs font-medium rounded-full hover:bg-indigo-50 transition-colors whitespace-nowrap shadow-sm"
                  >
                      {prompt}
                  </button>
              ))}
          </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2 items-center relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={config.promptPlaceholder}
            className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 block w-full p-3 pr-10 shadow-sm transition-all"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className={`p-3 rounded-xl transition-all shadow-md flex items-center justify-center ${
              input.trim() && !isLoading
                ? 'bg-brand-600 hover:bg-brand-700 text-white transform hover:scale-105'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? <RefreshCw className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;