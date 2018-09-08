const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const userController = require('./controllers/userController');
const cuisineController = require('./controllers/cuisineController');
const userCuisineController = require('./controllers/userCuisineController');


app.use(bodyParser.urlencoded({ extended: false }))

app.get('/*', express.static(__dirname));

app.get('/login', cuisineController.getAll);

app.get('/admin', userController.getAllUsers);

app.post('/sign-up', userController.createUser);

app.post('/login', userController.verifyUser, cuisineController.getID, userCuisineController.add, (req,res) => {
  res.redirect('/dashboard');
});

app.get('/dashboard', userCuisineController.getAll)

app.get('/sign-up', (req,res) => {
  res.sendFile(path.join(__dirname + '/views/sign-up.html'));
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

module.exports = app;
