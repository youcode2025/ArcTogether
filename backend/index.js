const express = require('express');
const router = express.Router();

// User routes
router.use('/api/users', require('./users'));
router.use('/api/activities', require('./activities'));
router.use('/api/skills', require('./skills'));
router.use('/api/points', require('./points'));
router.use('/api/photos', require('./photos'));