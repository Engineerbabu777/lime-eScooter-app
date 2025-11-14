import Mapbox, {
  Camera,
  CircleLayer,
  Images,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
} from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import pin from '@/assets/pin.png';
import scooters from '@/data/scooters.json';

const accessToken = process.env.EXPO_PUBLIC_MAP_BOX_KEY;

Mapbox.setAccessToken(accessToken || '');

export default function Map() {
  const points = scooters?.map((scooter) => point([scooter.long, scooter.lat]));

  const shapes = featureCollection(points);
  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera followUserLocation zoomLevel={16} />

      <LocationPuck pulsing={'default'} puckBearing="heading" puckBearingEnabled />

      <ShapeSource id="scooters" shape={shapes} cluster onPress={(event) => console.log({ event })}>
        <SymbolLayer
          id="clusters-count"
          style={{ textField: ['get', 'point_count'], textColor: '#fff' }}
        />

        <CircleLayer
          id="clusters"
          belowLayerID="clusters-count"
          style={{
            circleColor: '#42E100',
            circlePitchAlignment: 'map',
            circleRadius: 20,
            circleOpacity: 1,
            circleStrokeWidth: 2,
            circleStrokeColor: 'white',
          }}
          filter={['has', 'point_count']}
        />
        <SymbolLayer
          id="scooter-items"
          style={{ iconImage: 'pin', iconSize: 0.5, iconAllowOverlap: true, iconAnchor: 'bottom' }}
          filter={['!', ['has', 'point_count']]}
        />
        <Images images={{ pin }} />
      </ShapeSource>
    </MapView>
  );
}

