import ScooterProvider from '@/providers/scooter-provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import AuthProvider from '@/providers/AuthProvider';
import RideProvider from '@/providers/RideProvider';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <RideProvider>
          <ScooterProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </ScooterProvider>
        </RideProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
