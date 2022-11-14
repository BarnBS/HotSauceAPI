# HotSauceAPI :
This is an API of hot sauces made for OpenClassroom's 6th project of the WebDev parcours.

# NPM Intalls :
The following packages are required for the API to work :
- "npm i express" to add express
- "npm i dotenv" to use the environement variables
- "npm i mongoose" to work with the mongo database
- "npm i jsonwebtoken" to generate a token and authorize specific actions in the app
- "npm i bcrypt" to hash and secure passwords
- "npm i mongoose-unique-validator" to make sure an email adress used to sign up is unique
- "npm i multer" for image uploading and managing in the file system

# Connect your mongo Data Base and add a key for the Token encryption
Create your own dataBase on Mongo Atlas and connect it to the app through the .env.dist.
In the same file, add a string message which will be the key for the token encryption.

# How to start
First of all, get the Front of the app from this repo :
https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6
Once you have the project, go in the directory and run the command "npm start" .

Finally, run "node server" in the backend directory. It should run on localhost:3000.

# What you can do
You can sign up with a correct form email adress (xxx@xxx.x). An email adress can be used only once to sign up.
You can then login and add a new sauce to the database and see it being displayed on the main page. You add modify or the delete the sauce if you are the one that created it. Finally you can "like" or "dislike" the sauce (only once of course !) and "unlike" or "undislike" if needed.