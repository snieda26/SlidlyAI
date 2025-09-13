export const getColors = (isDark: boolean) => ({
  // Background colors
  background: {
    primary: isDark ? '#1a1a1a' : '#ffffff',
    secondary: isDark ? '#2d2d2d' : '#f8f9fa',
    tertiary: isDark ? '#404040' : '#e9ecef',
  },

  // Text colors
  text: {
    primary: isDark ? '#ffffff' : '#212529',
    secondary: isDark ? '#b3b3b3' : '#6c757d',
    tertiary: isDark ? '#808080' : '#adb5bd',
  },

  // Card colors
  card: {
    background: isDark ? '#2d2d2d' : '#ffffff',
    border: isDark ? '#404040' : '#e9ecef',
  },

  // Input colors
  input: {
    background: isDark ? '#404040' : '#ffffff',
    border: isDark ? '#555555' : '#ced4da',
    placeholder: isDark ? '#808080' : '#adb5bd',
  },

  // Tab colors
  tab: {
    background: isDark ? '#2d2d2d' : '#ffffff',
    active: isDark ? '#007AFF' : '#007AFF',
    inactive: isDark ? '#808080' : '#6c757d',
  },

  // Status bar colors
  statusBar: {
    light: 'light-content',
    dark: 'dark-content',
  },

  // Shadow colors
  shadow: {
    light: isDark ? '#000000' : '#000000',
    medium: isDark ? '#000000' : '#000000',
    dark: isDark ? '#000000' : '#000000',
  },

  // Gray scale
  gray: {
    100: isDark ? '#404040' : '#f8f9fa',
    200: isDark ? '#555555' : '#e9ecef',
    300: isDark ? '#6c6c6c' : '#dee2e6',
    400: isDark ? '#808080' : '#ced4da',
    500: isDark ? '#999999' : '#6c757d',
    600: isDark ? '#b3b3b3' : '#495057',
    700: isDark ? '#cccccc' : '#343a40',
    800: isDark ? '#e6e6e6' : '#212529',
    900: isDark ? '#ffffff' : '#000000',
  },

  // Brand colors
  primary: '#007AFF',
  secondary: '#6c757d',
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
  info: '#17a2b8',

  // Utility colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
});
