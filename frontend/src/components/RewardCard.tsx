import React from 'react';
import { Calendar, MapPin, Users, Award, Activity } from 'lucide-react';
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
      </div>
      
        <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 tracking-tight">{reward.title}</h3>
          <div className="flex items-center text-gray-600">
            <Award className="w-4 h-4 mr-2" />
            <span>{reward.pointsRequired} points</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{reward.description}</p>
        <button
            onClick={() => onClaim(reward.id)}
            className="px-4 py-2 rounded-md font-medium bg-gray-800 text-white hover:bg-gray-700"
          >
            Redeem
          </button>
    </div>
  );
}