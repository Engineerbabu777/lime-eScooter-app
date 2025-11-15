import { CircleLayer, Images, ShapeSource, SymbolLayer } from '@rnmapbox/maps';
import pin from '@/assets/pin.png';
import { featureCollection, point } from '@turf/helpers';
import { useScooter } from '@/providers/scooter-provider';

export default function ScooterMarkers({ onPointPress }: { onPointPress: any }) {
  const { nearByScooters } = useScooter();

  const points = nearByScooters?.map((scooter: any) =>
    point([scooter.long, scooter.lat], { scooter })
  );

  const shapes = featureCollection(points);

  return (
    <ShapeSource id="scooters" shape={shapes} cluster onPress={onPointPress}>
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
        style={{
          iconImage: 'pin',
          iconSize: 0.5,
          iconAllowOverlap: true,
          iconAnchor: 'bottom',
        }}
        filter={['!', ['has', 'point_count']]}
      />
      <Images images={{ pin }} />
    </ShapeSource>
  );
}
