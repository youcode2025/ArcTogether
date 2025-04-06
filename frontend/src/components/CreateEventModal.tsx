import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Event } from '../types';

interface CreateEventModalProps {
  onClose: () => void;
  onSubmit: (event: Omit<Event, 'id' | 'currentParticipants'>) => void;
}

export default function CreateEventModal({ onClose, onSubmit }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    hostName: '',
    maxParticipants: 1,
    category: 'Hiking' as const,
    imageUrl: '',
    pointsEarned: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const transformedData: any = {
      title: formData.title,
      description: formData.description,
      date: new Date(formData.date).toISOString(),
      location: formData.location,
      participants: {
      current: 0,
      maximum: formData.maxParticipants,
      },
      points: formData.pointsEarned,
      imageUrl: formData.imageUrl,
      host: formData.hostName,
      category: formData.category,
    };

    // SAMPLE DATA FORMAT
    // title: "hey",
    // description: "hey",
    // date: new Date('2023-12-31T23:59:59Z').toISOString(),
    // location: "ubc",
    // participants: {
    // current: 0,
    // maximum: 5,
    // },
    // points: 10,
    // imageUrl: "https://images.unsplash.com/photo-1741800459649-1992621b796f?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // host: "Zayan",
    // category: "Rock Climbing",
  // };

    console.log(transformedData)
    try {
      const response = await fetch('http://localhost:3000/api/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
      throw new Error('Failed to create event');
      }

      const result = await response.json();
      console.log('Event created successfully:', result);
    } catch (error) {
      console.error('Error creating event:', error);
    }

    onSubmit(transformedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl">
        <div className="flex justify-between items-center p-6 border-b bg-gray-50 rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-800">Create New Event</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Host Name</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                value={formData.hostName}
                onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Max Participants</label>
              <input
                type="number"
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Points Required</label>
              <input
                type="number"
                required
                min="5"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                value={formData.pointsEarned}
                onChange={(e) => setFormData({ ...formData, pointsEarned: parseInt(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              >
                <option>Hiking</option>
                <option>Cycling</option>
                <option>Camping</option>
                <option>Rock Climbing</option>
                <option>Kayaking</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}