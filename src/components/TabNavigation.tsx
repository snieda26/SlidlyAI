import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';

interface TabNavigationProps {
  activeTab: 'ai' | 'custom';
  onTabChange: (tab: 'ai' | 'custom') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'ai' && styles.activeTab]}
        onPress={() => onTabChange('ai')}
      >
        <Text
          style={[styles.tabText, activeTab === 'ai' && styles.activeTabText]}
        >
          {t('general.tabs.generateAI')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'custom' && styles.activeTab]}
        onPress={() => onTabChange('custom')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'custom' && styles.activeTabText,
          ]}
        >
          {t('general.tabs.createCustom')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6c757d',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
});

export default TabNavigation;
