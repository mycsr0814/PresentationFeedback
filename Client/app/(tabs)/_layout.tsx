import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { theme } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.colors.surface, shadowOpacity: 0 },
        headerTitleStyle: { fontWeight: '700', fontSize: 20, color: theme.colors.text },
        headerTintColor: theme.colors.primary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          height: Platform.OS === 'web' ? 56 : 64,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: '발표 피드백', tabBarLabel: '홈' }} />
      <Tabs.Screen name="record" options={{ title: '녹화·업로드', tabBarLabel: '녹화' }} />
      <Tabs.Screen name="history" options={{ title: '분석 기록', tabBarLabel: '기록' }} />
      <Tabs.Screen name="more" options={{ title: '더보기', tabBarLabel: '더보기' }} />
    </Tabs>
  );
}
