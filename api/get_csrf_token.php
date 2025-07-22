<?php
// ✅ Configuration CORS – à placer impérativement tout en haut
header("Access-Control-Allow-Origin: https://immateco-saintpalais.com");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// 🔁 Réponse aux pré-requêtes CORS (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 🛡️ Démarrer la session (nécessaire pour stocker le token CSRF)
session_start();

// 🔐 Génération du token CSRF si absent ou expiré
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// 📦 Réponse JSON avec le token CSRF
header('Content-Type: application/json');
echo json_encode([
    'csrf_token' => $_SESSION['csrf_token']
]);
exit;
