<?php
header('Access-Control-Allow-Origin: https://immateco-saintpalais.com');
echo json_encode(["status" => "OK", "message" => "Serveur PHP avec Docker opérationnel"]);
// Assurez-vous que le serveur PHP est en cours d'exécution