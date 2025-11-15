import { Redirect, Stack } from 'expo-router';

import { StatusBar } from 'react-native';

import Map from '@/components/Map';
import SelectedScooterSheet from '@/components/SelectedScooterSheet';
import { useAuthProvider } from '@/providers/AuthProvider';

export default function Home() {
  const { session } = useAuthProvider();

  console.log({ session });

  return session?.user?.id ? (
    <>
      <>
        <Stack.Screen options={{ title: 'Home', headerShown: false }} />
        <Map />
        <StatusBar barStyle={'light-content'} />

        <SelectedScooterSheet />
      </>
    </>
  ) : (
    <Redirect href={'/auth'} />
  );
}
