<?php
$allowed_origins = [
  'https://immateco-saintpalais.com',
  'http://127.0.0.1:5500'
];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
  header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
}

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
