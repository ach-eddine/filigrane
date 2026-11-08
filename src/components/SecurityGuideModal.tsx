import React from 'react';
import { X, Shield, Lock, FileCheck, CheckCircle2, ExternalLink } from 'lucide-react';

interface SecurityGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityGuideModal: React.FC<SecurityGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d0d0d]/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border-2 border-[#0d0d0d] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6 sm:p-8 relative">
        
        {/* Schematic corner ticks */}
        <span className="absolute top-2 left-2 text-[10px] font-mono text-[#888882] select-none">+</span>
        <span className="absolute top-2 right-2 text-[10px] font-mono text-[#888882] select-none">+</span>

        {/* Close Button Ghost Pill */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#0d0d0d] hover:bg-[#f0eee6] border border-[#e2e0d8] hover:border-[#0d0d0d] transition-all"
          title="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#f0eee6] border border-[#e2e0d8] flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-[#0d0d0d]" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading text-[#0d0d0d]">Guide de Protection & Traitement</h3>
            <p className="text-xs font-mono text-[#888882]">[SYS.DOC // GUIDE PRATIQUE DU FILIGRANAGE]</p>
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-6 text-sm text-[#0d0d0d]">
          
          <div className="p-4 rounded-xl bg-[#f6f4eb] border border-[#e2e0d8]">
            <h4 className="font-heading font-bold text-sm text-[#0d0d0d] flex items-center gap-2 mb-1.5">
              <Lock className="w-4 h-4 text-[#ff542e]" />
              Règle d'or : Nommer explicitement le destinataire et l'usage
            </h4>
            <p className="text-xs text-[#6b6b66] leading-relaxed">
              Pour qu'un filigrane empêche toute réutilisation frauduleuse en cas d'interception ou de fuite, il doit préciser :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs text-[#0d0d0d] font-mono font-medium">
              <li>L'organisme bénéficiaire (ex: <em>« Destiné à l'agence Nexity »</em>)</li>
              <li>L'objet exclusif (ex: <em>« Dossier de location 14 rue de la Paix »</em>)</li>
              <li>L'horodatage précis (ex: <em>« Transmis le 02/11/2026 »</em>)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-[#0d0d0d] mb-2.5 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#0d0d0d]" />
              Quels documents sensibles devez-vous impérativement filigraner ?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-[#fcf9f1] border border-[#e2e0d8]">
                <span className="font-bold font-mono text-[#0d0d0d]">Carte Nationale d'Identité</span>
                <p className="text-[#6b6b66] mt-0.5">Recto & verso, bande MRZ incluse.</p>
              </div>
              <div className="p-3 rounded-lg bg-[#fcf9f1] border border-[#e2e0d8]">
                <span className="font-bold font-mono text-[#0d0d0d]">Passeport & Permis de conduire</span>
                <p className="text-[#6b6b66] mt-0.5">Page principale avec photo et signature.</p>
              </div>
              <div className="p-3 rounded-lg bg-[#fcf9f1] border border-[#e2e0d8]">
                <span className="font-bold font-mono text-[#0d0d0d]">Bulletins de salaire</span>
                <p className="text-[#6b6b66] mt-0.5">Revenus et identifiants employeur.</p>
              </div>
              <div className="p-3 rounded-lg bg-[#fcf9f1] border border-[#e2e0d8]">
                <span className="font-bold font-mono text-[#0d0d0d]">Avis d'impôt & Justificatif domicile</span>
                <p className="text-[#6b6b66] mt-0.5">Numéro fiscal, facture EDF, quittance.</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-[#0d0d0d] mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#059669]" />
              Pourquoi le traitement Filigraneur est 100% garanti ?
            </h4>
            <p className="text-xs text-[#6b6b66] leading-relaxed">
              Contrairement à d'autres portails en ligne qui envoient vos scans sur des serveurs, Filigraneur exécute tout via <strong>Mozilla PDF.js</strong> dans la mémoire RAM éphémère de votre navigateur. Vous pouvez couper votre accès réseau (Wi-Fi / Ethernet) et continuer à filigraner normalement.
            </p>
          </div>

          <div className="pt-4 border-t border-[#e2e0d8] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
            <a
              href="https://github.com/CyberClarence/filigraneur"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#0d0d0d] hover:underline flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#ff542e]" />
              Auditer le code source sur GitHub (Licence AGPL)
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 rounded-full text-xs font-bold bg-[#0d0d0d] hover:bg-[#1c1b1b] text-white transition-all shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
            >
              J'ai compris
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
