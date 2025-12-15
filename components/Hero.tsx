import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AppMode } from '../types';

interface HeroProps {
  onStart: (mode: AppMode) => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white pb-20 pt-10 sm:pt-16">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/50 border border-brand-700/50 text-brand-300 text-xs font-medium backdrop-blur-sm">
                <Sparkles size={12} />
                <span>Mesin Pertumbuhan UMKM Berbasis AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Kembangkan Bisnis dengan Wawasan <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-indigo-300">Cerdas</span>
            </h1>
            
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
              Dari ide hingga ekspor, MitraUMKM menyediakan alat yang Anda butuhkan untuk membangun, mengelola, dan mengembangkan usaha. Dapatkan rencana bisnis instan, panduan legalitas, dan strategi pasar dalam genggaman.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onStart(AppMode.CHAT)}
                className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold rounded-xl text-white bg-brand-600 hover:bg-brand-500 transition-all shadow-lg hover:shadow-brand-500/25 transform hover:-translate-y-1"
              >
                Tanya Asisten AI
                <ArrowRight className="ml-2 -mr-1" size={18} />
              </button>
              <button 
                onClick={() => onStart(AppMode.BUSINESS_PLAN)}
                className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold rounded-xl text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm transition-all"
              >
                Buat Rencana Bisnis
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl p-6 animate-float">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-brand-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">AI</div>
                        <div className="bg-slate-800 p-3 rounded-lg rounded-tl-none text-sm text-slate-300 border border-slate-700">
                           Berdasarkan info Anda, berikut adalah celah pasar potensial untuk kemasan ramah lingkungan di Indonesia...
                        </div>
                    </div>
                    <div className="flex gap-4 items-start flex-row-reverse">
                         <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">Anda</div>
                        <div className="bg-indigo-600 p-3 rounded-lg rounded-tr-none text-sm text-white">
                            Wah menarik! Bisakah buatkan proposal pendanaan untuk ide ini?
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-brand-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">AI</div>
                        <div className="bg-slate-800 p-3 rounded-lg rounded-tl-none text-sm text-slate-300 border border-slate-700">
                           <div className="flex items-center gap-2 mb-2">
                               <span className="w-20 h-2 bg-slate-600 rounded"></span>
                               <span className="w-10 h-2 bg-slate-600 rounded"></span>
                           </div>
                           <div className="w-full h-2 bg-slate-700 rounded mb-1"></div>
                           <div className="w-4/5 h-2 bg-slate-700 rounded mb-1"></div>
                           <div className="w-full h-2 bg-slate-700 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Curve divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none text-slate-50">
        <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;