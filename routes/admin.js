
const router = require('express').Router();
const multer = require('multer');
const { adminOnly } = require('../middleware/auth');
const Blog = require('../models/Blog');
const Gallery = require('../models/Gallery');

const upload = multer({ dest:'public/uploads' });

router.get('/', adminOnly, async (req,res)=>{
  res.render('admin/dashboard',{
    blogs: await Blog.findAll(),
    gallery: await Gallery.findAll()
  });
});

router.post('/blog', adminOnly, async (req,res)=>{
  await Blog.create(req.body);
  res.redirect('/admin');
});

router.post('/blog/:id/delete', adminOnly, async (req,res)=>{
  await Blog.destroy({ where:{ id:req.params.id }});
  res.redirect('/admin');
});

router.post('/gallery', adminOnly, upload.single('image'), async (req,res)=>{
  await Gallery.create({ title:req.body.title, image:req.file.filename });
  res.redirect('/admin');
});

router.post('/gallery/:id/delete', adminOnly, async (req,res)=>{
  await Gallery.destroy({ where:{ id:req.params.id }});
  res.redirect('/admin');
});

module.exports = router;
