import { StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { CheckCircle2 } from 'lucide-react-native';

type SkillTagProps = {
  name: string;
  level?: 'beginner' | 'intermediate' | 'expert';
  isVerified?: boolean;
  small?: boolean;
};

export default function SkillTag({ name, level = 'beginner', isVerified = false, small = false }: SkillTagProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const getLevelColor = () => {
    switch (level) {
      case 'beginner':
        return { bg: colors.primaryLight, text: colors.primary };
      case 'intermediate':
        return { bg: colors.primary, text: 'white' };
      case 'expert':
        return { bg: colors.primaryDark, text: 'white' };
      default:
        return { bg: colors.primaryLight, text: colors.primary };
    }
  };

  const { bg, text } = getLevelColor();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bg,
          paddingVertical: small ? 4 : 6,
          paddingHorizontal: small ? 8 : 12,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: text,
            fontSize: small ? 12 : 14,
          },
        ]}
      >
        {name}
      </Text>
      {isVerified && (
        <CheckCircle2
          size={small ? 12 : 16}
          color={text}
          style={styles.icon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    fontFamily: 'Inter-Medium',
  },
  icon: {
    marginLeft: 4,
  },
});