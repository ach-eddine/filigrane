import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Generates sample documents (as real Files) so users can test watermarking
 * instantly without uploading real personal documents.
 */

export function generateSampleIDCard(): File {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create canvas context');

  // Background subtle gradient - French ID card pastel tones
  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bg.addColorStop(0, '#eef2f6');
  bg.addColorStop(0.5, '#e2e8f0');
  bg.addColorStop(1, '#cbd5e1');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Microprint / guilloche pattern imitation
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.width; i += 18) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 40, canvas.height);
    ctx.stroke();
  }

  // Header band
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(40, 30, 920, 70);

  // Tricolor flag in header
  ctx.fillStyle = '#002395';
  ctx.fillRect(60, 45, 14, 40);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(74, 45, 14, 40);
  ctx.fillStyle = '#ed2939';
  ctx.fillRect(88, 45, 14, 40);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('RÉPUBLIQUE FRANÇAISE', 120, 60);
  ctx.font = '14px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('CARTE NATIONALE D\'IDENTITÉ / NATIONAL IDENTITY CARD', 120, 84);

  // SPECIMEN stamp in background
  ctx.save();
  ctx.font = 'bold 110px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(100, 116, 139, 0.12)';
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(-Math.PI / 6);
  ctx.textAlign = 'center';
  ctx.fillText('SPÉCIMEN TEST', 0, 0);
  ctx.restore();

  // Photo placeholder box
  ctx.fillStyle = '#e2e8f0';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2;
  ctx.fillRect(60, 130, 220, 290);
  ctx.strokeRect(60, 130, 220, 290);

  // Stylized avatar silhouette inside photo box
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(170, 230, 48, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(170, 350, 80, 60, 0, 0, Math.PI);
  ctx.fill();

  ctx.fillStyle = '#475569';
  ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PHOTO D\'IDENTITÉ', 170, 395);
  ctx.textAlign = 'left';

  // Details fields
  const fields = [
    { label: 'Nom / Surname', value: 'DUPONT' },
    { label: 'Prénoms / Given names', value: 'JEAN BAPTISTE' },
    { label: 'Sexe / Sex', value: 'M' },
    { label: 'Nationalité / Nationality', value: 'FRANÇAISE' },
    { label: 'Date de naissance / Date of birth', value: '14.07.1990' },
    { label: 'Lieu de naissance / Place of birth', value: 'PARIS 14E (75)' },
    { label: 'Date d\'expiration / Expiry date', value: '28.02.2032' },
    { label: 'N° Document / Card No', value: '23AA94812' },
  ];

  let y = 150;
  fields.forEach((f, idx) => {
    ctx.fillStyle = '#64748b';
    ctx.font = '11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(f.label.toUpperCase(), 320, y);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 17px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(f.value, 320, y + 20);

    y += (idx === 1 || idx === 3 || idx === 5) ? 46 : 42;
  });

  // Machine Readable Zone (MRZ) band at bottom
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(40, 470, 920, 120);
  ctx.strokeStyle = '#cbd5e1';
  ctx.strokeRect(40, 470, 920, 120);

  ctx.fillStyle = '#0f172a';
  ctx.font = '22px "JetBrains Mono", monospace';
  ctx.fillText('IDFRADUPONT<<<<<<<<<<<<<<<<<<<94812', 65, 520);
  ctx.fillText('9007144M3202282FRA<<<<<<<<<<<8JEAN<BAP', 65, 560);

  // Chip symbol
  ctx.fillStyle = '#d97706';
  ctx.fillRect(60, 435, 40, 24);
  ctx.strokeStyle = '#b45309';
  ctx.strokeRect(60, 435, 40, 24);

  const dataUrl = canvas.toDataURL('image/png');
  const byteString = atob(dataUrl.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: 'image/png' });
  return new File([blob], 'Carte_Identite_Specimen_Jean_Dupont.png', {
    type: 'image/png',
  });
}

export function generateSampleJustificatif(): File {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1130; // A4 aspect
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create canvas context');

  // White paper background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border line
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  // Logo header
  ctx.fillStyle = '#1e3a8a';
  ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('FOURNISSEUR ÉNERGIE FRANCE', 60, 90);
  ctx.font = '14px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('Service Clientèle - TSA 21994 - 75000 PARIS', 60, 115);

  // Facture title
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('ATTESTATION DE CONTRAT & JUSTIFICATIF DE DOMICILE', 60, 180);

  // Horizontal divider
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(60, 195);
  ctx.lineTo(740, 195);
  ctx.stroke();

  // Client info box
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(60, 230, 680, 170);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1;
  ctx.strokeRect(60, 230, 680, 170);

  ctx.fillStyle = '#475569';
  ctx.font = '12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('TITULAIRE DU CONTRAT ET ADRESSE DU LIEU DE CONSOMMATION :', 80, 260);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Mme / M. JEAN DUPONT', 80, 295);
  ctx.font = '16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('142 RUE DE LA RÉPUBLIQUE', 80, 325);
  ctx.fillText('75011 PARIS', 80, 355);

  ctx.fillStyle = '#2563eb';
  ctx.font = '14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('N° Client : 9402 184 722 | N° PDL : 04928172938471', 80, 385);

  // Body text
  ctx.fillStyle = '#334155';
  ctx.font = '15px "Plus Jakarta Sans", sans-serif';
  const lines = [
    'Nous attestons par la présente que M. Jean DUPONT est titulaire actif d\'un contrat de fourniture',
    'd\'énergie à l\'adresse mentionnée ci-dessus depuis le 1er septembre 2021.',
    '',
    'La présente attestation est délivrée pour servir et valoir ce que de droit en qualité de justificatif',
    'de domicile officiel, valable pour les démarches administratives, bancaires et de logement.',
    '',
    'Date d\'édition : 28 octobre 2026',
    'Date de validité : 3 mois à compter de la date d\'émission',
  ];

  let textY = 460;
  lines.forEach(l => {
    ctx.fillText(l, 60, textY);
    textY += 28;
  });

  // Table summary
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(60, 700, 680, 180);
  ctx.strokeStyle = '#e2e8f0';
  ctx.strokeRect(60, 700, 680, 180);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('RÉCAPITULATIF DES CONSOMMATIONS RÉCENTES', 80, 735);

  ctx.fillStyle = '#64748b';
  ctx.font = '13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Période du 01/08/2026 au 30/09/2026 : Facture acquittée N° FAC-2026-891', 80, 775);
  ctx.fillText('Montant TTC prélevé : 84,20 € le 05/10/2026 sur compte IBAN FR76 **** **** 4812', 80, 810);
  ctx.fillText('Situation du compte : À jour, aucun arriéré de paiement.', 80, 845);

  // Seal / stamp
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(630, 980, 60, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#1e40af';
  ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SERVICE CERTIFIÉ', 630, 965);
  ctx.fillText('AUTHENTIFICATION', 630, 985);
  ctx.fillText('PARIS 75', 630, 1005);
  ctx.textAlign = 'left';

  const dataUrl = canvas.toDataURL('image/png');
  const byteString = atob(dataUrl.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: 'image/png' });
  return new File([blob], 'Justificatif_Domicile_EDF_Jean_Dupont.png', {
    type: 'image/png',
  });
}

export async function generateSamplePDF(): Promise<File> {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // --- PAGE 1 ---
  const page1 = pdfDoc.addPage([595, 842]); // A4 dimensions
  const { width, height } = page1.getSize();

  // Header banner
  page1.drawRectangle({
    x: 40,
    y: height - 90,
    width: width - 80,
    height: 50,
    color: rgb(0.06, 0.09, 0.16),
  });

  page1.drawText('DOSSIER DE CANDIDATURE LOCATIVE', {
    x: 60,
    y: height - 65,
    size: 16,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page1.drawText('DOCUMENT SPÉCIMEN DE TEST - CONFIDENTIEL', {
    x: 60,
    y: height - 80,
    size: 10,
    font: fontRegular,
    color: rgb(0.6, 0.7, 0.8),
  });

  // Candidate card
  page1.drawRectangle({
    x: 40,
    y: height - 240,
    width: width - 80,
    height: 130,
    color: rgb(0.96, 0.97, 0.99),
    borderColor: rgb(0.8, 0.85, 0.9),
    borderWidth: 1,
  });

  page1.drawText('INFORMATIONS DU CANDIDAT LOCATAIRE :', {
    x: 55,
    y: height - 130,
    size: 11,
    font: fontBold,
    color: rgb(0.15, 0.23, 0.36),
  });

  const linesP1 = [
    'Nom & Prénom : DUPONT Jean-Baptiste',
    'Date & Lieu de naissance : 14/07/1990 à Paris (75)',
    'Nationalité : Française',
    'Profession : Ingénieur logiciel en CDI (Période d\'essai validée)',
    'Revenu net mensuel moyen : 3 450,00 €',
    'Logement ciblé : Appartement T3 - 65 m² - 75011 Paris',
  ];

  let yOffset = height - 150;
  for (const line of linesP1) {
    page1.drawText(line, {
      x: 55,
      y: yOffset,
      size: 10,
      font: fontRegular,
      color: rgb(0.2, 0.25, 0.35),
    });
    yOffset -= 15;
  }

  // Summary table
  page1.drawRectangle({
    x: 40,
    y: height - 420,
    width: width - 80,
    height: 160,
    color: rgb(1, 1, 1),
    borderColor: rgb(0.85, 0.88, 0.92),
    borderWidth: 1,
  });

  page1.drawText('PIÈCES JUSTIFICATIVES FOURNIES AU DOSSIER :', {
    x: 55,
    y: height - 265,
    size: 11,
    font: fontBold,
    color: rgb(0.15, 0.23, 0.36),
  });

  const pieces = [
    '1. Copie recto-verso de la carte nationale d\'identité en cours de validité',
    '2. Contrat de travail à durée indéterminée daté et signé',
    '3. Trois derniers bulletins de salaire (Juillet, Août, Septembre 2026)',
    '4. Dernier avis de situation déclarative à l\'impôt sur le revenu (2025/2026)',
    '5. Quittance de loyer du logement actuel attestant de l\'absence d\'arriérés',
  ];

  let pieceY = height - 285;
  for (const p of pieces) {
    page1.drawText(p, {
      x: 55,
      y: pieceY,
      size: 9.5,
      font: fontRegular,
      color: rgb(0.25, 0.3, 0.4),
    });
    pieceY -= 20;
  }

  // Footer page 1
  page1.drawText('Dossier N° LOC-2026-9812 - Page 1 sur 2', {
    x: 55,
    y: 40,
    size: 9,
    font: fontRegular,
    color: rgb(0.5, 0.55, 0.65),
  });

  // --- PAGE 2 ---
  const page2 = pdfDoc.addPage([595, 842]);

  page2.drawRectangle({
    x: 40,
    y: height - 90,
    width: width - 80,
    height: 50,
    color: rgb(0.06, 0.09, 0.16),
  });

  page2.drawText('ATTESTATION SUR L\'HONNEUR & CAUTIONNEMENT', {
    x: 60,
    y: height - 65,
    size: 16,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page2.drawText('ENGAGEMENT CONFORMÉMENT À LA LOI DU 6 JUILLET 1989', {
    x: 60,
    y: height - 80,
    size: 10,
    font: fontRegular,
    color: rgb(0.6, 0.7, 0.8),
  });

  page2.drawText('Je soussigné, M. Jean DUPONT, certifie sur l\'honneur l\'exactitude des renseignements', {
    x: 55,
    y: height - 130,
    size: 10,
    font: fontRegular,
    color: rgb(0.2, 0.25, 0.35),
  });
  page2.drawText('et pièces justificatives joints au présent dossier de candidature locative.', {
    x: 55,
    y: height - 145,
    size: 10,
    font: fontRegular,
    color: rgb(0.2, 0.25, 0.35),
  });

  // Signature box
  page2.drawRectangle({
    x: 320,
    y: height - 320,
    width: 220,
    height: 120,
    borderColor: rgb(0.7, 0.75, 0.8),
    borderWidth: 1,
    color: rgb(0.98, 0.99, 1),
  });

  page2.drawText('Fait à Paris, le 28 octobre 2026', {
    x: 335,
    y: height - 225,
    size: 9,
    font: fontRegular,
    color: rgb(0.4, 0.45, 0.55),
  });
  page2.drawText('Signature du candidat :', {
    x: 335,
    y: height - 245,
    size: 10,
    font: fontBold,
    color: rgb(0.15, 0.2, 0.3),
  });
  page2.drawText('J. DUPONT (certifié)', {
    x: 350,
    y: height - 290,
    size: 13,
    font: fontBold,
    color: rgb(0.1, 0.3, 0.7),
  });

  page2.drawText('Dossier N° LOC-2026-9812 - Page 2 sur 2', {
    x: 55,
    y: 40,
    size: 9,
    font: fontRegular,
    color: rgb(0.5, 0.55, 0.65),
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  return new File([blob], 'Dossier_Location_Specimen_Dupont.pdf', {
    type: 'application/pdf',
  });
}

