
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const csrf = require('csurf');
const { sequelize } = require('./models');

require('./config/passport');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const store = new SequelizeStore({ db: sequelize });

app.use(session({
  secret: 'modal_secret',
  store,
  resave: false,
  saveUninitialized: false
}));

store.sync();

app.use(passport.initialize());
app.use(passport.session());

app.use(csrf());

app.use((req,res,next)=>{
  res.locals.csrfToken = req.csrfToken();
  res.locals.user = req.user;
  next();
});

app.use('/', require('./routes/client'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/pages'));



sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Running on http://localhost:${process.env.PORT}`);
  });
});
