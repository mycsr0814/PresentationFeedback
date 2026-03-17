import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>발표가 더 나아지도록</Text>
        <Text style={styles.heroTitle}>함께할게요</Text>
        <Text style={styles.heroSub}>
          말하기 속도, 추임새(음·어·그…), 문맥까지{'\n'}한 번에 점검해 드려요.
        </Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.quickCard}
          activeOpacity={0.8}
          onPress={() => router.push('/record')}
          {...(Platform.OS === 'web' ? { cursor: 'pointer' } : {})}
        >
          <View style={styles.quickIcon}>
            <Text style={styles.quickIconText}>🎤</Text>
          </View>
          <Text style={styles.quickTitle}>지금 녹화·업로드</Text>
          <Text style={styles.quickDesc}>영상·음성 파일을 올리면 바로 분석해요</Text>
          <Text style={styles.quickArrow}>→</Text>
        </TouchableOpacity>

        <Card style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push('/record')}
            activeOpacity={0.7}
            {...(Platform.OS === 'web' ? { cursor: 'pointer' } : {})}
          >
            <Text style={styles.menuEmoji}>📁</Text>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>파일로 분석하기</Text>
              <Text style={styles.menuDesc}>MP3, M4A, MP4 등</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push('/history')}
            activeOpacity={0.7}
            {...(Platform.OS === 'web' ? { cursor: 'pointer' } : {})}
          >
            <Text style={styles.menuEmoji}>📋</Text>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>분석 기록 보기</Text>
              <Text style={styles.menuDesc}>이전 발표 결과 모아보기</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
        </Card>
      </View>

      <View style={styles.cta}>
        <Button title="새 발표 분석하기" onPress={() => router.push('/record')} fullWidth />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Whisper AI 기반 음성 인식</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.lg, paddingBottom: theme.spacing.xxl * 2 },
  hero: { marginBottom: theme.spacing.xl },
  heroLabel: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  heroTitle: {
    ...theme.typography.largeTitle,
    color: theme.colors.text,
    lineHeight: 36,
    marginBottom: theme.spacing.sm,
  },
  heroSub: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  quickActions: { gap: theme.spacing.md, marginBottom: theme.spacing.xl },
  quickCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    ...theme.shadow.md,
  },
  quickIcon: { marginBottom: theme.spacing.sm },
  quickIconText: { fontSize: 28 },
  quickTitle: {
    ...theme.typography.headline,
    color: '#fff',
    marginBottom: theme.spacing.xs,
  },
  quickDesc: {
    ...theme.typography.caption,
    color: 'rgba(255,255,255,0.85)',
  },
  quickArrow: {
    position: 'absolute',
    right: theme.spacing.lg,
    top: theme.spacing.lg,
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
  },
  menuCard: { padding: 0 },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  menuDivider: {
    height: 1,
    backgroundColor: theme.colors.borderLight,
    marginLeft: theme.spacing.lg + 36,
  },
  menuEmoji: { fontSize: 22, marginRight: theme.spacing.md, width: 32, textAlign: 'center' },
  menuTextWrap: { flex: 1 },
  menuTitle: { ...theme.typography.bodyBold, color: theme.colors.text },
  menuDesc: { ...theme.typography.caption, color: theme.colors.textSecondary, marginTop: 2 },
  menuChevron: { fontSize: 20, color: theme.colors.textTertiary, fontWeight: '300' },
  cta: { marginTop: theme.spacing.lg },
  footer: { marginTop: theme.spacing.xl, alignItems: 'center' },
  footerText: { ...theme.typography.caption, color: theme.colors.textTertiary },
});
