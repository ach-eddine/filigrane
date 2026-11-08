import React from 'react';
import { ShieldCheck, AlertTriangle, Lock, Cpu, Server, Check, X, Terminal, Zap } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  return (
    <section className="mt-16 pt-12 border-t border-[#e2e0d8]">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white border border-[#e2e0d8] text-[#0d0d0d] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff542e]" />
          <span>[ANALYSE ARCHITECTURALE & CONFIDENTIALITÉ]</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0d0d0d] tracking-tight">
          Pourquoi privilégier le traitement local ?
        </h2>
        <p className="text-[#6b6b66] text-sm sm:text-base mt-2">
          Comparatif technique entre le paradigme <strong className="text-[#0d0d0d]">Client-Side Airgap</strong> de Filigraneur et les architectures cloud centralisées traditionnelles.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        
        {/* Filigraneur Card */}
        <div className="bg-white border-2 border-[#0d0d0d] rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] relative">
          <div className="absolute top-0 right-0 px-3.5 py-1 bg-[#0d0d0d] text-white text-[11px] font-mono font-bold rounded-bl-xl flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff542e] animate-pulse" />
            RECOMMANDÉ
          </div>

          <div className="flex items-center gap-3 mb-5 mt-1">
            <div className="w-10 h-10 rounded-xl bg-[#f0eee6] border border-[#e2e0d8] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-[#0d0d0d]" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#0d0d0d]">Filigraneur</h3>
              <p className="text-xs font-mono text-[#059669] font-bold">100% NAVIGATEUR & HORS-LIGNE</p>
            </div>
          </div>

          <ul className="space-y-3.5 text-xs sm:text-sm font-sans">
            <li className="flex items-start gap-2.5 text-[#0d0d0d]">
              <div className="w-5 h-5 rounded-full bg-[#f0eee6] border border-[#e2e0d8] text-[#0d0d0d] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                ✓
              </div>
              <span>
                <strong>0 octet transmis au réseau :</strong> Vos documents (carte d'identité, passeport, fiches de paie) ne quittent jamais votre mémoire vive.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-[#0d0d0d]">
              <div className="w-5 h-5 rounded-full bg-[#f0eee6] border border-[#e2e0d8] text-[#0d0d0d] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                ✓
              </div>
              <span>
                <strong>Zéro surface d'attaque serveur :</strong> Aucune base de données centralisée pouvant faire l'objet de fuites ou de rançongiciels.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-[#0d0d0d]">
              <div className="w-5 h-5 rounded-full bg-[#f0eee6] border border-[#e2e0d8] text-[#0d0d0d] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                ✓
              </div>
              <span>
                <strong>Code libre & auditable (Mozilla PDF.js) :</strong> Moteur transparent sous licence libre AGPL, ouvert à la vérification de la communauté.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-[#0d0d0d]">
              <div className="w-5 h-5 rounded-full bg-[#f0eee6] border border-[#e2e0d8] text-[#0d0d0d] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                ✓
              </div>
              <span>
                <strong>Débit instantané :</strong> Pas de file d'attente serveur, pas de limitation arbitraire de bande passante ou de quotas.
              </span>
            </li>
          </ul>
        </div>

        {/* Cloud Centralized Card */}
        <div className="bg-white border border-[#e2e0d8] rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] relative">
          <div className="flex items-center gap-3 mb-5 mt-1">
            <div className="w-10 h-10 rounded-xl bg-[#f0eee6] border border-[#e2e0d8] flex items-center justify-center">
              <Server className="w-5 h-5 text-[#6b6b66]" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#0d0d0d]">Services en ligne centralisés</h3>
              <p className="text-xs font-mono text-[#888882]">TRAITEMENT CÔTÉ SERVEUR / CLOUD</p>
            </div>
          </div>

          <ul className="space-y-3.5 text-xs sm:text-sm font-sans">
            <li className="flex items-start gap-2.5 text-[#6b6b66]">
              <div className="w-5 h-5 rounded-full bg-[#ffdad6]/60 text-[#ba1a1a] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                ✕
              </div>
              <span>
                <strong>Téléversement obligatoire :</strong> Vos scans haute définition transitent sur les réseaux publics vers des fermes de serveurs.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-[#6b6b66]">
              <div className="w-5 h-5 rounded-full bg-[#ffdad6]/60 text-[#ba1a1a] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                ✕
              </div>
              <span>
                <strong>Cible privilégiée de cyberattaques :</strong> Les dépôts centralisés de pièces d'identité attirent massivement les pirates informatiques.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-[#6b6b66]">
              <div className="w-5 h-5 rounded-full bg-[#ffdad6]/60 text-[#ba1a1a] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                ✕
              </div>
              <span>
                <strong>Persistance temporaire :</strong> Risque résiduel de copies conservées dans les journaux, disques temporaires ou caches de proxy.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-[#6b6b66]">
              <div className="w-5 h-5 rounded-full bg-[#ffdad6]/60 text-[#ba1a1a] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                ✕
              </div>
              <span>
                <strong>Dépendance réseau complète :</strong> Inutilisable en zone blanche ou sans accès web stable.
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Cybercrime facts & recommendations: 3-column metric cards */}
      <div className="mt-8 max-w-5xl mx-auto bg-white border border-[#e2e0d8] rounded-2xl p-6 relative shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <span className="absolute top-1.5 left-2 text-[9px] font-mono text-[#888882] select-none">+</span>
        <span className="absolute top-1.5 right-2 text-[9px] font-mono text-[#888882] select-none">+</span>

        <h4 className="text-xs font-mono font-bold text-[#0d0d0d] uppercase tracking-wider mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#ff542e]" />
          [TÉLÉMÉTRIE DE SÉCURITÉ : USURPATION D'IDENTITÉ EN FRANCE]
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#f6f4eb] border border-[#e2e0d8]">
            <div className="text-2xl sm:text-3xl font-bold text-[#0d0d0d] font-mono tracking-tight">400 000+</div>
            <p className="text-xs text-[#6b6b66] mt-1 font-mono">Victimes d'usurpation déclarées chaque année en France</p>
          </div>
          <div className="p-4 rounded-xl bg-[#f6f4eb] border border-[#e2e0d8]">
            <div className="text-2xl sm:text-3xl font-bold text-[#ba1a1a] font-mono tracking-tight">JUSQU'À 1 000 €</div>
            <p className="text-xs text-[#6b6b66] mt-1 font-mono">Valeur marchande d'une copie de CNI valide sur le darkweb</p>
          </div>
          <div className="p-4 rounded-xl bg-[#f6f4eb] border border-[#e2e0d8]">
            <div className="text-2xl sm:text-3xl font-bold text-[#059669] font-mono tracking-tight">0 SECONDE</div>
            <p className="text-xs text-[#6b6b66] mt-1 font-mono">Rétention serveur via le traitement local hermétique Filigraneur</p>
          </div>
        </div>
      </div>

    </section>
  );
};
