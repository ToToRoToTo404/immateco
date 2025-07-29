
document.addEventListener('DOMContentLoaded', async function() {
    // Affichage dynamique de l'annonce depuis le backend Netlify Functions
    const announcementDiv = document.getElementById('announcement');
    console.log('Chargement du script d\'annonce...', announcementDiv);
    
    if (announcementDiv) {
        const p = announcementDiv.querySelector('p');
        console.log('Element p trouvé:', p);
        
        // Utiliser localStorage directement (plus fiable que le backend pour l'instant)
        const localMessage = localStorage.getItem('announcementMessage') || '';
        console.log('Message localStorage:', localMessage);
        
        if (p) {
            if (localMessage.trim() !== '') {
                p.textContent = localMessage;
                announcementDiv.style.display = 'block';
                console.log('Annonce affichée depuis localStorage');
            } else {
                p.textContent = '';
                announcementDiv.style.display = 'none';
                console.log('Aucune annonce trouvée');
            }
        }
    } else {
        console.log('Pas de bandeau d\'annonce sur cette page (normal pour admin.html)');
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


