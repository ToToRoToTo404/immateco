
document.addEventListener('DOMContentLoaded', function() {
    // Configuration de l'annonce (modifiable par l'admin)
    const ANNOUNCEMENT_CONFIG = {
        message: "🚨 Test - Bureau fermé le 30 juillet pour inventaire annuel", // Laissez vide pour masquer l'annonce, ou écrivez votre message ici
        enabled: true // true pour afficher, false pour masquer
    };

    // Affichage de l'annonce sur la page d'accueil
    const announcementDiv = document.getElementById('announcement');
    if (announcementDiv) {
        const p = announcementDiv.querySelector('p');
        if (p) {
            if (ANNOUNCEMENT_CONFIG.enabled && ANNOUNCEMENT_CONFIG.message.trim() !== '') {
                p.textContent = ANNOUNCEMENT_CONFIG.message;
                announcementDiv.style.display = 'block';
            } else {
                p.textContent = '';
                announcementDiv.style.display = 'none';
            }
        }
    }

    // Menu burger responsive
    const burger = document.getElementById("burger");
    const navMenu = document.getElementById("nav-menu");
    if (burger && navMenu) {
        burger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
});


