// Fonction pour mettre à jour l'annonce
// Note: Netlify Functions ne peut pas écrire de fichiers, on retourne juste un succès
// Le stockage réel se fait via localStorage côté client

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

      // Pour Netlify Functions, on ne peut pas écrire de fichiers
      // On retourne juste un succès et le stockage se fait côté client
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: message || '',
          info: 'Annonce mise à jour avec succès ! (stockage localStorage)'
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
