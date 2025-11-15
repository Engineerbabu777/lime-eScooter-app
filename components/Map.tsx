import Mapbox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';
import { useScooter } from '@/providers/scooter-provider';
import LineRoute from './LineRoute';
import ScooterMarkers from './ScooterMarkers';

const accessToken = process.env.EXPO_PUBLIC_MAP_BOX_KEY;

Mapbox.setAccessToken(accessToken || '');

export default function Map() {
  const { setSelectedScooter, directionCoordinates } = useScooter();

  const onPointPress = async (event: any) => {
    console.log({ event: event?.features[0]?.properties?.scooter });

    if (event?.features[0]?.properties?.scooter) {
      setSelectedScooter(event.features[0].properties.scooter);
    }
  };

  return (
    <MapView
      style={{ flex: 1 }}
      styleURL="mapbox://styles/mapbox/dark-v11"
      scaleBarEnabled={false}
      attributionEnabled={false}
      logoEnabled={false}
      compassEnabled={false}>
      <Camera followUserLocation zoomLevel={16} />

      <LocationPuck pulsing={'default'} puckBearing="heading" puckBearingEnabled />

      <ScooterMarkers onPointPress={onPointPress} />

      {directionCoordinates && <LineRoute coordinates={directionCoordinates} />}
    </MapView>
  );
}
