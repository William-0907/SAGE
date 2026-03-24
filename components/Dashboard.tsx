import React from 'react';
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

interface StatItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  iconColor: string;
}

interface RecommendationItemProps {
  text: string;
}

interface SessionCardProps {
  title: string;
  subject: string;
  progress: number;
  nextTopic: string;
  timeLeft: string;
  color: string;
}

interface NavItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

// New Types for added sections
interface GroupActivityProps {
  title: string;
  time: string;
  participants: number;
  icon: keyof typeof Ionicons.glyphMap;
}

interface BadgeProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* --- Purple Header Section --- */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>Alex Johnson</Text>
            </View>
            
            <TouchableOpacity style={styles.notificationBtn}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <StatItem icon="flame-outline" label="Day Streak" value="7" iconColor="#FF6B6B" />
            <StatItem icon="star-outline" label="Points" value="3840" iconColor="#FFD700" />
            <StatItem icon="ribbon-outline" label="Lv 12" value="" iconColor="#4ECDC4" />
          </View>
        </View>

        {/* --- AI Recommendations Section --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>AI Recommendations</Text>
          
          <View style={styles.recommendationList}>
            <RecommendationItem text="Complete your calculus practice for better exam prep" />
            <RecommendationItem text="Join the Physics study group - your peers are online now" />
            <RecommendationItem text="Review Chapter 5 before tomorrow's quiz" />
          </View>
        </View>

        {/* --- Current Sessions Section --- */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Current Sessions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <SessionCard 
            title="Advanced Mathematics"
            subject="Math"
            progress={65}
            nextTopic="Calculus Integration"
            timeLeft="2 hrs left"
            color="#6C5CE7"
          />
          
          <SessionCard 
            title="Physics Fundamentals"
            subject="Physics"
            progress={42}
            nextTopic="Newton's Laws"
            timeLeft="1 day left"
            color="#FF6B6B"
          />
        </View>

        {/* --- Group Activities Section (NEW) --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Group Activities</Text>
          
          <View style={styles.activityList}>
            <GroupActivity 
              title="Math Quiz: Integration" 
              time="Today, 3:00 PM" 
              participants={24} 
              icon="calculator-outline" 
            />
            <GroupActivity 
              title="Physics Group Study" 
              time="Tomorrow, 2:00 PM" 
              participants={8} 
              icon="rocket-outline" 
            />
            <GroupActivity 
              title="History Essay Review" 
              time="Jan 25, 4:00 PM" 
              participants={12} 
              icon="book-outline" 
            />
          </View>
        </View>

        {/* --- Recent Badges Section (NEW) --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Badges</Text>
          
          <View style={styles.badgeRow}>
            <Badge label="7-Day Streak" icon="flame-outline" color="#FF6B6B" />
            <Badge label="Quiz Master" icon="trophy-outline" color="#FFD700" />
            <Badge label="Team Player" icon="people-outline" color="#4ECDC4" />
            <Badge label="Speed Learner" icon="flash-outline" color="#6C5CE7" />
          </View>
        </View>

      </ScrollView>

      {/* --- Floating Action Buttons --- */}
      <View style={styles.floatingContainer}>
        <TouchableOpacity 
          style={styles.floatingBtn} 
          onPress={() => console.log('Take Quiz Pressed')}
        >
          <Text style={styles.floatingBtnText}>Take Quiz</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.floatingBtn} 
          onPress={() => console.log('Join Group Pressed')}
        >
          <Text style={styles.floatingBtnText}>Join Group</Text>
        </TouchableOpacity>
      </View>

      {/* --- Bottom Navigation Bar --- */}
      <View style={styles.bottomNav}>
        <NavItem icon="home" label="Home" isActive={true} onPress={() => {}} />
        <NavItem icon="layers-outline" label="Activities" isActive={false} onPress={() => router.replace('/activities')} /> 
        <NavItem icon="chatbox-outline" label="AI Assistant" isActive={false} onPress={() => router.replace('/assistant')} />
        <NavItem icon="person-outline" label="Profile" isActive={false} onPress={() => router.replace('/profile')} />
      </View>
    </SafeAreaProvider>
  );
}

// --- Sub-components ---

const StatItem: React.FC<StatItemProps> = ({ icon, label, value, iconColor }) => (
  <View style={styles.statItem}>
    <View style={[styles.statIconBox, { backgroundColor: '#fff' }]}>
      <Ionicons name={icon} size={18} color={iconColor} />
    </View>
    <View style={styles.statTextContainer}>
      <Text style={styles.statLabel}>{label}</Text>
      {value ? <Text style={styles.statValue}>{value}</Text> : null}
    </View>
  </View>
);

const RecommendationItem: React.FC<RecommendationItemProps> = ({ text }) => (
  <View style={styles.recommendationCard}>
    <View style={styles.checkCircle}>
      <Ionicons name="checkmark-circle-outline" size={20} color="#6C5CE7" />
    </View>
    <Text style={styles.recommendationText}>{text}</Text>
    <Ionicons name="chevron-forward" size={18} color="#CCC" />
  </View>
);

const SessionCard: React.FC<SessionCardProps> = ({ 
  title, subject, progress, nextTopic, timeLeft, color 
}) => (
  <View style={styles.sessionCard}>
    <View style={styles.sessionHeader}>
      <View style={[styles.sessionIconBox, { backgroundColor: color + '15' }]}>
        <Ionicons 
          name={subject === 'Math' ? 'calculator-outline' : subject === 'Physics' ? 'rocket-outline' : 'book-outline'} 
          size={22} 
          color={color} 
        />
      </View>
      <View style={styles.sessionInfo}>
        <Text style={styles.sessionTitle}>{title}</Text>
        <Text style={styles.sessionMeta}>Next: {nextTopic}</Text>
      </View>
      <Text style={styles.sessionTime}>{timeLeft}</Text>
    </View>

    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.progressPercent}>{progress}%</Text>
    </View>

    <TouchableOpacity style={styles.continueBtn}>
      <Text style={styles.continueBtnText}>Continue Learning</Text>
      <Ionicons name="arrow-forward" size={16} color="#6C5CE7" />
    </TouchableOpacity>
  </View>
);

// New Component: Group Activity Item
const GroupActivity: React.FC<GroupActivityProps> = ({ title, time, participants, icon }) => (
  <View style={styles.activityCard}>
    <View style={styles.activityIconBox}>
      <Ionicons name={icon} size={22} color="#6C5CE7" />
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
    <View style={styles.participantsBox}>
      <Ionicons name="people-outline" size={14} color="#888" />
      <Text style={styles.participantsText}>{participants} joined</Text>
    </View>
  </View>
);

// New Component: Badge Item
const Badge: React.FC<BadgeProps> = ({ label, icon, color }) => (
  <View style={styles.badgeItem}>
    <View style={[styles.badgeIconCircle, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <Text style={styles.badgeLabel}>{label}</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Increased padding to ensure scroll view clears bottom content
  },

  // Header Styles
  headerContainer: {
    backgroundColor: '#6C5CE7',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  welcomeText: {
    color: '#E0D4FC',
    fontSize: 16,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  notificationBtn: {
    position: 'relative',
    padding: 5,
  },
  notificationDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statTextContainer: {
    flexDirection: 'column',
  },
  statLabel: {
    color: '#E0D4FC',
    fontSize: 11,
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Section Styles
  sectionContainer: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  viewAllText: {
    fontSize: 14,
    color: '#6C5CE7',
    fontWeight: '600',
    marginBottom: 10,
  },

  // Recommendation Styles
  recommendationList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  checkCircle: {
    marginRight: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },

  // Session Card Styles
  sessionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  sessionMeta: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  sessionTime: {
    fontSize: 12,
    color: '#6C5CE7',
    fontWeight: '600',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  progressPercent: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    width: 35,
    textAlign: 'right',
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
  },
  continueBtnText: {
    color: '#6C5CE7',
    fontWeight: '600',
    marginRight: 5,
  },

  // --- Group Activity Styles ---
  activityList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activityTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  participantsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  participantsText: {
    fontSize: 11,
    color: '#555',
    marginLeft: 4,
  },

  // --- Badge Styles ---
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
  },
  badgeItem: {
    alignItems: 'center',
    width: (width - 70) / 4, // Divide row by 4 items
  },
  badgeIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeLabel: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
    fontWeight: '500',
  },

  // Floating Buttons
  floatingContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    alignItems: 'center',
    zIndex: 10,
  },
  floatingBtn: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  floatingBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Bottom Navigation
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
    zIndex: 5,
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