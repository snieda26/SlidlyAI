import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  SlidesIcon,
  TemplateIcon,
  SettingIcon,
  EditIcon,
} from '../assets/icons';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  const insets = useSafeAreaInsets();

  const tabs = [
    { id: 'my-slides', label: 'My slides', icon: SlidesIcon },
    { id: 'template', label: 'Template', icon: TemplateIcon },
    { id: 'new-slide', label: 'New slide', icon: EditIcon },
    { id: 'settings', label: 'Settings', icon: SettingIcon },
  ];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => onTabPress(tab.id)}
          activeOpacity={0.7}
        >
          <tab.icon
            width={20}
            height={20}
            color={activeTab === tab.id ? '#000000' : '#666666'}
          />
          <Text
            style={[styles.label, activeTab === tab.id && styles.activeLabel]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingTop: 8,
    paddingHorizontal: 16,
    borderRadius: 19,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeTab: {
    // Add active state styling if needed
  },
  label: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#000000',
    fontWeight: '600',
  },
});

export default BottomNavigation;
