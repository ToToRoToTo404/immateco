<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    $to = "immat.saintpalais@gmail.com"; // Remplacez par l'adresse e-mail de destination
    $headers = "From: $email\r\n" .
               "Reply-To: $email\r\n" .
               "X-Mailer: PHP/" . phpversion();

    $fullMessage = "Nom: $name\n" .
                   "Email: $email\n" .
                   "Message:\n$message";

    if (mail($to, $subject, $fullMessage, $headers)) {
        echo "Votre message a été envoyé avec succès.";
    } else {
        echo "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer plus tard.";
    }
} else {
    echo "Méthode non autorisée.";
}
?>
