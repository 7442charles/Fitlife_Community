const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// GET Login Page
// Access via: localhost:3001/login
router.get('/login', (req, res) => res.render('auth/login'));

// POST Login Logic
// Note: failureRedirect is now just '/login'
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/login');

    req.logIn(user, (err) => {
      if (err) return next(err);

      // 🔥 ROLE-BASED REDIRECT
      if (user.role === 'admin') {
        return res.redirect('/admin');
      }

      // default: client
      return res.redirect('/');
    });
  })(req, res, next);
});


// GET Register Page
// Access via: localhost:3001/register
router.get('/register', (req, res) => res.render('auth/register'));

// POST Register Logic
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        
        await User.create({ 
            username, 
            email, 
            password: hash 
        });

        // Redirect to the new flat /login route
        res.redirect('/login');
    } catch (error) {
        console.error("Registration Error:", error);
        res.redirect('/register');
    }
});

// GET Logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

module.exports = router;