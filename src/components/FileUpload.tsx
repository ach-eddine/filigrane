import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, Sparkles, AlertCircle, RefreshCw, FileCode, Check } from 'lucide-react';
import { generateSampleIDCard, generateSampleJustificatif, generateSamplePDF } from '../utils/sampleDocument';

interface FileUploadProps {
  currentFile: File | null;
  onFileSelect: (file: File) => void;
  onReset: () => void;
  isLoading: boolean;
  pageCount?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  currentFile,
  onFileSelect,
  onReset,
  isLoading,
  pageCount,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setErrorMsg(null);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSelect(droppedFile);
    }
  };

  const validateAndSelect = (file: File) => {
    setErrorMsg(null);
    const isPdf = 
      file.type === 'application/pdf' || 
      file.type.includes('pdf') || 
      file.name.toLowerCase().endsWith('.pdf');
    const isImage = 
      file.type.startsWith('image/') || 
      /\.(png|jpe?g|webp|gif|bmp|tiff)$/i.test(file.name);

    if (!isPdf && !isImage) {
      setErrorMsg('Format non pris en charge. Veuillez fournir un fichier PDF ou une image (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setErrorMsg('Taille excessive (> 100 Mo). Veuillez choisir un fichier plus léger pour le traitement local.');
      return;
    }

    onFileSelect(file);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleSampleSelect = async (type: 'cni' | 'pdf' | 'justif') => {
    setErrorMsg(null);
    try {
      if (type === 'cni') {
        onFileSelect(generateSampleIDCard());
      } else if (type === 'pdf') {
        const samplePdf = await generateSamplePDF();
        onFileSelect(samplePdf);
      } else {
        onFileSelect(generateSampleJustificatif());
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'Erreur lors de la génération du spécimen de test.');
    }
  };

  return (
    <div className="w-full">
      {/* File loaded telemetry node */}
      {currentFile ? (
        <div className="bg-white border border-[#e2e0d8] rounded-2xl p-4 sm:p-5 relative shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="absolute top-1.5 left-2 text-[9px] font-mono text-[#888882] select-none">+</span>
          <span className="absolute top-1.5 right-2 text-[9px] font-mono text-[#888882] select-none">+</span>

          <div className="flex items-center gap-3.5 min-w-0">
            {/* Technical Node Icon */}
            <div className="w-12 h-12 rounded-xl bg-[#f0eee6] border border-[#e2e0d8] text-[#0d0d0d] flex items-center justify-center shrink-0">
              {currentFile.type === 'application/pdf' || currentFile.name.toLowerCase().endsWith('.pdf') ? (
                <FileText className="w-6 h-6 text-[#0d0d0d]" />
              ) : (
                <ImageIcon className="w-6 h-6 text-[#0d0d0d]" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-[#0d0d0d] truncate max-w-[220px] sm:max-w-md">
                  {currentFile.name}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#f6f4eb] border border-[#e2e0d8] text-[#6b6b66]">
                  {currentFile.type.toUpperCase() || 'DOCUMENT'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-[#6b6b66] mt-1">
                <span>TAILLE: {formatFileSize(currentFile.size)}</span>
                {pageCount && pageCount > 1 && (
                  <>
                    <span className="text-[#888882]">•</span>
                    <span className="text-[#0d0d0d] font-bold">{pageCount} PAGES DÉTECTÉES</span>
                  </>
                )}
                <span className="text-[#888882]">•</span>
                <span className="text-[#0d0d0d] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff542e]" />
                  MÉMOIRE LOCALE
                </span>
              </div>
            </div>
          </div>

          {/* Action Pills */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end font-mono">
            <button
              onClick={() => inputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#0d0d0d] bg-white hover:bg-[#f6f4eb] border border-[#e2e0d8] hover:border-[#0d0d0d] transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3" />
              Changer
            </button>
            <button
              onClick={onReset}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#ba1a1a] hover:bg-[#ffdad6]/40 border border-[#ba1a1a]/30 transition-all"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      ) : (
        /* Empty Dropzone Card */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative cursor-pointer group rounded-2xl border-2 border-dashed transition-all p-6 sm:p-10 flex flex-col items-center justify-center text-center bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${
            isDragging
              ? 'border-[#0d0d0d] bg-[#f6f4eb]'
              : 'border-[#e2e0d8] hover:border-[#0d0d0d] hover:bg-[#fcf9f1]'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) validateAndSelect(file);
            }}
          />

          {/* Corner schematic crosshairs */}
          <span className="absolute top-2 left-2 text-[10px] font-mono text-[#888882] select-none">+</span>
          <span className="absolute top-2 right-2 text-[10px] font-mono text-[#888882] select-none">+</span>
          <span className="absolute bottom-2 left-2 text-[10px] font-mono text-[#888882] select-none">+</span>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#888882] select-none">+</span>

          {/* Focal Schematic Squircle Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#f0eee6] border border-[#e2e0d8] flex items-center justify-center mb-4 group-hover:scale-105 transition-all relative">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#e2e0d8] flex items-center justify-center">
              <UploadCloud className="w-5 h-5 text-[#0d0d0d]" />
            </div>
            {/* Top-right micro coral dot */}
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#ff542e]" />
          </div>

          <h3 className="text-base sm:text-lg font-bold font-heading text-[#0d0d0d] mb-1">
            Déposez votre document à filigraner ou{' '}
            <span className="underline underline-offset-4 decoration-[#888882] group-hover:decoration-[#0d0d0d]">parcourez votre appareil</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#6b6b66] max-w-md mb-5">
            Formats acceptés : <strong className="text-[#0d0d0d] font-mono font-bold">PDF, PNG, JPEG, WEBP</strong>.
            Traitement 100% sécurisé et hermétique directement dans votre mémoire vive.
          </p>

          {/* One-click specimen testing nodes */}
          <div
            className="pt-4 border-t border-[#e2e0d8] w-full max-w-lg flex flex-col sm:flex-row items-center justify-center gap-2.5"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[10px] font-mono text-[#888882] uppercase tracking-wider font-bold">
              [TESTER AVEC SPÉCIMEN] :
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 font-mono">
              <button
                type="button"
                onClick={() => handleSampleSelect('cni')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#f6f4eb] hover:bg-[#eae8e0] text-[#0d0d0d] border border-[#e2e0d8] hover:border-[#0d0d0d] transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff542e]" />
                CNI France (Recto)
              </button>
              <button
                type="button"
                onClick={() => handleSampleSelect('pdf')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#f6f4eb] hover:bg-[#eae8e0] text-[#0d0d0d] border border-[#e2e0d8] hover:border-[#0d0d0d] transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
                Dossier PDF (2 pages)
              </button>
              <button
                type="button"
                onClick={() => handleSampleSelect('justif')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#f6f4eb] hover:bg-[#eae8e0] text-[#0d0d0d] border border-[#e2e0d8] hover:border-[#0d0d0d] transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#888882]" />
                Justificatif EDF
              </button>
            </div>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mt-3 p-3.5 rounded-xl bg-[#ffdad6]/50 border border-[#ba1a1a]/40 text-[#ba1a1a] text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#ba1a1a]" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
