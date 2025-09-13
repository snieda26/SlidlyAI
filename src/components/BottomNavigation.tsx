import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  SlidesIcon,
  TemplateIcon,
  SettingIcon,
  CreateIcon,
} from '../assets/icons';
import { useTheme } from '../contexts/ThemeContext';
import { getColors } from '../constants/colors';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();
  const Colors = getColors(isDark);

  const tabs = [
    { id: 'my-slides', label: 'My slides', icon: SlidesIcon },
    { id: 'create', label: 'Create', icon: CreateIcon },
    { id: 'template', label: 'Template', icon: TemplateIcon },
    { id: 'settings', label: 'Settings', icon: SettingIcon },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: Colors.tab.background,
        },
      ]}
    >
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
            color={
              activeTab === tab.id ? Colors.tab.active : Colors.tab.inactive
            }
          />
          <Text
            style={[
              styles.label,
              {
                color:
                  activeTab === tab.id
                    ? Colors.tab.active
                    : Colors.tab.inactive,
              },
              activeTab === tab.id && styles.activeLabel,
            ]}
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
    textAlign: 'center',
    fontWeight: '500',
  },
  activeLabel: {
    fontWeight: '600',
  },
});

export default BottomNavigation;
