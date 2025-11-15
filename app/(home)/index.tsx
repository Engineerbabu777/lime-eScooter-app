import { Stack } from 'expo-router';

import { StatusBar } from 'react-native';

import Map from '@/components/Map';
import SelectedScooterSheet from '@/components/SelectedScooterSheet';
import { useAuthProvider } from '@/providers/AuthProvider';
import { Button } from '@/components/Button';
import { supabase } from '@/lib/supabse';

export default function Home() {
  const { session } = useAuthProvider();

  console.log({ session });

  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Map />
      <StatusBar barStyle={'light-content'} />
      <Button onPress={() => supabase.auth.signOut()} title="SignOut" />

      <SelectedScooterSheet />
    </>
  );
}
