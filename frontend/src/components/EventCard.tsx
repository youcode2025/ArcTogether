import React from 'react';
import { Calendar, MapPin, Users, Award, Activity } from 'lucide-react';
import { EventCardProps } from '../types';

export default function EventCard({ event, onJoin }: EventCardProps) {
  const isFullyBooked = event.currentParticipants >= event.maxParticipants;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-[1.02] border border-gray-100">
      <div className="relative h-48">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded-md text-sm font-medium border border-gray-200">
          {event.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 tracking-tight">{event.title}</h3>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>{event.currentParticipants}/{event.maxParticipants} participants</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Award className="w-4 h-4 mr-2" />
            <span>{event.pointsEarned} points</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Hosted by {event.hostName}</span>
          <button
            onClick={() => onJoin(event.id)}
            disabled={isFullyBooked}
            className={`px-4 py-2 rounded-md font-medium ${
              isFullyBooked
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {isFullyBooked ? 'Fully Booked' : 'Join Event'}
          </button>
        </div>
      </div>
    </div>
  );
}