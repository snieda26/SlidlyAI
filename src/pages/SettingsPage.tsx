import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Switch,
} from 'react-native';
import { useAuthStore } from '../store/authStore';
import { AuthService } from '../services/authService';
import { useTheme } from '../contexts/ThemeContext';
import { getColors } from '../constants/colors';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { isDark, toggleTheme } = useTheme();
  const Colors = getColors(isDark);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await AuthService.signOut();
          } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Error', 'Failed to logout. Please try again.');
          }
        },
      },
    ]);
  };

  const getPlatformIcon = () => {
    if (user?.platform === 'ios') {
      return '🍎';
    } else if (user?.platform === 'android') {
      return '🤖';
    }
    return '📱';
  };

  const getAuthProvider = () => {
    if (user?.platform === 'ios') {
      return 'Apple Sign-In';
    } else if (user?.platform === 'android') {
      return 'Google Sign-In';
    }
    return 'Unknown';
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors.background.primary }]}
    >
      <View style={[styles.header, { borderBottomColor: Colors.card.border }]}>
        <Text style={[styles.title, { color: Colors.text.primary }]}>
          Settings
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors.text.primary }]}>
          Account Information
        </Text>

        <View
          style={[styles.userCard, { backgroundColor: Colors.card.background }]}
        >
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              {user?.profileImage ? (
                <Image
                  source={{ uri: user.profileImage }}
                  style={styles.avatar}
                />
              ) : (
                <View
                  style={[
                    styles.defaultAvatar,
                    { backgroundColor: Colors.primary },
                  ]}
                >
                  <Text style={styles.avatarText}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.userDetails}>
              <Text style={[styles.userName, { color: Colors.text.primary }]}>
                {user?.name || 'Unknown User'}
              </Text>
              <Text
                style={[styles.userEmail, { color: Colors.text.secondary }]}
              >
                {user?.email || 'No email'}
              </Text>
              <View style={styles.platformInfo}>
                <Text style={styles.platformIcon}>{getPlatformIcon()}</Text>
                <Text
                  style={[
                    styles.platformText,
                    { color: Colors.text.secondary },
                  ]}
                >
                  {getAuthProvider()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors.text.primary }]}>
          Appearance
        </Text>

        <View
          style={[
            styles.themeCard,
            { backgroundColor: Colors.card.background },
          ]}
        >
          <View style={styles.themeRow}>
            <View style={styles.themeInfo}>
              <Text style={[styles.themeLabel, { color: Colors.text.primary }]}>
                Dark Mode
              </Text>
              <Text
                style={[
                  styles.themeDescription,
                  { color: Colors.text.secondary },
                ]}
              >
                Switch between light and dark theme
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: Colors.gray[300], true: Colors.primary }}
              thumbColor={isDark ? Colors.white : Colors.gray[100]}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors.text.primary }]}>
          Account Actions
        </Text>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: Colors.error }]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors.text.primary }]}>
          App Information
        </Text>

        <View
          style={[styles.infoRow, { borderBottomColor: Colors.card.border }]}
        >
          <Text style={[styles.infoLabel, { color: Colors.text.primary }]}>
            Version
          </Text>
          <Text style={[styles.infoValue, { color: Colors.text.secondary }]}>
            1.0.0
          </Text>
        </View>

        <View
          style={[styles.infoRow, { borderBottomColor: Colors.card.border }]}
        >
          <Text style={[styles.infoLabel, { color: Colors.text.primary }]}>
            Platform
          </Text>
          <Text style={[styles.infoValue, { color: Colors.text.secondary }]}>
            {user?.platform?.toUpperCase() || 'Unknown'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  userCard: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  defaultAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 8,
  },
  platformInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  platformText: {
    fontSize: 14,
    fontWeight: '500',
  },
  themeCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeInfo: {
    flex: 1,
    marginRight: 16,
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  themeDescription: {
    fontSize: 14,
  },
  logoutButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SettingsPage;
