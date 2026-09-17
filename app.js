/* =================================================================
   FACTURA — application de facturation pour indépendants
   Atelier Nardella — 100 % client-side (aucun serveur, aucune API)

   1. Version, icônes, images
   2. Textes de l'interface (FR / EN)
   3. Règles fiscales (France & Monaco) + textes du document
   4. État & sauvegarde locale
   5. Utilitaires
   6. Calculs
   7. Document A4
   8. Chrome : barres, pied de page, écrans
   9. Formulaires & étapes
   10. Prestations
   11. Assistant TVA
   12. Personnalisation
   13. Validation & PDF
   14. Mes factures / import
   15. Demande de devis
   16. Événements & démarrage
   ================================================================= */

/* ============ 1. VERSION, ICÔNES, IMAGES ============ */
const APP_VERSION = '1.4.2';
const INSTAGRAM = 'https://www.instagram.com/atelier.nardella/';
const ASSETS = {
  logo:'assets/logo-factura.png',
  coffee:'assets/pigeon-coffee.png', laptop:'assets/pigeon-laptop.png',
  plant:'assets/pigeon-plant.png',  zen:'assets/pigeon-zen.png',
  paint:'assets/pigeon-paint.png',  camera:'assets/pigeon-camera.png'
};
const paintImgs = () => $$('[data-img]').forEach(el => { el.src = ASSETS[el.dataset.img] || ASSETS.logo; });
const pigeon = (name, cls) => '<img class="pigeon ' + (cls || 'pigeon-step') + '" data-img="' + name + '" alt="">';

/* Icônes : tracés dessinés à la main, rendus en lignes bleues (voir .ico en CSS) */
const ICON_PATHS = {
  receipt:'<path d="M15 11c-.5 12 .3 30 0 44l6-5 5.5 5 5.5-5 5.5 5 5.5-5 6 5c-.4-14 .4-32 0-44-11-1.4-23-1.3-34 0Z"/><path d="M23.5 24c6-.8 11-.8 17 0"/><path d="M23.5 33c6-.8 11-.8 17 0"/><path d="M23.5 42c4-.6 7-.6 10.5 0"/>',
  pencil:'<path d="M43.5 10.5 53.5 21 24 50.5l-13.5 3.2 3.2-13.4 29.8-29.8Z"/><path d="m39.5 14.5 10 10"/>',
  folder:'<path d="M11 19c6.5-1 11.5-1 17.5 0l3.5 5.5h20c1.4 9.5 1.4 22.5 0 32-14 1.6-26.5 1.6-41 0-1.5-11.5-1.5-26-1.5-37.5Z"/>',
  broom:'<path d="M46 9.5c-2.5 4.5-9.5 16-15 23.5"/><path d="M23 30c5.5 1.2 11 5 14.5 9.5-4.5 6.5-9 11.5-14 15.5-5-4.5-10.5-7.5-15.5-8.5 4.5-6.5 9.5-11.5 15-16.5Z"/><path d="M19 42c-2 3-4.5 5.5-7 7.5"/><path d="M26 46c-2 3-4.5 5.5-7 7.5"/>',
  roller:'<path d="M19 12.5c9-1.4 18.5-1.4 27 0 1.3 4.2 1.3 8.4 0 12.6-8.5 1.4-18 1.4-27 0-1.3-4.2-1.3-8.4 0-12.6Z"/><path d="M32.5 25.5v6c0 3.5-9.5 2.5-9.5 7v3"/><path d="M23 41.5c-2.8 0-4.2 1.8-4.2 4.2v8.5c0 2.6 1.4 4.3 4.2 4.3s4.2-1.7 4.2-4.3v-8.5c0-2.4-1.4-4.2-4.2-4.2Z"/>',
  spray:'<path d="M21.5 28c6.5-1.1 12-1.1 18.5 0 1.1 8.5 1.1 17.5 0 26-6.5 1.1-12 1.1-18.5 0-1.1-8.5-1.1-17.5 0-26Z"/><path d="M27 28v-6.5h7.5V28"/><path d="M34.5 17.5h8.5l-4.5-5.5"/><circle class="fill" cx="49" cy="11" r="2"/><circle class="fill" cx="54" cy="17" r="1.8"/><circle class="fill" cx="47" cy="20" r="1.6"/>',
  wrench:'<path d="M44.5 11.5a10.5 10.5 0 0 0-12.6 13.6L14.5 42.5a5.2 5.2 0 0 0 7.3 7.3l17.4-17.4A10.5 10.5 0 0 0 52.5 19.5l-7 7-6.2-1-1-6.2 6.2-7.8Z"/>',
  bucket:'<path d="M13 24.5c12.5-1.6 25.5-1.6 38 0l-4 28.5c-9.5 1.7-20 1.7-30 0l-4-28.5Z"/><path d="M22 24c0-7.5 4.5-11.5 10.5-11.5S43 16.5 43 24"/>',
  plant:'<path d="M32 54V27"/><path d="M32 35c-8.5.5-13.5-4.5-14-13 8.5-.5 13.5 4.5 14 13Z"/><path d="M32 30c8.5 0 13-5 13-13.5-8.5 0-13 5-13 13.5Z"/><path d="M22 54c7-1 13-1 20 0"/>',
  window:'<path d="M15 12.5c11.5-1.4 22.5-1.4 34 0 1.4 12.5 1.4 26 0 38.5-11.5 1.4-22.5 1.4-34 0-1.4-12.5-1.4-26 0-38.5Z"/><path d="M32 13v37.5"/><path d="M15.5 32c11 .8 22 .8 33 0"/>',
  sparkle:'<path d="M28 9c2.2 9.5 5.5 12.8 15 15-9.5 2.2-12.8 5.5-15 15-2.2-9.5-5.5-12.8-15-15 9.5-2.2 12.8-5.5 15-15Z"/><path d="M47 38c1.1 4.5 2.4 5.8 7 7-4.6 1.2-5.9 2.5-7 7-1.1-4.5-2.4-5.8-7-7 4.6-1.2 5.9-2.5 7-7Z"/>',
  house:'<path d="M11.5 30.5 32 13l20.5 17.5"/><path d="M18 30v20.5c9.5 1.4 19 1.4 28 0V30"/><path d="M26.5 50.5V38.5c3.5-.5 7-.5 10.5 0v12"/>',
  person:'<circle cx="32" cy="21" r="9.5"/><path d="M13.5 53c2.5-10.5 9.5-15.5 18.5-15.5S48 42.5 50.5 53"/>',
  calendar:'<path d="M12.5 19.5c13-1.6 26.5-1.6 39 0 1.4 10.5 1.4 22 0 32.5-13 1.6-26.5 1.6-39 0-1.4-10.5-1.4-22 0-32.5Z"/><path d="M13 30c13-1.4 25.5-1.4 38.5 0"/><path d="M23 11v11"/><path d="M41 11v11"/>',
  mail:'<path d="M10.5 18.5c14.5-1.7 28.5-1.7 43 0 1.3 9.5 1.3 19.5 0 29-14.5 1.7-28.5 1.7-43 0-1.3-9.5-1.3-19.5 0-29Z"/><path d="m12 20.5 20 15.5 20-15.5"/>',
  download:'<path d="M32 11v27"/><path d="m20 27.5 12 11.5 12-11.5"/><path d="M13 49c12.5 1.5 25.5 1.5 38 0"/>',
  copy:'<path d="M25 11.5c8-.9 15.5-.9 23 0 1 10.5 1 21 0 31.5-7.5.9-15 .9-23 0-1-10.5-1-21 0-31.5Z"/><path d="M18.5 20c-1.2 10.5-1.2 21.5 0 32 6 .9 12 1 18 .7"/>',
  check:'<path d="M13.5 33.5 26 47 51 17"/>',
  euro:'<path d="M45 19a15.5 15.5 0 1 0 0 26.5"/><path d="M16.5 26.5c6-.7 12-.7 18 0"/><path d="M16.5 36c6-.7 12-.7 18 0"/>',
  palette:'<path d="M32 9.5c12.4 0 22.5 8.5 22.5 19.5 0 7.2-6 9.3-10.2 9.3h-4.1c-3.1 0-5.3 2.1-5.3 5.2 0 4.2-3.1 6.2-6.4 6.2-10.5 0-19.5-9.5-19.5-20.5S19.6 9.5 32 9.5Z"/><circle class="fill" cx="22" cy="24" r="2.8"/><circle class="fill" cx="31" cy="18" r="2.8"/><circle class="fill" cx="42" cy="22" r="2.8"/>',
  plus:'<path d="M32 15v34"/><path d="M15 32h34"/>',
  gear:'<circle cx="32" cy="32" r="8.5"/><path d="M32 8.5v7M32 48.5v7M8.5 32h7M48.5 32h7M15.5 15.5l5 5M43.5 43.5l5 5M48.5 15.5l-5 5M20.5 43.5l-5 5"/>',
  info:'<circle cx="32" cy="32" r="22"/><path d="M32 29v14"/><circle class="fill" cx="32" cy="21.5" r="2.6"/>',
  warn:'<path d="M32 11 56 52c-16 1.5-32 1.5-48 0L32 11Z"/><path d="M32 27v12"/><circle class="fill" cx="32" cy="45" r="2.4"/>',
  back:'<path d="M28 16 12 32l16 16"/><path d="M12.5 32c13-1 26-1 39 0"/>',
  monitor:'<path d="M9.5 14.5c15-1.6 30-1.6 45 0 1.4 8.5 1.4 17.5 0 26-15 1.6-30 1.6-45 0-1.4-8.5-1.4-17.5 0-26Z"/><path d="M32 40.5v9"/><path d="M21 50c7.5-1 14.5-1 22 0"/>',
  camera:'<path d="M9.5 21.5c4.5-.6 9-.8 13.5-.8l4-7c3.5-.4 6.5-.4 10 0l4 7c4.5 0 9 .2 13.5.8 1.4 9.5 1.4 20 0 29.5-15 1.6-30 1.6-45 0-1.4-9.5-1.4-20 0-29.5Z"/><circle cx="32" cy="35" r="10"/>',
  video:'<path d="M8.5 19.5c9.5-1.2 19-1.2 28.5 0 1.3 8 1.3 17 0 25-9.5 1.2-19 1.2-28.5 0-1.3-8-1.3-17 0-25Z"/><path d="m39 29 15-8.5c1 7.5 1 15 0 22.5L39 35"/>',
  megaphone:'<path d="M14 26c0-1.5 1-2.5 2.5-2.5h7l19-10.5c1.5 9.5 1.5 26 0 36L23.5 38.5h-7C15 38.5 14 37.5 14 36v-10Z"/><path d="M21 39v11c3 .5 6 .5 9 0v-8"/>',
  chat:'<path d="M10.5 16.5c14.5-1.6 28.5-1.6 43 0 1.4 8.5 1.4 18 0 26.5-9 1-18 1.3-27 .9L14 53.5l.5-10.5c-2.5-.3-3.2-1.5-3.5-3-1.2-8-1.2-15.5-.5-23.5Z"/><circle class="fill" cx="23" cy="30" r="2.6"/><circle class="fill" cx="32" cy="30" r="2.6"/><circle class="fill" cx="41" cy="30" r="2.6"/>',
  pen:'<path d="M12 52c-1-5 0-10 2-14L38 14c2.5-2.5 6-2.5 8.5 0l3.5 3.5c2.5 2.5 2.5 6 0 8.5L26 50c-4 2-9 3-14 2Z"/><path d="m34 18 12 12"/>',
  brush:'<path d="M20 34c-4 2-6 6-6 11 0 4-2 6-5 7 3 3 8 4 12 2 5-2 7-6 7-11"/><path d="M27 41 52 16c2-2 2-4 0-6s-4-2-6 0L21 35"/>',
  print:'<path d="M20 22V10.5c8-.8 16-.8 24 0V22"/><path d="M11.5 23c13.5-1.4 27.5-1.4 41 0 1.3 6.5 1.3 13 0 19.5-4 .6-8 .9-12 1"/><path d="M20 38c8-.8 16-.8 24 0 .9 5 .9 10.5 0 15.5-8 .9-16 .9-24 0-.9-5-.9-10.5 0-15.5Z"/>',
  search:'<circle cx="28" cy="27" r="16"/><path d="m40 39 13 13"/>',
  star:'<path d="M32 9.5 40 25l17 2.5-12.5 12 3 17L32 48.5 16.5 56.5l3-17-12.5-12L24 25 32 9.5Z"/>',
  cursor:'<path d="m15 12 34 15.5-14.5 5-5 14.5L15 12Z"/><path d="m35 38 14 14"/>',
  pipe:'<path d="M10 24.5c0-2.2 1.8-4 4-4h9v-6.5h9v6.5h9c2.2 0 4 1.8 4 4v9c0 2.2-1.8 4-4 4h-9v9.5h-9V41.5h-9c-2.2 0-4-1.8-4-4v-9Z"/>',
  bolt:'<path d="M35 8 15 36h13l-3 20 21-29H33l2-19Z"/>',
  saw:'<path d="M9 40 39 10l8 8-30 30H9v-8Z"/><path d="m34 15 8 8"/><path d="M45 44c3-.5 6-.5 9 0"/><path d="M45 52c3-.5 6-.5 9 0"/>',
  brick:'<path d="M9.5 16.5c15-1.3 30-1.3 45 0 1.2 10.5 1.2 21 0 31.5-15 1.3-30 1.3-45 0-1.2-10.5-1.2-21 0-31.5Z"/><path d="M9.5 32c15-1.2 30-1.2 45 0"/><path d="M32 16.5V32"/><path d="M21 32v15.5"/><path d="M43 32v15.5"/>',
  tiles:'<path d="M10 18.5 32 9l22 9.5L32 28 10 18.5Z"/><path d="m10 32 22 9.5L54 32"/><path d="m10 45 22 9.5L54 45"/>',
  radiator:'<path d="M14 16.5c11.5-1.2 23-1.2 34.5 0 1.2 10 1.2 20 0 30-11.5 1.2-23 1.2-34.5 0-1.2-10-1.2-20 0-30Z"/><path d="M25 17v28"/><path d="M38 17v28"/><path d="M11 24h3M11 38h3M50 24h3M50 38h3"/>',
  key:'<circle cx="21" cy="21" r="10.5"/><path d="m28.5 28.5 24 24"/><path d="m44 44 6-6"/><path d="m37 37 6-6"/>',
  roof:'<path d="M7 33 32 12l25 21"/><path d="M14 33c12-1 24-1 36 0l4 19c-14 1.5-30 1.5-44 0l4-19Z"/><path d="M28 52V40h8v12"/>',
  layers:'<path d="M32 9 8 20l24 11 24-11L32 9Z"/><path d="m8 32 24 11 24-11"/><path d="m8 43 24 11 24-11"/>',
  shirt:'<path d="M24 11 32 17l8-6 14 7-5 10-5-2.5V52c-8 1.2-16 1.2-24 0V25.5L15 28l-5-10 14-7Z"/>',
  calculator:'<path d="M14 11.5c12-1.2 24-1.2 36 0 1.2 13.5 1.2 27 0 40.5-12 1.2-24 1.2-36 0-1.2-13.5-1.2-27 0-40.5Z"/><path d="M21 21c7.5-.8 15-.8 22 0v7c-7.5.8-15 .8-22 0v-7Z"/><circle class="fill" cx="23" cy="37" r="2.4"/><circle class="fill" cx="32" cy="37" r="2.4"/><circle class="fill" cx="41" cy="37" r="2.4"/><circle class="fill" cx="23" cy="46" r="2.4"/><circle class="fill" cx="32" cy="46" r="2.4"/><circle class="fill" cx="41" cy="46" r="2.4"/>',
  briefcase:'<path d="M9.5 22.5c15-1.4 30-1.4 45 0 1.3 9.5 1.3 19 0 28.5-15 1.4-30 1.4-45 0-1.3-9.5-1.3-19 0-28.5Z"/><path d="M23 22.5v-6c0-2.2 1.8-4 4-4h10c2.2 0 4 1.8 4 4v6"/><path d="M9.5 34c15 1.3 30 1.3 45 0"/>',
  globe:'<circle cx="32" cy="32" r="22"/><path d="M10 32c14.5 1.4 29 1.4 44 0"/><path d="M32 10c9 13 9 31 0 44-9-13-9-31 0-44Z"/>',
  code:'<path d="m21 20-13 12 13 12"/><path d="m43 20 13 12-13 12"/><path d="m37 13-10 38"/>',
  cap:'<path d="M32 12 6 23l26 11 26-11L32 12Z"/><path d="M16 29v13c0 4 7 8 16 8s16-4 16-8V29"/><path d="M54 25v14"/>',
  instagram:'<path d="M11.5 22c0-6 4.5-10.5 10.5-10.5h20c6 0 10.5 4.5 10.5 10.5v20c0 6-4.5 10.5-10.5 10.5H22c-6 0-10.5-4.5-10.5-10.5V22Z"/><circle cx="32" cy="32" r="10"/><circle class="fill" cx="45" cy="19" r="2.8"/>'
};
const icon = (name, cls) => '<span class="ico ' + (cls || '') + '"><svg viewBox="0 0 64 64" aria-hidden="true">' +
  (ICON_PATHS[name] || ICON_PATHS.info) + '</svg></span>';

/* ============ 2. TEXTES DE L'INTERFACE ============ */
const UI = {
  fr:{
    back:'Retour', home:'Accueil', save:'Enregistrer', saved:'Enregistré', close:'Fermer', cancel:'Annuler',
    continue:'Continuer', edit:'Modifier', duplicate:'Dupliquer', del:'Supprimer', preview:'Aperçu',
    customize:'Personnaliser', newInvoice:'Nouvelle facture', optional:'facultatif',
    navSettings:'Mes informations', navList:'Mes factures', navDevis:'Demande de devis',
    homeSub:'Créez et gérez vos factures simplement.',
    start:'Commencer', options:'Options', credits:'Crédits',
    menuTitle:'Que voulez-vous faire ?',
    optTitle:'Options', optLang:'Langue de l\'interface', optTheme:'Couleurs de l\'interface',
    optLight:'Clair', optInvert:'Inversé',
    optThemeH:'Le thème inversé n\'affecte que l\'application : la facture imprimée reste sur papier clair.',
    creditsTitle:'Crédits & mentions légales',
    a1:'Créer une facture', a1d:'Quelques questions simples, et c\'est prêt.',
    a2:'Modifier une facture', a2d:'Reprendre, dupliquer ou importer une facture.',
    a3:'Demande de devis', a3d:'Recueillir une demande client et la transformer en facture.',
    s1:'Vous', s2:'Client', s3:'Facture', s4:'Prestations', s5:'Design', s6:'Terminé',
    stepOf:(n) => 'Étape ' + n + ' sur ' + STEPS.length,
    q6:'À quoi doit-elle ressembler ?',
    h6:'Faites glisser pour comparer les modèles, puis choisissez vos couleurs. L\'aperçu se met à jour tout de suite.',
    swipeHint:'Faites glisser →', chosen:'Modèle choisi',
    q1:'Qui êtes-vous ?', h1:'Ces informations sont enregistrées : vous ne les saisirez qu\'une seule fois.',
    q2:'À qui envoyez-vous cette facture ?', h2:'Choisissez le type de client : les informations demandées s\'adaptent.',
    q3:'La facture', h3:'Le numéro est proposé automatiquement et doit suivre une suite continue.',
    q4:'Qu\'avez-vous réalisé ?', h4:'Écrivez librement ce que vous avez fait, puis la quantité et le prix.',
    q5:'Terminé !', h5:'Une dernière vérification, puis vous pouvez générer le PDF.',
    fLogo:'Votre logo', fLogoH:'Il apparaît directement sur la facture.', fChoose:'Choisir une image', fRemove:'Retirer',
    fName:'Nom de l\'entreprise', fManager:'Nom et prénom du responsable', fLegal:'Forme juridique',
    fCapital:'Capital social (€)', fAddress:'Adresse', fZip:'Code postal', fCity:'Ville', fCountry:'Pays',
    fCountryOther:'Nom du pays', fPhone:'Téléphone', fEmail:'E-mail',
    fSiret:'SIRET', fRci:'N° RCI', fNis:'N° NIS (facultatif)', fVatNo:'N° TVA intracommunautaire',
    vatTitle:'Votre situation TVA', vatNo:'Je ne facture pas la TVA', vatNoD:'Franchise en base — art. 293 B du CGI',
    vatYes:'Je facture la TVA', vatYesD:'Entreprise assujettie',
    bank:'Coordonnées bancaires (facultatif)', extra:'Mentions complémentaires (facultatif)',
    fInsurance:'Assurance professionnelle', fInsuranceArea:'Couverture géographique',
    fCga:'Je suis membre d\'un centre de gestion ou d\'une association agréée',
    typeP:'Particulier', typePd:'Une personne, chez elle', typeC:'Entreprise', typeCd:'Société, syndic, agence…',
    clNameP:'Nom et prénom du client', clNameC:'Nom de l\'entreprise', clContact:'Nom du contact',
    clSiren:'SIREN', clVat:'N° TVA intracommunautaire',
    invNumber:'Numéro de facture', invLang:'Langue du document', invIssue:'Date d\'émission',
    invService:'Date de prestation', invDue:'Date d\'échéance', onReceipt:'À réception', days:'jours',
    invObject:'Objet / référence de la facture',
    presta:'Prestation', qty:'Quantité', unit:'Prix unitaire', vat:'TVA', total:'Total',
    whichRate:'Quel taux ?', addItem:'Ajouter une prestation', detailPh:'Précision (facultatif) : pièces, durée, adresse…',
    prestaPh:'Ex. Nettoyage fin de chantier', totalHt:'Total HT', totalTtc:'Total TTC', toPay:'Total à payer',
    verif:'Vérification', payment:'Paiement', payMethod:'Mode de paiement',
    payTerms:'Conditions particulières (facultatif)', penalty:'Taux des pénalités de retard',
    message:'Message pour le client (facultatif)', worksAddr:'Adresse du logement concerné par les travaux',
    yourInvoice:'Votre facture', genPdf:'Générer le PDF', print:'Imprimer', saveFile:'Sauvegarder le fichier',
    noVatLine:'TVA non applicable — art. 293 B du CGI',
    listEmpty:'Aucune facture', listEmptyD:'Vos factures enregistrées apparaîtront ici.',
    listFirst:'Créer ma première facture',
    thNo:'N°', thClient:'Client', thDate:'Date', thAmount:'Montant', thStatus:'Statut',
    stDraft:'Brouillon', stSent:'Envoyée', stPaid:'Payée',
    dataTitle:'Données enregistrées sur cet appareil',
    dataText:'Tout est stocké dans votre navigateur : rien n\'est envoyé sur Internet. Exportez régulièrement pour conserver une copie.',
    exportAll:'Exporter toutes mes données', eraseAll:'Tout effacer',
    openTitle:'Modifier une facture', openHelp:'Trois façons de reprendre une facture existante.',
    open1:'Une facture déjà créée ici', open1d:'Le plus simple : elle se rouvre avec toutes ses informations.',
    open1b:'Voir mes factures',
    open2:'Un fichier enregistré depuis l\'application', open2d:'Le fichier .json créé par « Sauvegarder le fichier », ou une demande de devis reçue d\'un client.',
    open2b:'Importer un fichier .json',
    open3:'Une facture reçue en PDF ou en photo', open3d:'Le document s\'affiche à côté du formulaire ; le texte des PDF est analysé pour pré-remplir les champs.',
    dropHere:'Déposez votre facture ici', dropTypes:'PDF, JPG, JPEG ou PNG',
    importGo:'Continuer et compléter la facture',
    importNoInvent:'Aucune donnée manquante n\'est inventée : les champs non détectés restent vides.',
    dTitle:'Demande de devis',
    dHelp:'À remplir par le client, ou avec lui. La demande est ensuite téléchargée, imprimée ou envoyée par e-mail — sans aucun compte à créer.',
    dRef:'Référence', dId:'N° de demande', dDate:'Date', dYou:'Vos coordonnées', dName:'Nom et prénom',
    dPlace:'Lieu de l\'intervention', dKind:'Type de lieu',
    dServices:'Prestations souhaitées',
    dPick:'Choisissez une ou plusieurs prestations : les questions suivantes s\'adaptent.',
    dNoPick:'Sélectionnez au moins une prestation pour continuer.',
    dAbout:'Quelques précisions',
    dOld2Help:'Cette question sert uniquement à savoir si un taux de TVA réduit peut s\'appliquer aux travaux.',
    dRemote:'Prestation à distance : aucune adresse d\'intervention n\'est demandée.',
    dSurface:'Surface approximative (m²)', dRooms:'Nombre de pièces',
    dFreq:'Fréquence souhaitée', dWhen:'Date souhaitée', dNotes:'Précisions', dNotesPh:'Décrivez ce dont vous avez besoin…',
    dPhotos:'Photos (facultatif)', dPhotosH:'Elles sont réduites et enregistrées dans le fichier de la demande. Elles ne peuvent pas être jointes à un e-mail automatique.',
    dAddPhotos:'Ajouter des photos', dSend:'Envoyer ma demande', dTo:'Adresse e-mail du destinataire',
    dMail:'Ouvrir mon logiciel de messagerie', dJson:'Télécharger (.json)', dCopy:'Copier le texte',
    dTicket:'Voir la fiche', dToInvoice:'Transformer en facture',
    dLocal:'Rien n\'est envoyé automatiquement sur Internet : la demande est produite sur votre appareil, puis transmise par le moyen de votre choix.',
    famHome:'Entretien & ménage', famBuild:'Bâtiment & travaux',
    famCreative:'Création & communication', famPro:'Conseil & services',
    kindFlat:'Appartement', kindHouse:'Maison', kindOffice:'Local professionnel', kindOther:'Autre',
    freqOnce:'Une seule fois', freqWeek:'Chaque semaine', freqBi:'Deux fois par mois', freqMonth:'Chaque mois',
    ticketTitle:'Fiche de demande', ticketHelp:'Vous pouvez l\'enregistrer en PDF ou l\'imprimer.',
    savePdf:'Enregistrer en PDF',
    missTitle:'Il manque quelques informations',
    missHelp:'Vous pouvez générer le PDF quand même, mais la facture ne serait pas complète.',
    missFix:'Compléter', missAnyway:'Générer quand même',
    eraseTitle:'Tout effacer ?', eraseHelp:'Vos informations et vos factures enregistrées sur cet appareil seront définitivement supprimées.',
    eraseYes:'Oui, tout effacer',
    vatHelpTitle:'Quel taux de TVA ?',
    vatHelpIntro:'Répondez simplement. L\'application vous <b>propose</b> un taux : vous restez libre de le modifier.',
    vatConds:'Conditions à confirmer', vatProposed:'Taux proposé', vatApply:'Appliquer',
    vatDisclaimer:'Cette proposition ne remplace pas l\'avis de votre comptable ou de l\'administration fiscale.',
    custTitle:'Personnaliser ma facture', custHelp:'Les changements apparaissent immédiatement dans l\'aperçu.',
    custPrimary:'Couleur principale', custSecondary:'Couleur secondaire', custLight:'Clarté',
    custPalettes:'Palettes', custStyle:'Style de facture', custLogo:'Position du logo',
    styleClean:'Épuré', styleBand:'Bandeau', styleLine:'Ligne',
    posLeft:'Gauche', posCenter:'Centré', posRight:'Droite',
    footLocal:'Application 100 % locale — vos données restent sur votre appareil.',
    tSaved:'Facture enregistrée', tInfoSaved:'Informations enregistrées', tCopied:'Informations copiées',
    tLogo:'Logo ajouté', tDeleted:'Facture supprimée', tImported:'Fichier importé',
    tDevisDl:'Demande téléchargée', tNeedMail:'Indiquez l\'adresse e-mail du destinataire',
    tConverted:'Demande convertie — complétez les prix', tOpened:'Facture ouverte', tDuplicated:'Facture dupliquée'
  },
  en:{
    back:'Back', home:'Home', save:'Save', saved:'Saved', close:'Close', cancel:'Cancel',
    continue:'Continue', edit:'Edit', duplicate:'Duplicate', del:'Delete', preview:'Preview',
    customize:'Customise', newInvoice:'New invoice', optional:'optional',
    navSettings:'My details', navList:'My invoices', navDevis:'Quote request',
    homeSub:'Create and manage your invoices simply.',
    start:'Start', options:'Options', credits:'Credits',
    menuTitle:'What would you like to do?',
    optTitle:'Options', optLang:'Interface language', optTheme:'Interface colours',
    optLight:'Light', optInvert:'Inverted',
    optThemeH:'The inverted theme only affects the app: the printed invoice stays on light paper.',
    creditsTitle:'Credits & legal notices',
    a1:'Create an invoice', a1d:'A few simple questions, and it\'s ready.',
    a2:'Edit an invoice', a2d:'Reopen, duplicate or import an invoice.',
    a3:'Quote request', a3d:'Collect a client request and turn it into an invoice.',
    s1:'You', s2:'Client', s3:'Invoice', s4:'Services', s5:'Design', s6:'Done',
    stepOf:(n) => 'Step ' + n + ' of ' + STEPS.length,
    q6:'What should it look like?',
    h6:'Swipe to compare the templates, then pick your colours. The preview updates instantly.',
    swipeHint:'Swipe →', chosen:'Selected template',
    q1:'Who are you?', h1:'These details are saved: you only enter them once.',
    q2:'Who is this invoice for?', h2:'Pick the type of client — the fields adapt.',
    q3:'The invoice', h3:'The number is suggested automatically and must follow a continuous sequence.',
    q4:'What did you do?', h4:'Write freely what you did, then the quantity and the price.',
    q5:'All done!', h5:'One last check, then you can generate the PDF.',
    fLogo:'Your logo', fLogoH:'It appears directly on the invoice.', fChoose:'Choose an image', fRemove:'Remove',
    fName:'Business name', fManager:'Owner\'s full name', fLegal:'Legal form',
    fCapital:'Share capital (€)', fAddress:'Address', fZip:'Postcode', fCity:'City', fCountry:'Country',
    fCountryOther:'Country name', fPhone:'Phone', fEmail:'Email',
    fSiret:'SIRET (company reg.)', fRci:'RCI number', fNis:'NIS number (optional)', fVatNo:'EU VAT number',
    vatTitle:'Your VAT situation', vatNo:'I do not charge VAT', vatNoD:'Small business exemption — art. 293 B FTC',
    vatYes:'I charge VAT', vatYesD:'VAT-registered business',
    bank:'Bank details (optional)', extra:'Additional notices (optional)',
    fInsurance:'Professional insurance', fInsuranceArea:'Geographical coverage',
    fCga:'I am a member of an approved management association',
    typeP:'Individual', typePd:'A person, at home', typeC:'Business', typeCd:'Company, agency, property manager…',
    clNameP:'Client\'s full name', clNameC:'Company name', clContact:'Contact name',
    clSiren:'Company number', clVat:'EU VAT number',
    invNumber:'Invoice number', invLang:'Document language', invIssue:'Issue date',
    invService:'Service date', invDue:'Due date', onReceipt:'On receipt', days:'days',
    invObject:'Subject / reference',
    presta:'Service', qty:'Quantity', unit:'Unit price', vat:'VAT', total:'Total',
    whichRate:'Which rate?', addItem:'Add a service', detailPh:'Detail (optional): rooms, duration, address…',
    prestaPh:'E.g. Post-construction cleaning', totalHt:'Total excl. VAT', totalTtc:'Total incl. VAT', toPay:'Total due',
    verif:'Check', payment:'Payment', payMethod:'Payment method',
    payTerms:'Specific terms (optional)', penalty:'Late payment penalty rate',
    message:'Message for the client (optional)', worksAddr:'Address of the dwelling concerned by the works',
    yourInvoice:'Your invoice', genPdf:'Generate the PDF', print:'Print', saveFile:'Save as a file',
    noVatLine:'VAT not applicable — art. 293 B FTC',
    listEmpty:'No invoice yet', listEmptyD:'Your saved invoices will appear here.',
    listFirst:'Create my first invoice',
    thNo:'No.', thClient:'Client', thDate:'Date', thAmount:'Amount', thStatus:'Status',
    stDraft:'Draft', stSent:'Sent', stPaid:'Paid',
    dataTitle:'Data stored on this device',
    dataText:'Everything is kept in your browser: nothing is sent online. Export regularly to keep a copy.',
    exportAll:'Export all my data', eraseAll:'Erase everything',
    openTitle:'Edit an invoice', openHelp:'Three ways to reopen an existing invoice.',
    open1:'An invoice already created here', open1d:'The simplest: it reopens with all its details.',
    open1b:'See my invoices',
    open2:'A file saved from the app', open2d:'The .json file created by "Save as a file", or a quote request received from a client.',
    open2b:'Import a .json file',
    open3:'An invoice received as PDF or photo', open3d:'The document is shown next to the form; PDF text is analysed to prefill the fields.',
    dropHere:'Drop your invoice here', dropTypes:'PDF, JPG, JPEG or PNG',
    importGo:'Continue and complete the invoice',
    importNoInvent:'Nothing missing is invented: undetected fields stay empty.',
    dTitle:'Quote request',
    dHelp:'To be filled in by the client, or with them. The request is then downloaded, printed or emailed — with no account to create.',
    dRef:'Reference', dId:'Request no.', dDate:'Date', dYou:'Your details', dName:'Full name',
    dPlace:'Where the work takes place', dKind:'Type of place',
    dServices:'Services needed',
    dPick:'Pick one or more services: the following questions adapt to them.',
    dNoPick:'Select at least one service to continue.',
    dAbout:'A few details',
    dOld2Help:'This question is only used to know whether a reduced VAT rate may apply to the works.',
    dRemote:'Remote work: no on-site address is requested.',
    dSurface:'Approximate area (m²)', dRooms:'Number of rooms',
    dFreq:'Frequency', dWhen:'Preferred date', dNotes:'Details', dNotesPh:'Describe what you need…',
    dPhotos:'Photos (optional)', dPhotosH:'They are resized and stored in the request file. They cannot be attached to an automatic email.',
    dAddPhotos:'Add photos', dSend:'Send my request', dTo:'Recipient email address',
    dMail:'Open my email app', dJson:'Download (.json)', dCopy:'Copy the text',
    dTicket:'View the sheet', dToInvoice:'Turn into an invoice',
    dLocal:'Nothing is sent online automatically: the request is produced on your device, then sent the way you choose.',
    famHome:'Cleaning & housekeeping', famBuild:'Building & trades',
    famCreative:'Creative & communication', famPro:'Consulting & services',
    kindFlat:'Flat', kindHouse:'House', kindOffice:'Office / commercial', kindOther:'Other',
    freqOnce:'One time', freqWeek:'Every week', freqBi:'Twice a month', freqMonth:'Every month',
    ticketTitle:'Request sheet', ticketHelp:'You can save it as a PDF or print it.',
    savePdf:'Save as PDF',
    missTitle:'A few details are missing',
    missHelp:'You can still generate the PDF, but the invoice would be incomplete.',
    missFix:'Complete', missAnyway:'Generate anyway',
    eraseTitle:'Erase everything?', eraseHelp:'Your details and saved invoices on this device will be permanently deleted.',
    eraseYes:'Yes, erase everything',
    vatHelpTitle:'Which VAT rate?',
    vatHelpIntro:'Answer simply. The app <b>suggests</b> a rate: you remain free to change it.',
    vatConds:'Conditions to confirm', vatProposed:'Suggested rate', vatApply:'Apply',
    vatDisclaimer:'This suggestion does not replace advice from your accountant or the tax authority.',
    custTitle:'Customise my invoice', custHelp:'Changes appear immediately in the preview.',
    custPrimary:'Primary colour', custSecondary:'Secondary colour', custLight:'Lightness',
    custPalettes:'Palettes', custStyle:'Invoice style', custLogo:'Logo position',
    styleClean:'Clean', styleBand:'Band', styleLine:'Rule',
    posLeft:'Left', posCenter:'Centre', posRight:'Right',
    footLocal:'Fully local app — your data stays on your device.',
    tSaved:'Invoice saved', tInfoSaved:'Details saved', tCopied:'Details copied',
    tLogo:'Logo added', tDeleted:'Invoice deleted', tImported:'File imported',
    tDevisDl:'Request downloaded', tNeedMail:'Enter the recipient email address',
    tConverted:'Request converted — add the prices', tOpened:'Invoice opened', tDuplicated:'Invoice duplicated'
  }
};
const t = k => { const d = UI[state.ui] || UI.fr; return d[k] !== undefined ? d[k] : (UI.fr[k] !== undefined ? UI.fr[k] : k); };

/* ============ 3. RÈGLES FISCALES & TEXTES DU DOCUMENT ============ */
/* France : service-public.gouv.fr (F31808, F31596, F21746), CGI art. 278,
   279, 279-0 bis, 278-0 bis A, 293 B, Code de commerce L441-9 / D441-5.
   Monaco : convention fiscale franco-monégasque du 18 mai 1963 — mêmes
   bases et mêmes taux de TVA qu'en France ; mentions de facture fixées par
   le Code des taxes sur le chiffre d'affaires (art. A-153 bis de l'annexe)
   et l'arrêté ministériel n° 67-319 du 28 décembre 1967 ; identification
   par le n° RCI (le NIS reste facultatif).
   L'application PROPOSE un taux, l'utilisateur confirme ou modifie. */
const VAT_OPTIONS = [
  { id:'n20',   rate:20,  fr:'20 % — Taux normal', en:'20% — Standard rate' },
  { id:'w10',   rate:10,  fr:'10 % — Travaux dans un logement de plus de 2 ans', en:'10% — Works on housing over 2 years old', cert:true, ref:'CGI art. 279-0 bis' },
  { id:'e55',   rate:5.5, fr:'5,5 % — Rénovation énergétique (logement +2 ans)', en:'5.5% — Energy renovation', cert:true, ref:'CGI art. 278-0 bis A' },
  { id:'sap10', rate:10,  fr:'10 % — Service à la personne au domicile du client', en:'10% — Home personal services', ref:'CGI art. 279 + ann. III art. 86' },
  { id:'z0',    rate:0,   fr:'0 % — Exonération / non soumis à TVA', en:'0% — Exempt' },
  { id:'free',  rate:null,fr:'Autre taux (je le saisis)', en:'Other rate (I type it)' }
];
const vatOpt = id => VAT_OPTIONS.find(o => o.id === id) || VAT_OPTIONS[0];
const vatLabel = o => (state.ui === 'en' && o.en) ? o.en : o.fr;

/* Textes imprimés sur la facture — indépendants de la langue de l'interface */
const DOC = {
  fr:{
    invoice:'FACTURE', number:'N°', issue:'Date d\'émission', due:'Date d\'échéance',
    service:'Date de prestation', from:'Émetteur', to:'Facturé à',
    desc:'Description', qty:'Qté', unit:'Prix unitaire HT', vat:'TVA', total:'Total HT',
    subtotal:'Total HT', vatTotal:'Total TVA', grand:'TOTAL TTC', grandNoVat:'TOTAL À PAYER',
    base:'Base HT', amount:'Montant TVA', rate:'Taux',
    pay:'Conditions de paiement', iban:'IBAN', bic:'BIC',
    siret:'SIRET', rci:'N° RCI', nis:'N° NIS', vatNo:'N° TVA intracom.', phone:'Tél.',
    payBy:'Paiement à effectuer avant le',
    m293B:'TVA non applicable, art. 293 B du CGI.',
    mPenalty:r => 'En cas de retard de paiement, des pénalités sont exigibles sans qu\'un rappel soit nécessaire, au taux de : ' + r + '.',
    mIndem:'Indemnité forfaitaire pour frais de recouvrement en cas de retard de paiement : 40 € (art. D.441-5 du Code de commerce).',
    mEscompte:'Escompte pour paiement anticipé : néant.',
    mInsurance:(a,z) => 'Assurance professionnelle : ' + a + (z ? ' — Couverture géographique : ' + z : '') + '.',
    mCGA:'Membre d\'une association agréée, le règlement par chèque et carte bancaire est accepté.',
    certTitle:'Certification du client — taux réduit de TVA',
    certBody:(art,addr) => 'Le client certifie que les travaux facturés se rapportent à des locaux à usage d\'habitation achevés depuis plus de deux ans, situés ' + (addr || '……………………………') + ', et qu\'ils ne constituent pas une opération de construction, reconstruction ou agrandissement au sens de l\'' + art + '. Le client est solidairement tenu au paiement du complément de taxe si ces mentions s\'avèrent inexactes de son fait.',
    certSign:'Date et signature du client', certKeep:'Un exemplaire à conserver par chaque partie.'
  },
  en:{
    invoice:'INVOICE', number:'No.', issue:'Issue date', due:'Due date',
    service:'Service date', from:'From', to:'Bill to',
    desc:'Description', qty:'Qty', unit:'Unit price (excl. VAT)', vat:'VAT', total:'Total excl. VAT',
    subtotal:'Total excl. VAT', vatTotal:'Total VAT', grand:'TOTAL INCL. VAT', grandNoVat:'TOTAL DUE',
    base:'Net amount', amount:'VAT amount', rate:'Rate',
    pay:'Payment terms', iban:'IBAN', bic:'BIC',
    siret:'Company reg. (SIRET)', rci:'RCI number', nis:'NIS number', vatNo:'VAT number', phone:'Phone',
    payBy:'Payment due by',
    m293B:'VAT not applicable, article 293 B of the French General Tax Code.',
    mPenalty:r => 'Late payment penalties are payable without prior notice at the rate of: ' + r + '.',
    mIndem:'Fixed recovery indemnity for late payment: €40 (French Commercial Code, art. D.441-5).',
    mEscompte:'No discount for early payment.',
    mInsurance:(a,z) => 'Professional insurance: ' + a + (z ? ' — Geographical coverage: ' + z : '') + '.',
    mCGA:'Member of an approved management association; payment by cheque and card accepted.',
    certTitle:'Client certification — reduced VAT rate',
    certBody:(art,addr) => 'The client certifies that the invoiced works relate to residential premises completed more than two years ago, located at ' + (addr || '……………………………') + ', and are not construction, reconstruction or extension works within the meaning of ' + art + '.',
    certSign:'Client date and signature', certKeep:'One copy to be kept by each party.'
  }
};

const PALETTES = [
  { name:'Factura',    p:'#0E1173', s:'#1800FF' },
  { name:'Électrique', p:'#1800FF', s:'#4B3BFF' },
  { name:'Encre',      p:'#1C2060', s:'#5A5FD0' },
  { name:'Ocean',      p:'#0E4C6B', s:'#2E9BC4' },
  { name:'Sauge',      p:'#2F5A4A', s:'#7FB3A0' },
  { name:'Terracotta', p:'#8A3F2A', s:'#D98A6A' },
  { name:'Prune',      p:'#4A2A54', s:'#9C6FB0' },
  { name:'Minimal',    p:'#2A2A2A', s:'#7A7A7A' }
];
const STEPS = [
  { key:'you',    labelKey:'s1', icon:'person',   bird:'coffee' },
  { key:'client', labelKey:'s2', icon:'house',    bird:'plant' },
  { key:'info',   labelKey:'s3', icon:'calendar', bird:'laptop' },
  { key:'items',  labelKey:'s4', icon:'broom',    bird:'paint' },
  { key:'design', labelKey:'s5', icon:'palette',  bird:'paint' },
  { key:'done',   labelKey:'s6', icon:'check',    bird:'zen' }
];

/* Prestations du formulaire de devis, par famille */
const SERVICE_FAMILIES = ['home', 'build', 'creative', 'pro'];
const SERVICES = [
  { id:'menage',     icon:'broom',   fam:'home', onsite:1, ask:['surface','rooms','frequency'],  fr:'Ménage / entretien',   en:'Cleaning' },
  { id:'nettoyage',  icon:'spray',   fam:'home', onsite:1, ask:['surface','rooms'],              fr:'Nettoyage complet',    en:'Deep cleaning' },
  { id:'vitres',     icon:'window',  fam:'home', onsite:1, ask:['surface','frequency'],          fr:'Vitres',               en:'Windows' },
  { id:'repassage',  icon:'shirt',   fam:'home', onsite:1, ask:['frequency','duration'],         fr:'Repassage',            en:'Ironing' },
  { id:'chantier',   icon:'sparkle', fam:'home', onsite:1, ask:['surface','urgency'],            fr:'Fin de chantier',      en:'Post-construction' },
  { id:'exterieur',  icon:'plant',   fam:'home', onsite:1, ask:['surface','frequency'],          fr:'Entretien extérieur',  en:'Outdoor upkeep' },

  { id:'plomberie',  icon:'pipe',     fam:'build', onsite:1, ask:['rooms','urgency','old2'],     fr:'Plomberie',          en:'Plumbing' },
  { id:'elec',       icon:'bolt',     fam:'build', onsite:1, ask:['rooms','urgency','old2'],     fr:'Électricité',        en:'Electrical' },
  { id:'peinture',   icon:'roller',   fam:'build', onsite:1, ask:['surface','rooms','old2'],     fr:'Peinture',           en:'Painting' },
  { id:'menuiserie', icon:'saw',      fam:'build', onsite:1, ask:['volume','old2'],              fr:'Menuiserie',         en:'Carpentry' },
  { id:'maconnerie', icon:'brick',    fam:'build', onsite:1, ask:['surface','old2'],             fr:'Maçonnerie',         en:'Masonry' },
  { id:'carrelage',  icon:'tiles',    fam:'build', onsite:1, ask:['surface','old2'],             fr:'Carrelage',          en:'Tiling' },
  { id:'chauffage',  icon:'radiator', fam:'build', onsite:1, ask:['rooms','old2','urgency'],     fr:'Chauffage / clim',   en:'Heating / AC' },
  { id:'serrurerie', icon:'key',      fam:'build', onsite:1, ask:['urgency'],                    fr:'Serrurerie',         en:'Locksmithing' },
  { id:'couverture', icon:'roof',     fam:'build', onsite:1, ask:['surface','old2','urgency'],   fr:'Couverture / toiture', en:'Roofing' },
  { id:'isolation',  icon:'layers',   fam:'build', onsite:1, ask:['surface','old2'],             fr:'Isolation / placo',  en:'Insulation / drywall' },
  { id:'reparation', icon:'wrench',   fam:'build', onsite:1, ask:['urgency'],                    fr:'Réparation',         en:'Repairs' },
  { id:'travaux',    icon:'bucket',   fam:'build', onsite:1, ask:['urgency','old2'],             fr:'Petits travaux',     en:'Small works' },

  { id:'graphisme',   icon:'palette',  fam:'creative', ask:['volume','existing','budget'],        fr:'Graphisme',          en:'Graphic design' },
  { id:'branding',    icon:'star',     fam:'creative', ask:['existing','budget'],                 fr:'Identité de marque', en:'Branding' },
  { id:'illustration',icon:'brush',    fam:'creative', ask:['volume','budget'],                   fr:'Illustration',       en:'Illustration' },
  { id:'web',         icon:'monitor',  fam:'creative', ask:['pages','existing','budget'],         fr:'Site internet',      en:'Website' },
  { id:'uxui',        icon:'cursor',   fam:'creative', ask:['pages','existing','budget'],         fr:'UX / UI design',     en:'UX / UI design' },
  { id:'photo',       icon:'camera',   fam:'creative', onsite:1, ask:['duration','volume','budget'], fr:'Photographie',    en:'Photography' },
  { id:'video',       icon:'video',    fam:'creative', onsite:1, ask:['duration','budget'],       fr:'Vidéo / motion',     en:'Video / motion' },
  { id:'redaction',   icon:'pen',      fam:'creative', ask:['words','budget'],                    fr:'Rédaction',          en:'Copywriting' },
  { id:'marketing',   icon:'megaphone',fam:'creative', ask:['duration','budget'],                 fr:'Marketing',          en:'Marketing' },
  { id:'community',   icon:'chat',     fam:'creative', ask:['channels','frequency','budget'],     fr:'Community management', en:'Community management' },
  { id:'seo',         icon:'search',   fam:'creative', ask:['pages','existing','budget'],         fr:'SEO / référencement',en:'SEO' },
  { id:'print',       icon:'print',    fam:'creative', ask:['volume','pages','budget'],           fr:'Print / édition',    en:'Print / editorial' },

  { id:'dev',        icon:'code',       fam:'pro', ask:['pages','existing','budget'],             fr:'Développement',      en:'Development' },
  { id:'conseil',    icon:'briefcase',  fam:'pro', ask:['duration','budget'],                     fr:'Conseil / stratégie',en:'Consulting' },
  { id:'compta',     icon:'calculator', fam:'pro', ask:['frequency','volume','budget'],           fr:'Comptabilité / gestion', en:'Accounting' },
  { id:'formation',  icon:'cap',        fam:'pro', onsite:1, ask:['duration','volume','budget'],  fr:'Formation',          en:'Training' },
  { id:'traduction', icon:'globe',      fam:'pro', ask:['words','budget'],                        fr:'Traduction',         en:'Translation' },
  { id:'coaching',   icon:'person',     fam:'pro', ask:['frequency','duration','budget'],         fr:'Coaching',           en:'Coaching' },
  { id:'event',      icon:'calendar',   fam:'pro', onsite:1, ask:['duration','volume','budget'],  fr:'Événementiel',       en:'Events' },
  { id:'admin',      icon:'folder',     fam:'pro', ask:['frequency','duration','budget'],         fr:'Assistance administrative', en:'Admin support' }
];

/* Questions posées selon les prestations choisies.
   Ajouter une question : une entrée ici + la clé dans « ask » du métier. */
const ASK = {
  surface:  { fr:'Surface approximative (m²)',   en:'Approximate area (m²)' },
  rooms:    { fr:'Nombre de pièces',             en:'Number of rooms' },
  frequency:{ fr:'Fréquence souhaitée',          en:'Frequency',
              opts:[['once','Une seule fois','One time'],['week','Chaque semaine','Every week'],
                    ['bi','Deux fois par mois','Twice a month'],['month','Chaque mois','Every month']] },
  urgency:  { fr:'Délai souhaité',               en:'Timing',
              opts:[['','—','—'],['urgent','Urgent','Urgent'],['soon','Dans le mois','Within the month'],
                    ['flex','Pas pressé','No rush']] },
  old2:     { fr:'Le logement est-il achevé depuis plus de 2 ans ?', en:'Was the dwelling completed over 2 years ago?',
              opts:[['','—','—'],['oui','Oui','Yes'],['non','Non','No'],['nsp','Je ne sais pas','I don\'t know']],
              help:1 },
  volume:   { fr:'Nombre de supports / livrables', en:'Number of deliverables' },
  pages:    { fr:'Nombre de pages ou d\'écrans',  en:'Number of pages or screens' },
  existing: { fr:'Avez-vous déjà quelque chose d\'existant ?', en:'Is there something existing?',
              opts:[['','—','—'],['oui','Oui','Yes'],['non','Non, tout est à créer','No, from scratch']] },
  channels: { fr:'Réseaux ou canaux concernés',  en:'Channels involved' },
  duration: { fr:'Durée estimée (heures ou jours)', en:'Estimated duration (hours or days)' },
  words:    { fr:'Volume de texte (mots ou pages)', en:'Text volume (words or pages)' },
  budget:   { fr:'Budget indicatif (facultatif)', en:'Indicative budget (optional)' }
};
const askLabel = k => state.ui === 'en' ? ASK[k].en : ASK[k].fr;
const askOpt = (k, v) => {
  const o = (ASK[k].opts || []).find(x => x[0] === v);
  return o ? (state.ui === 'en' ? o[2] : o[1]) : v;
};
function askedFields(){
  const out = [];
  state.devis.services.forEach(id => {
    const s = SERVICES.find(x => x.id === id);
    if(s && s.ask) s.ask.forEach(k => { if(out.indexOf(k) < 0) out.push(k); });
  });
  const order = Object.keys(ASK);
  return out.sort((a, b) => order.indexOf(a) - order.indexOf(b));
}
const needsPlace = () => state.devis.services.some(id => {
  const s = SERVICES.find(x => x.id === id); return s && s.onsite;
});
const svcLabel = id => { const s = SERVICES.find(x => x.id === id); return s ? (state.ui === 'en' ? s.en : s.fr) : id; };

/* ============ 4. ÉTAT & SAUVEGARDE ============ */
const LS = {
  get(k, d){ try{ const v = localStorage.getItem('factura.' + k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem('factura.' + k, JSON.stringify(v)); }catch(e){ toast('Sauvegarde impossible'); } }
};
const blankCompany = () => ({
  name:'', manager:'', legalForm:'', capital:'', address:'', zip:'', city:'',
  country:'France', countryOther:'', phone:'', email:'', siret:'', nis:'', vatNumber:'',
  vatRegime:'franchise', insurance:'', insuranceArea:'', cga:false, logo:'', iban:'', bic:''
});
const blankClient = () => ({ type:'particulier', name:'', contact:'', address:'', zip:'', city:'',
  country:'France', email:'', siren:'', vatNumber:'' });
const blankItem = () => ({ label:'', detail:'', qty:1, price:0, vatId:'n20', rate:20 });
function blankInvoice(){
  const d = new Date();
  return { id:null, number:nextNumber('FA', 'seq'), issueDate:iso(d), dueDate:iso(addDays(d, 30)),
    serviceDate:'', object:'', lang:'fr', items:[blankItem()], paymentMethod:'Virement bancaire',
    paymentTerms:'', worksAddress:'', penaltyRate:'3 fois le taux d\'intérêt légal en vigueur',
    notes:'', status:'draft' };
}
const blankDevis = () => ({ id:nextNumber('DEV', 'seqDev'), date:iso(new Date()),
  client:{ name:'', email:'', phone:'' }, place:{ address:'', zip:'', city:'', kind:'flat' },
  services:[], details:{ when:'' }, notes:'', photos:[], to:'' });

let state = {
  ui: LS.get('ui', (navigator.language || 'fr').slice(0, 2) === 'en' ? 'en' : 'fr'),
  theme: LS.get('theme', 'light'),
  step:0,
  company: Object.assign(blankCompany(), LS.get('company', {})),
  client: blankClient(),
  invoice: null,
  style: Object.assign({ primary:'#0E1173', secondary:'#1800FF', template:'epure', logoPos:'left' }, LS.get('style', {})),
  invoices: LS.get('invoices', []),
  devis:null, importDoc:null, screen:'home'
};
const saveCompany = () => LS.set('company', state.company);
const saveStyle   = () => LS.set('style', state.style);
const saveList    = () => LS.set('invoices', state.invoices);
const saveDevis   = () => LS.set('devisDraft', state.devis);
const isMonaco    = () => state.company.country === 'Monaco';
const isFrance    = () => state.company.country === 'France';

function nextNumber(prefix, key){
  const y = new Date().getFullYear(), seq = LS.get(key, {});
  return prefix + '-' + y + '-' + String((seq[y] || 0) + 1).padStart(prefix === 'DEV' ? 4 : 3, '0');
}
function bumpNumber(numStr, key){
  const m = /^[A-Z]+-(\d{4})-(\d+)$/.exec(numStr || ''); if(!m) return;
  const seq = LS.get(key, {}), y = m[1], n = parseInt(m[2], 10);
  if(!seq[y] || seq[y] < n){ seq[y] = n; LS.set(key, seq); }
}

/* ============ 5. UTILITAIRES ============ */
const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
const nl  = s => esc(s).replace(/\n/g, '<br>');
const iso = d => d.toISOString().slice(0, 10);
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const num = v => { const n = parseFloat(String(v).replace(',', '.')); return isNaN(n) ? 0 : n; };
const r2 = n => Math.round((n + Number.EPSILON) * 100) / 100;
const money = (n, lang) => new Intl.NumberFormat(lang === 'en' ? 'en-GB' : 'fr-FR',
  { style:'currency', currency:'EUR', minimumFractionDigits:2 }).format(n || 0);
const rateLabel = (r, lang) => r == null ? '—' : (lang === 'en' ? r + '%' : String(r).replace('.', ',') + ' %');
function fdate(s, lang){
  if(!s) return '—';
  const d = new Date(s + 'T00:00:00'); if(isNaN(d)) return s;
  return lang === 'en' ? d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })
                       : d.toLocaleDateString('fr-FR');
}
const getPath = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
function setPath(o, p, v){ const k = p.split('.'); const last = k.pop(); k.reduce((a, x) => a[x], o)[last] = v; }
let toastT;
function toast(msg){
  const el = $('#toast'); el.textContent = msg; el.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), 2800);
}
const openModal = html => { $('#modal-box').innerHTML = html; $('#modal').classList.add('on'); };
const closeModal = () => $('#modal').classList.remove('on');
function download(filename, content){
  const blob = new Blob([content], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
function copyText(txt){
  if(navigator.clipboard && window.isSecureContext)
    navigator.clipboard.writeText(txt).then(() => toast(t('tCopied'))).catch(() => fallbackCopy(txt));
  else fallbackCopy(txt);
}
function fallbackCopy(txt){
  const ta = document.createElement('textarea');
  ta.value = txt; ta.style.cssText = 'position:fixed;left:-9999px';
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); toast(t('tCopied')); }catch(e){}
  document.body.removeChild(ta);
}
function resizeImage(file, max, quality){
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        const k = Math.min(1, max / Math.max(img.width, img.height));
        const cv = document.createElement('canvas');
        cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
        cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
        res(cv.toDataURL(/png/i.test(file.type) ? 'image/png' : 'image/jpeg', quality || .85));
      };
      img.onerror = rej; img.src = fr.result;
    };
    fr.onerror = rej; fr.readAsDataURL(file);
  });
}

/* ============ 6. CALCULS ============ */
function computeTotals(){
  const inv = state.invoice, franchise = state.company.vatRegime === 'franchise';
  const groups = {}; let ht = 0;
  inv.items.forEach(it => {
    const line = r2(num(it.qty) * num(it.price));
    ht += line;
    const rate = franchise ? 0 : num(it.rate);
    groups[rate] = (groups[rate] || 0) + line;
  });
  ht = r2(ht);
  const breakdown = Object.keys(groups)
    .map(k => ({ rate:parseFloat(k), base:r2(groups[k]), vat:r2(groups[k] * parseFloat(k) / 100) }))
    .sort((a, b) => b.rate - a.rate);
  const vat = r2(breakdown.reduce((s, g) => s + g.vat, 0));
  return { ht, vat, ttc:r2(ht + vat), breakdown, franchise };
}
function usesReducedWorks(){
  if(state.company.vatRegime === 'franchise') return null;
  const it = state.invoice.items.find(i => vatOpt(i.vatId).cert);
  return it ? vatOpt(it.vatId) : null;
}

/* ============ 7. DOCUMENT A4 ============ */
function legalLines(L){
  const c = state.company, cl = state.client, inv = state.invoice, out = [];
  if(c.vatRegime === 'franchise') out.push(L.m293B);
  if(cl.type === 'pro'){
    if(inv.penaltyRate) out.push(L.mPenalty(inv.penaltyRate));
    /* L'indemnité forfaitaire de 40 € découle du Code de commerce français :
       elle n'est pas ajoutée automatiquement hors de France. */
    if(isFrance()){ out.push(L.mIndem); out.push(L.mEscompte); }
  }
  if(c.insurance) out.push(L.mInsurance(c.insurance, c.insuranceArea));
  if(c.cga && isFrance()) out.push(L.mCGA);
  return out;
}
function sellerBlock(){
  const c = state.company, out = [];
  let title = c.name || '—';
  if(c.legalForm === 'EI') title += ' — Entrepreneur individuel (EI)';
  else if(c.legalForm && c.legalForm !== 'autre')
    title += ' — ' + c.legalForm + (c.capital ? (state.ui === 'en' ? ', share capital €' + c.capital : ' au capital de ' + c.capital + ' €') : '');
  if(c.manager && c.legalForm !== 'EI') out.push(c.manager);
  out.push(c.address);
  out.push([c.zip, c.city].filter(Boolean).join(' '));
  out.push(c.country === 'Autre' ? c.countryOther : c.country);
  return { title, lines:out.filter(Boolean) };
}
/* --- Les dix modèles de facture -------------------------------------
   Chaque modèle compose les mêmes blocs (en-tête, parties, tableau,
   totaux, paiement, mentions) dans un agencement différent.
   Pour en ajouter un : une entrée dans TEMPLATES, une fonction dans TPL,
   et si besoin quelques lignes de CSS « .tpl-<id> ». ------------------ */
const TEMPLATES = [
  { id:'epure',     fr:'Épuré',     en:'Clean' },
  { id:'bandeau',   fr:'Bandeau',   en:'Band' },
  { id:'ligne',     fr:'Ligne',     en:'Rule' },
  { id:'editorial', fr:'Éditorial', en:'Editorial' },
  { id:'bloc',      fr:'Bloc',      en:'Block' },
  { id:'lateral',   fr:'Latéral',   en:'Side' },
  { id:'studio',    fr:'Studio',    en:'Studio' },
  { id:'signature', fr:'Signature', en:'Signature' },
  { id:'mono',      fr:'Mono',      en:'Mono' },
  { id:'teinte',    fr:'Teinté',    en:'Tinted' }
];
const tplLabel = x => state.ui === 'en' ? x.en : x.fr;

/* mélange une couleur avec le papier crème (pour le modèle teinté) */
function tint(hex, a){
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  const mix = (x, y) => Math.round(x * a + y * (1 - a));
  return 'rgb(' + mix(r, 253) + ',' + mix(g, 251) + ',' + mix(b, 245) + ')';
}

function sheetParts(){
  const inv = state.invoice, c = state.company, cl = state.client;
  const L = DOC[inv.lang] || DOC.fr, tot = computeTotals(), st = state.style;
  const P = st.primary, S = st.secondary;
  const seller = sellerBlock(), cert = usesReducedWorks();
  const idLabel = isMonaco() ? L.rci : L.siret;
  const m = n => money(n, inv.lang);
  const showVat = !tot.franchise && tot.vat > 0;

  const logo = h => c.logo
    ? '<img src="' + c.logo + '" alt="" style="max-height:' + (h || 70) + 'px;max-width:210px;object-fit:contain;display:block">'
    : '<div class="wm">' + esc(c.name || '') + '</div>';

  const sellerBody = seller.lines.map(l => '<p>' + esc(l) + '</p>').join('') +
    (c.phone ? '<p>' + L.phone + ' ' + esc(c.phone) + '</p>' : '') +
    (c.email ? '<p>' + esc(c.email) + '</p>' : '') +
    (c.siret ? '<p>' + idLabel + ' ' + esc(c.siret) + '</p>' : '') +
    (isMonaco() && c.nis ? '<p>' + L.nis + ' ' + esc(c.nis) + '</p>' : '') +
    (c.vatNumber ? '<p>' + L.vatNo + ' ' + esc(c.vatNumber) + '</p>' : '');
  const clientBody =
    (cl.contact ? '<p>' + esc(cl.contact) + '</p>' : '') +
    (cl.address ? '<p>' + esc(cl.address) + '</p>' : '') +
    '<p>' + esc([cl.zip, cl.city].filter(Boolean).join(' ')) + '</p>' +
    (cl.country ? '<p>' + esc(cl.country) + '</p>' : '') +
    (cl.email ? '<p>' + esc(cl.email) + '</p>' : '') +
    (cl.type === 'pro' && cl.siren ? '<p>' + (isMonaco() ? 'RCI ' : 'SIREN ') + esc(cl.siren) + '</p>' : '') +
    (cl.type === 'pro' && cl.vatNumber ? '<p>' + L.vatNo + ' ' + esc(cl.vatNumber) + '</p>' : '');

  const rows = inv.items.filter(i => i.label || num(i.price)).map(i =>
    '<tr class="no-break"><td><div class="desc">' + esc(i.label || '—') + '</div>' +
    (i.detail ? '<div class="sub">' + nl(i.detail) + '</div>' : '') + '</td>' +
    '<td class="r">' + String(num(i.qty)) + '</td>' +
    '<td class="r">' + m(num(i.price)) + '</td>' +
    (tot.franchise ? '' : '<td class="r">' + rateLabel(num(i.rate), inv.lang) + '</td>') +
    '<td class="r">' + m(r2(num(i.qty) * num(i.price))) + '</td></tr>').join('');

  const payLines =
    '<div>' + L.payBy + ' <b>' + fdate(inv.dueDate, inv.lang) + '</b>' + (inv.paymentMethod ? ' — ' + esc(inv.paymentMethod) : '') + '</div>' +
    (c.iban ? '<div>' + L.iban + ' ' + esc(c.iban) + (c.bic ? ' — ' + L.bic + ' ' + esc(c.bic) : '') + '</div>' : '') +
    (inv.paymentTerms ? '<div>' + nl(inv.paymentTerms) + '</div>' : '') +
    (inv.notes ? '<div style="margin-top:5px">' + nl(inv.notes) + '</div>' : '');

  const p = {};
  p.L = L; p.tot = tot; p.P = P; p.S = S; p.inv = inv; p.c = c; p.cl = cl;
  p.logo = logo;
  p.band = '<div class="sh-band" style="background:linear-gradient(90deg,' + P + ',' + S + ')"></div>';

  p.head = mod => '<div class="sh-head ' + esc(st.logoPos) + '"' +
      (mod === 'rule' ? ' style="border-bottom:2px solid ' + P + ';padding-bottom:16px"' : '') + '>' +
      '<div class="sh-logo">' + logo() + '</div>' +
      '<div class="sh-title"><div class="t" style="color:' + P + '">' + L.invoice + '</div>' +
      '<div class="num">' + L.number + ' ' + esc(inv.number || '—') + '</div>' +
      (inv.object ? '<div class="d">' + esc(inv.object) + '</div>' : '') + '</div></div>';

  p.parties = '<div class="sh-parties no-break">' +
      '<div class="sh-party"><div class="h" style="color:' + P + '">' + L.from + '</div>' +
        '<div class="nm">' + esc(seller.title) + '</div>' + sellerBody + '</div>' +
      '<div class="sh-party"><div class="h" style="color:' + P + '">' + L.to + '</div>' +
        '<div class="nm">' + esc(cl.name || '—') + '</div>' + clientBody + '</div></div>';

  p.meta = '<div class="sh-meta no-break">' +
      '<div><div class="k">' + L.issue + '</div><div class="v">' + fdate(inv.issueDate, inv.lang) + '</div></div>' +
      (inv.serviceDate ? '<div><div class="k">' + L.service + '</div><div class="v">' + fdate(inv.serviceDate, inv.lang) + '</div></div>' : '') +
      '<div><div class="k">' + L.due + '</div><div class="v">' + fdate(inv.dueDate, inv.lang) + '</div></div>' +
      '<div><div class="k">' + L.grandNoVat + '</div><div class="v" style="color:' + P + '">' + m(tot.ttc) + '</div></div></div>';

  p.table = '<table class="sh-tbl"><thead><tr style="background:' + P + '">' +
      '<th>' + L.desc + '</th><th style="text-align:right;width:50px">' + L.qty + '</th>' +
      '<th style="text-align:right;width:92px">' + L.unit + '</th>' +
      (tot.franchise ? '' : '<th style="text-align:right;width:60px">' + L.vat + '</th>') +
      '<th style="text-align:right;width:98px">' + L.total + '</th></tr></thead><tbody>' +
      (rows || '<tr><td colspan="5">—</td></tr>') + '</tbody></table>';

  p.vatTable = (showVat && tot.breakdown.length > 1)
    ? '<div class="sh-vat no-break"><table><tr><th>' + L.rate + '</th><th style="text-align:right">' + L.base + '</th><th style="text-align:right">' + L.amount + '</th></tr>' +
      tot.breakdown.map(g => '<tr><td>' + rateLabel(g.rate, inv.lang) + '</td><td style="text-align:right">' + m(g.base) + '</td><td style="text-align:right">' + m(g.vat) + '</td></tr>').join('') +
      '</table></div>' : '<div class="sh-vat"></div>';

  p.totals = '<div class="sh-tot">' +
      '<div class="l"><span>' + L.subtotal + '</span><b>' + m(tot.ht) + '</b></div>' +
      (tot.franchise ? '' : '<div class="l"><span>' + L.vatTotal + '</span><b>' + m(tot.vat) + '</b></div>') +
      '<div class="l grand" style="background:' + P + '"><span>' + (tot.franchise ? L.grandNoVat : L.grand) + '</span><span>' + m(tot.ttc) + '</span></div></div>';
  p.bottom = '<div class="sh-bottom no-break">' + p.vatTable + p.totals + '</div>';

  p.pay = '<div class="sh-pay no-break"><div class="h" style="color:' + P + '">' + L.pay + '</div>' + payLines + '</div>';
  p.payPlain = '<div class="sh-terms no-break"><div class="h" style="font-size:9px;letter-spacing:.13em;text-transform:uppercase;font-weight:700;margin-bottom:5px;color:' + P + '">' + L.pay + '</div>' + payLines + '</div>';

  p.cert = cert ? '<div class="sh-cert no-break"><div class="h">' + L.certTitle + ' — ' + cert.ref + '</div>' +
      '<div>' + L.certBody(cert.ref, inv.worksAddress) + '</div>' +
      '<div class="sig"><span>' + L.certSign + '</span><span>' + L.certKeep + '</span></div></div>' : '';

  p.legal = '<div class="sh-legal">' + legalLines(L).map(x => '<p>' + esc(x) + '</p>').join('') + '</div>';

  /* blocs propres à certains modèles */
  p.huge = size => '<div class="sh-huge" style="font-size:' + size + 'px">' + L.invoice + '.</div>';

  p.topline = '<div class="sh-topline">' +
      '<span>' + L.number + ' <b>' + esc(inv.number || '—') + '</b></span>' +
      '<span>' + L.issue + ' : <b>' + fdate(inv.issueDate, inv.lang) + '</b></span>' +
      '<span>' + L.due + ' : <b>' + fdate(inv.dueDate, inv.lang) + '</b></span></div>';

  p.cols3 = '<div class="sh-cols no-break">' +
      '<div><div class="k">' + L.to + '</div><div class="v"><b>' + esc(cl.name || '—') + '</b>' + clientBody + '</div></div>' +
      '<div><div class="k">' + L.pay + '</div><div class="v">' + (inv.paymentMethod ? esc(inv.paymentMethod) + '<br>' : '') +
        (c.iban ? L.iban + ' ' + esc(c.iban) : '') + '</div></div>' +
      '<div style="text-align:right"><div class="k">' + (tot.franchise ? L.grandNoVat : L.grand) + '</div>' +
        '<div class="v" style="font-size:24px;font-weight:700;color:' + P + '">' + m(tot.ttc) + '</div></div></div>';

  p.sellerCols = '<div class="sh-cols no-break">' +
      '<div><div class="k">' + L.from + '</div><div class="v"><b>' + esc(seller.title) + '</b>' + sellerBody + '</div></div>' +
      '<div><div class="k">' + L.to + '</div><div class="v"><b>' + esc(cl.name || '—') + '</b>' + clientBody + '</div></div>' +
      '<div style="text-align:right"><div class="k">' + L.number + '</div><div class="v"><b>' + esc(inv.number || '—') + '</b>' +
        fdate(inv.issueDate, inv.lang) + '<br>' + L.due + ' ' + fdate(inv.dueDate, inv.lang) + '</div></div></div>';

  p.side = '<div class="sh-side">' + L.invoice.split('').map(ch => '<span>' + ch + '</span>').join('') + '</div>';

  p.wordmark = size => '<div class="sh-wordmark" style="font-size:' + size + 'px">' + esc(c.name || '') + '</div>';

  p.foot4 = '<div class="sh-foot4">' +
      '<div>' + esc(seller.title) + '<br>' + esc(c.address || '') + '</div>' +
      '<div>' + esc([c.zip, c.city].filter(Boolean).join(' ')) + '<br>' + esc(c.country === 'Autre' ? c.countryOther : c.country) + '</div>' +
      '<div>' + (c.siret ? idLabel + ' ' + esc(c.siret) : '') + '<br>' + (c.vatNumber ? L.vatNo + ' ' + esc(c.vatNumber) : '') + '</div>' +
      '<div>' + esc(c.email || '') + '<br>' + esc(c.phone || '') + '</div></div>';

  p.frame = '<div class="sh-frame"><div class="sh-dots"><i></i><i></i><i></i></div>' +
      '<div style="font-weight:700;letter-spacing:.04em">' + L.invoice + ' ' + esc(inv.number || '') + ' — ' + fdate(inv.issueDate, inv.lang) + '</div></div>';

  p.badge = '<div class="sh-badge">' + esc(c.name || '') + '</div>';

  p.sign = '<div class="sh-sign no-break"><div class="l"></div>' + esc(c.manager || c.name || '') + '</div>';

  return p;
}

/* Agencements. Chaque fonction reçoit les blocs et renvoie le document. */
const TPL = {
  epure:p => p.head() + p.parties + p.meta + p.table + p.bottom + p.pay + p.cert + p.legal,
  bandeau:p => p.band + p.head() + p.parties + p.meta + p.table + p.bottom + p.pay + p.cert + p.legal,
  ligne:p => p.head('rule') + p.parties + p.meta + p.table + p.bottom + p.pay + p.cert + p.legal,

  editorial:p => p.topline +
    '<div class="sh-head" style="align-items:center;margin-bottom:26px">' + p.huge(62) + p.badge + '</div>' +
    p.cols3 + p.table + p.bottom +
    '<div class="sh-bottom" style="margin-top:20px">' + p.payPlain + p.sign + '</div>' + p.cert + p.legal,

  bloc:p => '<div class="sh-block">' +
      '<div class="sh-head" style="margin-bottom:22px;align-items:flex-end">' +
        '<div class="sh-logo">' + p.logo(56) + '</div>' +
        '<div class="sh-title"><div class="t">' + p.L.invoice + '</div><div class="num">' + p.L.number + ' ' + esc(p.inv.number || '—') + '</div></div></div>' +
      '<div class="sh-cols" style="margin:0">' +
        '<div><div class="k">' + p.L.issue + '</div><div class="v">' + fdate(p.inv.issueDate, p.inv.lang) + '</div></div>' +
        '<div><div class="k">' + p.L.due + '</div><div class="v">' + fdate(p.inv.dueDate, p.inv.lang) + '</div></div>' +
        '<div style="text-align:right"><div class="k">' + (p.tot.franchise ? p.L.grandNoVat : p.L.grand) + '</div>' +
        '<div class="v" style="font-size:20px;font-weight:700">' + money(p.tot.ttc, p.inv.lang) + '</div></div></div></div>' +
    p.parties + p.table + p.bottom + p.pay + p.cert + p.legal,

  lateral:p => p.side + p.head() + p.parties + p.meta + p.table + p.bottom + p.pay + p.cert + p.legal,

  studio:p => '<div class="sh-huge" style="font-size:46px;margin-bottom:26px">[' + esc(p.c.name || '') + ']</div>' +
    '<div class="sh-cols" style="align-items:flex-start">' +
      '<div><div class="v"><b>' + fdate(p.inv.issueDate, p.inv.lang) + '</b><br>[' + esc(p.cl.name || '—') + ']</div></div>' +
      '<div><div class="v"><b>[' + esc(p.inv.number || '') + ']</b><br>[' + esc(p.inv.object || '—') + ']</div></div>' +
      '<div style="text-align:right"><div class="sh-huge" style="font-size:30px">' + p.L.invoice + '</div></div></div>' +
    p.table + '<div class="sh-bottom" style="justify-content:flex-end">' + p.vatTable + p.totals + '</div>' +
    '<div class="sh-bottom" style="margin-top:28px;align-items:flex-start">' +
      '<div style="flex:0 0 200px"><div class="sh-huge" style="font-size:26px">' + p.L.pay + '</div></div>' +
      '<div style="flex:1;font-size:9px;line-height:1.6">' + p.payPlain + '</div></div>' +
    p.cert + p.legal + p.foot4,

  signature:p => p.sellerCols + p.table + p.bottom + p.payPlain + p.cert + p.legal + p.wordmark(88),

  mono:p => p.frame + p.parties + p.meta + p.table + p.bottom + p.pay + p.cert + p.legal,

  teinte:p => '<div class="sh-head" style="align-items:flex-start;margin-bottom:24px">' +
      '<div><div class="sh-huge" style="font-size:52px">' + p.L.invoice + '</div>' +
      '<div style="font-size:13px;font-weight:600;margin-top:4px">' + p.L.number + ' ' + esc(p.inv.number || '—') + '</div></div>' +
      '<div class="sh-logo">' + p.logo(60) + '</div></div>' +
    p.parties + p.meta + p.table + p.bottom + p.pay + p.cert + p.legal
};

function renderSheet(){
  const inv = state.invoice, el = $('#sheet');
  if(!inv || !el) return;
  const st = state.style, P = st.primary, S = st.secondary;
  const tpl = TPL[st.template] ? st.template : 'epure';
  el.className = 'sheet tpl-' + tpl;
  el.style.setProperty('--p', P);
  el.style.setProperty('--s', S);
  el.style.setProperty('--bg', tpl === 'teinte' ? tint(P, .10) : '#FDFBF5');
  el.style.setProperty('--fg', tpl === 'teinte' ? P : '#1C2060');
  el.innerHTML = TPL[tpl](sheetParts());
  fitSheet();
}

function fitSheet(){
  const stage = $('#stage'), sc = $('#scaler');
  if(!stage || !sc) return;
  const k = Math.min(1, (stage.clientWidth - 8) / 794);
  sc.style.transform = 'scale(' + k + ')';
  sc.style.height = ($('#sheet').offsetHeight * k) + 'px';
}

/* ============ 8. CHROME : BARRES, PIED DE PAGE, ÉCRANS ============ */
function langSwitchHTML(){
  return '<div class="lang">' +
    ['fr', 'en'].map(l => '<button data-ui="' + l + '" class="' + (state.ui === l ? 'on' : '') + '">' + l.toUpperCase() + '</button>').join('') +
    '</div>';
}
function topbarHTML(titleKey, rightHTML, extra){
  return '<div class="bar">' +
      '<div class="left"><button class="btn quiet sm" data-go="home">' + icon('back') + '</button></div>' +
      '<img class="logo" data-img="logo" alt="Factura" data-go="home">' +
      '<div class="right">' + langSwitchHTML() + (rightHTML || '') + '</div>' +
    '</div>' +
    (titleKey ? '<div class="title">' + esc(t(titleKey)) + '</div>' : '') + (extra || '');
}
function renderChrome(){
  $('#tb-build').innerHTML = topbarHTML(null,
    '<button class="btn ghost sm mobile-only" id="btn-preview-m">' + t('preview') + '</button>' +
    '<button class="btn ghost sm" id="btn-save">' + t('save') + '</button>',
    '<nav class="steps" id="steps"></nav>');
  $('#tb-list').innerHTML = topbarHTML('navList', '<button class="btn sm" data-go="new">' + t('newInvoice') + '</button>');
  $('#tb-settings').innerHTML = topbarHTML('navSettings', '<button class="btn sm" id="btn-save-settings">' + t('save') + '</button>');
  $('#tb-open').innerHTML = topbarHTML('openTitle', '');
  $('#tb-devis').innerHTML = topbarHTML('dTitle', '');
  $('#preview-head').innerHTML = '<span class="eyebrow">' + t('preview') + '</span><span style="flex:1"></span>' +
    '<button class="btn quiet sm" id="btn-customize">' + t('customize') + '</button>' +
    '<button class="btn ghost sm mobile-only" id="btn-preview-close">' + t('close') + '</button>';
  $('#tb-menu').innerHTML = topbarHTML('menuTitle', '');
  $('#tb-credits').innerHTML = topbarHTML('creditsTitle', '');
  $('#home-sub').textContent = t('homeSub');
  $('#home-actions').innerHTML =
    '<button class="btn btn-start" data-go="menu">' + t('start') + '</button>' +
    '<div class="home-secondary">' +
      '<button class="btn ghost sm" id="btn-options">' + icon('gear') + ' ' + t('options') + '</button>' +
      '<button class="btn ghost sm" data-go="credits">' + icon('info') + ' ' + t('credits') + '</button>' +
    '</div>';
  $('#site-foot').innerHTML =
    '<img class="foot-logo" id="foot-logo" data-img="logo" alt="Factura">' +
    '<div class="line"><span class="v">v' + APP_VERSION + '</span>' +
      '<span>© ' + new Date().getFullYear() + ' — <b>By Atelier Nardella</b></span></div>' +
    '<div class="line small" style="margin-top:5px">' + t('footLocal') + '</div>' +
    '<a class="ig" href="' + INSTAGRAM + '" target="_blank" rel="noopener">' + icon('instagram') + '@atelier.nardella</a>';
  paintImgs();
  document.documentElement.lang = state.ui;
}
function renderMenu(){
  $('#menu-body').innerHTML =
    '<div class="home-actions" style="max-width:520px;margin:0 auto">' +
      '<button class="big-action" data-go="new">' + icon('receipt') + '<span><b>' + t('a1') + '</b><span>' + t('a1d') + '</span></span></button>' +
      '<button class="big-action" data-go="open">' + icon('pencil') + '<span><b>' + t('a2') + '</b><span>' + t('a2d') + '</span></span></button>' +
      '<button class="big-action" data-go="devis">' + icon('mail') + '<span><b>' + t('a3') + '</b><span>' + t('a3d') + '</span></span></button>' +
    '</div>' +
    '<div class="home-secondary" style="margin-top:18px">' +
      '<button class="btn quiet" data-go="settings">' + t('navSettings') + '</button>' +
      '<button class="btn quiet" data-go="list">' + t('navList') + '</button>' +
    '</div>' + pigeon('coffee', 'pigeon-small');
  paintImgs();
}

/* Crédits & mentions légales — à relire avant toute mise en ligne publique. */
function creditsHTML(){
  const en = state.ui === 'en';
  const B = (h, body) => '<div class="legal-block"><h4>' + h + '</h4>' + body + '</div>';
  if(en) return (
    B('Publisher', '<p>Factura is an invoicing tool published by <b>Atelier Nardella</b>. ' +
      'Contact: <a href="' + INSTAGRAM + '" target="_blank" rel="noopener">@atelier.nardella</a>.</p>') +
    B('Scope', '<p>Factura helps produce invoice documents. It is <b>not</b> legal, tax or accounting advice. ' +
      'The user remains responsible for the content of the invoices issued, for the VAT rates applied and for keeping records.</p>') +
    B('Personal data', '<p>No account, no server, no cookie, no analytics. Everything you type stays in your browser ' +
      '(localStorage) on your device. The publisher never receives your data and cannot recover it. ' +
      'Export your files regularly to keep a backup.</p>') +
    B('Typefaces', '<p><b>Space Grotesk</b> (Florian Karsten) and <b>Space Mono</b> (Colophon Foundry), ' +
      'both under the SIL Open Font License 1.1, served by Google Fonts.</p>') +
    B('Open-source libraries', '<ul>' +
      '<li>html2pdf.js — Erik Koopmans, MIT licence</li>' +
      '<li>jsPDF and html2canvas, bundled with it — MIT licence</li>' +
      '<li>pdf.js — Mozilla, Apache 2.0 licence (loaded only when reading a PDF)</li></ul>') +
    B('Illustrations & identity', '<p>The Factura logo and the pigeon illustrations are © Atelier Nardella. All rights reserved.</p>') +
    B('Tax sources', '<p>service-public.gouv.fr, impots.gouv.fr (BOFiP), economie.gouv.fr and monentreprise.gouv.mc, ' +
      'checked in September 2026. Rates and mandatory notices change: check them again each year.</p>') +
    B('Version', '<p>Factura v' + APP_VERSION + '.</p>')
  );
  return (
    B('Éditeur', '<p>Factura est un outil de facturation édité par <b>Atelier Nardella</b>. ' +
      'Contact : <a href="' + INSTAGRAM + '" target="_blank" rel="noopener">@atelier.nardella</a>.</p>') +
    B('Nature de l\'outil', '<p>Factura aide à produire des documents de facturation. Il ne constitue <b>pas</b> ' +
      'un conseil juridique, fiscal ou comptable. L\'utilisateur reste seul responsable du contenu des factures ' +
      'qu\'il émet, des taux de TVA appliqués et de la conservation de ses documents.</p>') +
    B('Données personnelles', '<p>Aucun compte, aucun serveur, aucun cookie, aucune mesure d\'audience. ' +
      'Tout ce que vous saisissez reste dans votre navigateur (localStorage), sur votre appareil. ' +
      'L\'éditeur ne reçoit jamais vos données et ne peut pas les récupérer. Exportez régulièrement vos fichiers ' +
      'pour en conserver une copie.</p>') +
    B('Polices de caractères', '<p><b>Space Grotesk</b> (Florian Karsten) et <b>Space Mono</b> (Colophon Foundry), ' +
      'toutes deux sous licence SIL Open Font License 1.1, servies par Google Fonts.</p>') +
    B('Bibliothèques libres', '<ul>' +
      '<li>html2pdf.js — Erik Koopmans, licence MIT</li>' +
      '<li>jsPDF et html2canvas, embarqués avec lui — licence MIT</li>' +
      '<li>pdf.js — Mozilla, licence Apache 2.0 (chargé uniquement à la lecture d\'un PDF)</li></ul>') +
    B('Illustrations & identité', '<p>Le logo Factura et les illustrations de pigeons sont © Atelier Nardella. ' +
      'Tous droits réservés.</p>') +
    B('Sources fiscales', '<p>service-public.gouv.fr, impots.gouv.fr (BOFiP), economie.gouv.fr et ' +
      'monentreprise.gouv.mc, consultés en septembre 2026. Les taux et mentions obligatoires évoluent : ' +
      'vérifiez-les chaque année.</p>') +
    B('Version', '<p>Factura v' + APP_VERSION + '.</p>')
  );
}
function renderCredits(){
  $('#credits-body').innerHTML =
    '<div class="step-head">' + icon('info', 'lg') + '<h2 class="step-title">' + t('creditsTitle') + '</h2></div>' +
    '<div class="card" style="margin-top:14px">' + creditsHTML() + '</div>' +
    pigeon('zen', 'pigeon-small');
  paintImgs();
}
function applyTheme(){
  document.documentElement.dataset.theme = state.theme === 'invert' ? 'invert' : 'light';
}
function openOptions(){
  openModal('<h3>' + t('optTitle') + '</h3>' +
    '<div class="sec-title" style="margin-top:18px">' + t('optLang') + '</div>' +
    '<div class="choice">' +
      ['fr|Français', 'en|English'].map(x => { const a = x.split('|');
        return '<button data-ui="' + a[0] + '" class="' + (state.ui === a[0] ? 'on' : '') + '">' + a[1] + '</button>'; }).join('') +
    '</div>' +
    '<div class="sec-title">' + t('optTheme') + '</div>' +
    '<div class="choice">' +
      '<button data-theme="light" class="' + (state.theme !== 'invert' ? 'on' : '') + '">' + t('optLight') + '</button>' +
      '<button data-theme="invert" class="' + (state.theme === 'invert' ? 'on' : '') + '">' + t('optInvert') + '</button>' +
    '</div>' +
    noteHTML('info', t('optThemeH')) +
    '<button class="btn wide" data-close="1">' + t('close') + '</button>');
}

function show(screen){
  state.screen = screen;
  $$('.screen').forEach(s => s.classList.remove('on'));
  const el = $('#scr-' + screen); if(el) el.classList.add('on');
  window.scrollTo(0, 0);
  const fl = $('#foot-logo'); if(fl) fl.style.display = (screen === 'home') ? 'none' : 'block';
  if(screen === 'menu') renderMenu();
  if(screen === 'credits') renderCredits();
  if(screen === 'list') renderList();
  if(screen === 'settings') renderSettings();
  if(screen === 'open') renderOpen();
  if(screen === 'devis') renderDevis();
  if(screen === 'build') renderStep();
  try{ history.replaceState(null, '', screen === 'home' ? location.pathname : '#' + screen); }catch(e){}
}
function setLang(l){
  state.ui = l; LS.set('ui', l);
  renderChrome();
  if(state.screen === 'build') renderStep(); else show(state.screen);
}

/* ============ 9. FORMULAIRES & ÉTAPES ============ */
function fieldHTML(label, path, o){
  o = o || {};
  return '<div class="field"><label>' + esc(label) + '</label><input type="' + (o.type || 'text') + '" data-bind="' + path + '" value="' +
    esc(getPath(state, path) || '') + '"' + (o.ph ? ' placeholder="' + esc(o.ph) + '"' : '') + '></div>';
}
function selectHTML(label, path, options){
  const v = getPath(state, path);
  return '<div class="field"><label>' + esc(label) + '</label><select data-bind="' + path + '">' +
    options.map(o => '<option value="' + esc(o[0]) + '"' + (String(v) === String(o[0]) ? ' selected' : '') + '>' + esc(o[1]) + '</option>').join('') +
    '</select></div>';
}
function areaHTML(label, path, ph){
  return '<div class="field"><label>' + esc(label) + '</label><textarea data-bind="' + path + '" placeholder="' + esc(ph || '') + '">' +
    esc(getPath(state, path) || '') + '</textarea></div>';
}
const noteHTML = (ic, html, warn) => '<div class="note' + (warn ? ' warn' : '') + '">' + icon(ic) + '<span>' + html + '</span></div>';

const NOTES = {
  franchise:() => state.ui === 'en'
    ? 'Under the French small-business exemption, no VAT appears on your invoices and the notice <b>"VAT not applicable, art. 293 B"</b> is added automatically. 2026 thresholds: <b>€37,500</b> (services) and €85,000 (goods).'
    : 'En franchise en base, aucune TVA n\'apparaît sur vos factures et la mention <b>« TVA non applicable, art. 293 B du CGI »</b> est ajoutée automatiquement.<br>Seuils 2026 : <b>37 500 €</b> (services) et 85 000 € (ventes), seuils majorés 41 250 € et 93 500 €. <i>Source : service-public.gouv.fr</i>',
  assujetti:() => state.ui === 'en'
    ? 'You will choose the VAT rate for each service, with guided help.'
    : 'Vous choisirez le taux de TVA prestation par prestation, avec une aide au choix.',
  artisan:() => state.ui === 'en'
    ? 'For a craft activity in France, professional insurance and its geographical coverage must appear on the invoice <i>(Code de l\'artisanat, art. L132-1 and R132-1)</i>.'
    : 'Pour une activité artisanale, l\'assurance professionnelle et sa couverture géographique doivent figurer sur la facture <i>(Code de l\'artisanat, art. L132-1 et R132-1)</i>.',
  monaco:() => state.ui === 'en'
    ? 'Monaco applies French VAT on the same basis and at the same rates (Franco-Monegasque convention of 18 May 1963); VAT numbers carry the FR prefix. Invoice notices come from the Code des taxes sur le chiffre d\'affaires (art. A-153 bis) and ministerial order no. 67-319 of 28 December 1967: the RCI number, legal form and share capital must appear; the NIS number is optional. The €40 recovery indemnity of the French Commercial Code is not applied automatically here.'
    : 'Monaco applique la TVA française sur les mêmes bases et aux mêmes taux (convention franco-monégasque du 18 mai 1963) ; les numéros de TVA portent le préfixe FR. Les mentions de facture relèvent du Code des taxes sur le chiffre d\'affaires (art. A-153 bis) et de l\'arrêté ministériel n° 67-319 du 28 décembre 1967 : le n° RCI, la forme juridique et le capital social doivent figurer sur la facture ; le n° NIS reste facultatif. L\'indemnité forfaitaire de 40 € du Code de commerce français n\'est pas ajoutée automatiquement.',
  otherCountry:() => state.ui === 'en'
    ? 'Outside France and Monaco, the app no longer adds country-specific legal notices: check what your country requires and add it in the "Specific terms" field.'
    : 'Hors de France et de Monaco, l\'application n\'ajoute plus de mentions légales propres au pays : vérifiez ce qu\'exige votre pays et complétez le champ « Conditions particulières ».',
  clientPro:() => state.ui === 'en'
    ? 'For a business client, the invoice automatically adds the late-payment penalties' + (isFrance() ? ' and the mandatory €40 recovery indemnity.' : '.')
    : 'Pour un client professionnel, la facture ajoute automatiquement les <b>pénalités de retard</b>' + (isFrance() ? ' et l\'<b>indemnité forfaitaire de 40 €</b>, obligatoires.' : '.'),
  efact:() => state.ui === 'en'
    ? 'Since <b>1 September 2026</b>, all French businesses must be able to <b>receive</b> electronic invoices. The obligation to <b>issue</b> them reaches small businesses on 1 September 2027. <i>Source: service-public.gouv.fr</i>'
    : 'Depuis le <b>1<sup>er</sup> septembre 2026</b>, toutes les entreprises françaises doivent pouvoir <b>recevoir</b> des factures électroniques. L\'obligation d\'en <b>émettre</b> s\'appliquera aux TPE/PME au 1<sup>er</sup> septembre 2027. <i>Source : service-public.gouv.fr</i>',
  clientPart:() => state.ui === 'en'
    ? 'For an individual client, penalties between businesses and the €40 indemnity do not apply: they are not added.'
    : 'Pour un particulier, les pénalités entre professionnels et l\'indemnité de 40 € ne s\'appliquent pas : elles ne sont pas ajoutées.',
  serviceDate:() => state.ui === 'en'
    ? 'The <b>service date</b> is only useful if it differs from the issue date. Leave it empty otherwise.'
    : 'La <b>date de prestation</b> n\'est utile que si elle diffère de la date d\'émission. Laissez vide sinon.',
  itemsFranchise:() => state.ui === 'en'
    ? 'You are VAT-exempt: no rate to choose, the prices you type are the final prices.'
    : 'Vous êtes en <b>franchise en base</b> : pas de TVA à choisir, les prix saisis sont les prix finaux.',
  itemsVat:() => state.ui === 'en'
    ? 'The VAT rate depends on your situation and on the exact nature of the work. <b>Check the suggested rate before validating.</b> When in doubt, 20% is the default rate.'
    : 'Le taux de TVA dépend de votre situation et de la nature exacte des travaux. <b>Vérifiez le taux proposé avant de valider.</b> En cas de doute, 20 % est le taux par défaut.',
  cert:() => state.ui === 'en'
    ? 'A reduced rate is used: the invoice shows the certification the client must <b>date and sign</b>. It replaces the Cerfa 1300-SD / 1301-SD form withdrawn in 2025. Keep a copy.'
    : 'Un taux réduit est utilisé : la facture affiche la mention de certification que le client doit <b>dater et signer</b>. Elle remplace l\'attestation Cerfa 1300-SD / 1301-SD supprimée en 2025. Conservez-en une copie.',
  checkVat:() => state.ui === 'en'
    ? 'Check the VAT rate of each service before generating the invoice: your business is liable in case of error.'
    : 'Vérifiez le taux de TVA de chaque prestation avant de générer la facture : c\'est votre entreprise qui est redevable en cas d\'erreur.'
};

const LEGAL_FORMS = () => isMonaco()
  ? [['', '—'], ['EI', state.ui === 'en' ? 'Sole trader' : 'Entreprise individuelle'],
     ['Profession libérale', state.ui === 'en' ? 'Self-employed professional' : 'Profession libérale'],
     ['SARL', 'SARL'], ['SAM', 'SAM'], ['SNC', 'SNC'], ['SCS', 'SCS'], ['autre', state.ui === 'en' ? 'Other' : 'Autre']]
  : [['', '—'], ['EI', state.ui === 'en' ? 'Sole trader / micro-business' : 'Entreprise individuelle / micro-entreprise'],
     ['EURL', 'EURL'], ['SARL', 'SARL'], ['SASU', 'SASU'], ['SAS', 'SAS'], ['autre', state.ui === 'en' ? 'Other' : 'Autre']];

function companyFormHTML(){
  const c = state.company;
  return '<div class="logo-zone" style="margin-bottom:18px">' +
    '<div class="logo-prev">' + (c.logo ? '<img src="' + c.logo + '" alt="">' : icon('palette', 'lg')) + '</div>' +
    '<div style="flex:1"><b style="display:block;margin-bottom:2px">' + t('fLogo') + '</b>' +
    '<p class="small muted" style="margin-bottom:9px">' + t('fLogoH') + '</p>' +
    '<button class="btn ghost sm" id="btn-logo">' + t('fChoose') + '</button> ' +
    (c.logo ? '<button class="btn quiet sm" id="btn-logo-del">' + t('fRemove') + '</button>' : '') + '</div></div>' +
    fieldHTML(t('fName'), 'company.name') +
    '<div class="row c2">' + fieldHTML(t('fManager'), 'company.manager') +
      selectHTML(t('fLegal'), 'company.legalForm', LEGAL_FORMS()) + '</div>' +
    (['EURL','SARL','SASU','SAS','SAM','SNC','SCS'].indexOf(c.legalForm) >= 0 ? fieldHTML(t('fCapital'), 'company.capital') : '') +
    fieldHTML(t('fAddress'), 'company.address') +
    '<div class="row c3">' + fieldHTML(t('fZip'), 'company.zip') + fieldHTML(t('fCity'), 'company.city') +
      selectHTML(t('fCountry'), 'company.country', [['France', 'France'], ['Monaco', 'Monaco'], ['Autre', state.ui === 'en' ? 'Other country' : 'Autre pays']]) + '</div>' +
    (c.country === 'Autre' ? fieldHTML(t('fCountryOther'), 'company.countryOther') : '') +
    (isMonaco() ? noteHTML('info', NOTES.monaco()) : '') +
    (c.country === 'Autre' ? noteHTML('warn', NOTES.otherCountry(), true) : '') +
    '<div class="row c2">' + fieldHTML(t('fPhone'), 'company.phone', { type:'tel' }) + fieldHTML(t('fEmail'), 'company.email', { type:'email' }) + '</div>' +
    '<div class="row c2">' + fieldHTML(isMonaco() ? t('fRci') : t('fSiret'), 'company.siret') +
      fieldHTML(t('fVatNo'), 'company.vatNumber', { ph:'FR…' }) + '</div>' +
    (isMonaco() ? fieldHTML(t('fNis'), 'company.nis') : '') +
    '<div class="sec-title">' + t('vatTitle') + '</div><div class="choice">' +
      '<button data-set="company.vatRegime" data-val="franchise" class="' + (c.vatRegime === 'franchise' ? 'on' : '') + '">' + t('vatNo') + '<span class="d">' + t('vatNoD') + '</span></button>' +
      '<button data-set="company.vatRegime" data-val="assujetti" class="' + (c.vatRegime === 'assujetti' ? 'on' : '') + '">' + t('vatYes') + '<span class="d">' + t('vatYesD') + '</span></button></div>' +
    (c.vatRegime === 'franchise' ? noteHTML('info', NOTES.franchise()) : noteHTML('info', NOTES.assujetti())) +
    '<div class="sec-title">' + t('bank') + '</div>' +
    '<div class="row c2">' + fieldHTML('IBAN', 'company.iban') + fieldHTML('BIC', 'company.bic') + '</div>' +
    '<div class="sec-title">' + t('extra') + '</div>' +
    '<div class="row c2">' + fieldHTML(t('fInsurance'), 'company.insurance') + fieldHTML(t('fInsuranceArea'), 'company.insuranceArea') + '</div>' +
    (isFrance() ? '<label class="cond"><input type="checkbox" data-check="company.cga"' + (c.cga ? ' checked' : '') + '><span>' + t('fCga') + '</span></label>' : '') +
    (isFrance() ? noteHTML('info', NOTES.artisan()) : '');
}
const stepHead = (n, ic, title, help) =>
  '<p class="eyebrow">' + t('stepOf')(n) + '</p><div class="step-head">' + icon(ic, 'lg') + '<h2 class="step-title">' + esc(title) + '</h2></div>' +
  '<p class="step-help">' + help + '</p>';

function renderStep(){
  const s = STEPS[state.step].key; let h = '';
  if(s === 'you') h = stepHead(1, 'person', t('q1'), t('h1')) + companyFormHTML();
  if(s === 'client'){
    const cl = state.client;
    h = stepHead(2, 'house', t('q2'), t('h2')) +
      '<div class="choice">' +
        '<button data-set="client.type" data-val="particulier" class="' + (cl.type === 'particulier' ? 'on' : '') + '">' + t('typeP') + '<span class="d">' + t('typePd') + '</span></button>' +
        '<button data-set="client.type" data-val="pro" class="' + (cl.type === 'pro' ? 'on' : '') + '">' + t('typeC') + '<span class="d">' + t('typeCd') + '</span></button></div>' +
      fieldHTML(cl.type === 'pro' ? t('clNameC') : t('clNameP'), 'client.name') +
      (cl.type === 'pro' ? fieldHTML(t('clContact'), 'client.contact') : '') +
      fieldHTML(t('fAddress'), 'client.address') +
      '<div class="row c3">' + fieldHTML(t('fZip'), 'client.zip') + fieldHTML(t('fCity'), 'client.city') + fieldHTML(t('fCountry'), 'client.country') + '</div>' +
      fieldHTML(t('fEmail'), 'client.email', { type:'email' }) +
      (cl.type === 'pro'
        ? '<div class="row c2">' + fieldHTML(isMonaco() ? 'RCI' : t('clSiren'), 'client.siren') + fieldHTML(t('clVat'), 'client.vatNumber') + '</div>' +
          noteHTML('info', NOTES.clientPro()) + (isFrance() ? noteHTML('calendar', NOTES.efact()) : '')
        : noteHTML('info', NOTES.clientPart()));
  }
  if(s === 'info'){
    h = stepHead(3, 'calendar', t('q3'), t('h3')) +
      '<div class="row c2">' + fieldHTML(t('invNumber'), 'invoice.number') +
        selectHTML(t('invLang'), 'invoice.lang', [['fr', '🇫🇷 Français'], ['en', '🇬🇧 English']]) + '</div>' +
      '<div class="row c3">' + fieldHTML(t('invIssue'), 'invoice.issueDate', { type:'date' }) +
        fieldHTML(t('invService'), 'invoice.serviceDate', { type:'date' }) +
        fieldHTML(t('invDue'), 'invoice.dueDate', { type:'date' }) + '</div>' +
      '<div class="row-btns">' +
        [0, 15, 30, 45].map(d => '<button class="btn quiet sm" data-due="' + d + '">' + (d ? d + ' ' + t('days') : t('onReceipt')) + '</button>').join('') + '</div>' +
      fieldHTML(t('invObject'), 'invoice.object') + noteHTML('info', NOTES.serviceDate());
  }
  if(s === 'items'){
    h = stepHead(4, 'broom', t('q4'), t('h4')) +
      (state.company.vatRegime === 'franchise' ? noteHTML('info', NOTES.itemsFranchise()) : noteHTML('warn', NOTES.itemsVat(), true)) +
      '<div id="items"></div>' +
      '<button class="btn ghost wide" id="btn-add-item" style="margin:6px 0 16px">' + icon('plus') + ' ' + t('addItem') + '</button>' +
      '<div id="totbox"></div>';
  }
  if(s === 'design'){
    h = stepHead(5, 'palette', t('q6'), t('h6')) +
      '<p class="eyebrow" style="margin-bottom:8px">' + t('swipeHint') + '</p>' +
      '<div class="tpl-rail" id="tpl-rail"></div>' +
      '<div class="panel"><div class="sec-title" style="margin-top:0">' + t('custPalettes') + '</div>' +
        '<div class="swatches" style="justify-content:center;margin-top:0">' +
          PALETTES.map((x, i) => '<div class="sw" data-pal="' + i + '" title="' + x.name + '" style="background:linear-gradient(135deg,' + x.p + ' 50%,' + x.s + ' 50%)"></div>').join('') +
        '</div>' +
        '<div class="target-tabs" style="margin-top:16px">' +
          '<button data-target="primary" class="' + (wheelTarget === 'primary' ? 'on' : '') + '">' + t('custPrimary') + '</button>' +
          '<button data-target="secondary" class="' + (wheelTarget === 'secondary' ? 'on' : '') + '">' + t('custSecondary') + '</button></div>' +
        '<div class="color-lab" style="justify-items:center">' +
          '<div class="wheel-wrap"><div class="wheel" id="wheel"></div><div class="wheel-dot" id="wheel-dot"></div></div><div style="width:100%">' +
          '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;justify-content:center">' +
            '<div class="sw" id="sw-p" style="background:' + state.style.primary + '"></div>' +
            '<div class="sw" id="sw-s" style="background:' + state.style.secondary + '"></div>' +
            '<input type="text" id="hexin" value="' + esc(state.style[wheelTarget]) + '" style="width:118px;text-transform:uppercase"></div>' +
          '<label class="lbl" style="text-align:center">' + t('custLight') + '</label><input type="range" id="lum" min="12" max="72" value="30">' +
          '</div></div></div>' +
      '<div class="panel"><div class="sec-title" style="margin-top:0">' + t('custLogo') + '</div>' +
        '<div class="choice" style="grid-template-columns:repeat(3,1fr)">' +
          [['left', t('posLeft')], ['center', t('posCenter')], ['right', t('posRight')]].map(a =>
            '<button data-style="logoPos" data-val="' + a[0] + '" class="' + (state.style.logoPos === a[0] ? 'on' : '') + '">' + a[1] + '</button>').join('') +
        '</div></div>';
  }
  if(s === 'done'){
    h = stepHead(6, 'check', t('q5'), t('h5')) +
      '<div class="panel"><div class="sec-title" style="margin-top:0">' + t('verif') + '</div><div id="checklist"></div></div>' +
      '<div class="panel"><div class="sec-title" style="margin-top:0">' + t('payment') + '</div>' +
        selectHTML(t('payMethod'), 'invoice.paymentMethod', (state.ui === 'en'
          ? [['Bank transfer','Bank transfer'],['Cheque','Cheque'],['Cash','Cash'],['Card','Card']]
          : [['Virement bancaire','Virement bancaire'],['Chèque','Chèque'],['Espèces','Espèces'],['Carte bancaire','Carte bancaire'],['CESU préfinancé','CESU préfinancé']])) +
        areaHTML(t('payTerms'), 'invoice.paymentTerms') +
        (state.client.type === 'pro' ? fieldHTML(t('penalty'), 'invoice.penaltyRate') : '') +
        areaHTML(t('message'), 'invoice.notes') + '</div>' +
      (usesReducedWorks() ? '<div class="panel">' + fieldHTML(t('worksAddr'), 'invoice.worksAddress') + noteHTML('warn', NOTES.cert(), true) + '</div>' : '') +
      '<div class="panel"><div class="sec-title" style="margin-top:0">' + t('yourInvoice') + '</div>' +
        '<button class="btn wide" id="btn-pdf" style="margin-bottom:9px">' + icon('download') + ' ' + t('genPdf') + '</button>' +
        '<div class="row c2" style="gap:9px"><button class="btn ghost" id="btn-print">' + t('print') + '</button>' +
        '<button class="btn ghost" id="btn-json">' + t('saveFile') + '</button></div></div>';
  }
  $('#form-col').innerHTML = h + pigeon(STEPS[state.step].bird);
  paintImgs();
  if(s === 'design'){ renderRail(); bindWheel(); }
  if(s === 'items'){ renderItems(); renderTotals(); }
  if(s === 'done') renderChecklist();
  const nb = $('#btn-next'); if(nb) nb.innerHTML = (s === 'done') ? icon('download') + ' ' + t('genPdf') : t('continue');
  const pb = $('#btn-prev'); if(pb) pb.textContent = state.step === 0 ? t('home') : t('back');
  renderStepChips(); renderSheet();
}
/* Carrousel : chaque vignette est une vraie facture, réduite. */
function renderRail(){
  const rail = $('#tpl-rail'); if(!rail || !state.invoice) return;
  const st = state.style, parts = sheetParts();
  rail.innerHTML = TEMPLATES.map(x => {
    const vars = '--p:' + st.primary + ';--s:' + st.secondary +
      ';--bg:' + (x.id === 'teinte' ? tint(st.primary, .10) : '#FDFBF5') +
      ';--fg:' + (x.id === 'teinte' ? st.primary : '#1C2060');
    return '<div class="tpl-slide ' + (st.template === x.id ? 'on' : '') + '" data-style="template" data-val="' + x.id + '">' +
      '<div class="slide-paper"><div class="sheet tpl-' + x.id + '" style="' + vars + '">' + TPL[x.id](parts) + '</div></div>' +
      '<div class="slide-name">' + esc(tplLabel(x)) + (st.template === x.id ? ' ✓' : '') + '</div></div>';
  }).join('');
  fitRail();
  const on = rail.querySelector('.tpl-slide.on');
  if(on) rail.scrollTo({ left:Math.max(0, on.offsetLeft - (rail.clientWidth - on.clientWidth) / 2), behavior:'auto' });
}
function fitRail(){
  $$('.slide-paper').forEach(box => {
    const k = box.clientWidth / 794;
    const sheet = box.firstElementChild;
    if(!sheet) return;
    sheet.style.transform = 'scale(' + k + ')';
    box.style.height = (1123 * k) + 'px';
  });
}
function renderStepChips(){
  const box = $('#steps'); if(!box) return;
  box.innerHTML = STEPS.map((s, i) =>
    '<button class="step-chip ' + (i === state.step ? 'active' : (i < state.step ? 'done' : '')) + '" data-step="' + i + '">' +
    '<span class="n">' + (i < state.step ? '✓' : (i + 1)) + '</span>' + esc(t(s.labelKey)) + '</button>').join('');
}
function renderSettings(){
  $('#settings-body').innerHTML =
    '<div class="centered"><div class="step-head">' + icon('gear', 'lg') + '<h2 class="step-title">' + t('navSettings') + '</h2></div></div>' +
    '<div class="card">' + companyFormHTML() + '</div>' +
    '<div class="card" style="margin-top:16px"><div class="sec-title" style="margin-top:0">' + t('dataTitle') + '</div>' +
    '<p class="small muted" style="margin-bottom:12px">' + t('dataText') + '</p>' +
    '<button class="btn ghost sm" id="btn-export-all">' + t('exportAll') + '</button> ' +
    '<button class="btn quiet sm" id="btn-reset">' + t('eraseAll') + '</button></div>' + pigeon('plant', 'pigeon-small');
  paintImgs();
}

/* ============ 10. PRESTATIONS ============ */
function renderItems(){
  const box = $('#items'); if(!box) return;
  const franchise = state.company.vatRegime === 'franchise';
  box.innerHTML = state.invoice.items.map((it, i) => {
    const line = r2(num(it.qty) * num(it.price)), o = vatOpt(it.vatId);
    return '<div class="item" data-i="' + i + '">' +
      (state.invoice.items.length > 1 ? '<button class="kill" data-del="' + i + '">✕</button>' : '') +
      '<div class="top">' +
        '<div><label class="lbl">' + t('presta') + '</label><input type="text" data-item="label" data-i="' + i + '" value="' + esc(it.label) + '" placeholder="' + esc(t('prestaPh')) + '"></div>' +
        '<div><label class="lbl">' + t('qty') + '</label><input type="text" inputmode="decimal" data-item="qty" data-i="' + i + '" value="' + esc(it.qty) + '"></div>' +
        '<div><label class="lbl">' + t('unit') + '</label><input type="text" inputmode="decimal" data-item="price" data-i="' + i + '" value="' + esc(it.price) + '"></div>' +
      '</div><div class="bot">' +
        (franchise ? '<div class="small muted">' + t('noVatLine') + '</div>'
          : '<div><label class="lbl">' + t('vat') + '</label><div class="vat-line"><select data-item="vatId" data-i="' + i + '">' +
            VAT_OPTIONS.map(v => '<option value="' + v.id + '"' + (v.id === it.vatId ? ' selected' : '') + '>' + esc(vatLabel(v)) + '</option>').join('') + '</select>' +
            (o.rate === null ? '<input type="text" inputmode="decimal" style="width:78px" data-item="rate" data-i="' + i + '" value="' + esc(it.rate) + '">' : '') +
            '<button class="chip-help" data-help="' + i + '">' + t('whichRate') + '</button></div></div>') +
        '<div class="tot"><label class="lbl">' + t('total') + '</label><b data-tot="' + i + '">' + money(line, state.ui) + '</b></div>' +
      '</div><div style="margin-top:9px"><input type="text" data-item="detail" data-i="' + i + '" value="' + esc(it.detail) + '" placeholder="' + esc(t('detailPh')) + '"></div></div>';
  }).join('');
}
function renderTotals(){
  const box = $('#totbox'); if(!box) return;
  const tot = computeTotals();
  box.innerHTML = '<div class="totals"><div class="l"><span>' + (tot.franchise ? t('total') : t('totalHt')) + '</span><span>' + money(tot.ht, state.ui) + '</span></div>' +
    (tot.franchise ? '' : tot.breakdown.filter(g => g.rate > 0).map(g =>
      '<div class="l"><span class="muted">' + t('vat') + ' ' + rateLabel(g.rate, state.ui) + ' — ' + money(g.base, state.ui) + '</span><span>' + money(g.vat, state.ui) + '</span></div>').join('')) +
    '<div class="l big"><span>' + (tot.franchise ? t('toPay') : t('totalTtc')) + '</span><span>' + money(tot.ttc, state.ui) + '</span></div></div>';
}

/* ============ 11. ASSISTANT TVA ============ */
let vatWiz = { i:0, kind:null, conds:{} };
const openVatHelp = i => { vatWiz = { i, kind:null, conds:{} }; drawVatHelp(); };
function drawVatHelp(){
  const en = state.ui === 'en';
  const kinds = en ? [
    ['menage',  'Cleaning, ironing, day-to-day upkeep', 'At an individual\'s home'],
    ['travaux', 'Works in a dwelling', 'Painting, repairs, fitting, upkeep'],
    ['energie', 'Energy renovation', 'Insulation, efficient heating, windows'],
    ['autre',   'Another service', 'Business premises, post-construction, outdoors…']
  ] : [
    ['menage',  'Ménage, repassage, entretien courant', 'Chez un particulier, à son domicile'],
    ['travaux', 'Travaux dans un logement', 'Peinture, réparation, aménagement, entretien'],
    ['energie', 'Rénovation énergétique', 'Isolation, chauffage performant, menuiseries'],
    ['autre',   'Autre prestation', 'Locaux professionnels, fin de chantier, extérieur…']
  ];
  let h = '<h3>' + t('vatHelpTitle') + '</h3><p class="muted small" style="margin-bottom:16px">' + t('vatHelpIntro') + '</p>' +
    kinds.map(k => '<button class="opt ' + (vatWiz.kind === k[0] ? 'on' : '') + '" data-wiz-kind="' + k[0] + '"><b>' + k[1] + '</b><span>' + k[2] + '</span></button>').join('');

  if(vatWiz.kind){
    const C = (en ? {
      menage:[['sap','My business is a registered personal-services provider'],['home','The service is carried out at the client\'s home'],['excl','My activity is exclusively personal services']],
      travaux:[['old','The dwelling was completed more than 2 years ago'],['hab','It is residential premises'],['noNew','It is not construction, reconstruction or extension'],['sign','The client will sign the certification on the invoice']],
      energie:[['old','The dwelling was completed more than 2 years ago'],['hab','It is residential premises'],['perf','The equipment meets the performance criteria and is supplied AND installed by the business'],['sign','The client will sign the certification on the invoice']],
      autre:[]
    } : {
      menage:[['sap','Mon entreprise est déclarée organisme de services à la personne'],['home','La prestation est réalisée au domicile du client (un particulier)'],['excl','Mon activité est exclusivement du service à la personne']],
      travaux:[['old','Le logement est achevé depuis plus de 2 ans'],['hab','Il s\'agit d\'un local à usage d\'habitation'],['noNew','Ce ne sont ni une construction, ni une reconstruction, ni un agrandissement'],['sign','Le client signera la mention de certification sur la facture']],
      energie:[['old','Le logement est achevé depuis plus de 2 ans'],['hab','Il s\'agit d\'un local à usage d\'habitation'],['perf','Les équipements respectent les critères de performance et sont fournis ET posés par l\'entreprise'],['sign','Le client signera la mention de certification sur la facture']],
      autre:[]
    })[vatWiz.kind];

    if(C.length) h += '<div class="sec-title">' + t('vatConds') + '</div>' +
      C.map(c => '<label class="cond"><input type="checkbox" data-wiz-cond="' + c[0] + '"' + (vatWiz.conds[c[0]] ? ' checked' : '') + '><span>' + c[1] + '</span></label>').join('');

    const all = C.every(c => vatWiz.conds[c[0]]);
    let id = 'n20';
    let why = en ? 'No reduced rate can be confirmed here: the standard rate applies.'
                 : 'Aucun taux réduit ne peut être confirmé ici : le taux normal s\'applique.';
    if(vatWiz.kind === 'menage' && all){ id = 'sap10'; why = en ? 'Home upkeep and household work carried out at home by a registered personal-services provider (CGI art. 279 and annex III art. 86).' : 'Entretien de la maison et travaux ménagers réalisés au domicile par un organisme déclaré de services à la personne (CGI art. 279 et annexe III art. 86).'; }
    if(vatWiz.kind === 'travaux' && all){ id = 'w10'; why = en ? 'Improvement, transformation, fitting or upkeep works on a dwelling completed more than 2 years ago (CGI art. 279-0 bis).' : 'Travaux d\'amélioration, de transformation, d\'aménagement ou d\'entretien sur un logement achevé depuis plus de 2 ans (CGI art. 279-0 bis).'; }
    if(vatWiz.kind === 'energie' && all){ id = 'e55'; why = en ? 'Energy-efficiency improvement works on a dwelling over 2 years old (CGI art. 278-0 bis A).' : 'Travaux d\'amélioration de la performance énergétique d\'un logement de plus de 2 ans (CGI art. 278-0 bis A).'; }
    if(vatWiz.kind === 'autre') why = en ? 'Cleaning of business premises, outdoor upkeep, caretaking and small gardening fall under the standard rate.' : 'Nettoyage de locaux professionnels, entretien extérieur, gardiennage, petits travaux de jardinage : ces prestations relèvent du taux normal.';
    const o = vatOpt(id);
    h += '<div class="verdict"><div class="eyebrow">' + t('vatProposed') + '</div><div class="rate">' + rateLabel(o.rate, state.ui) + '</div>' +
      '<p class="small" style="margin-top:6px">' + esc(why) + '</p>' +
      (isMonaco() ? '<p class="small muted" style="margin-top:6px">' + (en ? 'In Monaco the rates are identical to France; the conditions for reduced rates should be confirmed with the Direction des Services Fiscaux.' : 'À Monaco, les taux sont identiques à la France ; les conditions d\'application des taux réduits sont à confirmer auprès de la Direction des Services Fiscaux.') + '</p>' : '') +
      '<p class="small muted" style="margin-top:6px">' + t('vatDisclaimer') + '</p>' +
      '<button class="btn wide" style="margin-top:12px" data-wiz-apply="' + id + '">' + t('vatApply') + ' ' + rateLabel(o.rate, state.ui) + '</button></div>';
  }
  h += '<div style="margin-top:16px"><button class="btn quiet" data-close="1">' + t('close') + '</button></div>';
  openModal(h);
}

/* ============ 12. PERSONNALISATION ============ */
let wheelTarget = 'primary';
/* Aperçus schématiques des dix modèles (sélecteur de personnalisation) */
const MINI = {
  epure:'<i style="left:7px;top:7px;width:20px;height:5px"></i><i style="right:7px;top:7px;width:24px;height:8px"></i><i style="left:7px;right:7px;top:24px;height:1px;opacity:.4"></i><i style="left:7px;right:7px;top:32px;height:1px;opacity:.4"></i><i style="left:7px;right:7px;top:40px;height:1px;opacity:.4"></i>',
  bandeau:'<i style="left:0;right:0;top:0;height:6px"></i><i style="left:7px;top:14px;width:20px;height:5px"></i><i style="left:7px;right:7px;top:28px;height:1px;opacity:.4"></i><i style="left:7px;right:7px;top:36px;height:1px;opacity:.4"></i>',
  ligne:'<i style="left:7px;top:9px;width:20px;height:5px"></i><i style="left:7px;right:7px;top:20px;height:2px"></i><i style="left:7px;right:7px;top:32px;height:1px;opacity:.4"></i><i style="left:7px;right:7px;top:40px;height:1px;opacity:.4"></i>',
  editorial:'<i style="left:7px;right:7px;top:7px;height:1px"></i><i style="left:7px;top:13px;width:40px;height:11px"></i><i style="right:7px;top:12px;width:13px;height:13px;border-radius:50%;opacity:.5"></i><i style="left:7px;right:7px;top:32px;height:1px;opacity:.4"></i><i style="left:7px;right:7px;top:40px;height:1px;opacity:.4"></i>',
  bloc:'<i style="left:0;right:0;top:0;height:24px"></i><i style="left:7px;right:7px;top:32px;height:1px;opacity:.4"></i><i style="left:7px;right:7px;top:40px;height:1px;opacity:.4"></i><i style="left:7px;right:7px;top:48px;height:1px;opacity:.4"></i>',
  lateral:'<i style="right:6px;top:6px;bottom:6px;width:6px"></i><i style="left:7px;top:9px;width:18px;height:5px"></i><i style="left:7px;right:20px;top:26px;height:1px;opacity:.4"></i><i style="left:7px;right:20px;top:34px;height:1px;opacity:.4"></i>',
  studio:'<i style="left:7px;top:7px;right:7px;height:9px"></i><i style="left:7px;top:22px;width:12px;height:2px;opacity:.5"></i><i style="left:7px;right:7px;top:30px;height:1px;opacity:.4"></i><i style="left:7px;right:7px;top:36px;height:1px;opacity:.4"></i><i style="left:7px;right:7px;bottom:7px;height:4px"></i>',
  signature:'<i style="left:7px;top:7px;width:14px;height:2px;opacity:.5"></i><i style="left:7px;right:7px;top:16px;height:1px;opacity:.4"></i><i style="left:7px;right:7px;top:24px;height:1px;opacity:.4"></i><i style="left:5px;right:5px;bottom:6px;height:14px"></i>',
  mono:'<i style="left:6px;top:6px;right:6px;height:10px;background:transparent;box-shadow:inset 0 0 0 1.5px var(--brand)"></i><i style="left:6px;top:22px;right:6px;bottom:6px;background:transparent;box-shadow:inset 0 0 0 1.5px var(--brand);opacity:.5"></i>',
  teinte:'<i style="inset:0;opacity:.14"></i><i style="left:7px;top:9px;width:26px;height:9px"></i><i style="left:7px;right:7px;top:28px;height:1px;opacity:.5"></i><i style="left:7px;right:7px;top:36px;height:1px;opacity:.5"></i>'
};
function openCustomize(){
  const st = state.style;
  openModal('<h3>' + t('custTitle') + '</h3><p class="muted small" style="margin-bottom:16px">' + t('custHelp') + '</p>' +
    '<div class="target-tabs"><button data-target="primary" class="' + (wheelTarget === 'primary' ? 'on' : '') + '">' + t('custPrimary') + '</button>' +
    '<button data-target="secondary" class="' + (wheelTarget === 'secondary' ? 'on' : '') + '">' + t('custSecondary') + '</button></div>' +
    '<div class="color-lab"><div class="wheel-wrap"><div class="wheel" id="wheel"></div><div class="wheel-dot" id="wheel-dot"></div></div><div>' +
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">' +
        '<div class="sw" id="sw-p" style="background:' + st.primary + '"></div>' +
        '<div class="sw" id="sw-s" style="background:' + st.secondary + '"></div>' +
        '<input type="text" id="hexin" value="' + esc(st[wheelTarget]) + '" style="width:116px;text-transform:uppercase"></div>' +
      '<label class="lbl">' + t('custLight') + '</label><input type="range" id="lum" min="12" max="72" value="30">' +
      '<div class="lbl" style="margin-top:12px">' + t('custPalettes') + '</div><div class="swatches">' +
      PALETTES.map((p, i) => '<div class="sw" data-pal="' + i + '" title="' + p.name + '" style="background:linear-gradient(135deg,' + p.p + ' 50%,' + p.s + ' 50%)"></div>').join('') +
      '</div></div></div>' +
    '<div class="sec-title">' + t('custStyle') + '</div><div class="tpl-grid">' +
      TEMPLATES.map(x => '<button class="tpl-card ' + (st.template === x.id ? 'on' : '') + '" data-style="template" data-val="' + x.id + '">' +
        '<span class="mini">' + (MINI[x.id] || '') + '</span>' + esc(tplLabel(x)) + '</button>').join('') + '</div>' +
    '<div class="sec-title">' + t('custLogo') + '</div><div class="choice" style="grid-template-columns:repeat(3,1fr)">' +
      [['left', t('posLeft')], ['center', t('posCenter')], ['right', t('posRight')]].map(a =>
        '<button data-style="logoPos" data-val="' + a[0] + '" class="' + (st.logoPos === a[0] ? 'on' : '') + '">' + a[1] + '</button>').join('') + '</div>' +
    '<button class="btn wide" style="margin-top:18px" data-close="1">' + t('close') + '</button>');
  bindWheel();
}
function hsl2hex(h, s, l){
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const to = x => Math.round(255 * x).toString(16).padStart(2, '0');
  return '#' + to(f(0)) + to(f(8)) + to(f(4));
}
function bindWheel(){
  const w = $('#wheel'), dot = $('#wheel-dot'), lum = $('#lum'); if(!w) return;
  let hue = 245, sat = 90;
  const place = () => {
    const R = (w.clientWidth || 166) / 2;
    const rad = (hue - 90) * Math.PI / 180, d = (sat / 100) * R * .92;
    dot.style.left = (R + Math.cos(rad) * d) + 'px';
    dot.style.top = (R + Math.sin(rad) * d) + 'px';
    dot.style.background = state.style[wheelTarget];
  };
  const apply = () => {
    state.style[wheelTarget] = hsl2hex(hue, sat, parseInt(lum.value, 10));
    saveStyle(); renderSheet();
    $('#hexin').value = state.style[wheelTarget].toUpperCase();
    $('#sw-p').style.background = state.style.primary;
    $('#sw-s').style.background = state.style.secondary;
    place();
  };
  const pick = e => {
    const r = w.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
    hue = (Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360;
    sat = Math.min(100, Math.round(Math.hypot(x, y) / (r.width / 2) * 100));
    apply();
  };
  let down = false;
  w.addEventListener('pointerdown', e => { down = true; w.setPointerCapture(e.pointerId); pick(e); });
  w.addEventListener('pointermove', e => { if(down) pick(e); });
  w.addEventListener('pointerup', () => { down = false; if($('#tpl-rail')) renderRail(); });
  lum.addEventListener('input', apply);
  lum.addEventListener('change', () => { if($('#tpl-rail')) renderRail(); });
  $('#hexin').addEventListener('input', e => {
    const v = e.target.value.trim();
    if(/^#[0-9a-fA-F]{6}$/.test(v)){ state.style[wheelTarget] = v; saveStyle(); renderSheet();
      $('#sw-p').style.background = state.style.primary; $('#sw-s').style.background = state.style.secondary; }
  });
  place();
}

/* ============ 13. VALIDATION & PDF ============ */
function checks(){
  const c = state.company, cl = state.client, inv = state.invoice, tot = computeTotals(), out = [];
  const en = state.ui === 'en';
  const add = (ok, label, hint) => out.push({ ok, label, hint });
  add(!!c.name, t('fName'), en ? 'Enter your business name (step 1).' : 'Renseignez le nom de votre entreprise (étape 1).');
  add(!!(c.address && c.city), t('fAddress'), en ? 'Your full address is missing (step 1).' : 'Il manque votre adresse complète (étape 1).');
  add(!!c.siret, isMonaco() ? t('fRci') : t('fSiret'),
    isMonaco() ? (en ? 'The RCI number must appear on the invoice.' : 'Le n° RCI doit figurer sur la facture.')
               : (en ? 'The SIRET (or SIREN) number is mandatory.' : 'Le numéro SIRET (ou SIREN) est obligatoire sur la facture.'));
  if(isMonaco() && ['SARL','SAM','SNC','SCS'].indexOf(c.legalForm) >= 0)
    add(!!c.capital, t('fCapital'), en ? 'In Monaco, the legal form and share capital must appear.' : 'À Monaco, la forme juridique et le capital social doivent figurer sur la facture.');
  add(!!cl.name, t('thClient'), en ? 'The client name is missing (step 2).' : 'Il manque le nom du client (étape 2).');
  add(!!(cl.address && cl.city), t('fAddress') + ' — ' + t('thClient'), en ? 'The client address is missing (step 2).' : 'Il manque l\'adresse du client (étape 2).');
  add(!!inv.number, t('invNumber'), en ? 'Each invoice needs a unique, continuous number.' : 'Chaque facture doit avoir un numéro unique et continu.');
  add(!!inv.issueDate, t('invIssue'), en ? 'Add the issue date (step 3).' : 'Ajoutez la date d\'émission (étape 3).');
  add(!!inv.dueDate, t('invDue'), en ? 'Add the payment deadline (step 3).' : 'Ajoutez la date limite de paiement (étape 3).');
  add(inv.items.some(i => i.label && num(i.price) > 0), t('presta'), en ? 'Add at least one service with a price (step 4).' : 'Ajoutez au moins une prestation avec un prix (étape 4).');
  if(c.vatRegime === 'assujetti')
    add(!!c.vatNumber || tot.ht <= 150, t('fVatNo'), en ? 'Mandatory above €150 excl. VAT if you are VAT-registered.' : 'Obligatoire au-delà de 150 € HT si vous êtes assujettie.');
  if(cl.type === 'pro')
    add(!!inv.penaltyRate, t('penalty'), en ? 'Required between businesses.' : 'Mention obligatoire entre professionnels.');
  if(usesReducedWorks())
    add(!!inv.worksAddress, t('worksAddr'), en ? 'Needed for the reduced-rate certification.' : 'Nécessaire pour la mention de certification du taux réduit.');
  return out;
}
function renderChecklist(){
  const box = $('#checklist'); if(!box) return;
  box.innerHTML = checks().map(c => '<div class="check ' + (c.ok ? 'ok' : 'ko') + '"><span class="m">' + (c.ok ? '✓' : '!') + '</span><span>' +
    esc(c.label) + (c.ok ? '' : '<br><span class="small">' + esc(c.hint) + '</span>') + '</span></div>').join('');
  if(state.company.vatRegime === 'assujetti')
    box.insertAdjacentHTML('beforeend', noteHTML('warn', NOTES.checkVat(), true));
}
function saveInvoice(silent){
  const inv = state.invoice, tot = computeTotals();
  if(!inv.id) inv.id = 'i' + Date.now();
  const rec = { id:inv.id, number:inv.number, client:state.client.name || '—', date:inv.issueDate,
    total:tot.ttc, status:inv.status || 'draft',
    data:{ invoice:JSON.parse(JSON.stringify(inv)), client:JSON.parse(JSON.stringify(state.client)) } };
  const i = state.invoices.findIndex(x => x.id === inv.id);
  if(i >= 0) state.invoices[i] = rec; else state.invoices.unshift(rec);
  saveList(); saveCompany(); bumpNumber(inv.number, 'seq');
  if(!silent) toast(t('tSaved'));
}
function elementToPDF(el, filename){
  if(typeof html2pdf === 'undefined'){
    document.title = filename.replace('.pdf', '');
    setTimeout(() => window.print(), 300); return;
  }
  const holder = document.createElement('div');
  holder.style.cssText = 'position:fixed;left:-10000px;top:0;width:794px;background:#FDFBF5';
  const clone = el.cloneNode(true); clone.style.boxShadow = 'none';
  holder.appendChild(clone); document.body.appendChild(holder);
  html2pdf().set({
    margin:0, filename,
    image:{ type:'jpeg', quality:.98 },
    html2canvas:{ scale:3, useCORS:true, backgroundColor:'#FDFBF5', windowWidth:794 },
    jsPDF:{ unit:'mm', format:'a4', orientation:'portrait' },
    pagebreak:{ mode:['css', 'legacy'] }
  }).from(clone).save()
    .then(() => { document.body.removeChild(holder); toast(filename); })
    .catch(() => { document.body.removeChild(holder); window.print(); });
}
function exportPDF(){
  const bad = checks().filter(c => !c.ok);
  if(bad.length){
    openModal('<h3>' + t('missTitle') + '</h3><p class="muted small" style="margin-bottom:14px">' + t('missHelp') + '</p>' +
      bad.map(b => '<div class="check ko"><span class="m">!</span><span>' + esc(b.hint) + '</span></div>').join('') +
      '<div style="display:flex;gap:9px;margin-top:18px"><button class="btn" data-close="1">' + t('missFix') + '</button>' +
      '<button class="btn ghost" id="force-pdf">' + t('missAnyway') + '</button></div>');
    return;
  }
  doPDF();
}
function doPDF(){
  closeModal(); saveInvoice(true);
  elementToPDF($('#sheet'), 'Facture-' + (state.invoice.number || 'sans-numero').replace(/[^\w\-]/g, '') + '.pdf');
}
function exportJSON(){
  saveInvoice(true);
  download('Facture-' + (state.invoice.number || 'brouillon') + '.json',
    JSON.stringify({ _app:'factura-facture', version:APP_VERSION, company:state.company, client:state.client, invoice:state.invoice, style:state.style }, null, 2));
}

/* ============ 14. MES FACTURES / IMPORT ============ */
function renderList(){
  const box = $('#list-body');
  if(!state.invoices.length){
    box.innerHTML = '<div style="text-align:center;padding:34px 10px">' + icon('folder', 'xl') +
      '<p style="font-size:21px;font-weight:700;margin:10px 0 5px">' + t('listEmpty') + '</p>' +
      '<p class="muted" style="margin-bottom:18px">' + t('listEmptyD') + '</p>' +
      '<button class="btn" data-go="new">' + t('listFirst') + '</button>' + pigeon('laptop', 'pigeon-small') + '</div>';
    paintImgs(); return;
  }
  const st = [['draft', t('stDraft')], ['sent', t('stSent')], ['paid', t('stPaid')]];
  box.innerHTML = '<div class="table-scroll"><table class="tbl"><thead><tr><th>' + t('thNo') + '</th><th>' + t('thClient') + '</th><th>' + t('thDate') +
    '</th><th>' + t('thAmount') + '</th><th>' + t('thStatus') + '</th><th></th></tr></thead><tbody>' +
    state.invoices.map(r => '<tr><td><b>' + esc(r.number) + '</b></td><td>' + esc(r.client) + '</td><td>' + fdate(r.date, state.ui) + '</td>' +
      '<td style="font-variant-numeric:tabular-nums">' + money(r.total, state.ui) + '</td>' +
      '<td><select data-status="' + r.id + '" style="padding:6px 26px 6px 10px;font-size:12.5px;border-radius:999px;width:auto">' +
        st.map(a => '<option value="' + a[0] + '"' + (r.status === a[0] ? ' selected' : '') + '>' + a[1] + '</option>').join('') + '</select></td>' +
      '<td style="text-align:right;white-space:nowrap"><button class="btn quiet sm" data-edit="' + r.id + '">' + t('edit') + '</button>' +
      '<button class="btn quiet sm" data-dup="' + r.id + '">' + t('duplicate') + '</button>' +
      '<button class="btn quiet sm" data-rm="' + r.id + '">' + t('del') + '</button></td></tr>').join('') + '</tbody></table></div>';
}
function loadInvoice(id, duplicate){
  const rec = state.invoices.find(x => x.id === id); if(!rec) return;
  state.invoice = JSON.parse(JSON.stringify(rec.data.invoice));
  state.client = JSON.parse(JSON.stringify(rec.data.client));
  if(duplicate){
    state.invoice.id = null; state.invoice.number = nextNumber('FA', 'seq'); state.invoice.status = 'draft';
    state.invoice.issueDate = iso(new Date()); state.invoice.dueDate = iso(addDays(new Date(), 30));
  }
  state.step = duplicate ? 2 : 4;
  show('build');
  toast(duplicate ? t('tDuplicated') : t('tOpened'));
}
function renderOpen(){
  $('#open-body').innerHTML =
    '<div class="centered"><div class="step-head">' + icon('pencil', 'lg') + '<h2 class="step-title">' + t('openTitle') + '</h2></div>' +
    '<p class="step-help">' + t('openHelp') + '</p></div>' +
    '<div class="card" style="margin-bottom:14px"><b style="display:block;margin-bottom:3px">' + t('open1') + '</b>' +
      '<p class="small muted" style="margin-bottom:12px">' + t('open1d') + '</p>' +
      '<button class="btn" data-go="list">' + t('open1b') + '</button></div>' +
    '<div class="card" style="margin-bottom:14px"><b style="display:block;margin-bottom:3px">' + t('open2') + '</b>' +
      '<p class="small muted" style="margin-bottom:12px">' + t('open2d') + '</p>' +
      '<button class="btn ghost" id="btn-import-json">' + t('open2b') + '</button></div>' +
    '<div class="card"><b style="display:block;margin-bottom:3px">' + t('open3') + '</b>' +
      '<p class="small muted" style="margin-bottom:12px">' + t('open3d') + '</p>' +
      '<div class="drop" id="drop">' + icon('folder', 'lg') + '<b style="display:block;margin-top:6px">' + t('dropHere') + '</b>' +
      '<p class="small muted" style="margin-top:4px">' + t('dropTypes') + '</p></div><div id="import-result"></div></div>' +
    pigeon('zen', 'pigeon-small');
  paintImgs();
}
function loadPdfJs(){
  return new Promise((res, rej) => {
    if(window.pdfjsLib) return res(window.pdfjsLib);
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    s.onload = () => { try{ window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'; }catch(e){} res(window.pdfjsLib); };
    s.onerror = rej; document.head.appendChild(s);
  });
}
async function handleDoc(file){
  const url = URL.createObjectURL(file);
  const isPdf = /pdf$/i.test(file.type) || /\.pdf$/i.test(file.name);
  const box = $('#import-result'), en = state.ui === 'en';
  box.innerHTML = noteHTML('info', en ? 'Reading the document…' : 'Lecture du document…');
  let found = {};
  if(isPdf){
    try{
      const lib = await loadPdfJs();
      const pdf = await lib.getDocument({ url }).promise;
      let text = '';
      for(let p = 1; p <= Math.min(pdf.numPages, 3); p++){
        const c = await (await pdf.getPage(p)).getTextContent();
        text += c.items.map(i => i.str).join(' ') + '\n';
      }
      found = extractFields(text);
    }catch(e){ found = {}; }
  }
  const n = Object.keys(found).length;
  box.innerHTML = '<div class="row c2" style="margin-top:16px;align-items:start">' +
    '<div class="doc-view">' + (isPdf ? '<iframe src="' + url + '"></iframe>' : '<img src="' + url + '">') + '</div><div>' +
    (n ? noteHTML('check', '<b>' + n + (en ? ' item(s) detected.' : ' information(s) détectée(s).') + '</b> ' + (en ? 'Check them: everything stays editable.' : 'Vérifiez-les : tout reste modifiable.')) +
         '<ul class="small" style="margin:0 0 14px 18px">' + Object.keys(found).map(k => '<li><b>' + esc(k) + '</b> : ' + esc(found[k]) + '</li>').join('') + '</ul>'
       : noteHTML('warn', '<b>' + (en ? 'Some information could not be detected.' : 'Certaines informations n\'ont pas pu être détectées.') + '</b> ' +
         (isPdf ? (en ? 'This PDF has no readable text layer (scanned document).' : 'Ce PDF ne contient pas de texte lisible (document scanné).')
                : (en ? 'Automatic reading is not available for images.' : 'La lecture automatique n\'est pas disponible pour les images.')) + ' ' +
         (en ? 'The document stays displayed next to the form.' : 'Le document reste affiché à côté du formulaire.'), true)) +
    '<button class="btn wide" id="btn-import-go">' + t('importGo') + '</button>' +
    '<p class="small muted" style="margin-top:8px">' + t('importNoInvent') + '</p></div></div>';
  state.importDoc = { url, fields:found };
}
function extractFields(tx){
  const out = {}, T = tx.replace(/\s+/g, ' '); let m;
  if((m = /\b(\d{3}\s?\d{3}\s?\d{3}\s?\d{5})\b/.exec(T))) out['SIRET'] = m[1].replace(/\s/g, '');
  if((m = /\bFR\s?[0-9A-Z]{2}\s?\d{9}\b/i.exec(T))) out['TVA'] = m[0].replace(/\s/g, '').toUpperCase();
  if((m = /(?:facture|invoice)\s*(?:n[°ºo]\s*|num[ée]ro\s*:?\s*|no\.?\s*)([A-Z0-9][A-Z0-9\-\/\.]{2,})/i.exec(T))) out['N°'] = m[1];
  if((m = /(\d{2}[\/\.-]\d{2}[\/\.-]\d{4})/.exec(T))) out['Date'] = m[1];
  if((m = /total\s*(?:ttc|incl)?[^\d]{0,8}([\d\s]{1,9}[.,]\d{2})/i.exec(T))) out['Total'] = m[1].trim() + ' €';
  return out;
}
function applyImport(){
  const f = (state.importDoc && state.importDoc.fields) || {};
  state.invoice = blankInvoice(); state.client = blankClient();
  if(f['N°']) state.invoice.number = f['N°'];
  if(f['Date']){ const p = f['Date'].split(/[\/\.-]/); if(p.length === 3) state.invoice.issueDate = p[2] + '-' + p[1] + '-' + p[0]; }
  if(f['SIRET'] && !state.company.siret) state.company.siret = f['SIRET'];
  if(f['TVA'] && !state.company.vatNumber) state.company.vatNumber = f['TVA'];
  state.step = 0; show('build');
}

/* ============ 15. DEMANDE DE DEVIS ============ */
/* 100 % local : fichier JSON, fiche imprimable, e-mail (mailto:) ou copie.
   Aucun serveur, aucune API, aucune base de données. */
function renderDevis(){
  const d = state.devis = state.devis || Object.assign(blankDevis(), LS.get('devisDraft', {}));
  if(!d.to && state.company.email) d.to = state.company.email;
  const famKey = { home:'famHome', build:'famBuild', creative:'famCreative', pro:'famPro' };
  const fam = f => '<div class="fam">' + t(famKey[f]) + '</div>' +
    '<div class="svc-grid">' + SERVICES.filter(s => s.fam === f).map(s =>
      '<button class="svc ' + (d.services.indexOf(s.id) >= 0 ? 'on' : '') + '" data-svc="' + s.id + '">' +
      icon(s.icon) + '<b>' + esc(svcLabel(s.id)) + '</b></button>').join('') + '</div>';

  $('#devis-body').innerHTML =
    '<div class="centered"><div class="step-head">' + icon('mail', 'lg') + '<h2 class="step-title">' + t('dTitle') + '</h2></div>' +
    '<p class="step-help">' + t('dHelp') + '</p></div>' +
    '<div class="card" style="margin-bottom:14px"><div class="sec-title" style="margin-top:0">' + t('dRef') + '</div>' +
      '<div class="row c2">' + fieldHTML(t('dId'), 'devis.id') + fieldHTML(t('dDate'), 'devis.date', { type:'date' }) + '</div></div>' +
    '<div class="card" style="margin-bottom:14px"><div class="sec-title" style="margin-top:0">' + t('dYou') + '</div>' +
      fieldHTML(t('dName'), 'devis.client.name') +
      '<div class="row c2">' + fieldHTML(t('fEmail'), 'devis.client.email', { type:'email' }) + fieldHTML(t('fPhone'), 'devis.client.phone', { type:'tel' }) + '</div></div>' +
    '<div class="card" style="margin-bottom:14px"><div class="sec-title" style="margin-top:0;text-align:center">' + t('dServices') + '</div>' +
      '<p class="small muted" style="margin:-4px 0 4px">' + t('dPick') + '</p>' +
      SERVICE_FAMILIES.map(fam).join('') + '</div>' +
    '<div id="devis-details"></div>' +
    '<div class="card" style="margin-bottom:14px"><div class="sec-title" style="margin-top:0">' + t('dPhotos') + '</div>' +
      '<p class="small muted" style="margin-bottom:10px">' + t('dPhotosH') + '</p>' +
      '<button class="btn ghost sm" id="btn-photos">' + t('dAddPhotos') + '</button><div class="photos" id="photo-list"></div></div>' +
    '<div class="card"><div class="sec-title" style="margin-top:0">' + t('dSend') + '</div>' +
      fieldHTML(t('dTo'), 'devis.to', { type:'email' }) +
      '<button class="btn wide" id="btn-devis-mail" style="margin-bottom:9px">' + icon('mail') + ' ' + t('dMail') + '</button>' +
      '<div class="row c2" style="gap:9px;margin-bottom:9px">' +
        '<button class="btn ghost" id="btn-devis-json">' + icon('download') + ' ' + t('dJson') + '</button>' +
        '<button class="btn ghost" id="btn-devis-copy">' + icon('copy') + ' ' + t('dCopy') + '</button></div>' +
      '<div class="row c2" style="gap:9px">' +
        '<button class="btn ghost" id="btn-devis-ticket">' + t('dTicket') + '</button>' +
        '<button class="btn ghost" id="btn-devis-facture">' + t('dToInvoice') + '</button></div>' +
      noteHTML('info', t('dLocal')) + '</div>' + pigeon('camera', 'pigeon-small');
  renderDevisDetails(); paintImgs(); renderPhotos();
}
/* Les questions posées dépendent des prestations cochées. */
function renderDevisDetails(){
  const box = $('#devis-details'); if(!box) return;
  const d = state.devis, keys = askedFields();
  if(!d.services.length){
    box.innerHTML = '<div class="card" style="margin-bottom:14px">' + noteHTML('info', t('dNoPick')) +
      '<div style="margin-top:-4px">' + fieldHTML(t('dWhen'), 'devis.details.when', { type:'date' }) +
      areaHTML(t('dNotes'), 'devis.notes', t('dNotesPh')) + '</div></div>';
    return;
  }
  const onsite = needsPlace();
  keys.forEach(k => { if(ASK[k].opts && !d.details[k]) d.details[k] = ASK[k].opts[0][0]; });
  const field = k => ASK[k].opts
    ? selectHTML(askLabel(k), 'devis.details.' + k, ASK[k].opts.map(o => [o[0], state.ui === 'en' ? o[2] : o[1]]))
    : fieldHTML(askLabel(k), 'devis.details.' + k);
  const pairs = [];
  for(let i = 0; i < keys.length; i += 2) pairs.push(keys.slice(i, i + 2));

  box.innerHTML =
    (onsite
      ? '<div class="card" style="margin-bottom:14px"><div class="sec-title" style="margin-top:0">' + t('dPlace') + '</div>' +
        fieldHTML(t('fAddress'), 'devis.place.address') +
        '<div class="row c2">' + fieldHTML(t('fZip'), 'devis.place.zip') + fieldHTML(t('fCity'), 'devis.place.city') + '</div>' +
        selectHTML(t('dKind'), 'devis.place.kind', [['flat', t('kindFlat')], ['house', t('kindHouse')], ['office', t('kindOffice')], ['other', t('kindOther')]]) + '</div>'
      : '<div class="card" style="margin-bottom:14px">' + noteHTML('info', t('dRemote')) + '</div>') +
    '<div class="card" style="margin-bottom:14px"><div class="sec-title" style="margin-top:0">' + t('dAbout') + '</div>' +
      '<p class="small muted" style="margin:-4px 0 12px">' + esc(d.services.map(svcLabel).join(' · ')) + '</p>' +
      pairs.map(pair => pair.length === 2
        ? '<div class="row c2">' + pair.map(field).join('') + '</div>'
        : field(pair[0])).join('') +
      (keys.indexOf('old2') >= 0 ? noteHTML('info', t('dOld2Help')) : '') +
      fieldHTML(t('dWhen'), 'devis.details.when', { type:'date' }) +
      areaHTML(t('dNotes'), 'devis.notes', t('dNotesPh')) + '</div>';
}
function renderPhotos(){
  const box = $('#photo-list'); if(!box) return;
  box.innerHTML = state.devis.photos.map((p, i) =>
    '<div class="ph"><img src="' + p + '" alt=""><button data-photo-del="' + i + '">✕</button></div>').join('');
}
const KIND = () => ({ flat:t('kindFlat'), house:t('kindHouse'), office:t('kindOffice'), other:t('kindOther') });
const FREQ = () => ({ once:t('freqOnce'), week:t('freqWeek'), bi:t('freqBi'), month:t('freqMonth') });
function devisText(){
  const d = state.devis, L = [];
  L.push(t('dTitle').toUpperCase() + ' ' + d.id);
  L.push(t('dDate') + ' : ' + fdate(d.date, state.ui));
  L.push('', t('dYou').toUpperCase());
  L.push(t('dName') + ' : ' + (d.client.name || '—'));
  L.push(t('fEmail') + ' : ' + (d.client.email || '—'));
  L.push(t('fPhone') + ' : ' + (d.client.phone || '—'));
  if(needsPlace()){
    L.push('', t('dPlace').toUpperCase());
    L.push((d.place.address || '—') + ', ' + [d.place.zip, d.place.city].filter(Boolean).join(' '));
    L.push(t('dKind') + ' : ' + (KIND()[d.place.kind] || d.place.kind));
  }
  L.push('', t('dServices').toUpperCase());
  L.push(d.services.length ? d.services.map(s => '- ' + svcLabel(s)).join('\n') : '- —');
  const asked = askedFields().filter(k => d.details[k]);
  if(asked.length){
    L.push('', t('dAbout').toUpperCase());
    asked.forEach(k => L.push(askLabel(k) + ' : ' + (ASK[k].opts ? askOpt(k, d.details[k]) : d.details[k])));
  }
  L.push('', t('dWhen') + ' : ' + (d.details.when ? fdate(d.details.when, state.ui) : '—'));
  if(d.notes){ L.push('', t('dNotes').toUpperCase(), d.notes); }
  if(d.photos.length) L.push('', t('dPhotos') + ' : ' + d.photos.length);
  L.push('', '— Factura · Atelier Nardella');
  return L.join('\n');
}
function devisMail(){
  const d = state.devis;
  if(!d.to){ toast(t('tNeedMail')); return; }
  const url = 'mailto:' + encodeURIComponent(d.to) +
    '?subject=' + encodeURIComponent(t('dTitle') + ' ' + d.id + (d.client.name ? ' — ' + d.client.name : '')) +
    '&body=' + encodeURIComponent(devisText());
  if(url.length > 1900){
    openModal('<h3>' + (state.ui === 'en' ? 'The request is a little long' : 'La demande est un peu longue') + '</h3>' +
      '<p class="muted" style="margin:8px 0 16px">' + (state.ui === 'en'
        ? 'Some email apps truncate long messages. Copy the text and paste it into your message instead.'
        : 'Certains logiciels de messagerie tronquent les longs e-mails. Copiez plutôt le texte et collez-le dans votre message.') + '</p>' +
      '<button class="btn wide" id="btn-devis-copy2" style="margin-bottom:9px">' + t('dCopy') + '</button>' +
      '<button class="btn ghost wide" id="btn-devis-mail2">' + t('dMail') + '</button>' +
      '<div style="margin-top:12px"><button class="btn quiet" data-close="1">' + t('cancel') + '</button></div>');
    return;
  }
  window.location.href = url;
}
const kv = (k, v) => '<div class="kv"><span>' + esc(k) + '</span><span>' + esc(v || '—') + '</span></div>';
function devisTicketHTML(){
  const d = state.devis, P = state.style.primary;
  return '<div class="sheet" id="ticket-sheet" style="min-height:0;padding:48px 52px">' +
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid ' + P + ';padding-bottom:14px;margin-bottom:18px">' +
      '<div><div style="font-size:25px;font-weight:700;color:' + P + '">' + t('dTitle').toUpperCase() + '</div>' +
      '<div style="font-size:14px;font-weight:600;margin-top:3px">' + esc(d.id) + '</div></div>' +
      '<div style="text-align:right;font-size:11px">' + fdate(d.date, state.ui) + '</div></div>' +
    '<div class="ticket">' +
      '<h4 style="margin-bottom:6px">' + t('dYou') + '</h4>' +
      kv(t('dName'), d.client.name) + kv(t('fEmail'), d.client.email) + kv(t('fPhone'), d.client.phone) +
      (needsPlace() ? '<h4 style="margin:16px 0 6px">' + t('dPlace') + '</h4>' +
        kv(t('fAddress'), (d.place.address || '') + ' ' + [d.place.zip, d.place.city].filter(Boolean).join(' ')) +
        kv(t('dKind'), KIND()[d.place.kind]) : '') +
      '<h4 style="margin:16px 0 6px">' + t('dServices') + '</h4>' +
      kv('—', d.services.map(svcLabel).join(', ')) +
      askedFields().filter(k => d.details[k]).map(k =>
        kv(askLabel(k), ASK[k].opts ? askOpt(k, d.details[k]) : d.details[k])).join('') +
      kv(t('dWhen'), d.details.when ? fdate(d.details.when, state.ui) : '') +
      (d.notes ? '<h4 style="margin:16px 0 6px">' + t('dNotes') + '</h4><p style="font-size:12px">' + nl(d.notes) + '</p>' : '') +
      (d.photos.length ? '<h4 style="margin:16px 0 6px">' + t('dPhotos') + '</h4><div style="display:flex;gap:8px;flex-wrap:wrap">' +
        d.photos.map(p => '<img src="' + p + '" style="width:108px;height:108px;object-fit:cover;border-radius:4px">').join('') + '</div>' : '') +
    '</div><p style="margin-top:22px;font-size:9px;color:#7A7EB8">Factura — Atelier Nardella</p></div>';
}
function openTicket(){
  openModal('<h3>' + t('ticketTitle') + '</h3><p class="muted small" style="margin-bottom:12px">' + t('ticketHelp') + '</p>' +
    '<div id="ticket-box" style="overflow:hidden"><div id="ticket-scale" style="transform-origin:top left">' + devisTicketHTML() + '</div></div>' +
    '<div style="display:flex;gap:9px;margin-top:14px"><button class="btn" id="btn-ticket-pdf">' + t('savePdf') + '</button>' +
    '<button class="btn quiet" data-close="1">' + t('close') + '</button></div>');
  const box = $('#ticket-box'), sc = $('#ticket-scale'), sheet = $('#ticket-sheet');
  const k = Math.min(1, box.clientWidth / 794);
  sc.style.transform = 'scale(' + k + ')';
  box.style.height = (sheet.offsetHeight * k) + 'px';
}
function devisToFacture(){
  const d = state.devis;
  state.invoice = blankInvoice(); state.client = blankClient();
  state.client.name = d.client.name; state.client.email = d.client.email;
  state.client.address = d.place.address; state.client.zip = d.place.zip; state.client.city = d.place.city;
  state.invoice.object = (state.ui === 'en' ? 'Following your request ' : 'Suite à votre demande ') + d.id;
  if(d.services.length) state.invoice.items = d.services.map(s => Object.assign(blankItem(), { label:svcLabel(s) }));
  if(d.notes) state.invoice.items[0].detail = d.notes.slice(0, 120);
  state.step = 1; show('build'); toast(t('tConverted'));
}

/* ============ 16. ÉVÉNEMENTS & DÉMARRAGE ============ */
function startNew(){
  state.invoice = blankInvoice(); state.client = blankClient();
  state.step = state.company.name ? 1 : 0;
  show('build');
}
function goStep(i){
  state.step = Math.max(0, Math.min(STEPS.length - 1, i));
  renderStep(); window.scrollTo({ top:0, behavior:'smooth' });
}
const renderSettings0 = () => { if(state.screen === 'settings') renderSettings(); };

document.addEventListener('click', e => {
  const t0 = e.target.closest('button, [data-pal], [data-style], img[data-go]');
  if(!t0) return;
  if(t0.dataset.ui){ const inModal = $('#modal').classList.contains('on'); setLang(t0.dataset.ui); if(inModal) openOptions(); return; }
  if(t0.dataset.go){ const g = t0.dataset.go; if(g === 'new') startNew(); else show(g); return; }
  if(t0.dataset.close){ closeModal(); return; }
  if(t0.dataset.step !== undefined){ goStep(parseInt(t0.dataset.step, 10)); return; }
  if(t0.dataset.set){
    setPath(state, t0.dataset.set, t0.dataset.val);
    if(t0.dataset.set.indexOf('company.') === 0) saveCompany();
    renderStep(); renderSettings0(); return;
  }
  if(t0.dataset.theme){ state.theme = t0.dataset.theme; LS.set('theme', state.theme); applyTheme(); openOptions(); return; }
  if(t0.id === 'btn-options'){ openOptions(); return; }
  if(t0.id === 'btn-customize2'){ openCustomize(); return; }
  if(t0.dataset.style){
    state.style[t0.dataset.style] = t0.dataset.val; saveStyle(); renderSheet();
    if($('#modal').classList.contains('on')) openCustomize();
    else if(STEPS[state.step].key === 'design'){
      $$('.tpl-slide').forEach(el => el.classList.toggle('on', el.dataset.val === state.style.template));
      $$('.tpl-slide .slide-name').forEach(el => {
        const sel = el.parentElement.classList.contains('on');
        el.textContent = el.textContent.replace(' ✓', '') + (sel ? ' ✓' : '');
      });
      $$('[data-style="logoPos"]').forEach(el => el.classList.toggle('on', el.dataset.val === state.style.logoPos));
      renderRail();
    }
    else if(state.screen === 'build') renderStep();
    return;
  }
  if(t0.dataset.target){
    wheelTarget = t0.dataset.target;
    if($('#modal').classList.contains('on')) openCustomize(); else renderStep();
    return;
  }
  if(t0.dataset.pal !== undefined){
    const pal = PALETTES[parseInt(t0.dataset.pal, 10)];
    state.style.primary = pal.p; state.style.secondary = pal.s; saveStyle(); renderSheet();
    if($('#modal').classList.contains('on')) openCustomize(); else renderStep();
    return;
  }
  if(t0.dataset.due !== undefined){
    state.invoice.dueDate = iso(addDays(new Date(state.invoice.issueDate + 'T00:00:00'), parseInt(t0.dataset.due, 10)));
    renderStep(); return;
  }
  if(t0.id === 'btn-add-item'){ state.invoice.items.push(blankItem()); renderItems(); renderTotals(); renderSheet(); return; }
  if(t0.dataset.del !== undefined){ state.invoice.items.splice(parseInt(t0.dataset.del, 10), 1); renderItems(); renderTotals(); renderSheet(); return; }
  if(t0.dataset.help !== undefined){ openVatHelp(parseInt(t0.dataset.help, 10)); return; }
  if(t0.dataset.wizKind){ vatWiz.kind = t0.dataset.wizKind; vatWiz.conds = {}; drawVatHelp(); return; }
  if(t0.dataset.wizApply){
    const it = state.invoice.items[vatWiz.i], o = vatOpt(t0.dataset.wizApply);
    it.vatId = o.id; it.rate = o.rate;
    closeModal(); renderItems(); renderTotals(); renderSheet(); return;
  }
  if(t0.id === 'btn-logo'){ $('#file-logo').click(); return; }
  if(t0.id === 'btn-logo-del'){ state.company.logo = ''; saveCompany(); renderStep(); renderSettings0(); renderSheet(); return; }
  if(t0.id === 'btn-next'){ state.step < STEPS.length - 1 ? goStep(state.step + 1) : exportPDF(); return; }
  if(t0.id === 'btn-prev'){ state.step > 0 ? goStep(state.step - 1) : show('home'); return; }
  if(t0.id === 'btn-save'){ saveCompany(); saveInvoice(); return; }
  if(t0.id === 'btn-save-settings'){ saveCompany(); toast(t('tInfoSaved')); return; }
  if(t0.id === 'btn-pdf'){ exportPDF(); return; }
  if(t0.id === 'force-pdf'){ doPDF(); return; }
  if(t0.id === 'btn-print'){ saveInvoice(true); document.title = 'Facture-' + state.invoice.number; window.print(); return; }
  if(t0.id === 'btn-json'){ exportJSON(); return; }
  if(t0.id === 'btn-customize'){ if(state.screen === 'build') goStep(4); else { startNew(); goStep(4); } return; }
  if(t0.id === 'btn-preview-m'){ $('#preview-col').classList.add('show'); fitSheet(); return; }
  if(t0.id === 'btn-preview-close'){ $('#preview-col').classList.remove('show'); return; }
  if(t0.dataset.edit){ loadInvoice(t0.dataset.edit, false); return; }
  if(t0.dataset.dup){ loadInvoice(t0.dataset.dup, true); return; }
  if(t0.dataset.rm){ state.invoices = state.invoices.filter(x => x.id !== t0.dataset.rm); saveList(); renderList(); toast(t('tDeleted')); return; }
  if(t0.id === 'btn-import-json'){ $('#file-json').click(); return; }
  if(t0.id === 'btn-import-go'){ applyImport(); return; }
  if(t0.id === 'btn-export-all'){
    download('factura-mes-donnees.json', JSON.stringify({ _app:'factura-sauvegarde', version:APP_VERSION, company:state.company, style:state.style, invoices:state.invoices }, null, 2));
    return;
  }
  if(t0.id === 'btn-reset'){
    openModal('<h3>' + t('eraseTitle') + '</h3><p class="muted" style="margin:8px 0 18px">' + t('eraseHelp') + '</p>' +
      '<div style="display:flex;gap:9px"><button class="btn ghost" data-close="1">' + t('cancel') + '</button>' +
      '<button class="btn" id="btn-reset-yes">' + t('eraseYes') + '</button></div>');
    return;
  }
  if(t0.id === 'btn-reset-yes'){
    ['company', 'style', 'invoices', 'seq', 'seqDev', 'devisDraft'].forEach(k => localStorage.removeItem('factura.' + k));
    location.reload(); return;
  }
  if(t0.dataset.svc){
    const id = t0.dataset.svc, i = state.devis.services.indexOf(id);
    if(i >= 0) state.devis.services.splice(i, 1); else state.devis.services.push(id);
    saveDevis(); t0.classList.toggle('on'); renderDevisDetails(); return;
  }
  if(t0.dataset.photoDel !== undefined){ state.devis.photos.splice(parseInt(t0.dataset.photoDel, 10), 1); saveDevis(); renderPhotos(); return; }
  if(t0.id === 'btn-photos'){ $('#file-photos').click(); return; }
  if(t0.id === 'btn-devis-json'){
    bumpNumber(state.devis.id, 'seqDev');
    download('demande-devis-' + state.devis.id + '.json',
      JSON.stringify(Object.assign({ _app:'factura-devis', version:APP_VERSION }, state.devis), null, 2));
    toast(t('tDevisDl')); return;
  }
  if(t0.id === 'btn-devis-copy' || t0.id === 'btn-devis-copy2'){ copyText(devisText()); closeModal(); return; }
  if(t0.id === 'btn-devis-mail'){ devisMail(); return; }
  if(t0.id === 'btn-devis-mail2'){
    const d = state.devis;
    window.location.href = 'mailto:' + encodeURIComponent(d.to) + '?subject=' + encodeURIComponent(t('dTitle') + ' ' + d.id) +
      '&body=' + encodeURIComponent(devisText().slice(0, 1400));
    closeModal(); return;
  }
  if(t0.id === 'btn-devis-ticket'){ openTicket(); return; }
  if(t0.id === 'btn-ticket-pdf'){ elementToPDF($('#ticket-sheet'), 'demande-devis-' + state.devis.id + '.pdf'); return; }
  if(t0.id === 'btn-devis-facture'){ devisToFacture(); return; }
});

document.addEventListener('input', e => {
  const el = e.target;
  if(el.dataset.bind){
    setPath(state, el.dataset.bind, el.value);
    if(el.dataset.bind.indexOf('company.') === 0) saveCompany();
    if(el.dataset.bind.indexOf('devis.') === 0) saveDevis();
    if(el.dataset.bind === 'company.legalForm' || el.dataset.bind === 'company.country'){
      if(state.screen === 'build') renderStep(); renderSettings0(); renderSheet(); return;
    }
    $$('[data-bind="' + el.dataset.bind + '"]').forEach(o => { if(o !== el) o.value = el.value; });
    if(state.invoice) renderSheet();
    if(state.screen === 'build' && STEPS[state.step].key === 'done') renderChecklist();
    return;
  }
  if(el.dataset.item !== undefined){
    const i = parseInt(el.dataset.i, 10), f = el.dataset.item, it = state.invoice.items[i];
    if(f === 'vatId'){ const o = vatOpt(el.value); it.vatId = o.id; if(o.rate !== null) it.rate = o.rate; renderItems(); }
    else if(f === 'qty' || f === 'price' || f === 'rate'){
      it[f] = el.value;
      const b = $('[data-tot="' + i + '"]'); if(b) b.textContent = money(r2(num(it.qty) * num(it.price)), state.ui);
    } else it[f] = el.value;
    renderTotals(); renderSheet(); return;
  }
  if(el.dataset.check){ setPath(state, el.dataset.check, el.checked); saveCompany(); renderSheet(); return; }
  if(el.dataset.wizCond !== undefined){ vatWiz.conds[el.dataset.wizCond] = el.checked; drawVatHelp(); return; }
});
document.addEventListener('change', e => {
  const el = e.target;
  if(el.dataset.status){
    const r = state.invoices.find(x => x.id === el.dataset.status);
    if(r){ r.status = el.value; if(r.data) r.data.invoice.status = el.value; saveList(); }
  }
});
$('#file-logo').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = ''; if(!f) return;
  try{
    state.company.logo = await resizeImage(f, 480, .92);
    saveCompany(); if(state.screen === 'build') renderStep(); renderSettings0(); renderSheet(); toast(t('tLogo'));
  }catch(err){}
});
$('#file-photos').addEventListener('change', async e => {
  const files = Array.prototype.slice.call(e.target.files); e.target.value = '';
  for(const f of files.slice(0, 6)){ try{ state.devis.photos.push(await resizeImage(f, 900, .72)); }catch(err){} }
  saveDevis(); renderPhotos();
});
$('#file-json').addEventListener('change', e => {
  const f = e.target.files[0]; e.target.value = ''; if(!f) return;
  const fr = new FileReader();
  fr.onload = () => {
    try{
      const d = JSON.parse(fr.result);
      if(d._app === 'factura-devis' || (d.services && d.place)){
        state.devis = Object.assign(blankDevis(), d); saveDevis(); devisToFacture(); return;
      }
      if(d.invoice) state.invoice = Object.assign(blankInvoice(), d.invoice);
      if(d.client) state.client = Object.assign(blankClient(), d.client);
      if(d.company){ state.company = Object.assign(blankCompany(), d.company); saveCompany(); }
      if(d.style){ state.style = Object.assign(state.style, d.style); saveStyle(); }
      if(d.invoices){ state.invoices = d.invoices; saveList(); }
      state.step = 2; show('build'); toast(t('tImported'));
    }catch(err){}
  };
  fr.readAsText(f);
});
$('#file-doc').addEventListener('change', e => { const f = e.target.files[0]; e.target.value = ''; if(f) handleDoc(f); });
document.addEventListener('click', e => { if(e.target.closest('#drop')) $('#file-doc').click(); });
document.addEventListener('dragover', e => { const d = e.target.closest('#drop'); if(d){ e.preventDefault(); d.classList.add('over'); } });
document.addEventListener('dragleave', e => { const d = e.target.closest('#drop'); if(d) d.classList.remove('over'); });
document.addEventListener('drop', e => {
  const d = e.target.closest('#drop'); if(!d) return;
  e.preventDefault(); d.classList.remove('over');
  if(e.dataTransfer.files[0]) handleDoc(e.dataTransfer.files[0]);
});
$('#modal').addEventListener('click', e => { if(e.target.id === 'modal') closeModal(); });
window.addEventListener('resize', () => { fitSheet(); fitRail(); });

(function init(){
  applyTheme();
  state.invoice = blankInvoice();
  renderChrome(); renderStepChips(); renderSheet();
  const h = (location.hash || '').replace('#', '');
  if(['devis', 'list', 'settings', 'open', 'menu', 'credits'].indexOf(h) >= 0) show(h);
})();
