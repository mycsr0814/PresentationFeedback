import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { theme } from '@/constants/theme';
import { Card } from '@/components/Card';
import { getResultData } from '@/lib/resultStore';

interface AnalysisData {
  transcript?: { text?: string };
  analysis?: {
    summary?: {
      totalDurationSeconds?: number;
      wordCount?: number;
      wordsPerMinute?: number;
      fillerCount?: number;
      fillerRatio?: number;
    };
    fillers?: { word: string; count: number }[];
    suggestions?: string[];
  };
}

export default function ResultScreen() {
  const { data: paramData } = useLocalSearchParams<{ data?: string }>();
  const [parsed, setParsed] = useState<AnalysisData>({});

  useEffect(() => {
    const fromStore = getResultData();
    if (fromStore) {
      setParsed(fromStore as AnalysisData);
      return;
    }
    if (paramData) {
      try {
        setParsed(JSON.parse(paramData) as AnalysisData);
      } catch {
        setParsed({});
      }
    }
  }, [paramData]);

  const summary = parsed.analysis?.summary;
  const fillers = parsed.analysis?.fillers ?? [];
  const suggestions = parsed.analysis?.suggestions ?? [];
  const transcript = parsed.transcript?.text ?? '';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>요약</Text>
          <View style={styles.summaryGrid}>
            <Card style={styles.summaryItem} noShadow>
              <Text style={styles.summaryValue}>{summary.wordsPerMinute ?? '-'}</Text>
              <Text style={styles.summaryLabel}>분당 단어 수</Text>
            </Card>
            <Card style={styles.summaryItem} noShadow>
              <Text style={styles.summaryValue}>{summary.fillerCount ?? 0}</Text>
              <Text style={styles.summaryLabel}>추임새 횟수</Text>
            </Card>
            <Card style={styles.summaryItem} noShadow>
              <Text style={styles.summaryValue}>{summary.fillerRatio ?? 0}%</Text>
              <Text style={styles.summaryLabel}>추임새 비율</Text>
            </Card>
            <Card style={styles.summaryItem} noShadow>
              <Text style={styles.summaryValue}>{summary.totalDurationSeconds ?? 0}초</Text>
              <Text style={styles.summaryLabel}>총 길이</Text>
            </Card>
          </View>
        </View>
      )}

      {fillers.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>추임새 사용</Text>
          <Card padded={false}>
            {fillers.map((f, i) => (
              <View
                key={i}
                style={[styles.fillerRow, i < fillers.length - 1 && styles.fillerRowBorder]}
              >
                <Text style={styles.fillerWord}>{f.word}</Text>
                <Text style={styles.fillerCount}>{f.count}회</Text>
              </View>
            ))}
          </Card>
        </View>
      )}

      {suggestions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제안</Text>
          {suggestions.map((s, i) => (
            <Card key={i} style={styles.suggestionCard}>
              <View style={styles.suggestionBullet} />
              <Text style={styles.suggestionText}>{s}</Text>
            </Card>
          ))}
        </View>
      )}

      {transcript ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>인식된 글</Text>
          <Card>
            <Text style={styles.transcriptText}>{transcript}</Text>
          </Card>
        </View>
      ) : (
        !summary && (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyTitle}>분석 결과가 없어요</Text>
            <Text style={styles.emptyDesc}>
              녹화/업로드 탭에서 파일을 올려주시면{'\n'}바로 분석해 드려요.
            </Text>
          </Card>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.lg, paddingBottom: theme.spacing.xxl * 2 },
  section: { marginBottom: theme.spacing.xl },
  sectionTitle: {
    ...theme.typography.headline,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  summaryItem: {
    minWidth: 100,
    flex: 1,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  summaryLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  fillerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  fillerRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  fillerWord: { ...theme.typography.bodyBold, color: theme.colors.text },
  fillerCount: { ...theme.typography.label, color: theme.colors.primary },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  suggestionBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
    marginTop: 8,
    marginRight: theme.spacing.md,
  },
  suggestionText: { ...theme.typography.body, color: theme.colors.text, flex: 1, lineHeight: 24 },
  transcriptText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyEmoji: { fontSize: 48, marginBottom: theme.spacing.md },
  emptyTitle: { ...theme.typography.headline, color: theme.colors.text, marginBottom: theme.spacing.sm },
  emptyDesc: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
