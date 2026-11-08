export type WatermarkPattern = 'grid' | 'single-banner' | 'cross-grid' | 'header-footer';

export type WatermarkColor = 
  | 'red'       // #DC2626 - Alerte rouge classique
  | 'blue'      // #1E40AF - Bleu Marianne
  | 'slate'     // #475569 - Gris discret
  | 'black'     // #0F172A - Noir sécurité
  | 'emerald'   // #059669 - Vert validé
  | 'custom';

export interface WatermarkOptions {
  text: string;
  recipient: string;
  addDate: boolean;
  opacity: number; // 0.1 to 0.95
  fontSize: number; // 18 to 48
  angle: number; // in degrees, e.g. -45, -30, 0, 45
  pattern: WatermarkPattern;
  color: WatermarkColor;
  customColorHex?: string;
  fontFamily: string;
}

export interface DocumentPage {
  pageNumber: number;
  originalCanvas: HTMLCanvasElement;
  watermarkedCanvas: HTMLCanvasElement;
  width: number;
  height: number;
  dataUrl?: string;
}

export interface ProcessedDocument {
  file: File;
  name: string;
  size: number;
  type: string;
  pageCount: number;
  pages: DocumentPage[];
  combinedPreviewUrl: string;
  singlePagePreviewUrl: string;
}

export interface PresetSuggestion {
  id: string;
  label: string;
  category: string;
  template: string;
  iconName: string;
  recommendedColor?: WatermarkColor;
}
