import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import Avatar from '@/components/ui/Avatar';
import SkillTag from '@/components/ui/SkillTag';
import Badge from '@/components/ui/Badge';
import { Clock, MapPin, DollarSign, Users } from 'lucide-react-native';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onPress: (id: string) => void;
}

export default function ProjectCard({ project, onPress }: ProjectCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getStatusBadge = () => {
    switch (project.status) {
      case 'open':
        return <Badge text="Open" variant="success" />;
      case 'in-progress':
        return <Badge text="In Progress" variant="warning" />;
      case 'completed':
        return <Badge text="Completed" variant="neutral" />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => onPress(project.id)}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.clientInfo}>
          <Avatar uri={project.clientAvatar} size="sm" initials={project.clientName.charAt(0)} />
          <Text style={[styles.clientName, { color: colors.text }]}>{project.clientName}</Text>
        </View>
        {getStatusBadge()}
      </View>

      <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
        {project.title}
      </Text>
      
      <Text style={[styles.description, { color: colors.subText }]} numberOfLines={3}>
        {project.description}
      </Text>

      <View style={styles.metaContainer}>
        <View style={styles.metaItem}>
          <Clock size={16} color={colors.subText} />
          <Text style={[styles.metaText, { color: colors.subText }]}>{project.duration}</Text>
        </View>
        
        <View style={styles.metaItem}>
          <DollarSign size={16} color={colors.subText} />
          <Text style={[styles.metaText, { color: colors.subText }]}>${project.budget}</Text>
        </View>

        {project.remote ? (
          <View style={styles.metaItem}>
            <MapPin size={16} color={colors.subText} />
            <Text style={[styles.metaText, { color: colors.subText }]}>Remote</Text>
          </View>
        ) : (
          <View style={styles.metaItem}>
            <MapPin size={16} color={colors.subText} />
            <Text style={[styles.metaText, { color: colors.subText }]}>{project.location}</Text>
          </View>
        )}

        <View style={styles.metaItem}>
          <Users size={16} color={colors.subText} />
          <Text style={[styles.metaText, { color: colors.subText }]}>{project.proposals}</Text>
        </View>
      </View>

      <View style={styles.skillsContainer}>
        {project.skills.slice(0, 3).map((skill, index) => (
          <SkillTag key={index} name={skill} small />
        ))}
        {project.skills.length > 3 && (
          <Badge text={`+${project.skills.length - 3}`} variant="neutral" small />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientName: {
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  metaText: {
    marginLeft: 4,
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});