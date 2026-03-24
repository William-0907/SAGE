import React from 'react';
import { useRouter } from 'expo-router';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// --- Types ---

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string | number;
}

interface BadgeProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  earned: boolean;
}

interface AchievementItemProps {
  title: string;
  date: string;
  points: string;
}

interface MenuOptionProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  notificationCount?: number;
  color?: string;
  onPress?: () => void;
}

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- Top Header Row --- */}
        <View style={styles.topHeader}>
          <View style={styles.statusContainer}>
            <View style={styles.onlineDot} />
            <Text style={styles.statusText}>Online</Text>
          </View>
          <TouchableOpacity style={styles.changeModeBtn}>
            <Text style={styles.changeModeText}>Change Mode</Text>
          </TouchableOpacity>
        </View>

        {/* --- Profile Card (Purple) --- */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            {/* Using an icon for placeholder avatar, or replace <Image /> with user photo */}
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#fff" />
            </View>
          </View>
          <Text style={styles.profileName}>Alex Johnson</Text>
          <Text style={styles.profileEmail}>alex.johnson@student.edu</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>Student</Text>
          </View>
          
          <View style={styles.levelContainer}>
            <View style={styles.levelHeader}>
              <Text style={styles.levelLabel}>Level 12</Text>
              <Text style={styles.xpText}>840 / 1000 XP</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '84%' }]} />
            </View>
            <Text style={styles.xpNeeded}>160 XP to next level</Text>
          </View>
        </View>

        {/* --- Overview Cards --- */}
        <View style={styles.overviewContainer}>
          <StatCard icon="flame" label="Day Streak" value="7" />
          <StatCard icon="star" label="Total Points" value="3840" />
          <StatCard icon="medal" label="Level" value="Lv 12" />
        </View>

        {/* --- Statistics Grid --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <StatBox icon="book" label="Courses Completed" value="12" />
            <StatBox icon="time" label="Study Hours" value="84" />
            <StatBox icon="document-text" label="Quizzes Taken" value="45" />
            <StatBox icon="people" label="Group Activities" value="23" />
          </View>
        </View>

        {/* --- Badges Section --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgesGrid}>
            <BadgeItem icon="flame" title="7-Day Streak" earned={true} />
            <BadgeItem icon="trophy" title="Quiz Master" earned={true} />
            <BadgeItem icon="people" title="Team Player" earned={true} />
            <BadgeItem icon="checkmark-circle" title="Perfect Score" earned={true} />
            <BadgeItem icon="lock-closed" title="Speed Demon" earned={false} />
            <BadgeItem icon="lock-closed" title="Scholar" earned={false} />
          </View>
        </View>

        {/* --- Recent Achievements --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          
          <AchievementItem 
            title="Completed Advanced Math" 
            date="Yesterday" 
            points="+500" 
          />
          <AchievementItem 
            title="Quiz Master Badge" 
            date="2 days ago" 
            points="+300" 
          />
          <AchievementItem 
            title="Week Streak Milestone" 
            date="3 days ago" 
            points="+200" 
          />
        </View>

        {/* --- Menu Options --- */}
        <View style={styles.menuContainer}>
          <MenuOption icon="notifications" label="Notifications" notificationCount={3} />
          <MenuOption icon="settings" label="Settings" />
          <MenuOption icon="help-circle" label="Help & Support" />
          <MenuOption icon="log-out" label="Log Out" color="#FF4757" />
        </View>
        
        <Text style={styles.memberSince}>Member since September 2025</Text>

      </ScrollView>

      {/* --- Bottom Navigation Bar --- */}
      <View style={styles.bottomNav}>
        <NavItem icon="home-outline" label="Home" isActive={false} onPress={() => router.replace('/dashboard')} />
        <NavItem icon="people-outline" label="Activities" isActive={false} onPress={() => router.replace('/activities')} />
        <NavItem icon="chatbox-outline" label="AI Assistant" isActive={false} onPress={() => router.replace('/assistant')} />
        <NavItem icon="person" label="Profile" isActive={true} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

// --- Sub-components ---

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <View style={styles.statCard}>
    <Ionicons name={icon} size={24} color="#6C5CE7" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const StatBox: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <View style={styles.statBox}>
    <Ionicons name={icon} size={28} color="#555" />
    <Text style={styles.statBoxValue}>{value}</Text>
    <Text style={styles.statBoxLabel}>{label}</Text>
  </View>
);

const BadgeItem: React.FC<BadgeProps> = ({ icon, title, earned }) => (
  <View style={[styles.badgeCard, !earned && styles.badgeLocked]}>
    <Ionicons 
      name={icon} 
      size={32} 
      color={earned ? '#FFD700' : '#CCC'} 
    />
    <Text style={[styles.badgeTitle, !earned && styles.textLocked]}>{title}</Text>
    {earned ? <Text style={styles.badgeStatus}>Earned</Text> : <Ionicons name="lock-closed" size={16} color="#CCC" />}
  </View>
);

const AchievementItem: React.FC<AchievementItemProps> = ({ title, date, points }) => (
  <View style={styles.achievementRow}>
    <View style={styles.achievementIcon}>
      <Ionicons name="trophy" size={20} color="#FFD700" />
    </View>
    <View style={styles.achievementContent}>
      <Text style={styles.achievementTitle}>{title}</Text>
      <Text style={styles.achievementDate}>{date}</Text>
    </View>
    <Text style={styles.achievementPoints}>{points}</Text>
  </View>
);

const MenuOption: React.FC<MenuOptionProps> = ({ icon, label, notificationCount, color }) => (
  <TouchableOpacity style={styles.menuRow}>
    <Ionicons name={icon} size={24} color={color || '#555'} />
    <Text style={[styles.menuLabel, { color: color || '#333' }]}>{label}</Text>
    <View style={styles.menuRight}>
      {notificationCount !== undefined && (
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>{notificationCount}</Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </View>
  </TouchableOpacity>
);

const NavItem = ({ icon, label, isActive, onPress }: { icon: any, label: string, isActive: boolean, onPress: () => void }) => (
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
  scrollContent: {
    paddingBottom: 100,
  },
  
  // Top Header
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2ECC71',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#2ECC71',
    fontWeight: '600',
  },
  changeModeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  changeModeText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },

  // Profile Card
  profileCard: {
    backgroundColor: '#6C5CE7',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#E0D4FC',
    marginBottom: 15,
  },
  roleBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 20,
  },
  roleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  levelContainer: {
    width: '100%',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  levelLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  xpText: {
    color: '#E0D4FC',
    fontSize: 14,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  xpNeeded: {
    textAlign: 'right',
    color: '#E0D4FC',
    fontSize: 12,
    marginTop: 5,
  },

  // Overview Cards
  overviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },

  // Section Styles
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },

  // Statistics Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statBoxValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  statBoxLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },

  // Badges Grid
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: (width - 60) / 3,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  badgeLocked: {
    opacity: 0.6,
    backgroundColor: '#F9F9F9',
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  textLocked: {
    color: '#AAA',
  },
  badgeStatus: {
    fontSize: 10,
    color: '#2ECC71',
    marginTop: 4,
    fontWeight: 'bold',
  },

  // Achievements
  achievementRow: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  achievementIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF9DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  achievementDate: {
    fontSize: 12,
    color: '#999',
  },
  achievementPoints: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2ECC71',
  },

  // Menu
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    marginLeft: 15,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBadge: {
    backgroundColor: '#FF4757',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 10,
  },
  notificationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  memberSince: {
    textAlign: 'center',
    color: '#AAA',
    fontSize: 12,
    marginBottom: 20,
  },

  // Bottom Nav
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