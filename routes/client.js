
const router = require('express').Router();
const Blog = require('../models/Blog');
const Gallery = require('../models/Gallery');

router.get('/', async (req,res)=>{
  const page = parseInt(req.query.page)||1;
  const limit = 5;
  const offset = (page-1)*limit;

  const blogs = await Blog.findAndCountAll({ limit, offset, order:[['createdAt','DESC']] });

  res.render('client/index',{
    blogs: blogs.rows,
    pages: Math.ceil(blogs.count/limit),
    page,
    gallery: await Gallery.findAll(),
    meta: { title:'Home', description:'Blog and Gallery' }
  });
});

module.exports = router;
