
const express = require('express');
const router = express.Router();
const { createBlog, getAllBlogs, updateBlog, deleteBlog } = require('../controllers/blogController');

router.post('/', createBlog);
router.get('/', getAllBlogs);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
