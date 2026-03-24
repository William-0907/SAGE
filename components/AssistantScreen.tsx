import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { 
  SafeAreaProvider, 
  // Add KeyboardAvoidingView and Platform
} from 'react-native-safe-area-context';
import { 
  StyleSheet, 
  Text, 
  View,  
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TextInput, // Added TextInput
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// --- Types / Interfaces ---

interface FunctionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
}

interface SuggestionChipProps {
  text: string;
}

interface NavItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export default function AssistantScreen() {
  // State for the chat input
  const [inputText, setInputText] = useState('');
  const router = useRouter();

  // Function to handle sending messages (placeholder)
  const handleSend = () => {
    console.log("Sending message:", inputText);
    // Add logic here to append the message to a chat log
    setInputText(''); // Clear input after sending
    Keyboard.dismiss();
  };

  return (
    <SafeAreaProvider style={styles.container}>
      {/* 
         KeyboardAvoidingView ensures the input box moves up 
         when the keyboard appears on iOS/Android 
      */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexOne}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          
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

          {/* --- Purple AI Assistant Header --- */}
          <View style={styles.purpleHeader}>
            <Text style={styles.aiTitle}>AI Assistant</Text>
            <Text style={styles.aiSubtitle}>Always here to help you learn</Text>
          </View>

          {/* --- Function Grid Buttons --- */}
          <View style={styles.gridContainer}>
            <FunctionButton icon="book-outline" label="Study Plan" color="#FFD700" />
            <FunctionButton icon="flag-outline" label="Set Goals" color="#FF6B6B" />
            <FunctionButton icon="calendar-outline" label="Schedule" color="#4ECDC4" />
            <FunctionButton icon="bar-chart-outline" label="Progress" color="#1A535C" />
          </View>

          {/* --- Chat Interface --- */}
          <View style={styles.chatContainer}>
            <Text style={styles.timeStamp}>10:30 AM</Text>
            
            <View style={styles.messageRow}>
              <View style={styles.avatar}>
                <Ionicons name="sparkles" size={20} color="#fff" />
              </View>
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>
                  Hello! I am SAGE AI. I can help you create study plans, solve problems, or track your progress.
                </Text>
              </View>
            </View>

            {/* Suggested Questions */}
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionTitle}>Try asking:</Text>
              <SuggestionChip text="What should I study today?" />
              <SuggestionChip text="Help me with calculus" />
              <SuggestionChip text="Summarize this chapter" />
              <SuggestionChip text="Create a quiz" />
            </View>
          </View>

        </ScrollView>

        {/* --- Chat Input Box (NEW) --- */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachBtn}>
            <Ionicons name="add-circle" size={24} color="#6C5CE7" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#888"
            value={inputText}
            onChangeText={setInputText}
          />
          
          <TouchableOpacity 
            style={[styles.sendBtn, inputText.trim() ? styles.sendBtnActive : null]} 
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={inputText.trim() ? "#fff" : "#aaa"} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* --- Bottom Navigation Bar --- */}
      <View style={styles.bottomNav}>
        <NavItem icon="home-outline" label="Home" isActive={false} onPress={() => router.replace('/dashboard')} />
        <NavItem icon="layers-outline" label="Activities" isActive={false} onPress={() => router.replace('/activities')} />
        <NavItem icon="chatbox" label="AI Assistant" isActive={true} onPress={() => {}} />
        <NavItem icon="person-outline" label="Profile" isActive={false} onPress={() => router.replace('/profile')} />
      </View>
    </SafeAreaProvider>
  );
}

// --- Sub-components with Types ---

const FunctionButton: React.FC<FunctionButtonProps> = ({ icon, label, color }) => (
  <TouchableOpacity style={styles.gridButton}>
    <View style={[styles.iconBox, { backgroundColor: color }]}>
      <Ionicons name={icon} size={24} color="#fff" />
    </View>
    <Text style={styles.gridLabel}>{label}</Text>
  </TouchableOpacity>
);

const SuggestionChip: React.FC<SuggestionChipProps> = ({ text }) => (
  <TouchableOpacity style={styles.chip}>
    <Text style={styles.chipText}>{text}</Text>
  </TouchableOpacity>
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
  flexOne: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20, // Reduced padding since input is now sticky above nav
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

  // Purple Header
  purpleHeader: {
    backgroundColor: '#6C5CE7',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  aiTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  aiSubtitle: {
    fontSize: 14,
    color: '#E0D4FC',
  },

  // Grid Buttons
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  gridButton: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  gridLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },

  // Chat Area
  chatContainer: {
    paddingHorizontal: 20,
  },
  timeStamp: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginBottom: 15,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  messageBubble: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  
  // Suggestions
  suggestionsContainer: {
    marginTop: 10,
  },
  suggestionTitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
    marginLeft: 5,
  },
  chip: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginBottom: 10,
    marginRight: 10,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  chipText: {
    color: '#555',
    fontSize: 13,
  },

  // --- NEW: Chat Input Styles ---
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    // marginBottom pushes it above the absolute bottom nav
    marginBottom: 80,
  },
  attachBtn: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#F5F7FA',
    borderRadius: 22,
    paddingHorizontal: 18,
    fontSize: 15,
    color: '#333',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0E0E0', // Inactive color
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendBtnActive: {
    backgroundColor: '#6C5CE7', // Active purple color
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
