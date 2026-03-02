import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

export default function ProfileScreen() {
  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@student.edu',
    role: 'Student',
    level: 12,
    currentXP: 840,
    nextLevelXP: 1000,
    points: 3840,
    streak: 7,
    joinDate: 'September 2025',
  };

  const stats = [
    { label: 'Courses', value: 12, icon: 'school-outline' },
    { label: 'Hours', value: 84, icon: 'time-outline' },
    { label: 'Quizzes', value: 45, icon: 'clipboard-outline' },
    { label: 'Groups', value: 23, icon: 'people-outline' },
  ];

  const badges = [
    { id: 1, name: '7-Day Streak', icon: '🔥', earned: true },
    { id: 2, name: 'Quiz Master', icon: '🏆', earned: true },
    { id: 3, name: 'Team Player', icon: '🤝', earned: true },
    { id: 4, name: 'Speed Learner', icon: '⚡', earned: false },
    { id: 5, name: 'Perfect Score', icon: '💯', earned: true },
    { id: 6, name: 'Early Bird', icon: '🌅', earned: false },
  ];

  const achievements = [
    { title: 'Advanced Math Completed', date: 'Yesterday', points: 500 },
    { title: 'Quiz Master Badge', date: '2 days ago', points: 300 },
    { title: '7-Day Streak', date: '3 days ago', points: 200 },
  ];

  return (
    <LinearGradient
      colors={['#7C3AED', '#8B5CF6', '#4F46E5']}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={42} color="white" />
            </View>

            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.email}>{userData.email}</Text>

            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{userData.role}</Text>
            </View>
          </View>

          {/* Level Card */}
          <View style={styles.card}>
            <View style={styles.levelRow}>
              <View style={styles.levelLeft}>
                <Ionicons name="star" size={18} color="#FACC15" />
                <Text style={styles.levelText}>
                  Level {userData.level}
                </Text>
              </View>

              <Text style={styles.xpText}>
                {userData.currentXP} / {userData.nextLevelXP} XP
              </Text>
            </View>

            <Progress.Bar
              progress={userData.currentXP / userData.nextLevelXP}
              width={null}
              height={8}
              borderRadius={8}
              color="#7C3AED"
              unfilledColor="#E5E7EB"
              borderWidth={0}
              style={{ marginVertical: 8 }}
            />

            <Text style={styles.xpLeft}>
              {userData.nextLevelXP - userData.currentXP} XP to next level
            </Text>
          </View>

          {/* Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>

            <View style={styles.overviewGrid}>
              <View style={styles.overviewCard}>
                <Ionicons name="flame" size={28} color="#F97316" />
                <Text style={styles.overviewValue}>
                  {userData.streak}
                </Text>
                <Text style={styles.overviewLabel}>
                  Day Streak
                </Text>
              </View>

              <View style={styles.overviewCard}>
                <Ionicons name="trophy" size={28} color="#EAB308" />
                <Text style={styles.overviewValue}>
                  {userData.points}
                </Text>
                <Text style={styles.overviewLabel}>
                  Points
                </Text>
              </View>

              <View style={styles.overviewCard}>
                <Ionicons name="trending-up" size={28} color="#22C55E" />
                <Text style={styles.overviewValue}>
                  Lv {userData.level}
                </Text>
                <Text style={styles.overviewLabel}>
                  Level
                </Text>
              </View>
            </View>
          </View>

          {/* Statistics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Statistics</Text>

            <View style={styles.card}>
              {stats.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.statRow,
                    index !== stats.length - 1 && styles.divider,
                  ]}
                >
                  <View style={styles.statLeft}>
                    <View style={styles.statIcon}>
                      <Ionicons
                        name={item.icon as any}
                        size={18}
                        color="#7C3AED"
                      />
                    </View>

                    <Text style={styles.statLabel}>
                      {item.label}
                    </Text>
                  </View>

                  <Text style={styles.statValue}>
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Badges */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Badges</Text>

            <View style={styles.badgeGrid}>
              {badges.map((badge) => (
                <View
                  key={badge.id}
                  style={[
                    styles.badgeCard,
                    !badge.earned && styles.badgeLocked,
                  ]}
                >
                  <Text style={styles.badgeIcon}>
                    {badge.icon}
                  </Text>

                  <Text style={styles.badgeName}>
                    {badge.name}
                  </Text>

                  {badge.earned && (
                    <View style={styles.earnedBadge}>
                      <Ionicons
                        name="checkmark-circle"
                        size={14}
                        color="#16A34A"
                      />
                      <Text style={styles.earnedText}>
                        Earned
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Achievements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Recent Achievements
            </Text>

            <View style={styles.card}>
              {achievements.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.achievementRow,
                    index !== achievements.length - 1 &&
                      styles.divider,
                  ]}
                >
                  <View>
                    <Text style={styles.achievementTitle}>
                      {item.title}
                    </Text>

                    <Text style={styles.achievementDate}>
                      {item.date}
                    </Text>
                  </View>

                  <View style={styles.pointsBadge}>
                    <Text style={styles.pointsText}>
                      +{item.points}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            Member since {userData.joinDate}
          </Text>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
  },

  /* Header */

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  name: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },

  email: {
    color: '#E9D5FF',
    fontSize: 13,
    marginTop: 2,
  },

  roleBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },

  roleText: {
    color: 'white',
    fontSize: 12,
  },

  /* Cards */

  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  /* Level */

  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  levelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  levelText: {
    fontWeight: '600',
  },

  xpText: {
    fontSize: 12,
    color: '#6B7280',
  },

  xpLeft: {
    fontSize: 12,
    color: '#6B7280',
  },

  /* Sections */

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#111827',
  },

  /* Overview */

  overviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  overviewCard: {
    backgroundColor: 'white',
    width: '31%',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },

  overviewValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
  },

  overviewLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },

  /* Stats */

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },

  statLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  statIcon: {
    backgroundColor: '#EDE9FE',
    padding: 6,
    borderRadius: 20,
  },

  statLabel: {
    color: '#374151',
  },

  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  /* Badges */

  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  badgeCard: {
    width: '31%',
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },

  badgeLocked: {
    backgroundColor: '#F3F4F6',
    opacity: 0.6,
  },

  badgeIcon: {
    fontSize: 28,
    marginBottom: 6,
  },

  badgeName: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 4,
  },

  earnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  earnedText: {
    fontSize: 10,
    color: '#16A34A',
  },

  /* Achievements */

  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },

  achievementTitle: {
    fontSize: 13,
    fontWeight: '500',
  },

  achievementDate: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },

  pointsBadge: {
    backgroundColor: '#FACC15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  pointsText: {
    fontSize: 11,
    fontWeight: '600',
  },

  /* Footer */

  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 30,
  },
});