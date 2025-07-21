# 🌿 Immateco Saint-Palais — Site web & API

Ce dépôt contient le code source du site officiel de **Immateco Saint-Palais**, structuré en deux parties :

---

## 🖥️ Frontend (Netlify)
- Dossier : `frontend/`
- Contenu : fichiers HTML, CSS, JavaScript
- Hébergement : [Netlify](https://www.netlify.com/)
- Principales pages :
  - `index.html`
  - `contact.html` avec formulaire sécurisé
- Déploiement : automatique via GitHub (push déclenche la build)

---

## 🔧 Backend PHP (Render)
- Dossier : `api/`
- Scripts inclus :
  - `get_csrf_token.php` → génération sécurisée du token CSRF
  - `send_email.php` → traitement et envoi du formulaire par email
- Hébergement : [Render](https://render.com/)
- Déploiement : web service PHP via GitHub

---

## 🔐 Sécurité
- Token CSRF généré côté serveur et injecté dynamiquement
- Vérification du token à la réception du formulaire
- Honeypot anti-bot intégré

---

## 🚀 Utilisation en local
```bash
# Pour tester le backend PHP localement :
php -S localhost:8000 -t api
