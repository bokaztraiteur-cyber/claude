# Affiches & menus Bo'kaz

5 affiches au format A4 (2480 × 3508 px, 300 dpi), chacune en **PNG** (haute définition), **PDF** (impression) et **JPG** (partage WhatsApp / réseaux sociaux).

| Fichier | Contenu |
|---|---|
| `1-menu-marche-de-noel` | Menu du Marché de Noël : même contenu que le menu d'origine, mise en page redessinée |
| `2-la-carte-bokaz` | Carte de toute l'année (sans les produits de Noël), ambiance tropicale et cadre madras |
| `3-les-formules` | 6 formules à prix réduit (bokit, big bokit, végé, gourmande, box apéro, formule Bo'kaz) |
| `4-plateaux-de-fetes` | Plateaux à précommander pour le réveillon, Noël, le Nouvel An et les repas d'entreprise |
| `5-bokit-de-noel` | Affiche vedette « Bokit Jambon de Noël – édition limitée » |

## Modifier un texte ou un prix

Les sources sont dans `source/` : un fichier HTML par affiche, plus `assets.js` (illustrations) et `base.css` (styles).
Modifiez le texte dans le fichier HTML, puis régénérez les PNG :

```bash
cd source
node render.js                      # toutes les affiches
node render.js 3-les-formules.html  # une seule affiche
```

(Playwright est nécessaire ; les PDF et JPG s'obtiennent ensuite à partir des PNG.)
