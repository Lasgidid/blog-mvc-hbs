const Blog = require('../models/Blog');

exports.home = async (req, res, next) => {
  try {
    const raw = await Blog.find().sort({ createdAt: -1 });
    const blogs = raw.map(obj => ({
      _id: obj._id,
      title: obj.title,
      body: obj.body,
      author: obj.author,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
      __v: obj.__v,
    }));
    res.render('blogs/list', { title: 'All Blogs', blogs });
  } catch (e) { next(e); }
};

exports.showBlog = async (req, res, next) => {
  try {
    const obj = await Blog.findById(req.params.id);
    if (!obj) return res.status(404).render('index', { error: 'Blog not found' });

    const blog = {
      _id: obj._id,
      title: obj.title,
      body: obj.body,
      author: obj.author,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
      __v: obj.__v,
    };

    res.render('blogs/show', { title: blog.title, blog });
  } catch (e) { next(e); }
};

exports.newBlogForm = (req, res) => {
  res.render('blogs/form', { title: 'New Blog', mode: 'create' });
};

exports.createBlog = async (req, res, next) => {
  try {
    const { title, body, author } = req.body;
    await Blog.create({ title, body, author });
    res.redirect('/');
  } catch (e) { next(e); }
};

exports.editBlogForm = async (req, res, next) => {
  try {
    const obj = await Blog.findById(req.params.id);
    if (!obj) return res.status(404).render('index', { error: 'Blog not found' });
    const blog = {
      _id: obj._id,
      title: obj.title,
      body: obj.body,
      author: obj.author,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
      __v: obj.__v,
    };
    res.render('blogs/form', { title: 'Edit Blog', mode: 'edit', blog });
  } catch (e) { next(e); }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const { title, body, author } = req.body;
    await Blog.findByIdAndUpdate(req.params.id, { title, body, author }, { runValidators: true });
    res.redirect(`/blogs/${req.params.id}`);
  } catch (e) { next(e); }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (e) { next(e); }
};
