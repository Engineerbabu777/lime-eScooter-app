import ScooterProvider from '@/providers/scooter-provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScooterProvider>
        <Stack />
      </ScooterProvider>
    </GestureHandlerRootView>
  );
}
