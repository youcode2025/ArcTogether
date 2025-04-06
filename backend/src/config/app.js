const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const mongoose = require('mongoose');
const Activity = require('../models/Activity');

// Function to add an activity
async function addActivity(activityData) {
  try {
    const activity = new Activity(activityData);
    await activity.save();
    return activity;
  } catch (error) {
    throw new Error(`Failed to add activity: ${error.message}`);
  }
}

const uri = process.env.MONGODB_URI;
console.log(uri)
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const express = require('express');

// start server
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// // Basic error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

app.post('/api/activities', async (req, res) => {
    try {
      // Add the activity to MongoDB
      const newActivity = await addActivity(req.body);
      //
      
      // Return the received data with a success message
      res.status(200).json({
        message: 'Data received successfully',
        data: req.body
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

// connect database
async function connectdb() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectdb();
