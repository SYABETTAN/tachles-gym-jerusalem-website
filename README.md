# תכלס Gym — site prêt à déployer

Site premium, statique, RTL hébreu, optimisé pour la conversion locale : appels, WhatsApp, itinéraire Google Maps, formulaire lead, SEO local et performance.

## Ce qui est inclus

- `index.html` — landing page complète en hébreu.
- `styles.css` — design premium responsive, sans framework lourd.
- `app.js` — menu mobile, animations accessibles, génération du message WhatsApp.
- `assets/logo.svg`, `assets/favicon.svg`, `assets/og-tachles-gym.png` — branding minimal prêt à l’emploi.
- `robots.txt`, `sitemap.xml`, `site.webmanifest` — bases SEO.
- `netlify.toml`, `vercel.json` — headers sécurité + cache.
- `404.html` — page d’erreur.
- `cursor-prompt.md` — prompt expert pour continuer le projet dans Cursor.

## Déploiement en 3 minutes

### Option Netlify

1. Ouvre Netlify.
2. Glisse-dépose le dossier `tachles-gym-site`.
3. Ajoute le domaine.
4. Remplace dans les fichiers `https://tachles-gym.co.il/` par le vrai domaine.

Le formulaire est compatible Netlify Forms grâce à `data-netlify="true"`, mais l’action principale redirige vers WhatsApp pour maximiser les conversions.

### Option Vercel

1. Crée un nouveau projet Vercel.
2. Upload ou connecte ce dossier via GitHub.
3. Framework preset : `Other`.
4. Output directory : `.`.
5. Remplace `https://tachles-gym.co.il/` par le vrai domaine.

### Test local

```bash
cd tachles-gym-site
python3 -m http.server 5173
```

Puis ouvre `http://localhost:5173`.

## À modifier avant publication

Remplace partout `https://tachles-gym.co.il/` par le domaine officiel.

Vérifie aussi :

- horaires exacts du business si tu veux les ajouter dans le JSON-LD ;
- photos réelles du gym si disponibles ;
- prix ou offres exactes si tu veux créer une section tarifs ;
- politique de confidentialité si tu collectes des leads via formulaire.

## SEO local

Le site utilise `ExerciseGym` en JSON-LD, ce qui correspond au type Schema.org d’une salle de sport. Je n’ai pas mis `aggregateRating` dans le JSON-LD pour éviter les problèmes de “self-serving reviews” sur le site officiel. Les avis et la note restent affichés visuellement sur la page.

## Recommandation business

Pour augmenter les conversions, ajoute rapidement :

1. 8–12 vraies photos verticales du gym et de Shai.
2. Une vidéo courte de 20–30 secondes : “למה תכלס עובד”.
3. Une offre claire : “שיחת התאמה + אימון היכרות”.
4. Tracking : Google Search Console, Google Analytics 4, Meta Pixel si publicité.
5. Un lien depuis Google Business Profile vers ce site.
