// Fonction pour récupérer l'annonce actuelle
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
      // Simulation d'une base de données avec une variable d'environnement
      // En production, vous utiliseriez une vraie base de données
      const announcement = process.env.ANNOUNCEMENT_MESSAGE || '';
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: announcement,
          lastUpdated: process.env.ANNOUNCEMENT_UPDATED || new Date().toISOString()
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
