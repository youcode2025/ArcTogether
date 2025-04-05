const { describe } = require('node:test');
const Activity = require('../models/Activity');

exports.createActivity = async(req, res) =>{
try {
    const activity = new Activity({
        title: req.body.title,
        description: req.body.description,
        data: new Date(req.body.date),
        location: {
            name: req.body.location
        },
        participation: {
            maximum: req.body.maxParticipats
        },
     points: {
        earn: req.body.earnPoints
      },
      imageUrl: req.body.imageUrl,
      host: req.user._id, 
      category: req.body.category
    });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
