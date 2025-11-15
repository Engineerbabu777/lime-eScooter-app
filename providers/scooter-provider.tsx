import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { getDirections } from '@/services/directions.service';
import getDistance from '@turf/distance';
import { point } from '@turf/helpers';
import { supabase } from '@/lib/supabse';
import { Alert } from 'react-native';

const ScooterContext = createContext<any>({});

export default function ScooterProvider({ children }: PropsWithChildren) {
  const [selectedScooter, setSelectedScooter] = useState<any | null>(null);
  const [direction, setDirection] = useState<any>(null);

  const [nearByScooters, setNearByScooters] = useState([]);

  const [isNearby, setIsNearBy] = useState<boolean>(false);

  const directionCoordinates = direction?.routes?.[0]?.geometry?.coordinates;
  const routeTime = direction?.routes?.[0]?.duration;
  const routeDistance = direction?.routes?.[0]?.distance;

  useEffect(() => {
    const fetchScooters = async () => {
      const location = await Location.getCurrentPositionAsync();
      const { error, data } = await supabase.rpc('nearby_scooters', {
        lat: location.coords.latitude,
        long: location.coords.longitude,
        max_dist_meters: 2000,
      });
      if (error) {
        console.log({ error });
      } else {
        setNearByScooters(data);
      }
    };

    fetchScooters();
  }, []);

  useEffect(() => {
    const fetchDirections = async () => {
      if (selectedScooter?.long && selectedScooter?.lat) {
        const myLocation = await Location.getCurrentPositionAsync();

        const newDirection = await getDirections(
          [myLocation.coords.longitude, myLocation.coords.latitude],
          [selectedScooter?.long, selectedScooter?.lat]
        );

        setDirection(newDirection);
      }
    };

    fetchDirections();
  }, [selectedScooter]);

  useEffect(() => {
    Location.watchPositionAsync({ distanceInterval: 10 }, (newLocation) => {
      console.log('Location updated:', newLocation);

      if (selectedScooter) {
        const from = point([newLocation.coords.longitude, newLocation.coords.latitude]);
        const to = point([selectedScooter.long, selectedScooter.lat]);

        const distance = getDistance(from, to, { units: 'meters' });

        console.log({ distance });

        if (distance < 200) {
          setIsNearBy(true);
        }
      }
    });
  }, [selectedScooter]);

  return (
    <ScooterContext.Provider
      value={{
        selectedScooter,
        setSelectedScooter,
        direction,
        directionCoordinates,
        routeTime,
        routeDistance,
        isNearby,
        nearByScooters,
      }}>
      {children}
    </ScooterContext.Provider>
  );
}

export const useScooter = () => useContext(ScooterContext);
