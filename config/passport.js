
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

passport.use(new LocalStrategy(async (username,password,done)=>{
  const user = await User.findOne({ where:{ username }});
  if(!user) return done(null,false);
  if(!await bcrypt.compare(password,user.password)) return done(null,false);
  return done(null,user);
}));

passport.serializeUser((user,done)=>done(null,user.id));
passport.deserializeUser((id,done)=>User.findByPk(id).then(u=>done(null,u)));
