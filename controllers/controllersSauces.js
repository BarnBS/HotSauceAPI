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
    delete sauceObject.likes;
    delete sauceObject.dislikes;
    delete sauceObject.usersLiked;
    delete sauceObject.usersDisliked;
    const sauce = new Sauce ({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes : 0,
        dislikes : 0,
        usersLiked : [],
        usersDisliked : []
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

exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Action non autorisée !'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
    });
};

exports.likeSauce = (req,res) => {

    userIdLike = req.body.userId;
    likesNumber = req.body.like;

    Sauce.findOne({ _id: req.params.id})
    .then((sauce) => {
        if(likesNumber === 1) {
                sauce.usersLiked.push(userIdLike);
                console.log(sauce.usersLiked);
                sauce.updateOne({likes : sauce.likes+1, usersLiked : sauce.usersLiked})
                    .then(() => {res.status(200).json({message : `Vous aimez la sauce.`})
                    })
                    .catch(error => res.status(500).json({ error }));
        }
        else if (likesNumber === -1){
                sauce.usersDisliked.push(userIdLike);
                sauce.updateOne({dislikes : sauce.dislikes+1, usersDisliked : sauce.usersDisliked})
                    .then(() => {res.status(200).json({message : `Vous n'aimez pas la sauce.`})
                    })
                    .catch(error => res.status(500).json({ error }));
        }
        else if (likesNumber === 0) {
            if (sauce.usersDisliked.find(id => id == userIdLike)){
                userIndex = sauce.usersDisliked.indexOf(userIdLike);
                sauce.usersDisliked.splice(userIndex,1);
                sauce.updateOne({dislikes : sauce.dislikes-1, usersDisliked : sauce.usersDisliked})
                    .then(() => {res.status(200).json({message : `Vous êtes indifférent à la sauce.`})
                    })
                    .catch(error => res.status(500).json({ error }));
            }
            else if (sauce.usersLiked.find(id => id == userIdLike)){
                userIndex = sauce.usersLiked.indexOf(userIdLike);
                sauce.usersLiked.splice(userIndex,1);
                sauce.updateOne({likes : sauce.likes-1, usersLiked : sauce.usersLiked})
                    .then(() => {res.status(200).json({message : `Vous êtes indifférent à la sauce.`})
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        }
        else{
            res.status(400).json({message : "Bad request."})
        }})
    .catch( error => {
        res.status(500).json({ error });
    });
}
