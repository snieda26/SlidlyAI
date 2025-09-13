# Authentication Setup Guide

This app uses platform-specific authentication:

- **iOS**: iCloud login (mock implementation)
- **Android**: Google Sign-In

## Android Setup (Google Sign-In)

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sign-In API:

   - Go to "APIs & Services" → "Library"
   - Search for "Google Sign-In API"
   - Click "Enable"

4. Create OAuth 2.0 Client IDs:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Create credentials for:
     - **Web application** (for webClientId)
     - **Android application** (for androidClientId)
       - Package name: `com.slidlyai` (or your app's package name)
       - SHA-1 certificate fingerprint: Get this by running:
         ```bash
         keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
         ```

### 2. Update Configuration

Edit `src/config/googleSignIn.ts` and replace the placeholder values:

```typescript
export const GOOGLE_SIGNIN_CONFIG = {
  webClientId: 'YOUR_ACTUAL_WEB_CLIENT_ID.apps.googleusercontent.com',
  androidClientId: 'YOUR_ACTUAL_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  iosClientId: 'YOUR_ACTUAL_IOS_CLIENT_ID.apps.googleusercontent.com', // Optional
};
```

### 3. Android Manifest

The Android manifest has been updated with the necessary permissions. Make sure your package name matches the one used in Google Cloud Console.

## iOS Setup (iCloud)

The current implementation uses a mock iCloud authentication. For production, you should:

1. Implement Apple's "Sign in with Apple" or iCloud authentication
2. Update the `signInWithiCloud` method in `src/services/authService.ts`
3. Add necessary iOS capabilities in Xcode

## Testing

1. **Android**: Run the app and tap "Sign in with Google"
2. **iOS**: Run the app and tap "Sign in with iCloud" (currently shows mock authentication)

## Troubleshooting

### Android Issues

- Make sure your SHA-1 fingerprint matches the one in Google Cloud Console
- Verify the package name is correct
- Check that Google Sign-In API is enabled

### iOS Issues

- The current implementation is a mock - replace with actual iCloud/Apple Sign-In
- Make sure you have the necessary iOS capabilities enabled

## Dependencies

The following packages have been installed:

- `zustand` - State management
- `@react-native-async-storage/async-storage` - Persistent storage
- `@react-native-google-signin/google-signin` - Google Sign-In
- `react-native-keychain` - Secure storage (for future use)
