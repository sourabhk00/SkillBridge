// Color system with primary, accent, success, warning, error, and neutral colors
const tintColorLight = '#3B82F6'; // Primary blue
const tintColorDark = '#60A5FA';

export default {
  light: {
    text: '#1F2937',
    subText: '#4B5563',
    background: '#FFFFFF',
    tint: tintColorLight,
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    border: '#E5E7EB',
    notification: '#F97316', // Accent orange
    success: '#10B981', // Success green
    warning: '#F59E0B', // Warning amber
    error: '#EF4444', // Error red
    primaryLight: '#DBEAFE',
    primary: '#3B82F6',
    primaryDark: '#2563EB',
    accent: '#F97316',
    accentLight: '#FFEDD5',
  },
  dark: {
    text: '#F9FAFB',
    subText: '#D1D5DB',
    background: '#111827',
    tint: tintColorDark,
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorDark,
    card: '#1F2937',
    border: '#374151',
    notification: '#F97316',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    primaryLight: '#2563EB',
    primary: '#60A5FA',
    primaryDark: '#93C5FD',
    accent: '#F97316',
    accentLight: '#FDBA74',
  },
};