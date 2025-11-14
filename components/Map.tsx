import Mapbox, {
  Camera,
  CircleLayer,
  Images,
  LineLayer,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
} from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import pin from '@/assets/pin.png';
import scooters from '@/data/scooters.json';
import { getDirections } from '@/services/directions.service';
import { useEffect, useState } from 'react';
import { useScooter } from '@/providers/scooter-provider';

const accessToken = process.env.EXPO_PUBLIC_MAP_BOX_KEY;

Mapbox.setAccessToken(accessToken || '');

export default function Map() {
  const { setSelectedScooter, directionCoordinates } = useScooter();

  const points = scooters?.map((scooter) => point([scooter.long, scooter.lat], { scooter }));

  const shapes = featureCollection(points);

  const onPointPress = async (event: any) => {
    console.log({ event: event?.features[0]?.properties?.scooter });

    if (event?.features[0]?.properties?.scooter) {
      setSelectedScooter(event.features[0].properties.scooter);
    }
  };

  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera followUserLocation zoomLevel={16} />

      <LocationPuck pulsing={'default'} puckBearing="heading" puckBearingEnabled />

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

      {directionCoordinates && (
        <ShapeSource
          id="routeSource"
          lineMetrics
          shape={{
            properties: {},
            type: 'Feature',
            geometry: { type: 'LineString', coordinates: directionCoordinates },
          }}>
          <LineLayer
            id="exampleLineLayer"
            style={{
              lineColor: '#42E100',
              lineCap: 'round',
              lineJoin: 'round',
              lineWidth: 7,
            }}
          />
        </ShapeSource>
      )}
    </MapView>
  );
}
