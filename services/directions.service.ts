export const getDirections = async () => {
  const response = await fetch(
    'https://api.mapbox.com/directions/v5/mapbox/walking/2.161444%2C41.38641%3B2.172858%2C41.390303?alternatives=false&annotations=distance%2Cduration&continue_straight=true&geometries=geojson&overview=full&steps=false&access_token=pk.eyJ1IjoiZW5naW5lZXJhd2Fpczc3NyIsImEiOiJjbWV2Mnh3Z2cwNmwwMmlzN3ZqaXNjaTRyIn0.L_4Cf2FmaoRLYlZch0RGhw'
  );

  const json = await response.json();

  console.log({ json });
};
