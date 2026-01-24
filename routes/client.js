const router = require('express').Router();
const Blog = require('../models/Blog');
const Gallery = require('../models/Gallery');

// HOME
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  const blogs = await Blog.findAndCountAll({
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  });

  res.render('client/home', {
    blogs: blogs.rows,
    gallery: await Gallery.findAll(),
    page,
    pages: Math.ceil(blogs.count / limit),
    meta: {
      title: 'Home',
      description: 'Welcome to our platform'
    }
  });
});

// BLOG LISTING
router.get('/blog', async (req, res) => {
  const blogs = await Blog.findAll({
    order: [['createdAt', 'DESC']]
  });

  res.render('client/blog', {
    blogs,
    meta: {
      title: 'Our Blog',
      description: 'Read our latest articles'
    }
  });
});

module.exports = router;
