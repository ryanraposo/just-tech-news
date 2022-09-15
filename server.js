const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection.js');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});


const app = express();
const port = process.env.PORT || 3001;


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => console.log('Now listening'));
});