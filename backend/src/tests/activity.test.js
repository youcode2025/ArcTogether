const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Activity = require('../models/Activity');  

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Activity.deleteMany({});
});

describe('Activity Model Test', () => {
  it('should create & save activity successfully', async () => {
    const validActivity = new Activity({
      title: "Mountain Hiking Basics",
      description: "Learn essential hiking skills",
      date: new Date('2024-03-25'),
      location: {
        name: "Mountain Trail Park"
      },
      participants: {
        maximum: 10
      },
      points: {
        earn: 50
      },
      imageUrl: "/images/hiking.jpg",
      host: new mongoose.Types.ObjectId(),
      category: "hiking"
    });

    const savedActivity = await validActivity.save();
    
    expect(savedActivity._id).toBeDefined();
    expect(savedActivity.title).toBe(validActivity.title);
    expect(savedActivity.participants.current).toBe(0);
  });

  it('should fail to save activity without required fields', async () => {
    const activityWithoutTitle = new Activity({
      description: "Learn essential hiking skills",
      date: new Date('2024-03-25'),
      location: {
        name: "Mountain Trail Park"
      }
    });

    let err;
    try {
      await activityWithoutTitle.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should successfully find activities', async () => {
    // Create test activities
    const activities = [
      {
        title: "Mountain Hiking Basics",
        description: "Learn essential hiking skills",
        date: new Date('2024-03-25'),
        location: {
          name: "Mountain Trail Park",
          coordinates: [-122.4194, 37.7749]
        },
        participants: { maximum: 10 },
        points: { earn: 50 },
        imageUrl: "/images/hiking.jpg",
        host: new mongoose.Types.ObjectId(),
        category: "hiking"
      },
      {
        title: "Rock Climbing for Beginners",
        description: "Basic climbing techniques",
        date: new Date('2024-03-28'),
        location: {
          name: "City Climbing Center"
        },
        participants: { maximum: 8 },
        points: { earn: 60 },
        imageUrl: "/images/climbing.jpg",
        host: new mongoose.Types.ObjectId(),
        category: "climbing"
      }
    ];

    await Activity.insertMany(activities);
    
    const foundActivities = await Activity.find({});
    expect(foundActivities.length).toBe(2);
  });
});