import React from 'react';
import { Reward } from '../types';
import RewardCard from '../components/RewardCard';
import { PlusCircle, Compass, Award } from 'lucide-react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

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
        description: 'ls. Perfect for nature enthusiasts and photography lovers.',
        imageUrl: 'https://nuvomagazine.com/wp-content/uploads/2024/03/240129_HopkinsNZ_Percival_02240shrp-scaled.jpg',
        pointsRequired: 300,
      },
  ];

export default function RewardPage () {
    return (
    <div>
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
                {/* <Compass className="w-8 h-8 text-gray-800" /> */}
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">OUTDOOR EXCHANGE</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-700">
                <Award className="h-5 w-5 text-gray-500 mr-2" />
                {/* <span className="font-medium">{mockUser.points} Points</span> */}
              </div>
              <button
                className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                <PlusCircle className="w-5 h-5" />
                <Link to="/reward">Reward</Link>
              </button>
              <button
                // onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Host Event</span>
              </button>
            </div>
          </div>
        </div>
      </header>
        <h1 className='text-2xl font-bold text-gray-800 tracking-tight'>Reward Page</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockRewards.map(reward => (
            <RewardCard
              key={reward.id}
              reward = {reward}
              onClaim={()=>{}}
            />
          ))}
        </div>
    </div>)
}


