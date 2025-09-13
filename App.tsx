/**
 * SlidlyAI - Social Media Content Creation App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Header from './src/components/Header';
import HomePage from './src/pages/HomePage';
import AIGenerationPage from './src/pages/AIGenerationPage';
import CustomPostPage from './src/pages/CustomPostPage';
import LoginPage from './src/pages/LoginPage';
import SettingsPage from './src/pages/SettingsPage';
import BottomSheet from './src/components/BottomSheet';
import BottomNavigation from './src/components/BottomNavigation';
import { initializeLocale } from './src/i18n';
import { useAuthStore } from './src/store/authStore';

function App() {
  // Initialize locale when app starts
  React.useEffect(() => {
    initializeLocale();
  }, []);

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const { isAuthenticated, user } = useAuthStore();
  const [currentPage, setCurrentPage] = useState<
    'home' | 'ai' | 'custom' | 'settings'
  >('home');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('my-slides');

  // Sync activeTab with currentPage
  React.useEffect(() => {
    switch (currentPage) {
      case 'home':
        setActiveTab('my-slides');
        break;
      case 'custom':
        setActiveTab('new-slide');
        break;
      case 'settings':
        setActiveTab('settings');
        break;
      default:
        // Keep current activeTab for other pages
        break;
    }
  }, [currentPage]);

  const handleMenuPress = () => {
    // TODO: Implement menu functionality
    console.log('Menu pressed');
  };

  const handleInfoPress = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const handleTellMeMore = () => {
    // TODO: Implement "Tell me more" functionality
    console.log('Tell me more pressed');
    setIsBottomSheetVisible(false);
  };

  const handleNavigateToAI = () => {
    setCurrentPage('ai');
  };

  const handleNavigateToCustom = () => {
    setCurrentPage('custom');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleNavigateToSettings = () => {
    setCurrentPage('settings');
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);

    switch (tab) {
      case 'my-slides':
        setCurrentPage('home');
        break;
      case 'template':
        // TODO: Implement template page
        console.log('Template tab pressed');
        break;
      case 'new-slide':
        setCurrentPage('custom');
        break;
      case 'settings':
        setCurrentPage('settings');
        break;
      default:
        console.log('Unknown tab pressed:', tab);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'ai':
        return <AIGenerationPage onBack={handleBackToHome} />;
      case 'custom':
        return <CustomPostPage onBack={handleBackToHome} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <HomePage
            onNavigateToAI={handleNavigateToAI}
            onNavigateToCustom={handleNavigateToCustom}
          />
        );
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <Header onMenuPress={handleMenuPress} onInfoPress={handleInfoPress} />

      {renderCurrentPage()}

      <BottomSheet
        visible={isBottomSheetVisible}
        onClose={handleCloseBottomSheet}
        onTellMeMore={handleTellMeMore}
      />

      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  gestureRoot: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});

export default App;
