# 🌿 Immateco Saint-Palais — Site web statique

Ce dépôt contient le code source du site officiel de **Immateco Saint-Palais**.

---

## 🖥️ Frontend (statique)
- Dossier : `frontend/`
- Contenu : fichiers HTML, CSS, JavaScript, PDF
- Hébergement recommandé : [Netlify](https://www.netlify.com/), Vercel, GitHub Pages…
- Principales pages :
  - `index.html`
  - `contact.html` (redirection vers les liens du footer)
- Déploiement : automatique via GitHub (push déclenche la build)


---

## ℹ️ Contact
Pour toute demande, utilisez les liens de contact présents dans le pied de page du site.

---

## 🚀 Utilisation en local
Ouvrez simplement les fichiers HTML dans votre navigateur ou servez le dossier `frontend/` avec un serveur statique (ex : `npx serve frontend`).

---

## 🔒 Sécurité (site statique)
- Aucun traitement de données côté serveur, donc très faible surface d’attaque.
- Pas de formulaire, pas de collecte de données personnelles.
- Veillez à ne pas publier de données sensibles dans les documents ou le code source.
- Activez le HTTPS sur votre hébergeur.
- Pour plus de sécurité, configurez les headers HTTP (CSP, X-Frame-Options, etc.) sur votre hébergement si possible.
