import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VaultScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom', 'top']}>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>VAULT</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>MATCHES</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>EVENTS</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>2840</Text>
            <Text style={styles.statLabel}>ELO RATING</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>1,250</Text>
            <Text style={styles.statLabel}>WC REWARDS</Text>
          </View>
        </View>

        <View style={styles.idCard}>
          <View style={styles.idCardContent}>
            <View>
              <Text style={styles.playerName}>GARRY KASPAROV</Text>
              <Text style={styles.idStatus}>Verified Federation Member</Text>
            </View>
            <MaterialIcons name="qr-code" size={28} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RECENT MATCHES</Text>
          <View style={styles.listEntry}>
            <View style={styles.listEntryContent}>
              <Text style={styles.matchOpponent}>vs Magnus Carlsen</Text>
              <Text style={styles.matchDetails}>World Open Round 4</Text>
            </View>
            <Text style={styles.matchResult}>WIN</Text>
          </View>
          <View style={styles.listEntry}>
            <View style={styles.listEntryContent}>
              <Text style={styles.matchOpponent}>vs Hikaru Nakamura</Text>
              <Text style={styles.matchDetails}>Grand Prix Finals</Text>
            </View>
            <Text style={[styles.matchResult, styles.matchDraw]}>DRAW</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TOURNAMENTS</Text>
          <View style={styles.listEntry}>
            <View style={[styles.listEntryContent, { flex: 1 }]}>
              <Text style={styles.tournamentName}>FIDE Grand Prix 2026</Text>
              <Text style={styles.tournamentLocation}>Berlin • 1st Place</Text>
            </View>
            <MaterialIcons name="emoji-events" size={24} color="#BC996A" />
          </View>
          <View style={styles.listEntry}>
            <View style={[styles.listEntryContent, { flex: 1 }]}>
              <Text style={styles.tournamentName}>World Chess Championship</Text>
              <Text style={styles.tournamentLocation}>London • 2nd Place</Text>
            </View>
            <MaterialIcons name="emoji-events" size={24} color="#94A3B8" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#000000',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  statValue: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#888888',
    fontWeight: '600',
    letterSpacing: 1,
  },
  idCard: {
    backgroundColor: '#000000',
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
  },
  idCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 4,
  },
  idStatus: {
    fontSize: 12,
    color: '#34C759',
    fontStyle: 'italic',
    fontFamily: 'Georgia',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#000000',
    marginBottom: 12,
  },
  listEntry: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listEntryContent: {
    flex: 1,
  },
  matchOpponent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  matchDetails: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
    fontFamily: 'Georgia',
  },
  matchResult: {
    fontSize: 14,
    fontWeight: '900',
    color: '#34C759',
  },
  matchDraw: {
    color: '#888888',
  },
  tournamentName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
  },
  tournamentLocation: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
    fontFamily: 'Georgia',
  },
});
