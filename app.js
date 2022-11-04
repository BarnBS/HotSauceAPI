const express = require('express');
const app = express();

const mongoose = require('mongoose');

const dotenv = require("dotenv");
dotenv.config();
const mongomdp = process.env.mongomdp;

mongoose.connect(`mongodb+srv://hotsauceadmin:${mongomdp}@clusterhotsauces.ougjqem.mongodb.net/?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
 });

module.exports = app;