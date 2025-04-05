const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.post('/api/activities', async (req, res) => {
    try {
      const activity = new Activity(req.body);
      await activity.save();
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  app.get('/api/activities', async (req, res) => {
    try {
      const activities = await Activity.find({});
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = app;