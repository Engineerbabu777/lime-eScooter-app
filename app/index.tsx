import { Stack } from 'expo-router';

import { StatusBar } from 'react-native';

import Map from '@/components/Map';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Map />
      <StatusBar barStyle={'light-content'} />
    </>
  );
}
