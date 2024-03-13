const express = require('express');
const router = express.Router();
const Ecole = require('../models/Ecole');


// Obtenir la liste des écoles
router.get('/', async (req, res) => {
    try {
      const ecoles = await Ecole.find();
      res.status(200).json(ecoles);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// Ajouter une nouvelle école
router.post('/', async (req, res) => {
    try {
      const nouvelleEcole = new Ecole(req.body);
      await nouvelleEcole.save();
      res.status(201).send(nouvelleEcole);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

module.exports = router;
