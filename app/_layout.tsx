import ScooterProvider from '@/providers/scooter-provider';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <ScooterProvider>
      <Stack />
    </ScooterProvider>
  );
}
