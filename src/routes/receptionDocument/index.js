const express = require('express');
const router = express.Router();
const receptionDocumentController = require('../../controllers/receptionDocumentController');

router.post('/createReceptionDocument', receptionDocumentController.createReceptionDocument);
router.post('/viewAllReceptionDocuments', receptionDocumentController.allReceptionDocuments);
router.post('/deleteReceptionDocument', receptionDocumentController.deleteReceptionDocument);
router.post('/searchAnyReceptionDocument', receptionDocumentController.searchAny);

module.exports = router;