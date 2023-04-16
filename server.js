// import (npm) pacakges and modules
const express = require('express');
const session = require('express-session');
const path = require('path');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

// Setup a Sequilize connection to a database and a session store for storing user data
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super lifting secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Setup Handlebars template engine and configures it for the server
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Sets up middleware to parse request bodies and to serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});