import React, { useEffect, useState } from 'react';
import { PlusCircle, Compass, Award, LogOut } from 'lucide-react';
import EventCard from './components/EventCard';
import CreateEventModal from './components/CreateEventModal';
import Notification from './components/Notification';
import type { Event } from './types';
import { Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { initialEvents as constantEvents } from './constants';

// Sample user data
const mockUser = {
  id: '1',
  name: 'John Doe',
  points: 150,
  activitiesHosted: [],
  activitiesJoined: [],
  skills: '',
};

// Use initialEvents from constants.ts instead of duplicating the data
const initialEvents = constantEvents;

function HomePage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [joinedEvents, setJoinedEvents] = useState<Set<string>>(() => {
    // Try to get joined events from localStorage
    const savedJoinedEvents = localStorage.getItem('joinedEvents');
    return savedJoinedEvents ? new Set(JSON.parse(savedJoinedEvents)) : new Set();
  });
  
  const { user, logout, updateUser } = useAuth();
  
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');

  // Save joined events to localStorage when they change
  useEffect(() => {
    localStorage.setItem('joinedEvents', JSON.stringify([...joinedEvents]));
  }, [joinedEvents]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Re-enable the API call to get real data
        const response = await fetch('http://localhost:3000/api/activities');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API events:", data);
        
        if (data && data.length > 0) {
          // Use the API data and ensure it has all required fields
          const validatedEvents = data.map((event: any) => ({
            ...event,
            // Ensure the event has all required fields
            photos: event.photos || [],
            currentParticipants: event.currentParticipants || 0,
            // Make sure _id is present
            _id: event._id || `api-${Math.random().toString(16).substring(2, 10)}`
          }));
          setEvents(validatedEvents);
          console.log("Using API events:", validatedEvents);
        } else {
          // Fallback to initialEvents if API returns empty data
          console.log("API returned empty data, using fallback");
          setEvents(initialEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        // Keep using initialEvents if there's an error
        console.log("Error fetching from API, using fallback data");
        setEvents(initialEvents);
      }
    };

    fetchEvents();
  }, []);

  const handleJoinEvent = (eventId: string) => {
    if (!joinedEvents.has(eventId)) {
      const event = events.find(e => e._id === eventId);
      if (event && user) {
        setEvents(events.map(e => 
          e._id === eventId
            ? { ...e, currentParticipants: e.currentParticipants + 1 }
            : e
        ));
        setJoinedEvents(prev => new Set([...prev, eventId]));
        
        // Update user points in auth context
        if (user) {
          const updatedPoints = user.points + event.pointsEarned;
          
          // Create updated user object
          const updatedUser = {
            ...user,
            points: updatedPoints
          };
          
          // Update user through AuthContext
          updateUser(updatedUser);
        }
        
        // Show notification
        setNotificationMessage(`You earned ${event.pointsEarned} points!`);
        setNotificationType('success');
        setShowNotification(true);
      }
    }
  };

  const handleCreateEvent = (newEvent: Omit<Event, 'id' | 'currentParticipants'>) => {
    // Generate a unique ID in MongoDB format to match API format
    const mongoStyleId = Math.random().toString(16).substring(2, 15) + 
                         Math.random().toString(16).substring(2, 15);
                           
    const event: Event = {
      ...newEvent,
      _id: mongoStyleId, // Use MongoDB-style ID
      currentParticipants: 0,
      photos: [], // Initialize empty photos array
    };
    
    console.log("Creating new event with ID:", mongoStyleId);
    console.log("New event data:", event);
    
    // Add the new event to the list
    setEvents([...events, event]);
    
    // Try to save to API if available
    try {
      fetch('http://localhost:3000/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }).then(response => {
        if (response.ok) {
          return response.json(); 
        }
        throw new Error('Failed to save to API');
      }).then(savedEvent => {
        // If API returns the saved event with a different ID, update our local copy
        if (savedEvent && savedEvent._id && savedEvent._id !== event._id) {
          console.log("API assigned different ID:", savedEvent._id);
          console.log("Updating local events with API ID");
          
          // Update the events list with the API-assigned ID
          setEvents(prevEvents => 
            prevEvents.map(e => 
              e._id === event._id ? { ...e, _id: savedEvent._id } : e
            )
          );
        }
        console.log("Successfully saved event to API");
      }).catch(error => {
        console.error('API save error:', error);
      });
    } catch (error) {
      console.error('Failed to save event to API:', error);
      // Continue with local event anyway
    }
    
    // Show success notification
    setNotificationMessage("New event created successfully!");
    setNotificationType("success");
    setShowNotification(true);
  };

  const handleLogout = () => {
    logout();
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
              <div className="flex items-center space-x-4">
                <img 
                  src="https://1000logos.net/wp-content/uploads/2022/05/Arcteryx-Logo.png" 
                  alt="Arc'teryx Logo" 
                  className="h-8 w-auto"
                />
                {/* <Compass className="w-8 h-8 text-gray-800" /> */}
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Arc'Together</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-700">
                <Award className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium">{user?.points || 0} Points</span>
              </div>
              <button
                className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                <PlusCircle className="w-5 h-5" />
                <Link to="/reward">Reward</Link>
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Host Event</span>
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

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Arc'teryx Branding Section */}
        <div 
          className="mb-8 rounded-lg shadow-sm p-6 relative overflow-hidden"
          style={{
            backgroundImage: `url('https://www.outdoorsinc.com/cdn/shop/collections/arcteryx.png?v=1628011809')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '200px'
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome, {user?.name}</h2>
              <p className="text-white text-lg">Experience the outdoors with premium gear and equipment</p>
            </div>

          </div>
        </div>

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
              key={event._id}
              event={event}
              onJoin={handleJoinEvent}
              isJoined={joinedEvents.has(event._id)}
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

export default HomePage;