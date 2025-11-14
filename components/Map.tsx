import Mapbox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';

const accessToken = process.env.EXPO_PUBLIC_MAP_BOX_KEY;

Mapbox.setAccessToken(accessToken || '');

export default function Map() {
  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera followUserLocation zoomLevel={16} />

      <LocationPuck pulsing={'default'} puckBearing="heading" puckBearingEnabled />
    </MapView>
  );
}
