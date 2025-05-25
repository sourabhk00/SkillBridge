import { Conversation } from '@/types';

export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: [
      {
        id: 'user1',
        name: 'You',
        avatar: '',
      },
      {
        id: 'user2',
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
    lastMessage: {
      text: 'I\'d like to discuss the details of the UI design project. Are you available for a call tomorrow?',
      timestamp: '2023-07-15T10:30:00Z',
      senderId: 'user2',
    },
    unreadCount: 2,
  },
  {
    id: 'conv2',
    participants: [
      {
        id: 'user1',
        name: 'You',
        avatar: '',
      },
      {
        id: 'user3',
        name: 'Alex Chen',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
    lastMessage: {
      text: 'The project has been completed and I\'ve submitted the final files. Please let me know if you need any revisions.',
      timestamp: '2023-07-14T16:45:00Z',
      senderId: 'user1',
    },
    unreadCount: 0,
  },
  {
    id: 'conv3',
    participants: [
      {
        id: 'user1',
        name: 'You',
        avatar: '',
      },
      {
        id: 'user4',
        name: 'TechSolutions Inc.',
        avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
    lastMessage: {
      text: 'Your proposal for our landing page project looks great. I have a few questions about the timeline.',
      timestamp: '2023-07-15T09:15:00Z',
      senderId: 'user4',
    },
    unreadCount: 1,
  },
  {
    id: 'conv4',
    participants: [
      {
        id: 'user1',
        name: 'You',
        avatar: '',
      },
      {
        id: 'user5',
        name: 'Maria Garcia',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
    lastMessage: {
      text: 'Thanks for the feedback! I\'ll implement the changes and send you an updated version by tomorrow.',
      timestamp: '2023-07-13T14:20:00Z',
      senderId: 'user1',
    },
    unreadCount: 0,
  },
  {
    id: 'conv5',
    participants: [
      {
        id: 'user1',
        name: 'You',
        avatar: '',
      },
      {
        id: 'user6',
        name: 'WebFix Solutions',
        avatar: 'https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
    lastMessage: {
      text: 'We\'ve reviewed your application and would like to proceed with the WordPress bug fixes. When can you start?',
      timestamp: '2023-07-14T11:50:00Z',
      senderId: 'user6',
    },
    unreadCount: 3,
  },
];