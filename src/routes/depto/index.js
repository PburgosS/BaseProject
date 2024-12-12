const express = require('express');
const router = express.Router();
const deptoController = require('../../controllers/deptosController');

router.post('/deptos/createDepto',deptoController.createDepto);
router.post('/deptos/getAllDeptos',deptoController.getAllDeptos);

module.exports = router;