import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AlertCircle, X, Terminal, Shield, Sparkles } from 'lucide-react';
import { Header } from './components/Header';
import { SecurityPill } from './components/SecurityPill';
import { FileUpload } from './components/FileUpload';
import { WatermarkControls } from './components/WatermarkControls';
import { DocumentPreview } from './components/DocumentPreview';
import { ComparisonSection } from './components/ComparisonSection';
import { SecurityGuideModal } from './components/SecurityGuideModal';
import { Footer } from './components/Footer';
import { 
  WatermarkOptions, 
  ProcessedDocument, 
  DocumentPage 
} from './types/filigrane';
import { 
  loadOriginalPages, 
  createWatermarkedClone, 
  combineCanvasesVertically, 
  exportDocumentAsPDF, 
  exportDocumentAsPNG 
} from './utils/pdfWatermark';

export default function App() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [originalCanvases, setOriginalCanvases] = useState<HTMLCanvasElement[]>([]);
  const [processedDoc, setProcessedDoc] = useState<ProcessedDocument | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [watermarkOptions, setWatermarkOptions] = useState<WatermarkOptions>({
    text: 'Document destiné exclusivement à la constitution d\'un dossier de location',
    recipient: '',
    addDate: true,
    opacity: 0.40,
    fontSize: 28,
    angle: -45,
    pattern: 'grid',
    color: 'red',
    customColorHex: '#9333ea',
    fontFamily: 'Space Mono',
  });

  // Load new file and extract pages
  const handleFileSelect = async (file: File) => {
    setCurrentFile(file);
    setIsProcessing(true);
    setGlobalError(null);
    try {
      const canvases = await loadOriginalPages(file);
      setOriginalCanvases(canvases);
      applyWatermarkToCanvases(file, canvases, watermarkOptions);
    } catch (err: any) {
      console.error('File load error:', err);
      setGlobalError(err.message || 'Erreur lors du traitement du document.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Re-apply watermarking on existing canvases whenever options change
  const applyWatermarkToCanvases = useCallback(
    (file: File, originals: HTMLCanvasElement[], options: WatermarkOptions) => {
      if (originals.length === 0) return;

      const pages: DocumentPage[] = originals.map((orig, idx) => {
        const watermarked = createWatermarkedClone(orig, options);
        return {
          pageNumber: idx + 1,
          originalCanvas: orig,
          watermarkedCanvas: watermarked,
          width: orig.width,
          height: orig.height,
        };
      });

      const watermarkedCanvases = pages.map(p => p.watermarkedCanvas);
      const combined = combineCanvasesVertically(watermarkedCanvases);

      setProcessedDoc({
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        pageCount: pages.length,
        pages,
        combinedPreviewUrl: combined.toDataURL('image/png'),
        singlePagePreviewUrl: pages[0].watermarkedCanvas.toDataURL('image/png'),
      });
    },
    []
  );

  // Update whenever watermark options change without re-parsing PDF
  useEffect(() => {
    if (currentFile && originalCanvases.length > 0) {
      applyWatermarkToCanvases(currentFile, originalCanvases, watermarkOptions);
    }
  }, [watermarkOptions, currentFile, originalCanvases, applyWatermarkToCanvases]);

  const handleReset = () => {
    setCurrentFile(null);
    setOriginalCanvases([]);
    setProcessedDoc(null);
  };

  const handleDownloadPDF = async () => {
    if (!processedDoc || processedDoc.pages.length === 0) return;
    const watermarkedCanvases = processedDoc.pages.map(p => p.watermarkedCanvas);
    await exportDocumentAsPDF(watermarkedCanvases, processedDoc.name);
  };

  const handleDownloadPNG = () => {
    if (!processedDoc || processedDoc.pages.length === 0) return;
    if (processedDoc.pages.length === 1) {
      exportDocumentAsPNG(processedDoc.pages[0].watermarkedCanvas, processedDoc.name);
    } else {
      const combined = combineCanvasesVertically(processedDoc.pages.map(p => p.watermarkedCanvas));
      exportDocumentAsPNG(combined, processedDoc.name);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f1] text-[#0d0d0d] flex flex-col font-sans selection:bg-[#0d0d0d] selection:text-white">
      
      {/* Top Header */}
      <Header 
        onOpenSecurityModal={() => setIsSecurityModalOpen(true)} 
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Local Security & Offline assurance telemetry bar */}
        <SecurityPill />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Micro Telemetry Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white border border-[#e2e0d8] text-[#0d0d0d] mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff542e]" />
            <span>[PARADIGME : CLIENT-SIDE AIRGAP WATERMARKING]</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#0d0d0d] leading-tight">
            Protection hermétique de vos pièces d'identité
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#6b6b66] leading-relaxed max-w-2xl mx-auto">
            Incrustez un filigrane indélébile avec destinataire et horodatage sur vos cartes d'identité, fiches de paie ou avis fiscaux.
            <strong className="text-[#0d0d0d]"> Zéro donnée transmise au réseau</strong>, exécution immédiate dans votre mémoire locale.
          </p>
        </div>

        {/* Workspace: File Upload -> Controls + Live Preview */}
        <div className="space-y-6">
          
          {globalError && (
            <div className="p-4 rounded-2xl bg-[#ffdad6]/60 border border-[#ba1a1a]/40 text-[#ba1a1a] text-xs font-mono flex items-start justify-between gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#ba1a1a] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">[ERREUR DE TRAITEMENT DOCUMENT]</p>
                  <p className="mt-0.5 text-[#0d0d0d]">{globalError}</p>
                </div>
              </div>
              <button
                onClick={() => setGlobalError(null)}
                className="p-1 rounded-full hover:bg-[#ffdad6] text-[#ba1a1a] transition-colors"
                title="Fermer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* File Upload Zone */}
          <FileUpload
            currentFile={currentFile}
            onFileSelect={handleFileSelect}
            onReset={handleReset}
            isLoading={isProcessing}
            pageCount={processedDoc?.pageCount}
          />

          {/* Editor Grid: Controls on left (5 cols), Live Preview on right (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Watermark customization controls */}
            <div className="lg:col-span-5 w-full">
              <WatermarkControls
                options={watermarkOptions}
                onChange={setWatermarkOptions}
                onApply={() => {
                  if (currentFile && originalCanvases.length > 0) {
                    applyWatermarkToCanvases(currentFile, originalCanvases, watermarkOptions);
                  }
                }}
              />
            </div>

            {/* Document preview & download */}
            <div className="lg:col-span-7 w-full sticky top-24">
              <DocumentPreview
                document={processedDoc}
                onDownloadPDF={handleDownloadPDF}
                onDownloadPNG={handleDownloadPNG}
                onSelectNewDocument={() => {
                  const input = document.querySelector('input[type="file"]') as HTMLInputElement;
                  input?.click();
                }}
                isProcessing={isProcessing}
              />
            </div>

          </div>

        </div>

        {/* Educational & Comparison Section */}
        <ComparisonSection />

      </main>

      {/* Security Guidance Modal */}
      <SecurityGuideModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
      />

      {/* Technical Minimalist Footer */}
      <Footer />

    </div>
  );
}
