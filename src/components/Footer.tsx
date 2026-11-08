import React from 'react';
import { Github, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-20 border-t border-[#e2e0d8] bg-[#fcf9f1] text-[#6b6b66] py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Author credits */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-1.5 text-[#0d0d0d] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#ff542e] animate-pulse" />
            <span>Créé par</span>
            <span className="font-bold text-[#0d0d0d]">achraf</span>
          </div>
        </div>

        {/* License & Commitments */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <span className="flex items-center gap-1 text-[#0d0d0d]">
            <Lock className="w-3.5 h-3.5 text-[#059669]" />
            0 COOKIE // 0 TRACKER
          </span>
          <span className="text-[#888882]">•</span>
          <a
            href="https://github.com/ach-eddine/filigrane"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#0d0d0d] hover:underline"
          >
            <Github className="w-3.5 h-3.5" />
            LICENCE AGPL-3.0
          </a>
        </div>

      </div>
    </footer>
  );
};
