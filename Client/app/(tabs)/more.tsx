import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { theme } from '@/constants/theme';
import { Card } from '@/components/Card';

const menuItems = [
  { id: 'notice', icon: '📢', title: '공지사항', desc: '업데이트 소식', onPress: () => {} },
  { id: 'faq', icon: '❓', title: '자주 묻는 질문', desc: 'FAQ', onPress: () => {} },
  { id: 'feedback', icon: '💬', title: '의견 보내기', desc: '피드백을 남겨주세요', onPress: () => {} },
  { id: 'privacy', icon: '🔒', title: '개인정보 처리방침', desc: '준비 중', onPress: () => {} },
  { id: 'terms', icon: '📄', title: '이용약관', desc: '준비 중', onPress: () => {} },
];

export default function MoreScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.profileName}>발표 피드백</Text>
        <Text style={styles.profileDesc}>말하기가 더 나아지도록 도와드려요</Text>
      </View>

      <Card style={styles.menuCard} padded={false}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuRow, index < menuItems.length - 1 && styles.menuRowBorder]}
            onPress={item.onPress}
            activeOpacity={0.7}
            {...(Platform.OS === 'web' ? { cursor: 'pointer' } : {})}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDesc}>{item.desc}</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
        ))}
      </Card>

      <View style={styles.footer}>
        <Text style={styles.version}>v1.0.0</Text>
        <Text style={styles.footerText}>Whisper AI 기반 발표 피드백</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.lg, paddingBottom: theme.spacing.xxl * 2 },
  profile: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarText: { fontSize: 36 },
  profileName: {
    ...theme.typography.title,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  profileDesc: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  menuCard: { padding: 0 },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  menuIcon: { fontSize: 22, marginRight: theme.spacing.md, width: 28, textAlign: 'center' },
  menuTextWrap: { flex: 1 },
  menuTitle: { ...theme.typography.bodyBold, color: theme.colors.text },
  menuDesc: { ...theme.typography.caption, color: theme.colors.textSecondary, marginTop: 2 },
  menuChevron: { fontSize: 22, color: theme.colors.textTertiary, fontWeight: '300' },
  footer: { alignItems: 'center', marginTop: theme.spacing.xl },
  version: { ...theme.typography.caption, color: theme.colors.textTertiary, marginBottom: theme.spacing.xs },
  footerText: { ...theme.typography.caption, color: theme.colors.textTertiary },
});
