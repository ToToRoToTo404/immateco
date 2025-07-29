// Fonction pour récupérer l'annonce actuelle
// Note: Pour l'instant, on utilise le fichier JSON statique car Netlify Functions ne peut pas écrire

exports.handler = async (event, context) => {
  // Configuration CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Gestion des requêtes OPTIONS (preflight CORS)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod === 'GET') {
    try {
      // Pour l'instant, on retourne toujours vide car on ne peut pas lire de fichiers dynamiques
      // Le système fonctionne entièrement avec localStorage
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: '',
          lastUpdated: new Date().toISOString(),
          note: 'Utilise localStorage pour la persistance'
        })
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Erreur lors de la récupération de l\'annonce'
        })
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({
      success: false,
      error: 'Méthode non autorisée'
    })
  };
};
