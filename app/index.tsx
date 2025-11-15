import { Redirect, Stack } from 'expo-router';

import { StatusBar } from 'react-native';

import Map from '@/components/Map';
import SelectedScooterSheet from '@/components/SelectedScooterSheet';

export default function Home() {
  return <Redirect href={'/auth'} />;
  // return (
  //   <>
  //     <Stack.Screen options={{ title: 'Home', headerShown: false }} />
  //     <Map />
  //     <StatusBar barStyle={'light-content'} />

  //     <SelectedScooterSheet />
  //   </>
  // );
}
