import React from 'react';
import { 
  WatermarkOptions, 
  WatermarkPattern, 
  WatermarkColor, 
  PresetSuggestion 
} from '../types/filigrane';
import { 
  Sliders, 
  Tag, 
  Calendar, 
  Building2, 
  Palette, 
  Grid3X3, 
  RotateCw, 
  Type, 
  Eye, 
  Check, 
  Layers,
  Sparkles
} from 'lucide-react';

interface WatermarkControlsProps {
  options: WatermarkOptions;
  onChange: (options: WatermarkOptions) => void;
  onApply: () => void;
}

const PRESETS: PresetSuggestion[] = [
  {
    id: 'location',
    label: 'Dossier de location',
    category: 'Logement',
    template: 'Document exclusivement destiné à la location',
    iconName: 'Home',
    recommendedColor: 'red',
  },
  {
    id: 'recrutement',
    label: 'Candidature emploi',
    category: 'Travail',
    template: 'Réservé exclusivement au recrutement',
    iconName: 'Briefcase',
    recommendedColor: 'blue',
  },
  {
    id: 'banque',
    label: 'Dossier bancaire / crédit',
    category: 'Finance',
    template: 'Exclusif pour demande de prêt bancaire',
    iconName: 'CreditCard',
    recommendedColor: 'red',
  },
  {
    id: 'domicile',
    label: 'Justificatif de domicile',
    category: 'Administratif',
    template: 'Copie réservée à l\'organisme demandeur',
    iconName: 'FileCheck',
    recommendedColor: 'blue',
  },
  {
    id: 'vente',
    label: 'Vente entre particuliers',
    category: 'Achat/Vente',
    template: 'Copie réservée à la transaction sécurisée',
    iconName: 'ShoppingBag',
    recommendedColor: 'red',
  },
];

export const WatermarkControls: React.FC<WatermarkControlsProps> = ({
  options,
  onChange,
  onApply,
}) => {
  const handlePresetSelect = (preset: PresetSuggestion) => {
    onChange({
      ...options,
      text: preset.template,
      color: preset.recommendedColor || options.color,
    });
  };

  const patterns: { id: WatermarkPattern; label: string; desc: string; code: string }[] = [
    {
      id: 'grid',
      label: 'Grille répétée',
      desc: 'Recommandé anti-fraude',
      code: 'PATTERN.GRID_DIAGONAL',
    },
    {
      id: 'single-banner',
      label: 'Bannière centrale',
      desc: 'Bandeau diagonal unique',
      code: 'PATTERN.AXIS_BANNER',
    },
    {
      id: 'cross-grid',
      label: 'Grille croisée',
      desc: 'Protection maximale',
      code: 'PATTERN.CROSS_MATRIX',
    },
    {
      id: 'header-footer',
      label: 'Bandeaux tête & pied',
      desc: 'Format institutionnel',
      code: 'PATTERN.BOUNDARY_TAPE',
    },
  ];

  const colors: { id: WatermarkColor; name: string; hex: string; bgClass: string }[] = [
    { id: 'red', name: 'Rouge Alerte', hex: '#DC2626', bgClass: 'bg-red-600' },
    { id: 'blue', name: 'Bleu Marianne', hex: '#1E40AF', bgClass: 'bg-blue-700' },
    { id: 'black', name: 'Noir Encre', hex: '#0D0D0D', bgClass: 'bg-[#0d0d0d]' },
    { id: 'slate', name: 'Gris Schéma', hex: '#6B6B66', bgClass: 'bg-[#6b6b66]' },
    { id: 'emerald', name: 'Vert Validé', hex: '#059669', bgClass: 'bg-emerald-600' },
  ];

  const angles = [-45, -30, 0, 45];
  const fontSizes = [
    { label: 'S (20px)', value: 20 },
    { label: 'M (28px)', value: 28 },
    { label: 'L (36px)', value: 36 },
    { label: 'XL (44px)', value: 44 },
  ];

  return (
    <div className="bg-white border border-[#e2e0d8] rounded-2xl p-5 sm:p-6 space-y-6 relative shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Schematic corner ticks */}
      <span className="absolute top-1.5 left-2 text-[9px] font-mono text-[#888882] select-none">+</span>
      <span className="absolute top-1.5 right-2 text-[9px] font-mono text-[#888882] select-none">+</span>
      
      {/* Technical Header */}
      <div className="flex items-center justify-between border-b border-[#e2e0d8] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#f0eee6] border border-[#e2e0d8] flex items-center justify-center">
            <Sliders className="w-4 h-4 text-[#0d0d0d]" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-base text-[#0d0d0d]">Paramètres du filigrane</h2>
            <p className="text-[11px] font-mono text-[#888882]">CONFIG.MATRIX // LIVE_RENDER</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#f6f4eb] border border-[#e2e0d8] text-[10px] font-mono font-bold text-[#0d0d0d]">
          SYS.ACTIVE
        </span>
      </div>

      {/* Preset Chips */}
      <div>
        <label className="text-[11px] font-mono font-bold text-[#888882] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-[#ff542e]" />
          [01 // MODÈLES D'USAGE RECOMMANDÉS]
        </label>
        <div className="flex flex-wrap gap-1.5 font-mono">
          {PRESETS.map((p) => {
            const isSelected = options.text === p.template;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePresetSelect(p)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-[#0d0d0d] text-white border-[#0d0d0d] font-bold shadow-[0_1px_3px_rgba(0,0,0,0.1)]'
                    : 'bg-[#f6f4eb] text-[#0d0d0d] border-[#e2e0d8] hover:border-[#0d0d0d]'
                }`}
              >
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Text & Variables */}
      <div className="space-y-3.5">
        <div>
          <label className="text-[11px] font-mono font-bold text-[#888882] uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-[#0d0d0d]" />
              [02 // TEXTE DU FILIGRANE]
            </span>
            <span className="text-[10px] text-[#888882] font-normal">
              Indiquez l'usage exclusif
            </span>
          </label>
          <input
            type="text"
            value={options.text}
            onChange={(e) => onChange({ ...options, text: e.target.value })}
            placeholder="Ex : Document destiné exclusivement à la location"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e2e0d8] text-[#0d0d0d] placeholder-[#888882] text-xs font-mono focus:outline-none focus:border-[#0d0d0d] transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
          />
        </div>

        {/* Recipient & Date Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Recipient */}
          <div>
            <label className="text-[11px] font-mono font-bold text-[#888882] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#0d0d0d]" />
              [DESTINATAIRE CIBLÉ]
            </label>
            <input
              type="text"
              value={options.recipient}
              onChange={(e) => onChange({ ...options, recipient: e.target.value })}
              placeholder="Ex : Agence Immobilière X"
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#e2e0d8] text-[#0d0d0d] placeholder-[#888882] text-xs font-mono focus:outline-none focus:border-[#0d0d0d] transition-all"
            />
          </div>

          {/* Date toggle as schematic pill */}
          <div className="flex flex-col justify-end">
            <label
              onClick={() => onChange({ ...options, addDate: !options.addDate })}
              className={`flex items-center justify-between px-3.5 py-2 rounded-xl border cursor-pointer select-none transition-all ${
                options.addDate
                  ? 'bg-[#f6f4eb] border-[#0d0d0d] text-[#0d0d0d]'
                  : 'bg-white border-[#e2e0d8] text-[#6b6b66] hover:border-[#888882]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-mono font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#ff542e]" />
                <span>DATE DU JOUR (+HORODATE)</span>
              </div>
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center border transition-colors ${
                  options.addDate
                    ? 'bg-[#0d0d0d] border-[#0d0d0d] text-white'
                    : 'border-[#c4c7c7] bg-white'
                }`}
              >
                {options.addDate && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Pattern selection */}
      <div>
        <label className="text-[11px] font-mono font-bold text-[#888882] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#0d0d0d]" />
          [03 // DISPOSITION GÉOMÉTRIQUE]
        </label>
        <div className="grid grid-cols-2 gap-2">
          {patterns.map((p) => {
            const isSelected = options.pattern === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onChange({ ...options, pattern: p.id })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#f6f4eb] border-[#0d0d0d] text-[#0d0d0d] shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
                    : 'bg-white border-[#e2e0d8] text-[#6b6b66] hover:border-[#888882]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold text-[#0d0d0d]">{p.label}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#ff542e]" />}
                </div>
                <div className="text-[11px] text-[#6b6b66] mt-0.5">{p.desc}</div>
                <div className="text-[9px] font-mono text-[#888882] mt-1">{p.code}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Style settings (Color, Opacity, Font size, Angle) */}
      <div className="space-y-4 pt-4 border-t border-[#e2e0d8]">
        
        {/* Colors */}
        <div>
          <label className="text-[11px] font-mono font-bold text-[#888882] uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#0d0d0d]" />
              [04 // TEINTE DU FILIGRANE]
            </span>
            <span className="text-[10px] text-[#888882] font-normal">
              Rouge ou Marianne conseillés
            </span>
          </label>
          <div className="flex items-center gap-2.5">
            {colors.map((c) => {
              const isSelected = options.color === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onChange({ ...options, color: c.id })}
                  title={c.name}
                  className={`w-7 h-7 rounded-full ${c.bgClass} flex items-center justify-center transition-all ${
                    isSelected
                      ? 'ring-2 ring-[#0d0d0d] ring-offset-2 ring-offset-white scale-110'
                      : 'opacity-85 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </button>
              );
            })}

            {/* Custom color picker node */}
            <label
              title="Couleur personnalisée"
              className={`w-7 h-7 rounded-full cursor-pointer border border-dashed border-[#888882] flex items-center justify-center relative transition-all ${
                options.color === 'custom'
                  ? 'ring-2 ring-[#0d0d0d] ring-offset-2 ring-offset-white scale-110'
                  : 'hover:border-[#0d0d0d]'
              }`}
              style={{
                backgroundColor: options.color === 'custom' ? options.customColorHex || '#9333ea' : 'transparent',
              }}
            >
              <input
                type="color"
                className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                value={options.customColorHex || '#9333ea'}
                onChange={(e) =>
                  onChange({
                    ...options,
                    color: 'custom',
                    customColorHex: e.target.value,
                  })
                }
              />
              {options.color === 'custom' ? (
                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
              ) : (
                <span className="text-[11px] text-[#888882] font-mono font-bold">+</span>
              )}
            </label>
          </div>
        </div>

        {/* Opacity slider with telemetry readout */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#888882] uppercase tracking-wider mb-1.5">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#0d0d0d]" />
              [OPACITÉ / CONTRASTE]
            </span>
            <span className="font-mono text-[#0d0d0d] bg-[#f0eee6] px-2 py-0.5 rounded text-[11px] font-bold">
              {Math.round(options.opacity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.10"
            max="0.85"
            step="0.05"
            value={options.opacity}
            onChange={(e) => onChange({ ...options, opacity: parseFloat(e.target.value) })}
            className="w-full accent-[#0d0d0d] cursor-pointer h-1.5 bg-[#eae8e0] rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#888882] mt-1">
            <span>10% (DISCRET)</span>
            <span>40% (ÉQUILIBRÉ)</span>
            <span>85% (MAX)</span>
          </div>
        </div>

        {/* Font size & Angle in grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          
          {/* Font size */}
          <div>
            <label className="text-[11px] font-mono font-bold text-[#888882] uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Type className="w-3 h-3 text-[#0d0d0d]" />
              [TAILLE TEXTE]
            </label>
            <div className="grid grid-cols-4 gap-1 font-mono">
              {fontSizes.map((f) => {
                const isSelected = options.fontSize === f.value;
                return (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => onChange({ ...options, fontSize: f.value })}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-[#0d0d0d] text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]'
                        : 'bg-[#f6f4eb] text-[#0d0d0d] border border-[#e2e0d8] hover:border-[#0d0d0d]'
                    }`}
                  >
                    {f.label.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Angle */}
          <div>
            <label className="text-[11px] font-mono font-bold text-[#888882] uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <RotateCw className="w-3 h-3 text-[#0d0d0d]" />
              [ORIENTATION]
            </label>
            <div className="grid grid-cols-4 gap-1 font-mono">
              {angles.map((ang) => {
                const isSelected = options.angle === ang;
                return (
                  <button
                    key={ang}
                    type="button"
                    onClick={() => onChange({ ...options, angle: ang })}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-[#0d0d0d] text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]'
                        : 'bg-[#f6f4eb] text-[#0d0d0d] border border-[#e2e0d8] hover:border-[#0d0d0d]'
                    }`}
                  >
                    {ang}°
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
