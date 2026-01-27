const router = require('express').Router();
const Gallery = require('../models/Gallery');
const Blog = require('../models/Blog');

router.get('/about-us', (req,res)=>{
  res.render('client/about', {
    meta:{ title:'About Us', description:'About our mission' }
  });
});

router.get('/contact-us', (req,res)=>{
  res.render('client/contact', {
    meta:{ title:'Contact Us', description:'Get in touch' }
  });
});

router.get('/gallery', async (req,res)=>{
  res.render('client/gallery', {
    gallery: await Gallery.findAll(),
    meta:{ title:'Gallery', description:'Our gallery' }
  });
});

router.get('/blog', async (req,res)=>{
  res.render('client/blog', {
    blogs: await Blog.findAll(),
    meta:{ title:'Blog', description:'Latest posts' }
  });
});

router.get('/programs', (req,res)=>{
  res.render('client/programs', {
    meta:{ title:'Programs', description:'Our programs' }
  });
});

router.get('/our-impact', (req,res)=>{
  res.render('client/impact', {
    meta:{ title:'Our Impact', description:'Our impact' }
  });
});

router.get('/make-donation', (req,res)=>{
  res.render('client/donation', {
    meta:{ title:'Make a Donation', description:'Support our mission' }
  });
});


module.exports = router;
