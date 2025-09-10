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
import TabNavigation from './src/components/TabNavigation';
import AIGenerationPage from './src/pages/AIGenerationPage';
import CustomPostPage from './src/pages/CustomPostPage';
import BottomSheet from './src/components/BottomSheet';
import CatIllustration from './src/components/CatIllustration';
import { initializeLocale } from './src/i18n';

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
  const [activeTab, setActiveTab] = useState<'ai' | 'custom'>('ai');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

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

  const handleTabChange = (tab: 'ai' | 'custom') => {
    setActiveTab(tab);
  };

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <Header onMenuPress={handleMenuPress} onInfoPress={handleInfoPress} />

      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === 'ai' ? <AIGenerationPage /> : <CustomPostPage />}

      <CatIllustration />

      <BottomSheet
        visible={isBottomSheetVisible}
        onClose={handleCloseBottomSheet}
        onTellMeMore={handleTellMeMore}
      />
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
