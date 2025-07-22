<?php
// Autoriser le CORS pour le domaine du frontend
header("Access-Control-Allow-Origin: https://immateco-saintpalais.com");
// Démarrer la session (nécessaire pour stocker le token)
session_start();

// Génération du token CSRF si absent ou expiré
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Réponse JSON
header('Content-Type: application/json');

// Envoi du token
echo json_encode([
    'csrf_token' => $_SESSION['csrf_token']
]);
// Fin du script
exit;