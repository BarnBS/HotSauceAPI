const express = require('express');
const userRoutes = require('./routes/routesUsers');
const routesSauces = require('./routes/routesSauces');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const dotenv = require("dotenv");
dotenv.config();
const mongoDBConnect = process.env.MONGO_DB

mongoose.connect(`${mongoDBConnect}`,
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);
app.use('/api/sauces', routesSauces);
app.use('/images', express.static(path.join(__dirname, 'images')));


// //TESTER QUE LES UTILISATEURS SONT BIEN CREES SUR POSTMAN
// const User = require('./models/User');
// app.get('/api/users/test', (req,res,next) => {
//     User.find().then(
//     (users) => {
//         // users.forEach(user =>  console.log(user.id));
//         res.status(200).json(users);
//     })
//     .catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );
// })
        
module.exports = app;