import React, { useState, useEffect } from 'react';
import { ShieldCheck, Wifi, WifiOff, Cpu, Terminal, ArrowRight } from 'lucide-react';

export const SecurityPill: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="w-full bg-white border border-[#e2e0d8] rounded-2xl p-4 sm:p-5 mb-8 relative shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
      {/* Schematic corner ticks */}
      <span className="absolute top-1.5 left-2 text-[9px] font-mono text-[#888882] select-none">+</span>
      <span className="absolute top-1.5 right-2 text-[9px] font-mono text-[#888882] select-none">+</span>
      <span className="absolute bottom-1.5 left-2 text-[9px] font-mono text-[#888882] select-none">+</span>
      <span className="absolute bottom-1.5 right-2 text-[9px] font-mono text-[#888882] select-none">+</span>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left: Schematic Workflow Pipeline */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#f0eee6] border border-[#e2e0d8] flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4 text-[#0d0d0d]" />
            </div>
            <div>
              <div className="font-mono text-[11px] font-bold text-[#0d0d0d] flex items-center gap-2">
                <span>PIPELINE LOCAL HORS-LIGNE</span>
                <span className="px-1.5 py-0.2 bg-[#f0eee6] text-[#6b6b66] rounded text-[10px]">AIRGAP</span>
              </div>
              <p className="text-xs text-[#6b6b66] mt-0.5">
                Exécution exclusive dans le moteur JS du navigateur via Mozilla PDF.js.
              </p>
            </div>
          </div>

          {/* Node wire connection */}
          <div className="hidden xl:flex items-center gap-1.5 text-[#888882] font-mono text-[10px] pl-3 border-l border-[#e2e0d8]">
            <span className="px-2 py-0.5 bg-[#f6f4eb] border border-[#e2e0d8] rounded text-[#0d0d0d]">DOCUMENT LOCAL</span>
            <div className="w-6 h-[1px] bg-[#888882] relative flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
            </div>
            <span className="px-2 py-0.5 bg-[#f6f4eb] border border-[#e2e0d8] rounded text-[#0d0d0d]">CANVAS RAM</span>
            <div className="w-6 h-[1px] bg-[#888882] relative flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff542e]" />
            </div>
            <span className="px-2 py-0.5 bg-[#0d0d0d] text-white rounded font-bold">EXPORT FILIGRANÉ</span>
          </div>
        </div>

        {/* Right: Telemetry chips */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto shrink-0 font-mono text-xs">
          {/* Egress monitor badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f6f4eb] border border-[#e2e0d8] text-[#0d0d0d] font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#ff542e] animate-pulse" />
            <span>0.00 KB TRANSMIS AU RÉSEAU</span>
          </div>

          {/* Offline readiness node */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e2e0d8] text-[#0d0d0d] text-[11px]"
            title="L'application est totalement autonome et ne dépend d'aucun serveur distant pour le traitement."
          >
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-[#0d0d0d]" />
                <span>PRÊT HORS-LIGNE</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-[#ff542e]" />
                <span className="text-[#ff542e] font-bold">MODE HORS-LIGNE ACTIF</span>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
