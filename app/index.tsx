import { Stack } from 'expo-router';

import { StatusBar, StyleSheet, Text } from 'react-native';

import Map from '@/components/Map';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Map />
      <StatusBar barStyle={'light-content'} />

      <BottomSheet snapPoints={[200]} enablePanDownToClose >
        <BottomSheetView style={styles.contentContainer} >
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});
