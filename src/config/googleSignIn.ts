// Google Sign-In Configuration
// You need to replace these with your actual Google OAuth credentials

export const GOOGLE_SIGNIN_CONFIG = {
  // Get this from Google Cloud Console -> APIs & Services -> Credentials
  // This is your Web application OAuth 2.0 client ID
  webClientId: 'YOUR_WEB_CLIENT_ID_HERE.apps.googleusercontent.com',

  // For Android - get this from Google Cloud Console -> APIs & Services -> Credentials
  // This should be your Android application OAuth 2.0 client ID
  androidClientId: 'YOUR_ANDROID_CLIENT_ID_HERE.apps.googleusercontent.com',

  // For iOS - get this from Google Cloud Console -> APIs & Services -> Credentials
  // This should be your iOS application OAuth 2.0 client ID
  iosClientId: 'YOUR_IOS_CLIENT_ID_HERE.apps.googleusercontent.com',
};

// Instructions to get your Google OAuth credentials:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Enable Google Sign-In API
// 4. Go to APIs & Services -> Credentials
// 5. Create OAuth 2.0 Client IDs for:
//    - Web application (for webClientId)
//    - Android application (for androidClientId)
//    - iOS application (for iosClientId, if needed)
// 6. Replace the placeholder values above with your actual client IDs
