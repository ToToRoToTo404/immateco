
document.addEventListener('DOMContentLoaded', async function() {
    // Affichage dynamique de l'annonce sur la page d'accueil depuis fichier JSON (géré par l'admin)
    const announcementDiv = document.getElementById('announcement');
    if (announcementDiv) {
        const p = announcementDiv.querySelector('p');
        try {
            const response = await fetch('announcement.json');
            const data = await response.json();
            const message = data.message || '';
            
            if (p) {
                if (message.trim() !== '') {
                    p.textContent = message;
                    announcementDiv.style.display = 'block';
                } else {
                    p.textContent = '';
                    announcementDiv.style.display = 'none';
                }
            }
        } catch (error) {
            console.error('Erreur lors du chargement de l\'annonce:', error);
            // En cas d'erreur, masquer l'annonce
            if (p) {
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


