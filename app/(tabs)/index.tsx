import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import ProjectCard from '@/components/cards/ProjectCard';
import { mockProjects } from '@/data/mockProjects';
import { Bell, Filter, Search } from 'lucide-react-native';
import Button from '@/components/ui/Button';

export default function DiscoverScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'remote', 'local'

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const filteredProjects = mockProjects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'remote') return project.remote;
    if (filter === 'local') return !project.remote;
    return true;
  });

  const handleProjectPress = (id: string) => {
    // Navigate to project details
    console.log(`Navigate to project ${id}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.text }]}>Hello, Jordan</Text>
          <Text style={[styles.subtitle, { color: colors.subText }]}>Find your next project</Text>
        </View>
        <View style={styles.headerActions}>
          <Bell size={24} color={colors.text} style={styles.icon} />
          <Search size={24} color={colors.text} />
        </View>
      </View>

      <View style={styles.filterContainer}>
        <Button 
          title="All Projects" 
          onPress={() => setFilter('all')} 
          variant={filter === 'all' ? 'primary' : 'outline'} 
          size="sm"
          style={styles.filterButton}
        />
        <Button 
          title="Remote Only" 
          onPress={() => setFilter('remote')} 
          variant={filter === 'remote' ? 'primary' : 'outline'} 
          size="sm"
          style={styles.filterButton}
        />
        <Button 
          title="Local" 
          onPress={() => setFilter('local')} 
          variant={filter === 'local' ? 'primary' : 'outline'} 
          size="sm"
          style={styles.filterButton}
        />
        <View style={[styles.filterIconContainer, { backgroundColor: colors.border }]}>
          <Filter size={18} color={colors.text} />
        </View>
      </View>

      <ScrollView
        style={styles.projectsContainer}
        contentContainerStyle={styles.projectsContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={colors.primary}
          />
        }
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Recommended for you
        </Text>
        
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onPress={handleProjectPress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterButton: {
    marginRight: 8,
  },
  filterIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectsContainer: {
    flex: 1,
  },
  projectsContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
});