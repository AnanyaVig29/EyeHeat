const express = require('express');
const {
  listSessions,
  getSessionPoints,
  exportSessionCsv,
} = require('../controllers/sessionController');

const router = express.Router();

router.get('/', listSessions);
router.get('/:id/csv', exportSessionCsv);
router.get('/:id', getSessionPoints);

module.exports = router;
