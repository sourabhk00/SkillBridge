import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, FlatList, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Search, X, Sliders } from 'lucide-react-native';
import { mockProjects } from '@/data/mockProjects';
import ProjectCard from '@/components/cards/ProjectCard';
import SkillTag from '@/components/ui/SkillTag';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const popularSkills = [
    'Web Design', 'Mobile Development', 'Content Writing', 
    'UI Design', 'Logo Design', 'WordPress', 
    'JavaScript', 'React', 'Python', 'Marketing'
  ];

  const handleProjectPress = (id: string) => {
    // Navigate to project details
    console.log(`Navigate to project ${id}`);
  };

  const handleSkillPress = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const filteredProjects = mockProjects.filter(project => {
    // Filter by search query
    const matchesQuery = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by selected skills
    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.some(skill => project.skills.includes(skill));

    return matchesQuery && matchesSkills;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Search Projects</Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Search size={20} color={colors.subText} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search for projects..."
          placeholderTextColor={colors.subText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <X
            size={20}
            color={colors.subText}
            onPress={() => setSearchQuery('')}
            style={styles.clearIcon}
          />
        )}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <Sliders size={20} color={colors.subText} />
      </View>

      {selectedSkills.length > 0 && (
        <View style={styles.selectedSkillsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {selectedSkills.map(skill => (
              <SkillTag 
                key={skill} 
                name={skill} 
                level="intermediate" 
                small 
              />
            ))}
          </ScrollView>
        </View>
      )}

      {selectedSkills.length === 0 && searchQuery === '' && (
        <View style={styles.popularSkillsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Skills</Text>
          <View style={styles.skillTagsContainer}>
            {popularSkills.map(skill => (
              <SkillTag 
                key={skill} 
                name={skill} 
                small 
                level="beginner"
                isVerified={false}
              />
            ))}
          </View>
        </View>
      )}

      <ScrollView 
        style={styles.resultsContainer}
        contentContainerStyle={styles.resultsContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredProjects.length > 0 ? (
          <>
            <Text style={[styles.resultsText, { color: colors.text }]}>
              {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
            </Text>
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onPress={handleProjectPress}
              />
            ))}
          </>
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={[styles.noResultsText, { color: colors.text }]}>
              No projects found
            </Text>
            <Text style={[styles.noResultsSubtext, { color: colors.subText }]}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  clearIcon: {
    padding: 4,
  },
  divider: {
    width: 1,
    height: 24,
    marginHorizontal: 8,
  },
  selectedSkillsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  popularSkillsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  skillTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultsContainer: {
    flex: 1,
  },
  resultsContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  resultsText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 16,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  noResultsText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});