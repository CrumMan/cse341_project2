const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate')
const {isAuthenticated} = require ("../middleware/authenticate")


const userController = require('../controllers/user');

router.get('/', isAuthenticated ,  userController.getAll);

router.get('/:id', isAuthenticated, userController.getSingle);

router.post('/', isAuthenticated, validation.saveContact, userController.createUser);

router.put('/:id', isAuthenticated, validation.saveContact, userController.updateUser);

router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;