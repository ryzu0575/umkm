import React, { useState } from 'react';
import { AppMode } from './types';
import { TOOLS, APP_NAME } from './constants';
import Hero from './components/Hero';
import FeatureCard from './components/FeatureCard';
import ChatInterface from './components/ChatInterface';
import ProductShowcase from './components/ProductShowcase';
import { LayoutGrid, Sparkles, MessageSquare } from 'lucide-react';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.HOME);

  // Filter tools to exclude CHAT from the grid (displayed separately or in navbar)
  const gridTools = Object.values(TOOLS).filter(t => t.id !== AppMode.CHAT);

  const renderContent = () => {
    if (currentMode === AppMode.HOME) {
      return (
        <>
          <Hero onStart={setCurrentMode} />
          
          <ProductShowcase />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-12 text-center">
              <span className="text-brand-600 font-semibold tracking-wide uppercase text-sm">Kapabilitas</span>
              <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Segala kebutuhan bisnis Anda
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
                Pilih modul untuk memulai dengan bantuan asisten AI khusus yang disesuaikan untuk kesuksesan UMKM.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridTools.map((tool) => (
                <FeatureCard 
                  key={tool.id} 
                  tool={tool} 
                  onClick={() => setCurrentMode(tool.id)} 
                />
              ))}
            </div>

            {/* Quick access general chat banner */}
            <div className="mt-16 bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                             <span className="bg-brand-500/20 text-brand-300 border border-brand-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                                Pusat Pengetahuan AI
                             </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Jawaban detail untuk pertanyaan kompleks</h3>
                        <p className="text-slate-300 max-w-lg">
                            Akses pusat pengetahuan komprehensif kami. Tanyakan tentang memulai bisnis, legalitas, izin, peraturan ekspor, pembiayaan, dan banyak lagi.
                        </p>
                    </div>
                    <button 
                        onClick={() => setCurrentMode(AppMode.CHAT)}
                        className="bg-white text-slate-900 hover:bg-brand-50 px-6 py-3 rounded-xl font-bold shadow-lg transition-colors flex items-center whitespace-nowrap"
                    >
                        <MessageSquare className="mr-2" size={20} />
                        Buka Pusat Pengetahuan
                    </button>
                </div>
            </div>
          </main>
        </>
      );
    }

    // If a specific mode is selected
    const activeTool = TOOLS[currentMode];
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)]">
         <ChatInterface 
            config={activeTool} 
            onBack={() => setCurrentMode(AppMode.HOME)} 
         />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentMode(AppMode.HOME)}>
              <div className="flex-shrink-0 flex items-center gap-2 text-brand-600">
                <LayoutGrid size={28} />
                <span className="font-bold text-xl tracking-tight text-slate-900">{APP_NAME}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
                {currentMode !== AppMode.HOME && (
                   <button 
                    onClick={() => setCurrentMode(AppMode.HOME)}
                    className="text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors"
                  >
                    Dashboard
                  </button>
                )}
                
                <button 
                  onClick={() => setCurrentMode(AppMode.CHAT)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                      currentMode === AppMode.CHAT 
                      ? 'bg-brand-100 text-brand-700' 
                      : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                  }`}
                  title="Pusat Pengetahuan"
                >
                    <Sparkles size={16} />
                    <span className="hidden sm:inline">Pusat Pengetahuan</span>
                </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow">
        {renderContent()}
      </div>

      {/* Footer */}
      {currentMode === AppMode.HOME && (
        <footer className="bg-white border-t border-slate-200 mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm text-slate-500">© 2024 {APP_NAME}. Hak Cipta Dilindungi.</p>
                    </div>
                    <div className="flex space-x-6 text-sm text-slate-400">
                        <a href="#" className="hover:text-slate-600">Kebijakan Privasi</a>
                        <a href="#" className="hover:text-slate-600">Syarat Layanan</a>
                        <a href="#" className="hover:text-slate-600">Kontak</a>
                    </div>
                </div>
            </div>
        </footer>
      )}
    </div>
  );
};

export default App;