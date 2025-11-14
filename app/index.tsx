import { Stack } from 'expo-router';

import { StyleSheet, View } from 'react-native';

import Map from '@/components/Map';

export default function Home() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Home' }} />
      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
