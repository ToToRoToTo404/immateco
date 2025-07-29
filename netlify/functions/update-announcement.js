// Fonction pour mettre à jour l'annonce
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

  if (event.httpMethod === 'POST') {
    try {
      const { message, password } = JSON.parse(event.body);

      // Vérification du mot de passe
      if (password !== 'admin123') {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Mot de passe incorrect'
          })
        };
      }

      // Dans un environnement réel, vous stockeriez ceci dans une base de données
      // Pour Netlify Functions, nous devons utiliser un service externe comme:
      // - Netlify Forms
      // - Fauna DB
      // - Supabase
      // - Airtable
      
      // Pour l'instant, nous retournons juste un succès
      // L'annonce sera stockée côté client en attendant une vraie base de données
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: message || '',
          info: 'Annonce mise à jour avec succès ! Note: Pour une persistance complète, une base de données est nécessaire.'
        })
      };
    } catch (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Données invalides'
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
