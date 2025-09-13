import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { EditIcon } from '../assets/icons';
import { useAuthStore } from '../store/authStore';
import { useTheme } from '../contexts/ThemeContext';
import { getColors } from '../constants/colors';

interface HomePageProps {
  onNavigateToCustom: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToCustom }) => {
  const { isAuthenticated } = useAuthStore();
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const Colors = getColors(isDark);
  console.log('isAuthenticated', isAuthenticated);

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.background.primary }]}
    >
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: Colors.card.background }]}
          onPress={onNavigateToCustom}
          activeOpacity={0.8}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <View>
                <EditIcon width={54} height={54} color={Colors.text.primary} />
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.cardTitle, { color: Colors.text.primary }]}>
                {t('general.home.customPost')}
              </Text>
              <Text
                style={[
                  styles.cardDescription,
                  { color: Colors.text.secondary },
                ]}
              >
                {t('general.home.customDescription')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'center',
    flex: 1,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default HomePage;
