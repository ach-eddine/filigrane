import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Image as ImageIcon, 
  Copy, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  Check,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProcessedDocument } from '../types/filigrane';

interface DocumentPreviewProps {
  document: ProcessedDocument | null;
  onDownloadPDF: () => void;
  onDownloadPNG: () => void;
  onSelectNewDocument: () => void;
  isProcessing: boolean;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  document,
  onDownloadPDF,
  onDownloadPNG,
  onSelectNewDocument,
  isProcessing,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  if (!document) {
    return (
      <div className="bg-white border border-[#e2e0d8] rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[460px] relative shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        {/* Schematic corner ticks */}
        <span className="absolute top-2 left-2 text-[10px] font-mono text-[#888882] select-none">+</span>
        <span className="absolute top-2 right-2 text-[10px] font-mono text-[#888882] select-none">+</span>
        <span className="absolute bottom-2 left-2 text-[10px] font-mono text-[#888882] select-none">+</span>
        <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#888882] select-none">+</span>

        <div className="w-16 h-16 rounded-2xl bg-[#f0eee6] border border-[#e2e0d8] flex items-center justify-center mb-4">
          <FileText className="w-7 h-7 text-[#0d0d0d]" />
        </div>
        <h3 className="text-lg font-bold font-heading text-[#0d0d0d] mb-1">Aperçu Schématique en direct</h3>
        <p className="text-sm text-[#6b6b66] max-w-sm mb-5 font-mono text-xs">
          Chargez un document pour générer le rendu graphique avec filigrane intégré en temps réel.
        </p>
        <button
          onClick={onSelectNewDocument}
          className="px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-[#0d0d0d] text-white hover:bg-[#1c1b1b] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#ff542e]" />
          CHOISIR UN DOCUMENT
        </button>
      </div>
    );
  }

  const activePageObj = document.pages[currentPage - 1] || document.pages[0];
  const activeCanvas = showOriginal ? activePageObj?.originalCanvas : activePageObj?.watermarkedCanvas;

  const handleCopyClipboard = async () => {
    if (!activeCanvas) return;
    try {
      activeCanvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
    }
  };

  const handleDownloadWithConfetti = (type: 'pdf' | 'png') => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0d0d0d', '#ff542e', '#888882', '#059669'],
    });

    if (type === 'pdf') {
      onDownloadPDF();
    } else {
      onDownloadPNG();
    }
  };

  return (
    <div className="bg-white border border-[#e2e0d8] rounded-2xl overflow-hidden flex flex-col relative shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Schematic corner ticks */}
      <span className="absolute top-1.5 left-2 text-[9px] font-mono text-[#888882] select-none z-10">+</span>
      <span className="absolute top-1.5 right-2 text-[9px] font-mono text-[#888882] select-none z-10">+</span>

      {/* Top action toolbar */}
      <div className="p-3.5 sm:p-4 bg-[#fcf9f1] border-b border-[#e2e0d8] flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: View Controls & Page Switcher */}
        <div className="flex items-center gap-2 font-mono">
          {document.pageCount > 1 && (
            <div className="flex items-center gap-1 bg-white border border-[#e2e0d8] rounded-full p-1 text-xs">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="p-1 rounded-full hover:bg-[#f0eee6] text-[#0d0d0d] disabled:opacity-30"
                title="Page précédente"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 font-mono text-xs font-bold text-[#0d0d0d]">
                PG. {currentPage} / {document.pageCount}
              </span>
              <button
                disabled={currentPage >= document.pageCount}
                onClick={() => setCurrentPage(p => Math.min(document.pageCount, p + 1))}
                className="p-1 rounded-full hover:bg-[#f0eee6] text-[#0d0d0d] disabled:opacity-30"
                title="Page suivante"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-white border border-[#e2e0d8] rounded-full p-1 text-xs">
            <button
              onClick={() => setZoomLevel(z => Math.max(0.5, z - 0.2))}
              className="p-1 rounded-full hover:bg-[#f0eee6] text-[#0d0d0d]"
              title="Zoom arrière"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] font-bold text-[#0d0d0d]">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(z => Math.min(2.5, z + 0.2))}
              className="p-1 rounded-full hover:bg-[#f0eee6] text-[#0d0d0d]"
              title="Zoom avant"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoomLevel !== 1 && (
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1 rounded-full hover:bg-[#f0eee6] text-[#888882]"
                title="Réinitialiser zoom"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Before/After Toggle Pill */}
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium border transition-colors ${
              showOriginal
                ? 'bg-[#ffdad6]/60 border-[#ba1a1a]/50 text-[#ba1a1a]'
                : 'bg-white border-[#e2e0d8] text-[#0d0d0d] hover:border-[#0d0d0d]'
            }`}
          >
            {showOriginal ? <EyeOff className="w-3.5 h-3.5 text-[#ba1a1a]" /> : <Eye className="w-3.5 h-3.5 text-[#ff542e]" />}
            <span className="hidden sm:inline">{showOriginal ? 'ORIGINAL' : 'AVEC FILIGRANE'}</span>
          </button>
        </div>

        {/* Right: Export actions (Ghost + Primary Schematic Pill) */}
        <div className="flex items-center gap-2 font-mono">
          <button
            onClick={handleCopyClipboard}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-white hover:bg-[#f6f4eb] text-[#0d0d0d] border border-[#e2e0d8] hover:border-[#0d0d0d] transition-all"
            title="Copier l'image dans le presse-papier"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5 text-[#0d0d0d]" />}
            <span className="hidden md:inline">{copied ? 'COPIÉ !' : 'COPIER'}</span>
          </button>

          <button
            onClick={() => handleDownloadWithConfetti('png')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-white hover:bg-[#f6f4eb] text-[#0d0d0d] border border-[#e2e0d8] hover:border-[#0d0d0d] transition-all"
            title="Télécharger en PNG haute résolution"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#0d0d0d]" />
            <span>IMAGE PNG</span>
          </button>

          {/* Primary Schematic Pill */}
          <button
            onClick={() => handleDownloadWithConfetti('pdf')}
            className="flex items-center gap-2 pl-2.5 pr-4 py-2 rounded-full text-xs font-mono font-bold bg-[#0d0d0d] hover:bg-[#1c1b1b] text-white transition-all shadow-[0_1px_3px_rgba(0,0,0,0.1)] group"
            title="Télécharger en document PDF sécurisé"
          >
            {/* Left coral badge with micro-dot */}
            <div className="w-5 h-5 rounded-full bg-[#ff542e] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
              <Download className="w-3 h-3 stroke-[2.5]" />
            </div>
            <span>EXPORTER PDF {document.pageCount > 1 ? `(${document.pageCount}P)` : ''}</span>
          </button>
        </div>

      </div>

      {/* Main viewport with tactile schematic dot-matrix background */}
      <div className="relative min-h-[460px] max-h-[640px] overflow-auto schematic-grid bg-[#fcf9f1] p-6 sm:p-8 flex items-center justify-center">
        
        {isProcessing ? (
          <div className="flex flex-col items-center gap-3 text-[#6b6b66] font-mono text-xs">
            <div className="w-8 h-8 border-2 border-[#0d0d0d] border-t-transparent rounded-full animate-spin" />
            <p>RENDU DU FILIGRANE EN COURS...</p>
          </div>
        ) : (
          <div
            className="transition-transform duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-lg overflow-hidden border border-[#e2e0d8] bg-white relative"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
            }}
          >
            {activeCanvas ? (
              <img
                src={activeCanvas.toDataURL('image/png')}
                alt="Document Preview"
                className="max-h-[520px] w-auto object-contain block mx-auto select-none"
              />
            ) : (
              <div className="p-12 text-[#888882] text-xs font-mono">Aucun aperçu disponible</div>
            )}
          </div>
        )}

        {/* Original Indicator banner */}
        {showOriginal && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0d0d0d] text-white text-[11px] font-mono font-bold shadow-md flex items-center gap-1.5 animate-pulse">
            <EyeOff className="w-3.5 h-3.5 text-[#ff542e]" />
            DOCUMENT SOURCE SANS FILIGRANE (ORIGINAL)
          </div>
        )}

      </div>

      {/* Telemetry Footer */}
      <div className="p-3.5 bg-white border-t border-[#e2e0d8] flex items-center justify-between text-xs font-mono text-[#6b6b66]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
          <span>
            Incrustation irréversible dans la trame matricielle du document final.
          </span>
        </div>
        <span className="text-[#888882] hidden sm:inline">
          DPI_RENDER: 1.75X // LOSSLESS_PNG
        </span>
      </div>

    </div>
  );
};
