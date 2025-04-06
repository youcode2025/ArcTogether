import React, { useState, useEffect } from 'react';
import { Reward } from '../types';
import RewardCard from '../components/RewardCard';
import { PlusCircle, Compass, Award, LogOut, Trophy, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Notification from '../components/Notification';
import { useAuth } from '../contexts/AuthContext';

const mockRewards: Reward[] = [
  {
    id: "1",
    title: "Arcteryx Gift Card $30",
    description:
      "Get a $30 gift card to Arcteryx, perfect for outdoor gear shopping.",
    imageUrl:
      "https://pbs.twimg.com/media/DRZ-B1fXUAAtIMx.jpg",
    pointsRequired: 150,
  },
  {
    id: "2",
    title: "Arcteryx Backpack",
    description: "Stylish and functional backpack for all your outdoor adventures.",
    imageUrl:
      "https://images.arcteryx.com/S25/1350x1710/Ion-Lightweight-Chalk-Bag-Black.jpg",
    pointsRequired: 300,
  },
  {
    id: "3",
    title: "Arcteryx Merino Wool Mid Bird Sock",
    description: "Comfortable and warm socks for your outdoor activities.",
    imageUrl:
      "https://images.arcteryx.com/S25/1350x1710/Merino-Wool-Mid-Bird-Sock-Black-Graphite.jpg",
    pointsRequired: 40,
  },
  {
    id: "4",
    title: "Arcteryx Gift Card $25",
    description: "Get a $25 gift card to Arcteryx, perfect for outdoor gear shopping.",
    imageUrl:
      "https://pbs.twimg.com/media/DRZ-B1fXUAAtIMx.jpg",
    pointsRequired: 80,
  },
  ];

  export default function RewardPage() {
    const { user, logout, updateUser } = useAuth();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  
    const handleClaimReward = (rewardId: string) => {
        const reward = mockRewards.find(r => r.id === rewardId);
        if (reward && user && user.points >= reward.pointsRequired) {
            // Calculate updated points
            const updatedPoints = user.points - reward.pointsRequired;
            
            // Create updated user object
            const updatedUser = {
                ...user,
                points: updatedPoints
            };
            
            // Update user through AuthContext
            updateUser(updatedUser);
            
            // Show success notification
            setNotificationMessage(`Successfully redeemed: ${reward.title}`);
            setNotificationType('success');
            setShowNotification(true);
        } else {
            // Show error notification
            setNotificationMessage("You don't have enough points for this reward");
            setNotificationType('error');
            setShowNotification(true);
        }
    };
  
    const handleLogout = () => {
      logout();
    };
  
    return (
      <div className="relative min-h-screen bg-gray-50">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://uploads-ssl.webflow.com/5a9ee6416e90d20001b20038/6289f10918a3479222c3bdd0_gray-gradient.png')",
            filter: 'brightness(0.6)',
          }}
        ></div>
  
        {/* Glassmorphism Overlay Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
  
        {/* Header */}
        <header className="relative bg-white/30 backdrop-blur-md border border-white/30 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-4">
                    <img 
                    src="\src\assets\images\ArctgtLogoB.png" 
                    alt="Arc'teryx Logo" 
                    className="h-8 w-auto"
                    />
                    <img 
                    src="\src\assets\images\ArctgtTextB.png" 
                    alt="Arc'Together Text Logo" 
                    className="h-6 w-auto"
                    />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-700">
                  <Award className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="font-medium">{user?.points || 0} Points</span>
                </div>
                <button
                  className="flex items-center space-x-2 bg-gray-800/90 text-white px-4 py-2 rounded-md hover:bg-gray-900/90 transition-colors duration-200"
                >
                    <Trophy className="w-5 h-5" />
                    <Link to="/reward">Reward</Link>
                </button>
                <button
                    className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
                >
                  <Home className="w-5 h-5" />
                  <Link to="/">Home</Link>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>
  
        <main className="relative max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Arc'teryx Rewards Banner */}
          <div
            className="mb-8 rounded-lg shadow-lg p-6 relative overflow-hidden backdrop-blur-xl bg-white/20 border border-white/30"
            style={{
              backgroundImage: `url('https://cdn.prod.website-files.com/64f1d2cc5e0dab718e3de0c4/64f1d4bda9500669ffb145f6_62d7d2647de98259c48a449a_ss22-arcteryx-hero.jpeg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '200px',
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
  
            <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-3xl font-bold text-white mb-2">Arc'teryx Rewards</h2>
                <p className="text-white text-lg">Redeem your points for premium Arc'teryx gear and outdoor experiences</p>
              </div>
            </div>
          </div>
  
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight mb-6">Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                onClaim={handleClaimReward}
                userPoints={user?.points || 0}
              />
            ))}
          </div>
        </main>
  
        {/* Notification */}
        {showNotification && (
          <Notification
            message={notificationMessage}
            type={notificationType}
            onClose={() => setShowNotification(false)}
          />
        )}
      </div>
    );
  }


