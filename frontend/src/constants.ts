import { Event, Reward } from './types';

export const initialEvents: Event[] = [
    {
        _id: '1',
      title: 'Mountain Trail Adventure',
      description: 'Join us for an exciting day hiking through scenic mountain trails. Perfect for nature enthusiasts and photography lovers.',
      date: '2024-04-15',
      location: 'Rocky Mountain National Park',
      host: 'Sarah Johnson',
      maxParticipants: 12,
      currentParticipants: 8,
      category: 'Hiking',
      imageUrl: 'https://nuvomagazine.com/wp-content/uploads/2024/03/240129_HopkinsNZ_Percival_02240shrp-scaled.jpg',
      pointsEarned: 10,
      photos: [
        'https://explorerchick.com/wp-content/uploads/2023/08/hiking_groups1.jpg',
        'https://lowermainlandhikers.com/wp-content/uploads/2024/11/20240831_100540-EDIT-320x202.jpg',
        'https://i.cbc.ca/1.7072922.1704236968!/fileImage/httpImage/image.jpeg_gen/derivatives/16x9_940/hiking-adirondack-mountains.jpeg',
        'https://nuvomagazine.com/wp-content/uploads/2024/03/240129_HopkinsNZ_Percival_02240shrp-scaled.jpg',
        'https://nuvomagazine.com/wp-content/uploads/2024/03/240129_HopkinsNZ_Percival_02240shrp-scaled.jpg',
        'https://nuvomagazine.com/wp-content/uploads/2024/03/240129_HopkinsNZ_Percival_02240shrp-scaled.jpg',
        'https://nuvomagazine.com/wp-content/uploads/2024/03/240129_HopkinsNZ_Percival_02240shrp-scaled.jpg',
      ]
    },
    {
        _id: '2',
      title: 'Coastal Kayaking Experience',
      description: 'Explore the beautiful coastline while kayaking. Suitable for beginners and intermediate paddlers.',
      date: '2024-04-20',
      location: 'Pacific Coast',
      host: 'Mike Chen',
      maxParticipants: 8,
      currentParticipants: 5,
      category: 'Kayaking',
      imageUrl: 'https://cdn.shoplightspeed.com/shops/627509/files/63302575/arcteryxwomens.png',
      pointsEarned: 10,
      photos: []
    },
    {
        _id: '3',
      title: 'Rock Climbing Workshop',
      description: 'Learn essential rock climbing techniques with experienced instructors. All safety equipment provided.',
      date: '2024-04-25',
      location: 'Boulder Canyon',
      host: 'Alex Rivera',
      maxParticipants: 6,
      currentParticipants: 6,
      category: 'Rock Climbing',
      imageUrl: 'https://cdn.sanity.io/images/inkbj32c/production/c584a62a6a460e1e6b13d018e15d4a0c6a7f0894-2694x2157.jpg?auto=format&q=75',
      pointsEarned: 10,
      photos: []
    }
  ];

export const mockRewards: Reward[] = [
    {
      id: "1",
      title: "Arcteryx Gift Card $30",
      description:
        "Get a $30 gift card to Arcteryx, perfect for outdoor gear shopping.",
      imageUrl:
        "https://pbs.twimg.com/media/DRZ-B1fXUAAtIMx.jpg",
      pointsRequired: 150,
    },
    {
      id: "2",
      title: "Arcteryx Backpack",
      description: "Stylish and functional backpack for all your outdoor adventures.",
      imageUrl:
        "https://images.arcteryx.com/S25/1350x1710/Ion-Lightweight-Chalk-Bag-Black.jpg",
      pointsRequired: 300,
    },
    //generate more mock rewards
    {
      id: "3",
      title: "Arcteryx Merino Wool Mid Bird Sock",
      description: "Comfortable and warm socks for your outdoor activities.",
      imageUrl:
        "https://images.arcteryx.com/S25/1350x1710/Merino-Wool-Mid-Bird-Sock-Black-Graphite.jpg",
      pointsRequired: 40,
    },
    {
      id: "4",
      title: "Arcteryx Gift Card $25",
      description: "Get a $25 gift card to Arcteryx, perfect for outdoor gear shopping.",
      imageUrl:
        "https://pbs.twimg.com/media/DRZ-B1fXUAAtIMx.jpg",
      pointsRequired: 80,
    },
  ];