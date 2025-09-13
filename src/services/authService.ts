import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useAuthStore } from '../store/authStore';
import { GOOGLE_SIGNIN_CONFIG } from '../config/googleSignIn';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: GOOGLE_SIGNIN_CONFIG.webClientId,
  iosClientId: GOOGLE_SIGNIN_CONFIG.iosClientId,
  offlineAccess: true,
  hostedDomain: '',
  forceCodeForRefreshToken: true,
});

export class AuthService {
  static async signInWithGoogle(): Promise<void> {
    try {
      useAuthStore.getState().setLoading(true);

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.user) {
        const user = {
          id: userInfo.user.id,
          email: userInfo.user.email,
          name: userInfo.user.name || '',
          platform: 'android' as const,
          profileImage: userInfo.user.photo || undefined,
        };

        useAuthStore.getState().login(user);
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    } finally {
      useAuthStore.getState().setLoading(false);
    }
  }

  static async signInWithApple(): Promise<void> {
    try {
      useAuthStore.getState().setLoading(true);

      // Check if Apple Sign-In is available
      const isAvailable = await appleAuth.isAvailable;
      console.log('Apple Sign-In available:', isAvailable);

      if (!isAvailable) {
        throw new Error(
          "Apple Sign-In is not available. This may be because:\n• You're using a simulator (Apple Sign-In works better on real devices)\n• iOS version is below 13.0\n• Apple Sign-In is disabled in device settings\n• App needs proper Apple Sign-In capability configuration",
        );
      }

      // Request Apple Sign-In
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const { user, email, fullName, identityToken } = appleAuthRequestResponse;

      if (identityToken) {
        const userData = {
          id: user,
          email: email || 'apple@privaterelay.appleid.com',
          name: fullName
            ? `${fullName.givenName || ''} ${fullName.familyName || ''}`.trim()
            : 'Apple User',
          platform: 'ios' as const,
          profileImage: undefined,
        };

        useAuthStore.getState().login(userData);
      } else {
        throw new Error('Apple Sign-In failed - no identity token received');
      }
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
      throw error;
    } finally {
      useAuthStore.getState().setLoading(false);
    }
  }

  static async signOut(): Promise<void> {
    try {
      if (Platform.OS === 'android') {
        await GoogleSignin.signOut();
      } else if (Platform.OS === 'ios') {
        // Apple Sign-In doesn't require explicit logout
        // The user can revoke access in Settings > Apple ID > Sign-In & Security
        console.log(
          'Apple Sign-In logout - user can revoke access in Settings',
        );
      }

      useAuthStore.getState().logout();
    } catch (error) {
      console.error('Sign-Out Error:', error);
      throw error;
    }
  }

  static async getCurrentUser() {
    try {
      if (Platform.OS === 'android') {
        const userInfo = await GoogleSignin.getCurrentUser();
        return userInfo?.user || null;
      }
      return null;
    } catch (error) {
      console.error('Get Current User Error:', error);
      return null;
    }
  }
}
