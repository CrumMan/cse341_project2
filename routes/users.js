const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate')


const userController = require('../controllers/user');

router.get('/',  userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', validation.saveContact, userController.createUser);

router.put('/:id', validation.saveContact, userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;