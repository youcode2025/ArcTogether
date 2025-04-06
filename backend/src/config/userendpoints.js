// add this to app.js later when we have users ready

// app.post('/api/activities/:activityId/join', async (req, res) => {
//     try{
//       const { userId } = req.body;
//       const activity = await Activity.findById(req.params.activityId);
//       const user = await User.findById(userId);
//       if (!activity || !user) {
//         return res.status(404).json({ error: 'Activity or user not found' });
//       }
  
//       if (activity.participants.current >= activity.participants.maximum) {
//         return res.status(400).json({ error: 'Activity is full' });
//       }
  
//       activity.participants.current += 1;
//       await activity.save();
  
//       user.learningPoints.balance += activity.points.earn;
//       user.learningPoints.history.push({
//         amount: activity.points.earn,
//         type: 'earned',
//         activity: activity._id,
//         description: `Joined activity: ${activity.title}`
//       });
  
//       await user.save();
  
//       res.status(200).json({
//         message: 'Successfully joined activity',
//         points: {
//           earned: activity.points.earn,
//           newBalance: user.learningPoints.balance
//         }
//       });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   })
  

// // Get user profile with activities and points
// app.get('/api/users/:userId', async (req, res) => {
//     try {
//       const user = await User.findById(req.params.userId)
//         .select('-password') // Exclude password from response
//         .populate('learningPoints.history.activity');
      
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       res.status(200).json({
//         user: {
//           ...user.toObject(),
//           totalPoints: user.learningPoints.balance,
//           skillCount: user.skills.length
//         }
//       });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });
  
  
//   app.post('/api/users/register', async(req, res) => {
//     try{
//       const { username, email, password } = req.body;
//       const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//       if (existingUser) {
//         return res.status(400).json({ error: 'Username or email already exists' });
//       }
  
//       const user = new User({
//         username,
//         email,
//         password, // Note: In production, you should hash the password
//         skills: [],
//         learningPoints: { balance: 0 }
//       });
  
//       await user.save();
//       res.status(201).json({
//         message: 'User registered successfully',
//         user: {
//           id: user._id,
//           username: user.username,
//           email: user.email
//         }
//       });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });