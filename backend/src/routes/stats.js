const express = require('express');
const { getLiveStats } = require('../controllers/statsController');

const router = express.Router();

router.get('/live', getLiveStats);

module.exports = router;
