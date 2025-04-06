import React from 'react';
import { Award, ShoppingBag } from 'lucide-react';
import { RewardCardProps } from '../types';

export default function RewardCard({ reward, onClaim }: RewardCardProps) {
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-[1.02] border border-gray-100">
      <div className="relative h-48">
        <img
          src={reward.imageUrl}
          alt={reward.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
          <div className="flex items-center text-gray-700">
            <Award className="w-4 h-4 mr-1 text-gray-600" />
            <span className="font-medium">{reward.pointsRequired} points</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 tracking-tight">{reward.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{reward.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 flex items-center">
            <ShoppingBag className="w-4 h-4 mr-1" />
            Arc'teryx Exclusive
          </span>
          <button
            onClick={() => onClaim(reward.id)}
            className="px-4 py-2 rounded-md font-medium bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200"
          >
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
}