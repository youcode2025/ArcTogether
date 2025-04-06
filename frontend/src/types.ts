export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  host: string;
  maxParticipants: number;
  currentParticipants: number;
  category: 'Hiking' | 'Cycling' | 'Camping' | 'Rock Climbing' | 'Kayaking';
  imageUrl: string;
  pointsEarned: number;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  imageUrl: string;
}

export interface RewardCardProps {
  reward: Reward;
  onClaim: (rewardId: string) => void;
}

export interface EventCardProps {
  event: Event;
  onJoin: (eventId: string) => void;
  isJoined: boolean;
}

export interface User {
  id: string;
  name: string;
  points: number;
  activitiesHosted: string[];
  activitiesJoined: string[];
  skills: string;
}