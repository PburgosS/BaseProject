const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.post('/user/createDepto', userController.resgisterUser);

module.exports = router;