

const router = require('express').Router();
const ctrl = require('../../controllers/blogApiController');

router.get('/', ctrl.getBlog);
router.get('/:id', ctrl.getBlogById);
router.post('/', ctrl.createBlog);
router.put('/:id', ctrl.updateBlog);
router.delete('/:id', ctrl.deleteBlog);

module.exports = router;