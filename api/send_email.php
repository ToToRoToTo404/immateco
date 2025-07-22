<?php
// Autoriser les requêtes CORS
header('Access-Control-Allow-Origin: https://immateco-saintpalais.com');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

session_start();

// Configuration
define('EMAIL_TO', 'immat.saintpalais@gmail.com');
define('MAX_REQUESTS_PER_HOUR', 5);
define('LOG_FILE', 'email_logs.txt');

// Fonction de logging
function logMessage($type, $message) {
    $date = date('Y-m-d H:i:s');
    $logMessage = "[$date] [$type] $message\n";
    error_log($logMessage, 3, LOG_FILE);
}

// Fonction de réponse JSON
function jsonResponse($success, $message) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

// Vérification de la méthode HTTP
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    logMessage('ERROR', 'Méthode non autorisée: ' . $_SERVER["REQUEST_METHOD"]);
    jsonResponse(false, 'Méthode non autorisée');
}

// Vérification du token CSRF
if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    logMessage('ERROR', 'Token CSRF invalide');
    jsonResponse(false, 'Session invalide, veuillez rafraîchir la page');
}

// Vérification du honeypot
if (!empty($_POST['website'])) {
    logMessage('SPAM', 'Tentative de spam détectée (honeypot)');
    jsonResponse(false, 'Message envoyé avec succès'); // Message trompeur pour les bots
}

// Limitation du nombre de requêtes
$ip = $_SERVER['REMOTE_ADDR'];
$hour = date('YmdH');
$requestKey = "email_requests_{$ip}_{$hour}";

if (isset($_SESSION[$requestKey]) && $_SESSION[$requestKey] >= MAX_REQUESTS_PER_HOUR) {
    logMessage('LIMIT', "Limite de requêtes dépassée pour l'IP: $ip");
    jsonResponse(false, 'Trop de messages envoyés. Veuillez réessayer plus tard.');
}

// Validation et nettoyage des entrées
$name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$subject = filter_var(trim($_POST['subject']), FILTER_SANITIZE_STRING);
$message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);

// Validation des champs obligatoires
if (empty($name) || empty($email) || empty($message)) {
    logMessage('ERROR', 'Champs obligatoires manquants');
    jsonResponse(false, 'Tous les champs marqués * sont obligatoires');
}

// Validation du format de l'email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    logMessage('ERROR', "Format d'email invalide: $email");
    jsonResponse(false, 'Adresse email invalide');
}

// Création d'un ID unique pour le suivi
$trackingId = uniqid('MSG_');

// Préparation de l'email HTML
$htmlMessage = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #52796F; color: white; padding: 20px; }
        .content { padding: 20px; }
        .footer { background: #f4f4f4; padding: 20px; font-size: 12px; }
    </style>
</head>
<body>
    <div class='header'>
        <h2>Nouveau message de contact</h2>
        <p>ID de suivi: {$trackingId}</p>
    </div>
    <div class='content'>
        <p><strong>Nom:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Sujet:</strong> {$subject}</p>
        <p><strong>Message:</strong><br>{$message}</p>
    </div>
    <div class='footer'>
        <p>Ce message a été envoyé via le formulaire de contact du site Immateco.</p>
        <p>Date: " . date('d/m/Y H:i') . "</p>
    </div>
</body>
</html>";

// Configuration des headers pour l'email HTML
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Formulaire Immateco <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "X-Priority: 1\r\n";

// Tentative d'envoi de l'email
try {
    if (!mail(EMAIL_TO, "Contact - $subject [Ref: $trackingId]", $htmlMessage, $headers)) {
        throw new Exception("Échec de l'envoi de l'email");
    }

    // Incrémentation du compteur de requêtes
    $_SESSION[$requestKey] = isset($_SESSION[$requestKey]) ? $_SESSION[$requestKey] + 1 : 1;

    logMessage('SUCCESS', "Email envoyé avec succès - ID: $trackingId");
    jsonResponse(true, 'Votre message a été envoyé avec succès. Référence: ' . $trackingId);

} catch (Exception $e) {
    logMessage('ERROR', $e->getMessage());
    jsonResponse(false, "Une erreur s'est produite lors de l'envoi. Veuillez réessayer plus tard.");
}
?>
