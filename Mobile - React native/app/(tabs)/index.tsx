import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { RitmosColors, RitmosComponents, RitmosElevation, RitmosSpacing } from '@/constants/theme';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AlarmCard {
  id: string;
  title: string;
  type: 'info' | 'play' | 'add';
  isPlaying?: boolean;
}

export default function AlarmsScreen() {
  const alarms: AlarmCard[] = [
    { id: '1', title: 'Centro commercial', type: 'info' },
    { id: '2', title: 'Ferretería', type: 'info' },
    { id: '3', title: 'aniversario', type: 'play', isPlaying: false },
    { id: '4', title: '', type: 'add' },
  ];

  const handleAlarmPress = (alarm: AlarmCard) => {
    if (alarm.type === 'add') {
      console.log('Agregar nueva alarma');
      router.push('/crear-alarma');
    } else if (alarm.type === 'play') {
      console.log('Toggle play/pause para:', alarm.title);
      // TODO: Implementar reproducción
    } else {
      console.log('Ver detalles de:', alarm.title);
      router.push('/detalle-alarma');
    }
  };

  const renderAlarmCard = (alarm: AlarmCard) => {
    if (alarm.type === 'add') {
      return (
        <TouchableOpacity
          key={alarm.id}
          style={[styles.card, styles.addCard]}
          onPress={() => handleAlarmPress(alarm)}
        >
          <View style={styles.addIcon}>
            <Text style={styles.addIconText}>+</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={alarm.id}
        style={styles.card}
        onPress={() => handleAlarmPress(alarm)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.infoIcon}>
            <IconSymbol size={16} name="info.circle" color={RitmosColors.primary} />
          </View>
          <Text style={styles.cardTitle}>{alarm.title}</Text>
        </View>

        {alarm.type === 'play' && (
          <View style={styles.playerContainer}>
            <TouchableOpacity style={styles.playButton}>
              <IconSymbol
                size={20}
                name={alarm.isPlaying ? "pause.fill" : "play.fill"}
                color={RitmosColors.primary}
              />
            </TouchableOpacity>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Screen>
      <ScreenHeader title="Lista de alarmas" />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.grid}>{alarms.map(renderAlarmCard)}</View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: RitmosSpacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 150,
    backgroundColor: RitmosColors.alarmCard,
    borderRadius: RitmosSpacing.lg,
    padding: RitmosSpacing.md,
    marginBottom: RitmosSpacing.md,
    justifyContent: 'space-between',
    ...RitmosElevation.level1,
  },
  addCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RitmosColors.surface,
    borderWidth: 2,
    borderColor: RitmosColors.placeholder,
    borderStyle: 'dashed',
  },
  addIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: RitmosColors.background,
    alignItems: 'center',
    justifyContent: 'center',
    ...RitmosElevation.level1,
  },
  addIconText: {
    fontSize: 30,
    fontWeight: '700',
    color: RitmosColors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: RitmosSpacing.xs,
  },
  infoIcon: {
    marginTop: 2,
  },
  cardTitle: {
    ...RitmosComponents.bodyText,
    color: RitmosColors.text.onBackground,
    flex: 1,
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RitmosSpacing.sm,
  },
  playButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: RitmosColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...RitmosElevation.level1,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 2,
  },
  progressFill: {
    width: '30%',
    height: '100%',
    backgroundColor: RitmosColors.surface,
    borderRadius: 2,
  },
});
