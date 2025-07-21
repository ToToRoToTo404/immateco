// Fonction pour charger les composants HTML
async function loadComponent(elementName, filePath) {
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        document.querySelector(elementName).innerHTML = html;
        
        // Mettre à jour l'année dans le footer
        if (elementName === 'footer') {
            const yearSpan = document.getElementById('current-year');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        }
    } catch (error) {
        console.error(`Erreur lors du chargement du composant ${elementName}:`, error);
    }
}

// Charger le footer sur toutes les pages
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('footer', '/components/footer.html');
});
