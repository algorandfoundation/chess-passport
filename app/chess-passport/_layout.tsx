import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function ChessPassportLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderTopWidth: 1,
          borderTopColor: '#DDDDDD',
          paddingBottom: 25,
          paddingTop: 10,
          height: 80,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#AAAAAA',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: 1,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="landing"
        options={{
          href: null, // Hide from tabs
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="vault"
        options={{
          title: 'Vault',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="circle"
        options={{
          title: 'Circle',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
