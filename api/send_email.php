<?php
// 🔐 CORS – à placer impérativement tout en haut
header("Access-Control-Allow-Origin: https://immateco-saintpalais.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// 🔁 Réponse aux requêtes OPTIONS (préflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 📩 Traitement de l'envoi d'email
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérification du token CSRF
    session_start();
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        echo json_encode(['success' => false, 'message' => 'Token CSRF invalide']);
        exit;
    }

    // Récupération des données du formulaire
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');

    // Validation simple
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Adresse email invalide']);
        exit;
    }

    // 📤 Envoi de l'email (via mail() ou PHPMailer selon ton setup)
    $to = 'contact@immateco-saintpalais.com';
    $subject = "Nouveau message de $name";
    $body = "Nom: $name\nEmail: $email\nMessage:\n$message";

    $headers = "From: $email\r\nReply-To: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Échec de l\'envoi du message']);
    }
    exit;
}

// 🚫 Méthode non autorisée
http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
exit;
