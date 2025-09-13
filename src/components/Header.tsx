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

interface HeaderProps {
  onMenuPress?: () => void;
  onInfoPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuPress, onInfoPress }) => {
  const { t } = useTranslation();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftButton} onPress={onMenuPress} />

        <Text style={styles.title}>{t('general.header.title')}</Text>

        <TouchableOpacity style={styles.rightButton} onPress={onInfoPress}>
          <InfoIcon />
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
    backgroundColor: '#f8f9fa',
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
  menuIcon: {
    width: 20,
    height: 16,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#000',
    borderRadius: 1,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  infoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6c757d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Header;
