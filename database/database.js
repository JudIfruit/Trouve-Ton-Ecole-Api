const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://Julien:Julien@rechercheecoleapi.tj4rjtc.mongodb.net/Recherche-Ecole?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connecté à MongoDB avec succès');
  } catch (error) {
    console.error('Échec de la connexion à MongoDB', error);
    process.exit(1); // Arrêtez l'application en cas d'échec de la connexion
  }
};

module.exports = connectDB;
