<?php
// Activer l'affichage des erreurs pour le débogage
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Autoriser les requêtes CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Démarrer la session avec gestion d'erreur
try {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode([
        'error' => true,
        'message' => 'Erreur de session: ' . $e->getMessage()
    ]);
    exit;
}

header('Content-Type: application/json');

// Générer un nouveau token CSRF s'il n'existe pas
try {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    
    // Vérifier que la session fonctionne
    if (!isset($_SESSION['csrf_token'])) {
        throw new Exception('La session ne fonctionne pas correctement');
    }
    
    // Renvoyer le token
    echo json_encode(['csrf_token' => $_SESSION['csrf_token']]);
} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode([
        'error' => true,
        'message' => 'Erreur lors de la génération du token: ' . $e->getMessage()
    ]);
}
