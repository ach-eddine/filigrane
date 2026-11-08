import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import { WatermarkOptions, DocumentPage } from '../types/filigrane';

// Ensure worker is configured to point to local bundled worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs';
}

export function buildWatermarkString(options: WatermarkOptions): string {
  const parts: string[] = [];
  const mainText = options.text.trim() || 'DOCUMENT PROTÉGÉ';
  parts.push(mainText);

  if (options.recipient.trim()) {
    parts.push(`- Destiné à : ${options.recipient.trim()}`);
  }

  if (options.addDate) {
    const today = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    parts.push(`- Transmis le ${today}`);
  }

  return parts.join(' ');
}

export function getColorRgba(options: WatermarkOptions): string {
  const { color, opacity, customColorHex } = options;

  if (color === 'custom' && customColorHex) {
    // Hex to RGB
    const hex = customColorHex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  switch (color) {
    case 'red':
      return `rgba(220, 38, 38, ${opacity})`;
    case 'blue':
      return `rgba(30, 64, 175, ${opacity})`;
    case 'slate':
      return `rgba(71, 85, 105, ${opacity})`;
    case 'black':
      return `rgba(15, 23, 42, ${opacity})`;
    case 'emerald':
      return `rgba(5, 150, 105, ${opacity})`;
    default:
      return `rgba(220, 38, 38, ${opacity})`;
  }
}

export async function loadOriginalPages(file: File): Promise<HTMLCanvasElement[]> {
  const isPdf = 
    file.type === 'application/pdf' || 
    file.type.includes('pdf') || 
    file.name.toLowerCase().endsWith('.pdf');

  const isImage = 
    file.type.startsWith('image/') || 
    /\.(png|jpe?g|webp|gif|bmp|tiff)$/i.test(file.name);

  if (isPdf) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        throw new Error('Le fichier sélectionné est vide (0 octet).');
      }

      // Check minimum PDF header (%PDF-)
      const uint8 = new Uint8Array(arrayBuffer);
      const firstBytes = String.fromCharCode(...uint8.slice(0, Math.min(20, uint8.length)));
      if (!firstBytes.includes('%PDF-')) {
        // Search up to first 1024 bytes in case of leading BOM or whitespace
        const first1024 = String.fromCharCode(...uint8.slice(0, Math.min(1024, uint8.length)));
        if (!first1024.includes('%PDF-')) {
          throw new Error('Le fichier ne semble pas être un document PDF valide.');
        }
      }

      const loadingTask = pdfjsLib.getDocument({
        data: uint8,
        cMapUrl: '/pdfjs/',
        cMapPacked: true,
        standardFontDataUrl: '/pdfjs/',
      });

      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      if (numPages === 0) {
        throw new Error('Le document PDF ne contient aucune page.');
      }

      const pages: HTMLCanvasElement[] = [];

      for (let i = 1; i <= numPages; i++) {
        try {
          const page = await pdf.getPage(i);
          const scale = 1.75; // high quality rendering for crisp text
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement('canvas');
          canvas.width = Math.max(viewport.width, 100);
          canvas.height = Math.max(viewport.height, 100);
          const ctx = canvas.getContext('2d');
          if (!ctx) continue;

          // White background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          await page.render({
            canvasContext: ctx,
            canvas: canvas,
            viewport,
          } as any).promise;

          pages.push(canvas);
        } catch (pageErr) {
          console.warn(`Erreur lors du rendu de la page ${i}:`, pageErr);
          // Fallback placeholder page so document processing doesn't abort
          const fallbackCanvas = document.createElement('canvas');
          fallbackCanvas.width = 800;
          fallbackCanvas.height = 1130;
          const fallbackCtx = fallbackCanvas.getContext('2d');
          if (fallbackCtx) {
            fallbackCtx.fillStyle = '#ffffff';
            fallbackCtx.fillRect(0, 0, 800, 1130);
            fallbackCtx.fillStyle = '#64748b';
            fallbackCtx.font = '20px sans-serif';
            fallbackCtx.textAlign = 'center';
            fallbackCtx.fillText(`Page ${i}`, 400, 500);
            fallbackCtx.fillText('(Page rendue avec aperçu de secours)', 400, 540);
            pages.push(fallbackCanvas);
          }
        }
      }

      if (pages.length === 0) {
        throw new Error('Aucune page n\'a pu être extraite du fichier PDF.');
      }

      return pages;
    } catch (err: any) {
      console.error('PDF parsing error:', err);
      if (err.name === 'PasswordException') {
        throw new Error('Ce document PDF est protégé par mot de passe. Veuillez le déverrouiller avant de l\'importer.');
      }
      if (err.name === 'InvalidPDFException') {
        throw new Error('Le fichier PDF est corrompu ou illisible.');
      }
      throw new Error(err.message || 'Impossible de lire ce document PDF.');
    }
  } else if (isImage) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error('Erreur de contexte graphique pour l\'image.'));
          return;
        }
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve([canvas]);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Impossible de charger l\'image. Vérifiez le format du fichier.'));
      };
      img.src = url;
    });
  }

  throw new Error('Type de fichier non pris en charge. Veuillez choisir un document PDF ou une image (PNG, JPG, WEBP).');
}

export function drawWatermarkOnContext(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  options: WatermarkOptions
) {
  const fullText = buildWatermarkString(options);
  if (!fullText) return;

  const rgbaColor = getColorRgba(options);
  const angleRad = (options.angle * Math.PI) / 180;

  ctx.save();
  ctx.fillStyle = rgbaColor;
  ctx.font = `bold ${options.fontSize}px 'Space Mono', 'JetBrains Mono', monospace, sans-serif`;

  if (options.pattern === 'grid') {
    // Repeating diagonal grid pattern
    ctx.translate(width / 2, height / 2);
    ctx.rotate(angleRad);
    ctx.translate(-width / 2, -height / 2);

    const metrics = ctx.measureText(fullText);
    const textWidth = Math.max(metrics.width, 100);
    const spacingX = textWidth + 80;
    const spacingY = options.fontSize * 3.8;

    const diagonal = Math.sqrt(width * width + height * height);

    for (let x = -diagonal; x < diagonal * 2; x += spacingX) {
      for (let y = -diagonal; y < diagonal * 2; y += spacingY) {
        ctx.fillText(fullText, x, y);
      }
    }
  } else if (options.pattern === 'cross-grid') {
    // Double crossed grid for ultra-security
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(angleRad);
    ctx.translate(-width / 2, -height / 2);

    const metrics = ctx.measureText(fullText);
    const textWidth = Math.max(metrics.width, 100);
    const spacingX = textWidth + 100;
    const spacingY = options.fontSize * 4.2;
    const diagonal = Math.sqrt(width * width + height * height);

    for (let x = -diagonal; x < diagonal * 2; x += spacingX) {
      for (let y = -diagonal; y < diagonal * 2; y += spacingY) {
        ctx.fillText(fullText, x, y);
      }
    }
    ctx.restore();

    // Opposite angle
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-angleRad);
    ctx.translate(-width / 2, -height / 2);

    for (let x = -diagonal; x < diagonal * 2; x += spacingX) {
      for (let y = -diagonal; y < diagonal * 2; y += spacingY) {
        ctx.fillText(fullText, x, y);
      }
    }
    ctx.restore();
  } else if (options.pattern === 'single-banner') {
    // Giant single diagonal banner across center
    ctx.translate(width / 2, height / 2);
    ctx.rotate(angleRad);

    const bannerFontSize = Math.max(options.fontSize * 1.6, 32);
    ctx.font = `bold ${bannerFontSize}px 'Space Mono', 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Optional background ribbon behind banner
    const bannerMetrics = ctx.measureText(fullText);
    ctx.fillStyle = rgbaColor.replace(/[\d.]+\)$/, '0.12)');
    ctx.fillRect(-bannerMetrics.width / 2 - 40, -bannerFontSize * 0.9, bannerMetrics.width + 80, bannerFontSize * 1.8);

    ctx.fillStyle = rgbaColor;
    ctx.fillText(fullText, 0, 0);
  } else if (options.pattern === 'header-footer') {
    // Top and bottom security borders
    const bannerHeight = 55;
    ctx.fillStyle = rgbaColor.replace(/[\d.]+\)$/, '0.15)');
    ctx.fillRect(0, 0, width, bannerHeight);
    ctx.fillRect(0, height - bannerHeight, width, bannerHeight);

    ctx.fillStyle = rgbaColor;
    ctx.font = `bold ${Math.min(options.fontSize, 20)}px 'Space Mono', 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(`🔒 ${fullText}`, width / 2, bannerHeight / 2 + 6);
    ctx.fillText(`🔒 ${fullText}`, width / 2, height - bannerHeight / 2 + 6);

    // Light subtle center stamp
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(angleRad);
    ctx.font = `bold ${options.fontSize}px 'Space Mono', 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(fullText, 0, 0);
    ctx.restore();
  }

  ctx.restore();
}

export function createWatermarkedClone(
  originalCanvas: HTMLCanvasElement,
  options: WatermarkOptions
): HTMLCanvasElement {
  const clone = document.createElement('canvas');
  clone.width = originalCanvas.width;
  clone.height = originalCanvas.height;
  const ctx = clone.getContext('2d');
  if (!ctx) return clone;

  // Draw original image/page first
  ctx.drawImage(originalCanvas, 0, 0);

  // Apply watermark on top
  drawWatermarkOnContext(ctx, clone.width, clone.height, options);

  return clone;
}

export function combineCanvasesVertically(canvases: HTMLCanvasElement[]): HTMLCanvasElement {
  const combined = document.createElement('canvas');
  if (canvases.length === 0) return combined;

  const maxWidth = Math.max(...canvases.map(c => c.width));
  const totalHeight = canvases.reduce((acc, c) => acc + c.height + 20, 0);

  combined.width = maxWidth;
  combined.height = totalHeight;
  const ctx = combined.getContext('2d');
  if (!ctx) return combined;

  // Background between pages
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, combined.width, combined.height);

  let currentY = 0;
  for (const c of canvases) {
    const offsetX = (maxWidth - c.width) / 2;
    ctx.drawImage(c, offsetX, currentY);
    currentY += c.height + 20;
  }

  return combined;
}

export async function exportDocumentAsPDF(pages: HTMLCanvasElement[], originalFileName: string): Promise<void> {
  const pdfDoc = await PDFDocument.create();

  for (const canvas of pages) {
    const pngDataUrl = canvas.toDataURL('image/png', 0.95);
    const pngImageBytes = await fetch(pngDataUrl).then(res => res.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(pngImageBytes);

    const page = pdfDoc.addPage([canvas.width, canvas.height]);
    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const baseName = originalFileName.replace(/\.[^/.]+$/, '');
  const link = document.createElement('a');
  link.href = url;
  link.download = `${baseName}-filigrane.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportDocumentAsPNG(canvas: HTMLCanvasElement, originalFileName: string): void {
  const baseName = originalFileName.replace(/\.[^/.]+$/, '');
  const link = document.createElement('a');
  link.download = `${baseName}-filigrane.png`;
  link.href = canvas.toDataURL('image/png', 0.95);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
