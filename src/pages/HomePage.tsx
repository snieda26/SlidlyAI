import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { AiGenerateIcon, EditIcon } from '../assets/icons';

interface HomePageProps {
  onNavigateToAI: () => void;
  onNavigateToCustom: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  onNavigateToAI,
  onNavigateToCustom,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={onNavigateToCustom}
          activeOpacity={0.8}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <View>
                <EditIcon width={54} height={54} color="#333333" />
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>
                {t('general.home.customPost')}
              </Text>
              <Text style={styles.cardDescription}>
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
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'center',
    flex: 1,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
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
  aiIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  pencilIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default HomePage;
