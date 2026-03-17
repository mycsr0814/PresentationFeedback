import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.emptyState}>
        <Text style={styles.emoji}>📋</Text>
        <Text style={styles.title}>분석 기록</Text>
        <Text style={styles.desc}>
          여기엔 이전에 분석한 발표 결과가 모여요.{'\n'}아직 기록이 없어요. 첫 분석을 진행해 보세요!
        </Text>
        <Button title="지금 분석하기" onPress={() => router.push('/record')} fullWidth style={styles.cta} />
      </View>

      <Card style={styles.placeholderCard}>
        <Text style={styles.placeholderTitle}>예정된 기능</Text>
        <Text style={styles.placeholderDesc}>• 분석 이력 저장 및 목록 보기</Text>
        <Text style={styles.placeholderDesc}>• 날짜별·점수별 정렬</Text>
        <Text style={styles.placeholderDesc}>• 이전 결과 다시 보기</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.lg, paddingBottom: theme.spacing.xxl * 2 },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emoji: { fontSize: 56, marginBottom: theme.spacing.md },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  desc: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: theme.spacing.xl,
  },
  cta: { maxWidth: 280 },
  placeholderCard: { marginTop: theme.spacing.lg },
  placeholderTitle: {
    ...theme.typography.label,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  placeholderDesc: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
});
