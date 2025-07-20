document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("nav-menu");

  if (burger && navMenu) {
    burger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Récupérer le message du bandeau depuis localStorage
  const savedMessage = localStorage.getItem('announcementMessage');
  if (savedMessage) {
    afficherAnnonce(savedMessage);
  }
});

function afficherAnnonce(message) {
  let announcement = document.getElementById('announcement');

  if (!announcement) {
    // Création du template HTML pour l'annonce
    const template = `
      <div id="announcement" class="announcement-hidden">
        <p>${message}</p>
      </div>
    `;

    // Insertion après la section hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.insertAdjacentHTML('afterend', template);
      announcement = document.getElementById('announcement');
    }
  } else {
    announcement.querySelector('p').textContent = message;
  }

  if (announcement) {
    // Sauvegarde le message dans le localStorage
    localStorage.setItem('announcementMessage', message);
    
    // Affiche toujours l'annonce
    announcement.style.display = 'block';
    // Délai pour permettre la transition
    setTimeout(() => {
      announcement.classList.remove('announcement-hidden');
    }, 10);
  }
}

document.getElementById('current-year').textContent = new Date().getFullYear();