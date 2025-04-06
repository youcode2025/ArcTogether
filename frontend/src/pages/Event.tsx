import { Award, Calendar, Info, MapPin, PlusCircle, Tag, User, Users, LogOut, Camera, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { initialEvents } from '../constants';
import { useAuth } from "../contexts/AuthContext";
import Notification from "../components/Notification";
import { Event as EventType } from "../types";

const Event = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  
  // Use more explicit event loading
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<EventType | null>(null);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState<string[]>([]);
  const [userJoined, setUserJoined] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">("success");
  const [photos, setPhotos] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [allEvents, setAllEvents] = useState<EventType[]>([]);

  // Load joined events from localStorage
  const [joinedEventsFromStorage, setJoinedEventsFromStorage] = useState<Set<string>>(() => {
    const savedJoinedEvents = localStorage.getItem('joinedEvents');
    return savedJoinedEvents ? new Set(JSON.parse(savedJoinedEvents)) : new Set();
  });

  // Load photos from localStorage
  useEffect(() => {
    if (id) {
      const savedPhotos = localStorage.getItem(`event_photos_${id}`);
      if (savedPhotos) {
        setPhotos(JSON.parse(savedPhotos));
      }
    }
  }, [id]);

  // Load reviews from localStorage
  useEffect(() => {
    if (id) {
      const savedReviews = localStorage.getItem(`event_reviews_${id}`);
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
    }
  }, [id]);

  // First fetch all events to help with debugging
  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/activities');
        if (response.ok) {
          const data = await response.json();
          console.log("All API events:", data);
          setAllEvents(data);
        }
      } catch (error) {
        console.error("Error fetching all events:", error);
        setAllEvents(initialEvents);
      }
    };
    
    fetchAllEvents();
  }, []);

  // Load event data
  useEffect(() => {
    const loadEvent = async () => {
      setIsLoading(true);
      console.log("Loading event with ID:", id);
      
      try {
        // First try to get the event from the API directly
        const response = await fetch(`http://localhost:3000/api/activities/${id}`);
        
        // Check if API returned a valid event
        if (response.ok) {
          const apiEvent = await response.json();
          console.log("Found event from API by ID:", apiEvent);
          
          if (apiEvent && apiEvent._id) {
            setEvent(apiEvent);
            
            // Don't override user-uploaded photos from localStorage
            const savedPhotos = localStorage.getItem(`event_photos_${id}`);
            if (!savedPhotos) {
              setPhotos(apiEvent.photos || []);
            }
            
            // Check if user has already joined this event (either in user.activitiesJoined or localStorage)
            if ((user && user.activitiesJoined && user.activitiesJoined.includes(apiEvent._id)) || 
                joinedEventsFromStorage.has(apiEvent._id)) {
              setUserJoined(true);
            }
            
            setIsLoading(false);
            return; // Exit early if we found the event
          }
        }
        
        // If direct API fetch fails, try to find in all fetched events
        console.log("Direct API fetch failed, trying to find in all events");
        
        // Try to find in API events first (from our earlier fetch)
        if (allEvents && allEvents.length > 0) {
          const foundEventFromApi = allEvents.find(e => e._id === id);
          console.log("Looking in all API events, found:", foundEventFromApi);
          
          if (foundEventFromApi) {
            setEvent(foundEventFromApi);
            
            // Don't override user-uploaded photos from localStorage
            const savedPhotos = localStorage.getItem(`event_photos_${id}`);
            if (!savedPhotos) {
              setPhotos(foundEventFromApi.photos || []);
            }
            
            // Check if user has already joined this event (either in user.activitiesJoined or localStorage)
            if ((user && user.activitiesJoined && user.activitiesJoined.includes(foundEventFromApi._id)) || 
                joinedEventsFromStorage.has(foundEventFromApi._id)) {
              setUserJoined(true);
            }
            
            setIsLoading(false);
            return; // Exit early if we found the event
          }
        }
        
        // If API fails or returns no event, try to find in hardcoded data
        console.log("Falling back to hardcoded data");
        const foundEvent = initialEvents.find(e => e._id === id);
        console.log("Found event from local data:", foundEvent);
        
        if (foundEvent) {
          setEvent(foundEvent);
          
          // Don't override user-uploaded photos from localStorage
          const savedPhotos = localStorage.getItem(`event_photos_${id}`);
          if (!savedPhotos) {
            setPhotos(foundEvent.photos || []);
          }
          
          // Check if user has already joined this event (either in user.activitiesJoined or localStorage)
          if ((user && user.activitiesJoined && user.activitiesJoined.includes(foundEvent._id)) || 
              joinedEventsFromStorage.has(foundEvent._id)) {
            setUserJoined(true);
          }
        }
      } catch (error) {
        console.error("Error loading event:", error);
        // Try local data as fallback
        const foundEvent = initialEvents.find(e => e._id === id);
        if (foundEvent) {
          setEvent(foundEvent);
          
          // Don't override user-uploaded photos from localStorage
          const savedPhotos = localStorage.getItem(`event_photos_${id}`);
          if (!savedPhotos) {
            setPhotos(foundEvent.photos || []);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      loadEvent();
    }
  }, [id, user, allEvents, joinedEventsFromStorage]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="h-16 w-16 border-t-4 border-b-4 border-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle event not found
  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">The event you're looking for (ID: {id}) doesn't exist or has been removed.</p>
          
          {/* Show available events from both API and constants */}
          <div className="space-y-3 mb-8">
            <p className="text-gray-600">Available event IDs:</p>
            <div className="text-left bg-gray-100 p-4 rounded-lg max-h-60 overflow-y-auto">
              <div className="mb-4">
                <p className="font-medium">Events from API ({allEvents.length}):</p>
                <ul className="space-y-1 ml-4">
                  {allEvents.map(e => (
                    <li key={e._id} className="text-gray-600">
                      Event ID: <span className="font-mono">{e._id}</span> - {e.title}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium">Events from local data ({initialEvents.length}):</p>
                <ul className="space-y-1 ml-4">
                  {initialEvents.map(e => (
                    <li key={e._id} className="text-gray-600">
                      Event ID: <span className="font-mono">{e._id}</span> - {e.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (review.trim()) {
      const newReview = `${user?.name || 'Anonymous'}: ${review}`;
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      setReview("");
      
      // Save reviews to localStorage
      if (id) {
        localStorage.setItem(`event_reviews_${id}`, JSON.stringify(updatedReviews));
      }
      
      // Show notification
      setNotificationMessage("Review submitted successfully!");
      setNotificationType("success");
      setShowNotification(true);
    }
  };

  const isFullyBooked = event.currentParticipants >= event.maxParticipants;

  const handleJoinEvent = () => {
    if (!userJoined && !isFullyBooked && user) {
      // Update the event participants count
      const updatedEvent = {
        ...event,
        currentParticipants: event.currentParticipants + 1
      };
      setEvent(updatedEvent);
      
      // Mark user as joined
      setUserJoined(true);
      
      // Save to localStorage
      const newJoinedEvents = new Set([...joinedEventsFromStorage]);
      newJoinedEvents.add(event._id);
      localStorage.setItem('joinedEvents', JSON.stringify([...newJoinedEvents]));
      setJoinedEventsFromStorage(newJoinedEvents);
      
      // Update user points and joined activities
      if (user) {
        const updatedPoints = user.points + event.pointsEarned;
        const updatedUser = {
          ...user,
          points: updatedPoints,
          activitiesJoined: [...user.activitiesJoined, event._id]
        };
        
        // Update user through auth context
        updateUser(updatedUser);
      }
      
      // Show notification
      setNotificationMessage(`You joined ${event.title} and earned ${event.pointsEarned} points!`);
      setNotificationType("success");
      setShowNotification(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPhoto = () => {
    if (previewImage) {
      // Add the new photo to the photos array
      const newPhotos = [...photos, previewImage];
      setPhotos(newPhotos);
      
      // Save photos to localStorage
      if (id) {
        localStorage.setItem(`event_photos_${id}`, JSON.stringify(newPhotos));
      }
      
      // Update the event with the new photo
      setEvent({
        ...event,
        photos: newPhotos
      });
      
      // Reset the input
      setImageFile(null);
      setPreviewImage(null);
      
      // Show notification
      setNotificationMessage("Photo uploaded successfully!");
      setNotificationType("success");
      setShowNotification(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
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
                        className="h-8 w-auto"
                    />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-700">
                <Award className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium">{user?.points || 0} Points</span>
              </div>
              <button className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                <PlusCircle className="w-5 h-5" />
                <Link to="/reward">Reward</Link>
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Home</span>
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
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back to Events
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-80 object-cover"
          />
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-600" />
                <div>
                  <span className="font-medium text-gray-700">Date:</span>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <p>{event.location}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-600" />
                <div>
                  <span className="font-medium text-gray-700">Host:</span>
                  <p>{event.host}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Tag className="w-5 h-5 text-gray-600" />
                <div>
                  <span className="font-medium text-gray-700">Category:</span>
                  <p>{event.category}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-600" />
                <div>
                  <span className="font-medium text-gray-700">Participants:</span>
                  <p>{event.currentParticipants} of {event.maxParticipants}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-gray-600" />
                <div>
                  <span className="font-medium text-gray-700">Points:</span>
                  <p>{event.pointsEarned} points</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-700 mb-2">Description:</h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
            
            <button
              onClick={handleJoinEvent}
              disabled={isFullyBooked || userJoined}
              className={`mt-6 px-6 py-3 rounded-md font-medium ${
                isFullyBooked || userJoined
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              }`}
            >
              {userJoined 
                ? "You've Joined" 
                : isFullyBooked 
                  ? "Fully Booked" 
                  : "Join Event"}
            </button>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Share Your Photos</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Upload a photo from this event</label>
            <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Select Photo
                </label>
              </div>
              
              {previewImage && (
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 border rounded-md overflow-hidden">
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={handleUploadPhoto}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Photos Grid */}
          <h3 className="text-lg font-medium text-gray-800 mb-3 mt-6">Event Photos</h3>
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="aspect-square rounded-md overflow-hidden border border-gray-200">
                  <img
                    src={photo}
                    alt={`Event photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No photos have been shared yet. Be the first to share!</p>
          )}
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Reviews & Skills Learned</h2>
          
          <form onSubmit={handleReviewSubmit} className="mb-6">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              rows={4}
              placeholder="Share your experience and what skills you learned..."
            />
            <button
              type="submit"
              className="mt-3 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Submit Review
            </button>
          </form>
          
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((rev, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <p className="text-gray-700">{rev}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
          )}
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
};

export default Event;
