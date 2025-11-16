const BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox';

export const getDirections = async (from: [number, number], to: [number, number]) => {
  console.log({ from, to });
  const response = await fetch(
    `${BASE_URL}/walking/${from[0]},${from[1]};${to[0]},${to[1]}?alternatives=false&annotations=distance%2Cduration&continue_straight=true&geometries=geojson&overview=full&steps=false&access_token=${process.env.EXPO_PUBLIC_MAP_BOX_KEY}`
  );

  const json = await response.json();

  console.log(JSON.stringify(json, null, 2));

  return json;
};

export async function fetchDirectionBasedOnCoords(coordinates: any) {
  const coordinatesString = coordinates.map((coord: any) => `${coord[0]},${coord[1]}`).join(';');
  const response = await fetch(
    `${BASE_URL}/matching/v5/mapbox/cycling/${coordinatesString}?annotations=distance%2Cduration&geometries=geojson&overview=full&steps=false&access_token=${process.env.EXPO_PUBLIC_MAPBOX_KEY}`
  );
  const json = await response.json();
  return json;
}
