const userSchema = new mongoose.Schema({
    // Basic User Information
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    profileImage: {
      type: String,
      default: 'default-profile.jpg'
    },
    skills: [{
        name: {
          type: String,
          required: true
        },
        level: {
          type: String,
          enum: ['beginner', 'intermediate', 'advanced', 'expert'],
          required: true
        },
        canTeach: {
          type: Boolean,
          default: false
        },
        verified: {
          type: Boolean,
          default: false
        }
      }],
      learningPoints: {
        balance: {
          type: Number,
          default: 0
        },
        history: [{
          amount: Number,
          type: {
            type: String,
            enum: ['earned', 'spent']
          },
          activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity'
          },
          description: String,
          date: {
            type: Date,
            default: Date.now
          }
        }]
      }
})