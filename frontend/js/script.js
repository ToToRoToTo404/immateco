
document.addEventListener('DOMContentLoaded', async function() {
    // Affichage dynamique de l'annonce depuis le backend Netlify Functions
    const announcementDiv = document.getElementById('announcement');
    console.log('Chargement du script d\'annonce...', announcementDiv);
    
    if (announcementDiv) {
        const p = announcementDiv.querySelector('p');
        console.log('Element p trouvé:', p);
        
        try {
            // Récupérer l'annonce depuis le backend
            console.log('Tentative de récupération depuis le backend...');
            const response = await fetch('/api/get-announcement');
            const data = await response.json();
            console.log('Réponse du backend:', data);
            
            if (data.success && p) {
                const message = data.message || '';
                console.log('Message reçu:', message);
                if (message.trim() !== '') {
                    p.textContent = message;
                    announcementDiv.style.display = 'block';
                    console.log('Annonce affichée depuis le backend');
                } else {
                    p.textContent = '';
                    announcementDiv.style.display = 'none';
                    console.log('Aucune annonce depuis le backend');
                }
            }
        } catch (error) {
            console.error('Erreur lors du chargement de l\'annonce:', error);
            // Fallback vers localStorage en cas d'erreur
            const fallbackMessage = localStorage.getItem('announcementMessage') || '';
            console.log('Fallback localStorage:', fallbackMessage);
            if (p) {
                if (fallbackMessage.trim() !== '') {
                    p.textContent = fallbackMessage;
                    announcementDiv.style.display = 'block';
                    console.log('Annonce affichée depuis localStorage');
                } else {
                    p.textContent = '';
                    announcementDiv.style.display = 'none';
                    console.log('Aucune annonce trouvée');
                }
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


