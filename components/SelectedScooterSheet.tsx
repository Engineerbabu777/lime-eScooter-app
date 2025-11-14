import { useScooter } from '@/providers/scooter-provider';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { Image, Text, View } from 'react-native';
import ScooterImage from '@/assets/lime-scooter.png';
import { FontAwesome6 } from '@expo/vector-icons';
import { Button } from './Button';

export default function SelectedScooterSheet() {
  const { selectedScooter, routeDistance, routeTime, isNearby } = useScooter();

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (selectedScooter) {
      bottomSheetRef.current?.expand();
      console.log({ selectedScooter });
    }
  }, [selectedScooter]);
  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        enableDynamicSizing
        index={-1}
        snapPoints={[200]}
        backgroundStyle={{ backgroundColor: '#414442' }}
        enablePanDownToClose>
        <BottomSheetView
          style={{
            flex: 1,
            padding: 10,
            gap: 10,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image source={ScooterImage} style={{ width: 55, height: 55 }} />
            <View style={{ flex: 1, gap: 1 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Lime - S</Text>
              <Text style={{ color: 'gray', fontSize: 16 }}>
                id-{selectedScooter?.id || 'X'} · Medison Avenue
              </Text>
            </View>

            <View style={{ gap: 5 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  alignSelf: 'flex-start',
                }}>
                <FontAwesome6 name="flag-checkered" size={18} color="#42E100" />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                  {(routeDistance / 1000).toFixed(1)} km
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  alignSelf: 'flex-start',
                }}>
                <FontAwesome6 name="clock" size={18} color="#42E100" />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                  {(routeTime / 60).toFixed(0)} min
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Button title="Start journey" onPress={() => {}} disabled={!isNearby} />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
