import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChessPassportLanding() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/chess-passport/vault');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <View style={styles.logoMark}>
            <Text style={styles.logoText}>W / C</Text>
          </View>
          <Text style={styles.title}>WORLD CHESS</Text>
          <Text style={styles.subtitle}>Official Player Vault</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonWhite]} onPress={handleLogin}>
            <MaterialIcons name="mail" size={20} color="#000000" />
            <Text style={styles.buttonTextWhite}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonBlack]} onPress={handleLogin}>
            <MaterialIcons name="fingerprint" size={20} color="#FFFFFF" />
            <Text style={styles.buttonTextBlack}>Sign in with Passkey</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logoMark: {
    borderWidth: 3,
    borderColor: '#000000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#000000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666666',
    fontFamily: 'Georgia',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 0,
    gap: 10,
  },
  buttonWhite: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
  },
  buttonBlack: {
    backgroundColor: '#000000',
  },
  buttonTextWhite: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  buttonTextBlack: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
