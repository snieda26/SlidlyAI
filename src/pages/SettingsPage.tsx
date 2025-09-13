import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useAuthStore } from '../store/authStore';
import { AuthService } from '../services/authService';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuthStore();

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>

        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              {user?.profileImage ? (
                <Image
                  source={{ uri: user.profileImage }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.defaultAvatar}>
                  <Text style={styles.avatarText}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.userDetails}>
              <Text style={styles.userName}>
                {user?.name || 'Unknown User'}
              </Text>
              <Text style={styles.userEmail}>{user?.email || 'No email'}</Text>
              <View style={styles.platformInfo}>
                <Text style={styles.platformIcon}>{getPlatformIcon()}</Text>
                <Text style={styles.platformText}>{getAuthProvider()}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Actions</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Platform</Text>
          <Text style={styles.infoValue}>
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 15,
  },
  userCard: {
    backgroundColor: '#ffffff',
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
    backgroundColor: '#007AFF',
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
    color: '#343a40',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6c757d',
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
    color: '#6c757d',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
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
    borderBottomColor: '#e9ecef',
  },
  infoLabel: {
    fontSize: 16,
    color: '#495057',
  },
  infoValue: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
});

export default SettingsPage;
