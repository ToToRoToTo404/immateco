
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
    const menuOverlay = document.getElementById("menu-overlay");
    
    if (burger && navMenu) {
        burger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            burger.classList.toggle("active");
            if (menuOverlay) {
                menuOverlay.classList.toggle("active");
            }
        });
        
        // Fermer le menu en cliquant sur l'overlay
        if (menuOverlay) {
            menuOverlay.addEventListener("click", () => {
                navMenu.classList.remove("active");
                burger.classList.remove("active");
                menuOverlay.classList.remove("active");
            });
        }
    }

    // Animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});


