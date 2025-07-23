$allowed_origins = [
  'https://immateco-saintpalais.com',
  'http://127.0.0.1:5500'
];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
  header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
}
$allowed_origins = [
  'https://immateco-saintpalais.com',
  'http://127.0.0.1:5500'
];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
  header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
}

header('Access-Control-Allow-Origin: https://immateco-saintpalais.com');
echo json_encode(["status" => "OK", "message" => "Serveur PHP avec Docker opérationnel"]);
// Assurez-vous que le serveur PHP est en cours d'exécution