import React, { useState } from 'react';
import { Reward, User } from '../types';
import RewardCard from '../components/RewardCard';
import { PlusCircle, Compass, Award } from 'lucide-react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// Use the same mockUser as in HomePage
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  points: 150,
  activitiesHosted: [],
  activitiesJoined: [],
  skills: '',
};

const mockRewards: Reward[] = [
    {
      id: '1',
      title: 'Mountain Trail Adventure',
      description: 'Join us for an exciting day hiking through scenic mountain trails. Perfect for nature enthusiasts and photography lovers.',
      imageUrl: 'https://nuvomagazine.com/wp-content/uploads/2024/03/240129_HopkinsNZ_Percival_02240shrp-scaled.jpg',
      pointsRequired: 10,
    },
    {
        id: '2',
        title: 'Jacket',
        description: 'Premium Arc\'teryx jacket designed for outdoor activities. Waterproof and windproof with exceptional durability.',
        imageUrl: 'https://cdn.sanity.io/images/c1chvb1i/production/cf90a23e55ef15556a389a4f277288a4e138d566-1192x1192.jpg',
        pointsRequired: 300,
    },
    {
        id: '3',
        title: 'Hiking Backpack',
        description: 'Ergonomic backpack with multiple compartments perfect for day hikes or weekend adventures.',
        imageUrl: 'https://cdn.sanity.io/images/c1chvb1i/production/bb74b1d799e94c73bc524b4c38c6c5a75b445c60-1944x1944.jpg',
        pointsRequired: 200,
    },
  ];

export default function RewardPage () {
    const [user, setUser] = useState<User>(mockUser);
    
    const handleClaimReward = (rewardId: string) => {
        const reward = mockRewards.find(r => r.id === rewardId);
        if (reward && user.points >= reward.pointsRequired) {
            setUser(prev => ({
                ...prev,
                points: prev.points - reward.pointsRequired
            }));
            alert(`You've successfully redeemed: ${reward.title}`);
        } else {
            alert("You don't have enough points to claim this reward");
        }
    };
    
    return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-4">
                    <img 
                    src="https://1000logos.net/wp-content/uploads/2022/05/Arcteryx-Logo.png" 
                    alt="Arc'teryx Logo" 
                    className="h-8 w-auto"
                    />
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">OUTDOOR EXCHANGE</h1>
                </div>
                </div>
                <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-700">
                    <Award className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="font-medium">{user.points} Points</span>
                </div>
                <button
                    className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
                >
                    <PlusCircle className="w-5 h-5" />
                    <Link to="/reward">Reward</Link>
                </button>
                <button
                    className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
                >
                    <PlusCircle className="w-5 h-5" />
                    <Link to="/">Host Event</Link>
                </button>
                </div>
            </div>
            </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Arc'teryx Rewards Banner */}
            <div 
                className="mb-8 rounded-lg shadow-sm p-6 relative overflow-hidden"
                style={{
                    backgroundImage: `url('https://images.squarespace-cdn.com/content/v1/5346a846e4b0101b157468cf/1581377774342-Y7N77AEEFAHPF0M7KNWE/Arcteryx_F19_BirdHead_DeepCove_JeffBartlett-1155.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '200px'
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
                {mockRewards.map(reward => (
                    <RewardCard
                        key={reward.id}
                        reward={reward}
                        onClaim={handleClaimReward}
                    />
                ))}
            </div>
        </main>
    </div>)
}


