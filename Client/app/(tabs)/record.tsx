import { useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { theme } from '@/constants/theme';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { setResultData } from '@/lib/resultStore';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

export default function RecordScreen() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const pickAndUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/*', 'video/*'],
        copyToCacheDirectory: true,
      });
      if (result.canceled) return;

      const file = result.assets[0];
      setUploading(true);

      const form = new FormData();
      form.append('file', {
        uri: file.uri,
        name: file.name || 'audio.webm',
        type: file.mimeType || 'audio/webm',
      } as unknown as Blob);

      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: form,
        headers: Platform.OS === 'web' ? {} : { 'Content-Type': 'multipart/form-data' },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `서버 오류: ${res.status}`);
      }

      const data = await res.json();
      setResultData(data);
      router.replace('/result');
    } catch (e) {
      const msg = e instanceof Error ? e.message : '업로드 실패';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('오류', msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.emoji}>🎙️</Text>
        <Text style={styles.title}>영상·음성 파일 분석</Text>
        <Text style={styles.desc}>
          파일을 선택하면 서버에서 Whisper로 인식한 뒤,{'\n'}말하기 속도·추임새·문맥을 분석해 드려요.
        </Text>
        <Button
          title={uploading ? '분석 중…' : '파일 선택 후 분석하기'}
          onPress={pickAndUpload}
          disabled={uploading}
          loading={uploading}
          fullWidth
          style={styles.button}
        />
      </Card>

      <Card style={styles.infoCard}>
        <Text style={styles.infoTitle}>지원 형식</Text>
        <Text style={styles.infoText}>MP3, M4A, WAV, MP4, WEBM 등</Text>
        <View style={styles.infoDivider} />
        <Text style={styles.infoTitle}>실시간 녹화</Text>
        <Text style={styles.infoText}>추후 지원 예정이에요. 지금은 파일 업로드만 가능해요.</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  card: {
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  emoji: { fontSize: 48, marginBottom: theme.spacing.md },
  title: {
    ...theme.typography.headline,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  desc: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
  },
  button: { width: '100%' },
  infoCard: { padding: theme.spacing.lg },
  infoTitle: { ...theme.typography.label, color: theme.colors.text, marginBottom: theme.spacing.xs },
  infoText: { ...theme.typography.caption, color: theme.colors.textSecondary, marginBottom: theme.spacing.md },
  infoDivider: { height: 1, backgroundColor: theme.colors.borderLight, marginVertical: theme.spacing.sm },
});
