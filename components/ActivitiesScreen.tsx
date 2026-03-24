import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// --- Types ---

interface CourseCardProps {
  subject: string;
  title: string;
  duration: string;
  points: string;
  progress: number;
  buttonText: string;
  icon: keyof typeof Ionicons.glyphMap; // Strict typing for Ionicons
  color: string;
}

interface NavItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

interface TabItemProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export default function ActivitiesScreen() {
  const [activeTab, setActiveTab] = useState('Lessons');
  const router = useRouter();

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.mainContent}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Activities</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TabItem label="Lessons" isActive={activeTab === 'Lessons'} onPress={() => setActiveTab('Lessons')} />
          <TabItem label="Quizzes" isActive={activeTab === 'Quizzes'} onPress={() => setActiveTab('Quizzes')} />
          <TabItem label="Groups" isActive={activeTab === 'Groups'} onPress={() => setActiveTab('Groups')} />
        </View>

        {/* Course List */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Mathematics Card - Icon Fixed to 'calculator-outline' */}
          <CourseCard
            subject="Mathematics"
            title="Introduction to Calculus"
            duration="45 min"
            points="250 pts"
            progress={100}
            buttonText="Review Lesson"
            icon="calculator-outline" 
            color="#6C5CE7"
          />

          {/* Physics Card */}
          <CourseCard
            subject="Physics"
            title="Newton's Laws of Motion"
            duration="30 min"
            points="200 pts"
            progress={60}
            buttonText="Continue Learning"
            icon="rocket-outline"
            color="#FF6B6B"
          />

          {/* History Card */}
          <CourseCard
            subject="History"
            title="World War II Timeline"
            duration="50 min"
            points="300 pts"
            progress={0}
            buttonText="Start Lesson"
            icon="book-outline"
            color="#4ECDC4"
          />
          
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavItem icon="home-outline" label="Home" isActive={false} onPress={() => router.replace('/dashboard')} />
        <NavItem icon="layers-outline" label="Activities" isActive={true} onPress={() => {}} />
        <NavItem icon="chatbox-outline" label="AI Assistant" isActive={false} onPress={() => router.replace('/assistant')} />
        <NavItem icon="person-outline" label="Profile" isActive={false} onPress={() => router.replace('/profile')} />
      </View>
    </SafeAreaProvider>
  );
}

// --- Components ---

const TabItem: React.FC<TabItemProps> = ({ label, isActive, onPress }) => (
  <TouchableOpacity 
    style={[styles.tabItem, isActive && styles.activeTabItem]} 
    onPress={onPress}
  >
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
      {label}
    </Text>
    {isActive && <View style={styles.activeTabUnderline} />}
  </TouchableOpacity>
);

const CourseCard: React.FC<CourseCardProps> = ({
  subject,
  title,
  duration,
  points,
  progress,
  buttonText,
  icon,
  color,
}) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={[styles.cardIconBox, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.subjectText}>{subject}</Text>
        <Text style={styles.titleText}>{title}</Text>
        
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#888" />
            <Text style={styles.metaText}>{duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="star-outline" size={14} color="#888" />
            <Text style={styles.metaText}>{points}</Text>
          </View>
        </View>
      </View>
    </View>

    <View style={styles.progressSection}>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.progressText}>{progress}%</Text>
    </View>

    <TouchableOpacity 
      style={[
        styles.cardButton, 
        progress === 100 ? styles.cardButtonReview : styles.cardButtonStart
      ]}
    >
      <Text 
        style={[
          styles.cardButtonText, 
          progress === 100 ? styles.cardButtonTextReview : styles.cardButtonTextStart
        ]}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  </View>
);

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Ionicons
      name={icon}
      size={24}
      color={isActive ? '#6C5CE7' : '#B0B0B0'}
    />
    <Text style={[styles.navLabel, { color: isActive ? '#6C5CE7' : '#B0B0B0' }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  mainContent: {
    flex: 1,
    marginTop: 20,
  },
  
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },

  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabItem: {
    marginRight: 25,
    paddingVertical: 10,
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  activeTabItem: {},
  activeTabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#6C5CE7',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  subjectText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  metaText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },

  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginRight: 10,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    width: 35,
    textAlign: 'right',
  },

  cardButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardButtonStart: {
    backgroundColor: '#6C5CE7',
  },
  cardButtonReview: {
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#6C5CE7',
  },
  cardButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardButtonTextStart: {
    color: '#FFF',
  },
  cardButtonTextReview: {
    color: '#6C5CE7',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: 25,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
});