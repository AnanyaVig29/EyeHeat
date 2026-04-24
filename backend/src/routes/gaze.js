const express = require('express');
const {
  startSession,
  saveBatch,
  endSession,
} = require('../controllers/gazeController');

const router = express.Router();

router.post('/start', startSession);
router.post('/batch', saveBatch);
router.post('/end', endSession);

module.exports = router;
