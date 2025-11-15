import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { Button } from './Button';
import { useRideProvider } from '@/providers/RideProvider';

export default function ActiveRideSheet() {
  const { ride } = useRideProvider();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (ride) {
      // Delay ensures the sheet is mounted
      const timeout = setTimeout(() => {
        bottomSheetRef.current?.expand();
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [ride]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={[250]}
      backgroundStyle={{
        backgroundColor: '#2F3130',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      handleIndicatorStyle={{
        backgroundColor: '#777',
        width: 40,
      }}>
      {ride && (
        <BottomSheetView
          style={{
            flex: 1,
            padding: 20,
            gap: 20,
          }}>
          {/* Title */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: 'white',
            }}>
            Ride In Progress
          </Text>

          {/* Info container */}
          <View
            style={{
              backgroundColor: '#3C3F3D',
              padding: 15,
              borderRadius: 12,
            }}>
            <Text
              style={{
                color: '#D0D0D0',
                fontSize: 16,
              }}>
              You&apos;re currently riding a scooter.
            </Text>
          </View>

          <Button
            title="Finish Journey"
            onPress={() => {}}
            style={{
              backgroundColor: '#4CAF50',
              borderRadius: 12,
              paddingVertical: 14,
            }}
          />
        </BottomSheetView>
      )}
    </BottomSheet>
  );
}
