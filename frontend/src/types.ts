export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  hostName: string;
  maxParticipants: number;
  currentParticipants: number;
  category: 'Hiking' | 'Cycling' | 'Camping' | 'Rock Climbing' | 'Kayaking';
  imageUrl: string;
  pointsEarned: number;
}

export interface EventCardProps {
  event: Event;
  onJoin: (eventId: string) => void;
}

export interface User {
  id: string;
  name: string;
  points: number;
  activitiesHosted: string[];
  activitiesJoined: string[];
  skills: string;
}