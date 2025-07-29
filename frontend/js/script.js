
document.addEventListener('DOMContentLoaded', async function() {
    // Affichage dynamique de l'annonce depuis le backend Netlify Functions
    const announcementDiv = document.getElementById('announcement');
    if (announcementDiv) {
        const p = announcementDiv.querySelector('p');
        
        try {
            // Récupérer l'annonce depuis le backend
            const response = await fetch('/api/get-announcement');
            const data = await response.json();
            
            if (data.success && p) {
                const message = data.message || '';
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
            // Fallback vers localStorage en cas d'erreur
            const fallbackMessage = localStorage.getItem('announcementMessage') || '';
            if (p) {
                if (fallbackMessage.trim() !== '') {
                    p.textContent = fallbackMessage;
                    announcementDiv.style.display = 'block';
                } else {
                    p.textContent = '';
                    announcementDiv.style.display = 'none';
                }
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


