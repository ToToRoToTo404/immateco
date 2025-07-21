// Configuration de l'URL de base pour l'API
const API_BASE_URL = 'http://immateco-saintpalais.com';

document.addEventListener('DOMContentLoaded', async () => {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');
    const formStatus = contactForm.querySelector('.form-status');

    // Récupération du token CSRF au chargement
    try {
        const response = await fetch(`${API_BASE_URL}/get_csrf_token.php`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.message || 'Erreur serveur lors de la génération du token');
        }
        if (!data.csrf_token) {
            throw new Error('Token CSRF manquant dans la réponse');
        }
        document.getElementById('csrf_token').value = data.csrf_token;
    } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF:', error);
        showStatus('Erreur lors du chargement du formulaire: ' + error.message, 'error');
    }

    function setLoadingState(isLoading) {
        submitButton.disabled = isLoading;
        buttonText.style.display = isLoading ? 'none' : 'inline';
        buttonLoader.style.display = isLoading ? 'inline' : 'none';
    }

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';

        if (type === 'success') {
            // Réinitialiser le formulaire après un succès
            contactForm.reset();
            // Faire défiler vers le message de statut
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Vérification du token CSRF
        if (!document.getElementById('csrf_token').value) {
            showStatus('Session invalide. Veuillez rafraîchir la page.', 'error');
            return;
        }

        // Vérifications de base côté client
        const email = contactForm.querySelector('#email').value;
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            showStatus('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        try {
            setLoadingState(true);

            const formData = new FormData(contactForm);
            const response = await fetch(`${API_BASE_URL}/send_email.php`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                showStatus(data.message, 'success');
                // Récupérer un nouveau token CSRF après un envoi réussi
                const tokenResponse = await fetch(`${API_BASE_URL}/get_csrf_token.php`);
                const tokenData = await tokenResponse.json();
                document.getElementById('csrf_token').value = tokenData.csrf_token;
            } else {
                showStatus(data.message, 'error');
            }
        } catch (error) {
            showStatus('Une erreur inattendue s\'est produite. Veuillez réessayer.', 'error');
        } finally {
            setLoadingState(false);
        }
    });
});
