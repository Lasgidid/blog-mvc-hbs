const express = require('express');
const router = express.Router();
const pageController = require('../../controllers/pageController');

router.get('/', pageController.home);
router.get('/blogs/:id', pageController.showBlog);
router.get('/newblog', pageController.newBlogForm);
router.post('/blogs', pageController.createBlog);
router.get('/blogs/:id/edit', pageController.editBlogForm);
router.put('/blogs/:id', pageController.updateBlog);
router.delete('/blogs/:id', pageController.deleteBlog);

module.exports = router;
