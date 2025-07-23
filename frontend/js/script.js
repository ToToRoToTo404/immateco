
document.addEventListener('DOMContentLoaded', function() {
    // Affichage dynamique de l'annonce sur la page d'accueil depuis localStorage (géré par l'admin)
    const announcementDiv = document.getElementById('announcement');
    if (announcementDiv) {
        const p = announcementDiv.querySelector('p');
        const message = localStorage.getItem('announcementMessage') || '';
        if (p) {
            if (message.trim() !== '') {
                p.textContent = message;
                announcementDiv.style.display = '';
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


