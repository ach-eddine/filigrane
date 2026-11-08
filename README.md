# 🛡️ Filigraneur — Filigrane Sécurisé & 100% Local

[![Licence: AGPL v3](https://img.shields.io/badge/Licence-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![React](https://img.shields.io/badge/React-19-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zero Server Egress](https://img.shields.io/badge/Donn%C3%A9es_Serveur-0_Ko-emerald.svg)](#-architecture-technique--confidentialit%C3%A9)
[![Hors-Ligne](https://img.shields.io/badge/Mode_Hors--Ligne-Pr%C3%AAt-orange.svg)](#)

> **Filigraneur** est une application web open-source conçue pour ajouter des filigranes indélébiles de protection sur vos pièces d'identité et documents administratifs sensibles directement dans votre navigateur.
> 
> **Zéro envoi sur serveur, zéro fuite possible, traitement 100% hermétique et local.**

---

## 📑 Sommaire

- [Pourquoi Filigraneur ?](#-pourquoi-filigraneur-)
- [Fonctionnalités Clés](#-fonctionnalités-clés)
- [Architecture Technique & Confidentialité](#-architecture-technique--confidentialité)
- [Design System : Technical Schematic Matrix](#-design-system--technical-schematic-matrix)
- [Captures & Démonstration](#-captures--démonstration)
- [Installation & Démarrage](#-installation--démarrage)
- [Scripts Disponibles](#-scripts-disponibles)
- [Guide des Bonnes Pratiques de Filigranage](#-guide-des-bonnes-pratiques-de-filigranage)
- [Technologies Utilisées](#-technologies-utilisées)
- [Licence & Crédits](#-licence--crédits)

---

## 🎯 Pourquoi Filigraneur ?

En France, plus de **400 000 personnes** sont victimes d'usurpation d'identité chaque année. Un simple scan de Carte Nationale d'Identité (CNI) ou de fiche de paie envoyé non protégé pour un dossier de location, une candidature ou une transaction peut se revendre jusqu'à **1 000 € sur le darkweb** et servir à souscrire des crédits frauduleux.

### Le problème des outils en ligne classiques
La majorité des convertisseurs et outils en ligne (y compris certains services institutionnels) **téléversent vos documents sur des serveurs distants** pour y appliquer le traitement. Ces serveurs constituent des cibles d'attaque massives pour les cybercriminels, sans compter les risques de rétention temporaire de données ou de fuites dans les logs.

### La réponse Filigraneur
Filigraneur inverse complètement ce paradigme :
1. **Traitement 100% Navigateur (Client-Side Airgap)** : Vos fichiers sont décodés, manipulés et réexportés exclusivement dans la mémoire vive (RAM) de votre appareil via le moteur JavaScript **Mozilla PDF.js**.
2. **0 octet transféré** : Aucun document, aucune image, aucun métadonnée ne quitte votre machine. Vous pouvez déconnecter votre connexion Internet (Wi-Fi/Ethernet) : l'application continue de fonctionner parfaitement.
3. **Pérennité & Transparence** : Code source entièrement ouvert sous licence **AGPL-3.0**, auditable par n'importe quel chercheur en sécurité.

---

## ✨ Fonctionnalités Clés

### 📄 Prise en charge universelle des documents
- **Documents PDF multipages** : Rendu vectoriel haute fidélité (1.75x DPI), navigation page par page, conservation de la pagination complète à l'export.
- **Images haute définition** : Support des formats PNG, JPEG, JPG, WEBP.
- **Spécimens de test en 1 clic** : Testez instantanément l'outil sans chercher de document personnel :
  - *Spécimen CNI France* (format carte avec zone MRZ).
  - *Spécimen Dossier Locatif PDF* (document multipages 2 pages).
  - *Spécimen Justificatif de domicile EDF*.

### 🎨 Personnalisation Avancée du Filigrane
- **Modèles rapides en un clic** :
  - *Dossier de location* : `Document exclusivement destiné à la location`
  - *Candidature emploi* : `Réservé exclusivement au recrutement`
  - *Dossier bancaire / crédit* : `Exclusif pour demande de prêt bancaire`
  - *Justificatif de domicile* : `Copie réservée à l'organisme demandeur`
  - *Vente entre particuliers* : `Copie réservée à la transaction sécurisée`
- **Destinataire ciblé** : Spécifiez explicitement l'organisme ou la personne (ex: *Agence Nexity, Leboncoin, Banque Postale*).
- **Horodatage dynamique** : Injection automatique de la mention `Transmis le JJ/MM/AAAA`.
- **4 Géométries de disposition** :
  - `Grille répétée` : Répétition diagonale continue sur toute la surface (recommandé anti-détourage).
  - `Bannière centrale` : Bandeau diagonal imposant au centre du document.
  - `Grille croisée` : Double matrice diagonale entrecroisée pour un niveau de protection maximal.
  - `Bandeaux tête & pied` : En-têtes et pieds de page sécurisés avec tampon central.
- **Nuancier & Typographie** :
  - Rouge Alerte (`#DC2626`), Bleu Marianne (`#1E40AF`), Noir Encre (`#0D0D0D`), Gris Schéma (`#6B6B66`), Vert Validé (`#059669`) ou sélecteur hexadécimal libre.
  - Typographie monospacée technique d'ingénierie (*Space Mono*).
  - Réglage fin de l'opacité (10% à 85%), de la taille de texte (S, M, L, XL) et de l'orientation (-45°, -30°, 0°, 45°).

### 🔍 Rendu & Téléchargement
- **Comparateur en direct** : Visualisation instantanée de l'aperçu, zoom ergonomique (+ / - / 100%) et bouton bascule *Original / Filigrané*.
- **Export PDF Multi-pages** : Génération d'un fichier PDF propre intégrant l'ensemble des pages filigranées.
- **Export Image PNG** : Téléchargement haute résolution sans perte.
- **Copie presse-papier** : Copie directe de l'image filigranée pour collage rapide dans un e-mail ou une messagerie.

---

## 🔒 Architecture Technique & Confidentialité

```
┌────────────────────────────────────────────────────────────────────────┐
│                   NAVIGATEUR UTILISATEUR (CLIENT-SIDE)                 │
│                                                                        │
│   [Document Source] ──> [ArrayBuffer en RAM]                           │
│                               │                                        │
│                               ▼                                        │
│                 [Moteur Mozilla PDF.js v4.6]                           │
│                               │                                        │
│                               ▼                                        │
│                 [Canvas HTML5 Haute Résolution]                        │
│                               │                                        │
│         [Calcul trigonométrique du filigrane vectoriel]                │
│                               │                                        │
│                               ▼                                        │
│                   [pdf-lib / Canvas Export]                            │
│                               │                                        │
│                               ▼                                        │
│                 [Téléchargement Local Sécurisé]                        │
└────────────────────────────────────────────────────────────────────────┘
                                │
                        ❌ [AUCUN SERVEUR]
                        ❌ [0 OCTET AU RÉSEAU]
                        ❌ [0 COOKIE / 0 TRACKER]
```

---

## 📐 Design System : Technical Schematic Matrix

L'interface utilisateur adopte les principes du design system **Technical Schematic Matrix** :
- **Toile tactile papier (`#fcf9f1`)** avec texture matricielle subtile de points à 24px d'intervalle.
- **Encre de structure profonde (`#0d0d0d`)** et lignes de division ultra-nettes 1px (`#e2e0d8`).
- **Repères de coordonnées schématiques (`+`)** aux angles des modules.
- **Puces télémétriques et voyants actifs corail (`#ff542e`)**.
- **Typographies d'ingénierie** :
  - *Space Grotesk* pour les titres et hiérarchies visuelles.
  - *Space Mono* pour la télémétrie, les codes d'état et le texte du filigrane.
  - *Inter* pour la clarté des descriptions et conseils.

---

## 🚀 Installation & Démarrage

### Prérequis
- [Node.js](https://nodejs.org/) version 18 ou supérieure
- Gestionnaire de paquets `npm` ou `pnpm`

### Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/CyberClarence/filigraneur.git
cd filigraneur
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer le serveur de développement local :
```bash
npm run dev
```

4. Ouvrir l'application dans votre navigateur :
```
http://localhost:3000
```

---

## 🛠️ Scripts Disponibles

| Commande | Action |
| :--- | :--- |
| `npm run dev` | Démarre le serveur Vite de développement sur le port 3000 |
| `npm run build` | Compile l'application TypeScript pour la production dans le dossier `dist/` |
| `npm run preview` | Prévisualise localement le build de production |
| `npm run lint` | Exécute la vérification statique des types via TypeScript (`tsc --noEmit`) |

---

## 💡 Guide des Bonnes Pratiques de Filigranage

Pour maximiser la protection juridique et technique de vos documents :

1. **Nommez toujours le destinataire exact** : Évitez les formules vagues comme « Pour dossier ». Préférez *« Destiné exclusivement à l'Agence Immobilière ABC »*.
2. **Précisez le motif précis** : Ex: *« Candidature au poste de Développeur »* ou *« Dossier de location Appartement 12 rue de la Paix »*.
3. **Incluez la date du jour** : L'horodatage empêche qu'un document transmis en 2026 soit réutilisé des années plus tard.
4. **Recouvrez les données critiques** : Assurez-vous que la trame du filigrane traverse la photo d'identité, la date de naissance, la signature et la bande de lecture optique MRZ.

---

## 🧰 Technologies Utilisées

- **Frontend** : [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool** : [Vite 8](https://vitejs.dev/)
- **Style** : [Tailwind CSS v4](https://tailwindcss.com/)
- **Moteur PDF** : [Mozilla PDF.js (`pdfjs-dist`)](https://mozilla.github.io/pdf.js/)
- **Génération PDF** : [pdf-lib](https://pdf-lib.js.org/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Animations & Effets** : [Motion](https://motion.dev/), [canvas-confetti](https://www.kirilv.com/canvas-confetti/)

---

## 📄 Licence & Crédits

- **Licence** : Projet publié sous licence **GNU Affero General Public License v3.0 (AGPL-3.0)**.
- **Origine & Auteur** : Créé par **achraf**, inspiré du travail open-source de **CyberClarence** ([cybercla.dev](https://cybercla.dev)).
- **Confidentialité** : Aucun cookie, aucun script de pistage tiers, aucun appel réseau vers des API distantes.
