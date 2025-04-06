const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  
  currentParticipants: {
    type: Number,
    default: 0
  },
  maxParticipants: {
    type: Number,
    required: true
  },
  pointsEarned: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;