// Fonction pour mettre à jour l'annonce
const fs = require('fs');
const path = require('path');

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

      // Sauvegarder dans le fichier JSON
      const dataPath = path.join(process.cwd(), 'frontend', 'data', 'announcement.json');
      const announcementData = {
        message: message || '',
        lastUpdated: new Date().toISOString()
      };

      try {
        // Créer le dossier data s'il n'existe pas
        const dataDir = path.dirname(dataPath);
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }

        // Écrire le fichier
        fs.writeFileSync(dataPath, JSON.stringify(announcementData, null, 2));
      } catch (fileError) {
        console.error('Erreur lors de l\'écriture du fichier:', fileError);
        throw new Error('Impossible de sauvegarder l\'annonce');
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: message || '',
          info: 'Annonce mise à jour avec succès !'
        })
      };
    } catch (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: error.message || 'Données invalides'
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
