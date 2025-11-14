import { useScooter } from '@/providers/scooter-provider';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import ScooterImage from '@/assets/lime-scooter.png';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function SelectedScooterSheet() {
  const { selectedScooter, routeDistance, routeTime } = useScooter();

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
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image source={ScooterImage} style={{ width: 55, height: 55 }} />
            <View style={{ flex: 1, gap: 1 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Lime - S</Text>
              <Text style={{ color: 'gray', fontSize: 16 }}>
                id-{selectedScooter.id} · Medison Avenue
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                alignSelf: 'flex-start',
              }}>
              <AntDesign name="thunderbolt" size={18} color="#42E100" />
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>12 Km</Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
