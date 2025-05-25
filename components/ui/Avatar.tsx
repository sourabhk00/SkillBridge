import { StyleSheet, Image, View, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  uri?: string;
  size?: AvatarSize;
  initials?: string;
  verified?: boolean;
}

export default function Avatar({ uri, size = 'md', initials, verified = false }: AvatarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getSizeStyle = (): number => {
    switch (size) {
      case 'sm':
        return 32;
      case 'md':
        return 48;
      case 'lg':
        return 64;
      case 'xl':
        return 96;
      default:
        return 48;
    }
  };

  const avatarSize = getSizeStyle();
  const fontSize = avatarSize * 0.4;

  const renderContent = () => {
    if (uri) {
      return (
        <Image
          source={{ uri }}
          style={[
            styles.image,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
            },
          ]}
        />
      );
    }

    return (
      <View
        style={[
          styles.initialsContainer,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
            backgroundColor: colors.primary,
          },
        ]}
      >
        <Text
          style={[
            styles.initials,
            {
              fontSize,
              color: 'white',
            },
          ]}
        >
          {initials}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderContent()}
      {verified && (
        <View
          style={[
            styles.verifiedBadge,
            {
              width: avatarSize * 0.3,
              height: avatarSize * 0.3,
              borderRadius: (avatarSize * 0.3) / 2,
              right: 0,
              bottom: 0,
            },
          ]}
        >
          <Text style={styles.verifiedIcon}>✓</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    resizeMode: 'cover',
  },
  initialsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: 'Inter-SemiBold',
  },
  verifiedBadge: {
    position: 'absolute',
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  verifiedIcon: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
});