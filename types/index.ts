export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  skills: Skill[];
  rating: number;
  reviews: Review[];
  portfolio: PortfolioItem[];
  location: string;
  completedProjects: number;
  verified: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
  isVerified: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  projectId: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  budget: number;
  duration: string;
  dueDate: string;
  skills: string[];
  status: 'open' | 'in-progress' | 'completed';
  remote: boolean;
  location?: string;
  proposals: number;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
  }[];
  lastMessage: {
    text: string;
    timestamp: string;
    senderId: string;
  };
  unreadCount: number;
}