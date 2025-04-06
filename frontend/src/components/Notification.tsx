import React, { useEffect, useState } from 'react';
import { Award } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export default function Notification({ message, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
      <Award className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
} 