import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Avatar from '@/components/ui/Avatar';
import SkillTag from '@/components/ui/SkillTag';
import Button from '@/components/ui/Button';
import { mockUserProfile } from '@/data/mockUserProfile';
import { Star, MapPin, CheckCircle2, Settings, ExternalLink } from 'lucide-react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio', 'reviews'

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        <Settings size={24} color={colors.text} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.profileHeader, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Avatar
            uri={mockUserProfile.avatar}
            size="xl"
            initials={mockUserProfile.name.charAt(0)}
            verified={mockUserProfile.verified}
          />
          
          <Text style={[styles.profileName, { color: colors.text }]}>
            {mockUserProfile.name}
          </Text>
          
          <Text style={[styles.username, { color: colors.subText }]}>
            @{mockUserProfile.username}
          </Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={16} color={colors.subText} />
            <Text style={[styles.locationText, { color: colors.subText }]}>
              {mockUserProfile.location}
            </Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color={colors.accent} fill={colors.accent} />
            <Text style={[styles.ratingText, { color: colors.text }]}>
              {mockUserProfile.rating} ({mockUserProfile.reviews.length} reviews)
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {mockUserProfile.completedProjects}
              </Text>
              <Text style={[styles.statLabel, { color: colors.subText }]}>
                Projects
              </Text>
            </View>
          </View>
          
          <Button
            title="Edit Profile"
            onPress={() => console.log('Edit profile')}
            variant="outline"
            size="md"
            style={styles.editButton}
          />
        </View>

        <View style={styles.bioContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          <Text style={[styles.bioText, { color: colors.text }]}>
            {mockUserProfile.bio}
          </Text>
        </View>

        <View style={styles.skillsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Skills</Text>
          <View style={styles.skillTagsContainer}>
            {mockUserProfile.skills.map((skill) => (
              <SkillTag
                key={skill.id}
                name={skill.name}
                level={skill.level}
                isVerified={skill.isVerified}
              />
            ))}
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'portfolio' && styles.activeTab,
              activeTab === 'portfolio' && { borderBottomColor: colors.primary },
            ]}
            onPress={() => setActiveTab('portfolio')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'portfolio' ? colors.primary : colors.subText },
              ]}
            >
              Portfolio
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'reviews' && styles.activeTab,
              activeTab === 'reviews' && { borderBottomColor: colors.primary },
            ]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'reviews' ? colors.primary : colors.subText },
              ]}
            >
              Reviews
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'portfolio' && (
          <View style={styles.portfolioContainer}>
            {mockUserProfile.portfolio.map((item) => (
              <View
                key={item.id}
                style={[styles.portfolioItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.portfolioImage}
                />
                <View style={styles.portfolioContent}>
                  <Text style={[styles.portfolioTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.portfolioDescription, { color: colors.subText }]}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                  <View style={styles.portfolioSkills}>
                    {item.skills.slice(0, 2).map((skill, index) => (
                      <SkillTag key={index} name={skill} small />
                    ))}
                    {item.skills.length > 2 && (
                      <Text style={[styles.moreSkills, { color: colors.subText }]}>
                        +{item.skills.length - 2} more
                      </Text>
                    )}
                  </View>
                  {item.link && (
                    <TouchableOpacity style={styles.linkButton}>
                      <Text style={[styles.linkText, { color: colors.primary }]}>
                        View Project
                      </Text>
                      <ExternalLink size={14} color={colors.primary} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'reviews' && (
          <View style={styles.reviewsContainer}>
            {mockUserProfile.reviews.map((review) => (
              <View
                key={review.id}
                style={[styles.reviewItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerInfo}>
                    <Avatar
                      uri={review.userAvatar}
                      size="sm"
                      initials={review.userName.charAt(0)}
                    />
                    <Text style={[styles.reviewerName, { color: colors.text }]}>
                      {review.userName}
                    </Text>
                  </View>
                  <View style={styles.ratingDisplay}>
                    <Text style={[styles.ratingValue, { color: colors.text }]}>
                      {review.rating}
                    </Text>
                    <Star size={14} color={colors.accent} fill={colors.accent} />
                  </View>
                </View>
                <Text style={[styles.reviewText, { color: colors.text }]}>
                  {review.comment}
                </Text>
                <Text style={[styles.reviewDate, { color: colors.subText }]}>
                  {new Date(review.date).toLocaleDateString()}
                </Text>
              </View>
            ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginTop: 16,
  },
  username: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  editButton: {
    marginTop: 20,
    width: '100%',
  },
  bioContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  skillsContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  skillTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginTop: 32,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  portfolioContainer: {
    paddingHorizontal: 20,
  },
  portfolioItem: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  portfolioImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  portfolioContent: {
    padding: 16,
  },
  portfolioTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  portfolioDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  portfolioSkills: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  moreSkills: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  linkText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginRight: 4,
  },
  reviewsContainer: {
    paddingHorizontal: 20,
  },
  reviewItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerName: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    marginRight: 4,
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  reviewText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
    marginBottom: 12,
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});