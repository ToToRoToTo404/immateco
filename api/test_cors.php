<?php
$allowed_origins = [
  'https://immateco-saintpalais.com',
  'http://127.0.0.1:5500'
];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
  header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
}
header('Content-Type: application/json');
echo json_encode([
  'origin' => $_SERVER['HTTP_ORIGIN'] ?? null,
  'cors_header' => (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) ? $_SERVER['HTTP_ORIGIN'] : null,
  'message' => 'CORS test OK'
]);
exit;
