import React, { useState } from 'react';
import { PlusCircle, Compass, Award } from 'lucide-react';
import EventCard from './components/EventCard';
import CreateEventModal from './components/CreateEventModal';
import { Event, User } from './types';

// Sample data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  points: 150,
  activitiesHosted: [],
  activitiesJoined: [],
  skills: '',
};

const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Mountain Trail Adventure',
    description: 'Join us for an exciting day hiking through scenic mountain trails. Perfect for nature enthusiasts and photography lovers.',
    date: '2024-04-15',
    location: 'Rocky Mountain National Park',
    hostName: 'Sarah Johnson',
    maxParticipants: 12,
    currentParticipants: 8,
    category: 'Hiking',
    imageUrl: 'https://nuvomagazine.com/wp-content/uploads/2024/03/240129_HopkinsNZ_Percival_02240shrp-scaled.jpg',
    pointsEarned: 10,
  },
  {
    id: '2',
    title: 'Coastal Kayaking Experience',
    description: 'Explore the beautiful coastline while kayaking. Suitable for beginners and intermediate paddlers.',
    date: '2024-04-20',
    location: 'Pacific Coast',
    hostName: 'Mike Chen',
    maxParticipants: 8,
    currentParticipants: 5,
    category: 'Kayaking',
    imageUrl: 'https://cdn.shoplightspeed.com/shops/627509/files/63302575/arcteryxwomens.png',
    pointsEarned: 10,
  },
  {
    id: '3',
    title: 'Rock Climbing Workshop',
    description: 'Learn essential rock climbing techniques with experienced instructors. All safety equipment provided.',
    date: '2024-04-25',
    location: 'Boulder Canyon',
    hostName: 'Alex Rivera',
    maxParticipants: 6,
    currentParticipants: 6,
    category: 'Rock Climbing',
    imageUrl: 'https://cdn.sanity.io/images/inkbj32c/production/c584a62a6a460e1e6b13d018e15d4a0c6a7f0894-2694x2157.jpg?auto=format&q=75',
    pointsEarned: 10,
  }
];

function App() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  
  const handleJoinEvent = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId
        ? { ...event, currentParticipants: event.currentParticipants + 1 }
        : event
    ));
  };

  const handleCreateEvent = (newEvent: Omit<Event, 'id' | 'currentParticipants'>) => {
    const event: Event = {
      ...newEvent,
      id: Math.random().toString(36).substr(2, 9),
      currentParticipants: 0
    };
    setEvents([...events, event]);
  };

  const categories = ['All', 'Hiking', 'Cycling', 'Camping', 'Rock Climbing', 'Kayaking'];
  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Compass className="w-8 h-8 text-gray-800" />
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">OUTDOOR EXCHANGE</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-700">
                <Award className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium">{mockUser.points} Points</span>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Host Event</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md whitespace-nowrap border ${
                selectedCategory === category
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onJoin={handleJoinEvent}
            />
          ))}
        </div>

        {/* Create Event Modal */}
        {showCreateModal && (
          <CreateEventModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateEvent}
          />
        )}
      </main>
    </div>
  );
}

export default App;