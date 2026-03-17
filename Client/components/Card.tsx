import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
  noShadow?: boolean;
}

export function Card({ children, style, padded = true, noShadow }: CardProps) {
  return (
    <View style={[styles.card, !noShadow && styles.shadow, padded && styles.padded, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
  },
  shadow: theme.shadow.sm,
  padded: {
    padding: theme.spacing.lg,
  },
});
