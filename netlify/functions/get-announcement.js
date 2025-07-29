// Fonction pour récupérer l'annonce actuelle
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

  if (event.httpMethod === 'GET') {
    try {
      // Lire le fichier JSON depuis le dossier frontend/data
      const dataPath = path.join(process.cwd(), 'frontend', 'data', 'announcement.json');
      
      let announcementData = { message: '', lastUpdated: new Date().toISOString() };
      
      try {
        if (fs.existsSync(dataPath)) {
          const fileContent = fs.readFileSync(dataPath, 'utf8');
          announcementData = JSON.parse(fileContent);
        }
      } catch (fileError) {
        console.log('Fichier announcement.json non trouvé ou invalide, utilisation des valeurs par défaut');
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: announcementData.message || '',
          lastUpdated: announcementData.lastUpdated || new Date().toISOString()
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
