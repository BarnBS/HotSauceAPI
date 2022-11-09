const Sauce = require('../models/ModelsSauce');
const fs = require('fs');

exports.getAllSauces = (req,res) => {
    Sauce.find()
        .then((things) => {
            res.status(200).json(things)
        })
        .catch((err) =>{
            res.status(400).json({error : err})
        })
}

exports.createSauce = (req, res) => {
    const sauceObject = req.body.Sauce;
    const sauce = new Sauce ({
        ...sauceObject
    });
    sauce.save()
        .then(() => res.status(201).json({message : 'Sauce enregistrée !'}))
        .catch(error => {res.status(400).json({error})})
};

exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then ((thing) => {
          res.status(200).json(thing);
        })
        .catch ((error) => {
          res.status(404).json({
            error: error
          })
        });
};
