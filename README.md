# Portfolio — Bruno Rigal

Site personnel de **Bruno Rigal**, développeur full stack à Montpellier (Symfony, React, Java).
En ligne : **https://rigal34.github.io**

## Crédit et licence

Ce site est basé sur le modèle open source
[nextjs-profile-portfolio](https://github.com/bhushanzade/nextjs-profile-portfolio) de **Bhushan Zade**,
publié sous licence Apache 2.0 (voir le fichier `LICENSE`, conservé tel quel).

**Modifié par Bruno Rigal** : contenu entièrement remplacé et traduit en français, menu à ancres fixé en haut
de page, statistiques GitHub calculées pendant la construction (sans service extérieur), icônes locales,
sections réorganisées, et publication automatique sur GitHub Pages.

## Modifier le contenu

Tout le texte du site se trouve dans **un seul fichier** : `src/data/profile.ts`
(identité, accroche, terminal, compétences, parcours, projets, dépôts, accréditations, contact).

- Ma photo : `public/images/bruno-rigal.jpg`
- Mon CV téléchargeable : `public/cv-bruno-rigal.pdf`
- Les liens du menu : `src/utils/constants.ts`

## Lancer le site sur son ordinateur

```bash
npm install --legacy-peer-deps
npm run dev
```

Puis ouvrir http://localhost:3000

## Mise en ligne

À chaque `git push` sur la branche `main`, GitHub Actions construit le site et le publie sur GitHub Pages
(fichier `.github/workflows/deploy.yml`). Le site est aussi reconstruit chaque lundi matin,
pour que les statistiques GitHub restent à jour.

## Technologies

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Three.js
