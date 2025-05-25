import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, useColorScheme, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/Button';
import SkillTag from '@/components/ui/SkillTag';
import { Calendar, Clock, MapPin, DollarSign, X } from 'lucide-react-native';

export default function CreateProjectScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isRemote, setIsRemote] = useState(true);
  const [location, setLocation] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  const handleAddSkill = () => {
    if (skillInput.trim() !== '' && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleCreateProject = () => {
    // Validate form
    if (!title || !description || !budget || !duration || !dueDate || skills.length === 0) {
      console.log('Please fill all required fields');
      return;
    }

    // Create project logic would go here
    console.log('Project created!', {
      title,
      description,
      budget,
      duration,
      dueDate,
      isRemote,
      location: isRemote ? '' : location,
      skills,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setBudget('');
    setDuration('');
    setDueDate('');
    setIsRemote(true);
    setLocation('');
    setSkills([]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Create a Project</Text>
      </View>

      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Project Title</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.card, borderColor: colors.border, color: colors.text },
            ]}
            placeholder="Enter a clear title for your project"
            placeholderTextColor={colors.subText}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Description</Text>
          <TextInput
            style={[
              styles.textArea,
              { backgroundColor: colors.card, borderColor: colors.border, color: colors.text },
            ]}
            placeholder="Describe your project in detail. Be specific about requirements, deliverables, and timeline."
            placeholderTextColor={colors.subText}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.formRow}>
          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={[styles.label, { color: colors.text }]}>Budget ($)</Text>
            <View style={[
              styles.inputWithIcon,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
              <DollarSign size={18} color={colors.subText} />
              <TextInput
                style={[styles.iconInput, { color: colors.text }]}
                placeholder="Amount"
                placeholderTextColor={colors.subText}
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
              />
            </View>
          </View>
          
          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={[styles.label, { color: colors.text }]}>Duration</Text>
            <View style={[
              styles.inputWithIcon,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
              <Clock size={18} color={colors.subText} />
              <TextInput
                style={[styles.iconInput, { color: colors.text }]}
                placeholder="e.g. 3-5 days"
                placeholderTextColor={colors.subText}
                value={duration}
                onChangeText={setDuration}
              />
            </View>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Due Date</Text>
          <View style={[
            styles.inputWithIcon,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
            <Calendar size={18} color={colors.subText} />
            <TextInput
              style={[styles.iconInput, { color: colors.text }]}
              placeholder="MM/DD/YYYY"
              placeholderTextColor={colors.subText}
              value={dueDate}
              onChangeText={setDueDate}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.switchContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Remote Project</Text>
            <Switch
              value={isRemote}
              onValueChange={setIsRemote}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="white"
            />
          </View>
        </View>

        {!isRemote && (
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Location</Text>
            <View style={[
              styles.inputWithIcon,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
              <MapPin size={18} color={colors.subText} />
              <TextInput
                style={[styles.iconInput, { color: colors.text }]}
                placeholder="City, Country"
                placeholderTextColor={colors.subText}
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>
        )}

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Required Skills</Text>
          <View style={[
            styles.inputWithButton,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
            <TextInput
              style={[styles.skillInput, { color: colors.text }]}
              placeholder="Add skills required for this project"
              placeholderTextColor={colors.subText}
              value={skillInput}
              onChangeText={setSkillInput}
              onSubmitEditing={handleAddSkill}
            />
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: colors.primary }]}
              onPress={handleAddSkill}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          
          {skills.length > 0 && (
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <View key={index} style={styles.skillTagContainer}>
                  <SkillTag name={skill} small />
                  <TouchableOpacity
                    style={styles.removeSkillButton}
                    onPress={() => handleRemoveSkill(skill)}
                  >
                    <X size={14} color={colors.subText} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <Button
          title="Create Project"
          onPress={handleCreateProject}
          variant="primary"
          size="lg"
          fullWidth
          style={styles.submitButton}
        />
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
  formContainer: {
    flex: 1,
  },
  formContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    minHeight: 120,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
  },
  iconInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  skillInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  skillTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  removeSkillButton: {
    marginLeft: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: 16,
  },
});