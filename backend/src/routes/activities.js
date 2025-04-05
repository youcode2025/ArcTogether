const express = require('express');
const router = express.Router();

// Activities
router.post('/create', authenticateUser, createActivity);
router.get('/list', listActivities);
router.get('/:id', getActivityDetails);
router.post('/:id/join', authenticateUser, joinActivity);
router.post('/:id/complete', authenticateUser, completeActivity);
router.post('/:id/photos', authenticateUser, uploadActivityPhotos);