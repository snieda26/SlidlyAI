import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Animated,
} from 'react-native';
import {
  PanGestureHandler,
  State,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { useTranslation } from '../hooks/useTranslation';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onTellMeMore: () => void;
}

const { height: screenHeight } = Dimensions.get('window');

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  onTellMeMore,
}) => {
  const { t } = useTranslation();
  const translateY = useRef(new Animated.Value(0)).current;
  const lastGestureY = useRef(0);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    {
      useNativeDriver: true,
      listener: (event: PanGestureHandlerGestureEvent) => {
        const { translationY } = event.nativeEvent;
        // Constrain upward movement - don't allow dragging more than 50px up
        if (translationY < -50) {
          translateY.setValue(-50);
        }
      },
    },
  );

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.BEGAN) {
      lastGestureY.current = 0;
    }

    if (event.nativeEvent.state === State.ACTIVE) {
      const { translationY } = event.nativeEvent;
      lastGestureY.current = translationY;
    }

    if (event.nativeEvent.state === State.END) {
      const { translationY, velocityY } = event.nativeEvent;

      // If swiped down more than 100px or with high velocity, close the sheet
      if (translationY > 100 || velocityY > 500) {
        Animated.timing(translateY, {
          toValue: screenHeight,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          translateY.setValue(0);
          onClose();
        });
      } else {
        // Snap back to original position
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      translateY.setValue(0);
      onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.sheet,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            <View style={styles.handle} />

            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <View style={styles.lightbulbIcon}>
                  <Text style={styles.lightbulbText}>💡</Text>
                </View>
              </View>

              <Text style={styles.title}>{t('general.bottomSheet.title')}</Text>

              <Text style={styles.description}>
                {t('general.bottomSheet.description')}
              </Text>

              <TouchableOpacity style={styles.ctaButton} onPress={onTellMeMore}>
                <Text style={styles.ctaButtonText}>
                  {t('general.bottomSheet.ctaButton')}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  lightbulbIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightbulbText: {
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
    fontFamily: 'serif',
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 22,
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BottomSheet;
