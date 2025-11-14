import { Text, View } from 'react-native';
import Mapbox, { MapView } from '@rnmapbox/maps';

const accessToken =
  'pk.eyJ1IjoiZW5naW5lZXJhd2Fpczc3NyIsImEiOiJjbWV2Mnh3Z2cwNmwwMmlzN3ZqaXNjaTRyIn0.L_4Cf2FmaoRLYlZch0RGhw';

Mapbox.setAccessToken(accessToken);

export default function Map() {
  return <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11" />;
}
