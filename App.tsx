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
  const [currentPage, setCurrentPage] = useState<'home' | 'ai' | 'custom'>(
    'home',
  );
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('my-slides');

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

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    // TODO: Implement navigation logic for each tab
    console.log('Tab pressed:', tab);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'ai':
        return <AIGenerationPage onBack={handleBackToHome} />;
      case 'custom':
        return <CustomPostPage onBack={handleBackToHome} />;
      default:
        return (
          <HomePage
            onNavigateToAI={handleNavigateToAI}
            onNavigateToCustom={handleNavigateToCustom}
          />
        );
    }
  };

  alert(JSON.stringify(user));

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
