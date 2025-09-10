import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CatIllustration: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.catEmoji}>🐱</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 200, // Position above the bottom sheet
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  catEmoji: {
    fontSize: 80,
    opacity: 0.8,
  },
});

export default CatIllustration;
