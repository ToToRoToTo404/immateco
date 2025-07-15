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
  const announcement = document.getElementById('announcement');

  if (announcement) {
    announcement.style.display = 'block';
    announcement.querySelector('p').textContent = message;
  } else {
    // Créer le bandeau si non existant
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      const newAnnouncement = document.createElement('div');
      newAnnouncement.id = 'announcement';
      newAnnouncement.style.backgroundColor = '#ffcc00';
      newAnnouncement.style.color = '#000';
      newAnnouncement.style.padding = '10px';
      newAnnouncement.style.textAlign = 'center';
      newAnnouncement.style.position = 'relative';
      newAnnouncement.innerHTML = `<p style="margin: 0; display: inline-block;">${message}</p>`;

      // Ajouter un bouton pour fermer le bandeau
      const closeButton = document.createElement('button');
      closeButton.textContent = 'X';
      closeButton.style.marginLeft = '10px';
      closeButton.style.background = 'none';
      closeButton.style.border = 'none';
      closeButton.style.cursor = 'pointer';
      closeButton.style.fontWeight = 'bold';
      closeButton.addEventListener('click', () => {
        newAnnouncement.style.display = 'none';
      });

      newAnnouncement.appendChild(closeButton);
      heroSection.parentNode.insertBefore(newAnnouncement, heroSection.nextSibling);
    }
  }
}

document.getElementById('current-year').textContent = new Date().getFullYear();