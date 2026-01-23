
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

router.get('/login',(req,res)=>res.render('auth/login'));
router.post('/login', passport.authenticate('local',{ successRedirect:'/admin', failureRedirect:'/auth/login' }));

router.get('/register',(req,res)=>res.render('auth/register'));
router.post('/register', async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);
  await User.create({ username:req.body.username, password:hash });
  res.redirect('/auth/login');
});

router.get('/logout',(req,res)=>{ req.logout(()=>{}); res.redirect('/'); });

module.exports = router;
