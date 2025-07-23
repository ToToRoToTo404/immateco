// Menu burger responsive
document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const navMenu = document.getElementById("nav-menu");
    if (burger && navMenu) {
        burger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
});


document.addEventListener('DOMContentLoaded', async () => {
    const contactForm = document.getElementById('contactForm');
    const csrfField = document.getElementById('csrf_token');
    const submitButton = contactForm?.querySelector('.submit-button');
    const buttonText = submitButton?.querySelector('.button-text');
    const buttonLoader = submitButton?.querySelector('.button-loader');
    const formStatus = contactForm?.querySelector('.form-status');

    // 🔐 Récupérer le token CSRF au chargement
    async function fetchCSRFToken() {
        try {
            const response = await fetch(`${API_BASE_URL}/get_csrf_token.php`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            const data = await response.json();
            if (data.csrf_token && csrfField) {
                csrfField.value = data.csrf_token;
            } else {
                throw new Error('Token CSRF manquant dans la réponse');
            }
        } catch (error) {
            showStatus('Erreur lors du chargement du formulaire : ' + error.message, 'error');
            console.error('Erreur CSRF:', error);
        }
    }

    // 🕹️ Gestion du loader
    function setLoadingState(isLoading) {
        if (submitButton) submitButton.disabled = isLoading;
        if (buttonText) buttonText.style.display = isLoading ? 'none' : 'inline';
        if (buttonLoader) buttonLoader.style.display = isLoading ? 'inline' : 'none';
    }

    // 📢 Affichage du message de retour
    function showStatus(message, type) {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';

        if (type === 'success') {
            contactForm.reset();
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // 📤 Soumission du formulaire
    async function handleSubmit(e) {
        e.preventDefault();

        const email = contactForm.querySelector('#email')?.value || '';
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            showStatus('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        if (!csrfField.value) {
            showStatus('Session invalide. Veuillez rafraîchir la page.', 'error');
            return;
        }

        try {
            setLoadingState(true);
            const formData = new FormData(contactForm);
            formData.append('csrf_token', csrfField.value);

            const response = await fetch(`${API_BASE_URL}/send_email.php`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            showStatus(data.message, data.success ? 'success' : 'error');

            if (data.success) {
                await fetchCSRFToken(); // 🔁 Récupérer un nouveau token après succès
            }
        } catch (error) {
            showStatus('Erreur de connexion. Vérifiez votre réseau ou réessayez.', 'error');
            console.error('Erreur formulaire:', error);
        } finally {
            setLoadingState(false);
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
        await fetchCSRFToken();
    }
});


