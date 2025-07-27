const express = require('express');
const { findShortestRoute } = require('../controllers/routeController');

const router = express.Router();

router.post('/', findShortestRoute);

module.exports = router;