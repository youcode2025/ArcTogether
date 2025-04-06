import React from 'react';
import { Calendar, MapPin, Users, Award, Activity } from 'lucide-react';
import { EventCardProps } from '../types';

export default function EventCard({ event, onJoin }: EventCardProps) {
  const isFullyBooked = event.currentParticipants >= event.maxParticipants;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
          {event.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
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
            <span>{event.pointsEarned}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Hosted by {event.hostName}</span>
          <button
            onClick={() => onJoin(event.id)}
            disabled={isFullyBooked}
            className={`px-4 py-2 rounded-lg font-semibold ${
              isFullyBooked
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isFullyBooked ? 'Fully Booked' : 'Join Event'}
          </button>
        </div>
      </div>
    </div>
  );
}