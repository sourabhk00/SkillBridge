import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import Avatar from '@/components/ui/Avatar';
import { Conversation } from '@/types';

interface ConversationCardProps {
  conversation: Conversation;
  onPress: (id: string) => void;
}

export default function ConversationCard({ conversation, onPress }: ConversationCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Get the other participant (assuming current user is one of the participants)
  const otherParticipant = conversation.participants[1];
  
  // Format timestamp to relative time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { 
          backgroundColor: conversation.unreadCount > 0 ? colors.primaryLight : colors.card, 
          borderColor: colors.border 
        }
      ]}
      onPress={() => onPress(conversation.id)}
      activeOpacity={0.8}
    >
      <Avatar
        uri={otherParticipant.avatar}
        size="md"
        initials={otherParticipant.name.charAt(0)}
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={[styles.name, { color: colors.text }]}>
            {otherParticipant.name}
          </Text>
          <Text style={[styles.timestamp, { color: colors.subText }]}>
            {formatTimestamp(conversation.lastMessage.timestamp)}
          </Text>
        </View>
        
        <View style={styles.messageContainer}>
          <Text 
            style={[
              styles.message, 
              { 
                color: conversation.unreadCount > 0 ? colors.text : colors.subText,
                fontFamily: conversation.unreadCount > 0 ? 'Inter-Medium' : 'Inter-Regular'
              }
            ]}
            numberOfLines={1}
          >
            {conversation.lastMessage.text}
          </Text>
          
          {conversation.unreadCount > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Text style={styles.badgeText}>{conversation.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginLeft: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Inter-Medium',
  },
});