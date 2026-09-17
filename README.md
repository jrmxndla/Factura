# Factura — outil de facturation pour les indépendants

Application web **100 % statique** : aucun serveur, aucune base de données,
aucune API, aucune clé, aucun compte. Tout tourne dans le navigateur et les
données restent sur l'appareil (localStorage).

## Contenu

```
index.html      structure des écrans
style.css       design — tout se règle dans la section « 1. TOKENS »
app.js          logique : facturation, TVA, devis, modèles, PDF, traductions
assets/         logo Factura + les six pigeons
```

Ressources externes, gratuites et sans clé :
- **Space Grotesk** et **Space Mono** via Google Fonts (licence SIL OFL 1.1)
- **html2pdf.js** via cdnjs (MIT), pour générer le PDF dans le navigateur
- **pdf.js** via cdnjs (Apache 2.0), chargé seulement pour lire un PDF importé

Le bouton « Imprimer » fonctionne sans aucune bibliothèque.

## Mise en ligne sur GitHub Pages

1. Créer un dépôt public sur GitHub.
2. Y déposer **le contenu de ce dossier** (index.html à la racine).
3. *Settings* → *Pages* → Source : `Deploy from a branch`, branche `main`,
   dossier `/ (root)` → *Save*.
4. L'adresse `https://<utilisateur>.github.io/<dépôt>/` est active en 1–2 min.

Une fois l'adresse connue, on pourra ajouter le bouton de partage
(`navigator.share` + copie du lien), qui a besoin de cette URL.

## Adresses directes

`#menu` · `#devis` (formulaire client) · `#list` · `#settings` · `#open` · `#credits`

## Où modifier quoi

| Besoin | Fichier | Repère |
|---|---|---|
| Couleurs, polices, rayons | `style.css` | « 1. TOKENS » |
| Thème inversé | `style.css` | « 18. THÈME INVERSÉ » |
| Ajustements smartphone | `style.css` | « 19. AJUSTEMENTS SMARTPHONE » |
| Carrousel des modèles | `style.css` | « 20. CARROUSEL » · `app.js` → `renderRail` |
| Styles des dix modèles | `style.css` | « 15. MODÈLES DE FACTURE » |
| Agencement des modèles | `app.js` | `TEMPLATES`, `TPL`, `sheetParts` |
| Icônes dessinées | `app.js` | `ICON_PATHS` |
| Textes de l'interface FR/EN | `app.js` | `UI` |
| Textes imprimés sur la facture | `app.js` | `DOC` |
| Crédits & mentions légales | `app.js` | `creditsHTML()` |
| Taux de TVA proposés | `app.js` | `VAT_OPTIONS` |
| Métiers du formulaire de devis | `app.js` | `SERVICES` |
| Questions posées par métier | `app.js` | `ASK` + clé `ask` de chaque métier |
| Pigeons (quelle image, où) | `app.js` | `ASSETS`, `STEPS`, appels à `pigeon()` |
| Version, Instagram | `app.js` | `APP_VERSION`, `INSTAGRAM` |

### Ajouter un métier au formulaire de devis

Une ligne dans `SERVICES` suffit :

```js
{ id:'jardinage', icon:'plant', fam:'home', onsite:1,
  ask:['surface','frequency'], fr:'Jardinage', en:'Gardening' }
```

`fam` range le métier dans une famille, `onsite:1` déclenche la demande
d'adresse d'intervention, et `ask` liste les questions à poser (les clés
disponibles sont celles de l'objet `ASK`).

## À compléter avant une mise en ligne publique

La page **Crédits** contient les mentions légales. Pensez à y ajouter, selon
votre situation : identité complète de l'éditeur (nom, statut, adresse, n° RCI
ou SIRET), directeur de la publication, et coordonnées de l'hébergeur
(pour GitHub Pages : GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco,
CA 94107, USA).

## France & Monaco

Le pays choisi dans « Mes informations » adapte le document : SIRET et mentions
du Code de commerce pour la France (pénalités, indemnité de 40 €, escompte,
mention 293 B en franchise) ; n° RCI, NIS facultatif, forme juridique et capital
pour Monaco. Monaco applique la TVA française aux mêmes taux (convention
franco-monégasque du 18 mai 1963) ; les mentions relèvent du Code des taxes sur
le chiffre d'affaires (art. A-153 bis) et de l'arrêté ministériel n° 67-319 du
28 décembre 1967. L'indemnité de 40 € française n'y est pas ajoutée.

L'application **propose** un taux de TVA et fait confirmer les conditions ;
elle ne remplace pas un conseil comptable.

---
© Atelier Nardella — https://www.instagram.com/atelier.nardella/
