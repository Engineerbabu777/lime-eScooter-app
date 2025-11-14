import Mapbox, {
  Camera,
  Images,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
} from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import pin from '@/assets/pin.png';

const accessToken = process.env.EXPO_PUBLIC_MAP_BOX_KEY;

Mapbox.setAccessToken(accessToken || '');

export default function Map() {
  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera followUserLocation zoomLevel={16} />

      <LocationPuck pulsing={'default'} puckBearing="heading" puckBearingEnabled />

      <ShapeSource
        id="scooters"
        shape={featureCollection([point([2.1589, 41.3907]), point([2.1821, 41.389])])}>
        <SymbolLayer id="scooter-items" style={{ iconImage: 'pin', iconSize: 0.5 }} />
        <Images images={{ pin }} />
      </ShapeSource>
    </MapView>
  );
}
