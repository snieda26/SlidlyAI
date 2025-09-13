import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { InfoIcon } from '../assets/icons';
import { useTheme } from '../contexts/ThemeContext';
import { getColors } from '../constants/colors';

interface HeaderProps {
  onMenuPress?: () => void;
  onInfoPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuPress, onInfoPress }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const Colors = getColors(isDark);

  return (
    <>
      <StatusBar
        barStyle={isDark ? Colors.statusBar.light : Colors.statusBar.dark}
        backgroundColor={Colors.background.primary}
      />
      <View
        style={[
          styles.container,
          { backgroundColor: Colors.background.primary },
        ]}
      >
        <TouchableOpacity style={styles.leftButton} onPress={onMenuPress} />

        <Text style={[styles.title, { color: Colors.text.primary }]}>
          {t('general.header.title')}
        </Text>

        <TouchableOpacity style={styles.rightButton} onPress={onInfoPress}>
          <InfoIcon color={Colors.text.primary} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Header;
