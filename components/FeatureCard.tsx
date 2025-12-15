import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ToolConfig } from '../types';

interface FeatureCardProps {
  tool: ToolConfig;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ tool, onClick }) => {
  // Dynamic Icon rendering
  const IconComponent = (LucideIcons as any)[tool.icon] || LucideIcons.HelpCircle;

  return (
    <button 
      onClick={onClick}
      className="group relative flex flex-col items-start text-left bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
         <IconComponent size={80} className="text-brand-600" />
      </div>

      <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-500 transition-colors duration-300">
        <IconComponent size={24} className="text-brand-600 group-hover:text-white transition-colors duration-300" />
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-brand-600 transition-colors">
        {tool.title}
      </h3>
      
      <p className="text-sm text-slate-500 leading-relaxed mb-4">
        {tool.description}
      </p>

      <span className="mt-auto inline-flex items-center text-sm font-medium text-brand-600 group-hover:text-brand-700">
        Mulai Sekarang 
        <LucideIcons.ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
};

export default FeatureCard;