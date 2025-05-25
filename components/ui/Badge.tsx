import { StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'neutral';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  small?: boolean;
}

export default function Badge({ text, variant = 'primary', small = false }: BadgeProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primaryLight;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      case 'neutral':
        return colors.tabIconDefault;
      default:
        return colors.primaryLight;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'success':
      case 'warning':
      case 'error':
        return 'white';
      case 'neutral':
        return colors.text;
      default:
        return colors.primary;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          paddingVertical: small ? 2 : 4,
          paddingHorizontal: small ? 6 : 8,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: getTextColor(),
            fontSize: small ? 10 : 12,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
});