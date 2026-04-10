import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/chess-passport/landing');
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom', 'top']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SETTINGS</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialIcons name="logout" size={24} color="#FFFFFF" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#000000',
  },
  section: {
    gap: 12,
  },
  logoutButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});
