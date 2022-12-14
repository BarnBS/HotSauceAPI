const User = require('../models/User');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const dotenv = require("dotenv");
dotenv.config();
const TOKEN_String = process.env.TOKEN_KEY

exports.signup = (req, res) => {

    const mailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/gmu;
    if (mailRegex.test(req.body.email) == false){
        return res.status(401).json({message : "Adresse mail invalide, veuillez entrer une adresse de la forme xxxx@xxxx.x."});};

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
  
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Adresse mail et/ou mot de passe incorrect'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Adresse mail et/ou mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                                { userId: user._id },
                                `${TOKEN_String}`,
                                { expiresIn: '24h' }
                            )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };