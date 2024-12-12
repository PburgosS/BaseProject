const express = require('express');
const router = express.Router();
const permissonController = require('../../controllers/permissonController');

router.post('/permisson/createPermisson',permissonController.createPermisson);
router.post('/permisson/getAllPermissons', permissonController.getAllPermissons);

module.exports = router;