import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet, Text } from 'react-native';

export default function SelectedScooterSheet() {
  return (
    <>
      <BottomSheet index={-1} snapPoints={[200]} enablePanDownToClose>
        <BottomSheetView style={styles.contentContainer}>
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
