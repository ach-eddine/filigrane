import React from 'react';
import { Shield, Github, Lock, Cpu, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenSecurityModal: () => void;
  onOpenSampleModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSecurityModal }) => {
  return (
    <header className="w-full border-b border-[#e2e0d8] bg-[#fcf9f1]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Technical Schematic Node */}
        <div className="flex items-center gap-3.5">
          {/* Microchip / Schematic Icon Container */}
          <div className="w-11 h-11 rounded-xl bg-white border border-[#e2e0d8] shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex items-center justify-center relative group">
            {/* Coordinate dot-matrix crosshair */}
            <div className="w-6 h-6 rounded-lg bg-[#f0eee6] border border-[#e2e0d8] flex items-center justify-center">
              <div className="grid grid-cols-2 gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff542e]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#888882]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
              </div>
            </div>
            {/* Corner coordinate tick */}
            <span className="absolute -top-1 -left-1 text-[8px] font-mono text-[#888882] font-bold leading-none">+</span>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold font-heading tracking-tight text-[#0d0d0d]">
                Filigraneur
              </h1>
              
              {/* Telemetry Status Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#e2e0d8] text-[11px] font-mono font-bold text-[#0d0d0d]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff542e] animate-pulse" />
                <span>100% LOCAL</span>
              </div>
            </div>
            
            <p className="text-xs text-[#6b6b66] font-mono hidden sm:flex items-center gap-2 mt-0.5">
              <span>SYS.SPEC: CLIENT-SIDE AIRGAP WATERMARKING</span>
              <span className="text-[#888882]">•</span>
              <span className="text-[#888882]">ZERO-SERVER TRANSFER</span>
            </p>
          </div>
        </div>

        {/* Schematic Action Navigation */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Ghost Pill: Architecture & Security */}
          <button
            onClick={onOpenSecurityModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono font-medium text-[#0d0d0d] bg-white hover:bg-[#f6f4eb] border border-[#e2e0d8] hover:border-[#0d0d0d] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            title="Consulter l'architecture et les garanties de sécurité"
          >
            <Shield className="w-3.5 h-3.5 text-[#ff542e]" />
            <span className="hidden md:inline">Architecture & Sécurité</span>
            <span className="md:hidden">Sécurité</span>
          </button>

          {/* Primary Schematic Pill: GitHub Source */}
          <a
            href="https://github.com/ach-eddine/filigrane"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-white bg-[#0d0d0d] hover:bg-[#1c1b1b] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.08)] group"
          >
            {/* Left coral microchip prefix badge */}
            <div className="w-6 h-6 rounded-full bg-[#ff542e] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
              <Github className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline">Code Source</span>
            <span className="sm:hidden">GitHub</span>
          </a>
        </div>

      </div>
    </header>
  );
};
