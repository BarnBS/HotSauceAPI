const Sauce = require('../models/ModelsSauce');
const fs = require('fs');

exports.getAllSauces = (req,res) => {
    Sauce.find()
        .then((sauces) => {
            res.status(200).json(sauces)
        })
        .catch((err) =>{
            res.status(400).json({error : err})
        })
}

exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce ({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({message : 'Objet enregistré !'}))
        .catch(error => {res.status(400).json({error})})
};

exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then ((sauce) => {
          res.status(200).json(sauce);
        })
        .catch ((error) => {
          res.status(404).json({
            error: error
          })
    });
};

exports.modifySauce = (req, res) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Action non autorisée !'});
            } else {
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
    });
};
