const express = require('express');
const app = express();
const userRoutes = require('./routes/routesUsers');

const mongoose = require('mongoose');

const dotenv = require("dotenv");
dotenv.config();
const mdp = process.env.mongomdp;
const cluster = process.env.cluster;

mongoose.connect(`mongodb+srv://hotsauceadmin:${mdp}@${cluster}.ougjqem.mongodb.net/?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);

app.use('/api/auth', (req,res) => {res.end('ok')});

module.exports = app;