import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const friends = [
  { id: '1', name: 'Magnus Carlsen', elo: 2853, initials: 'MC' },
  { id: '2', name: 'Hikaru Nakamura', elo: 2820, initials: 'HN' },
  { id: '3', name: 'Fabiano Caruana', elo: 2804, initials: 'FC' },
  { id: '4', name: 'Ding Liren', elo: 2799, initials: 'DL' },
  { id: '5', name: 'Alireza Firouzja', elo: 2793, initials: 'AF' },
  { id: '6', name: 'Ian Nepomniachtchi', elo: 2789, initials: 'IN' },
];

export default function CircleScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom', 'top']}>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CIRCLE</Text>
        </View>

        <View style={styles.friendsList}>
          {friends.map((friend) => (
            <View key={friend.id} style={styles.friendEntry}>
              <View style={styles.friendContent}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{friend.initials}</Text>
                </View>
                <View style={styles.friendDetails}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.friendElo}>ELO {friend.elo}</Text>
                </View>
              </View>
            </View>
          ))}
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
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#000000',
  },
  friendsList: {
    gap: 12,
  },
  friendEntry: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: 16,
    borderRadius: 16,
  },
  friendContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 2,
  },
  friendElo: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
    fontFamily: 'Georgia',
  },
});
