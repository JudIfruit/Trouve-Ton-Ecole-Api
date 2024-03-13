const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.post('/inscription', async (req, res) => {
  try {
    const { pseudonyme, email, password, confirmPassword, } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send('Les mots de passe ne correspondent pas.');
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).send('Un utilisateur avec cet email existe déjà.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      pseudonyme,
      email,
      password: hashedPassword,
      // L'image déjà définie dans le modèle
    });

    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès!'});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/connexion', async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log("test")
  
      // Vérifier si l'utilisateur existe dans la base de données
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send('Utilisateur non trouvé.');
      }
  
      // Comparer le mot de passe fourni avec celui haché dans la base de données
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Mot de passe incorrect.');
      }
  
      // Générer un nouveau token pour la session
      const token = jwt.sign({ id: user._id }, 'Hfobdeoce**ebcie-eh=HvkvFbvbe', { expiresIn: '1h' });
  
      // Envoyer le token au client, par exemple en tant que cookie ou dans le corps de la réponse
      res.cookie('session_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000),
      }).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  });  

module.exports = router;
