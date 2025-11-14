const express = require('express');
const router = express.Router();
const validation = require('../middleware/validatePost')

const postController = require('../controllers/post');

router.get('/', postController.getAll);

router.get('/:id', postController.getSingle);

router.post('/:id', validation.saveContact, postController.createPost);

router.put('/:id', validation.saveContact, postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;