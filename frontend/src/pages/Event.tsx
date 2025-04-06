import { Award, Calendar, Info, MapPin, PlusCircle, Tag, User, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { initialEvents } from '../constants';

const Event = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(initialEvents.find((e) => e.id === id));
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState<string[]>([]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (review.trim()) {
      setReviews([...reviews, review]);
      setReview("");
    }
  };

  const isFullyBooked = event.currentParticipants >= event.maxParticipants;

  const handleJoinEvent = () => {
    if (event.currentParticipants < event.maxParticipants) {
      setEvent((prevEvent) => ({
        ...prevEvent,
        currentParticipants: prevEvent.currentParticipants + 1,
      }));
    }
  };

  return (
    <div className="container mx-auto p-4">
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
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                  OUTDOOR EXCHANGE
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-700">
                <Award className="h-5 w-5 text-gray-500 mr-2" />
                {/* <span className="font-medium">{mockUser.points} Points</span> */}
              </div>
              <button className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
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
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/")}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
        >
          Back
        </button>
        <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-64 object-cover mb-4"
        />
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Info className="text-gray-700" />
            <strong className="text-gray-700">Description:</strong>
            <p className="text-gray-700">{event.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="text-gray-700" />
            <strong className="text-gray-700">Date:</strong>
            <p className="text-gray-700">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="text-gray-700" />
            <strong className="text-gray-700">Location:</strong>
            <p className="text-gray-700">{event.location}</p>
          </div>
          <div className="flex items-center space-x-2">
            <User className="text-gray-700" />
            <strong className="text-gray-700">Host Name:</strong>
            <p className="text-gray-700">{event.host}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="text-gray-700" />
            <strong className="text-gray-700">Max Participants:</strong>
            <p className="text-gray-700">{event.maxParticipants}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="text-gray-700" />
            <strong className="text-gray-700">Current Participants:</strong>
            <p className="text-gray-700">{event.currentParticipants}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Tag className="text-gray-700" />
            <strong className="text-gray-700">Category:</strong>
            <p className="text-gray-700">{event.category}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="text-gray-700" />
            <strong className="text-gray-700">Points Earned:</strong>
            <p className="text-gray-700">{event.pointsEarned}</p>
          </div>
        </div>

        <button
          onClick={handleJoinEvent}
          disabled={isFullyBooked}
          className={`px-4 py-2 mt-5 rounded-md font-medium ${
            isFullyBooked
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          {isFullyBooked ? "Fully Cooked" : "Join Event"}
        </button>

        {/* Photos Section */}
        <div className="mt-6">
          <h3 className="text-lg font-medium">Event Photos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {event.photos.slice(0, 10).map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Event photo ${index + 1}`}
                className="w-full h-32 object-cover rounded-md"
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium">Add a Review & Share what skills you learned!</h3>
          <form onSubmit={handleReviewSubmit} className="mt-4">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Write your review here..."
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded-md "
            >
              Submit Review
            </button>
          </form>
          <div className="mt-6">
            <h3 className="text-lg font-medium">Reviews & Skills Learned : </h3>
            <ul className="mt-4">
              {reviews.map((rev, index) => (
                <li key={index} className="border-b py-2">
                  {rev}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Event;
