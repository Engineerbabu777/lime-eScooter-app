/* eslint-disable react-hooks/exhaustive-deps */
import { supabase } from '@/lib/supabse';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useAuthProvider } from './AuthProvider';
import { useScooter } from './scooter-provider';
import * as Location from 'expo-location';
import { point } from '@turf/helpers';
import getDistance from '@turf/distance';

const RideContext = createContext<any>({});

export default function RideProvider({ children }: PropsWithChildren) {
  const [ride, setRide] = useState<any>(null);
  const { session } = useAuthProvider();
  const { selectedScooter, setIsNearBy } = useScooter();

  useEffect(() => {
    const fetchActiveRide = async () => {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('user_id', session?.user?.id)
        .is('finished_at', null);

      if (error) {
        console.log('Failed to fetch active rides for me :/', { error });
      } else {
        console.log('Ride Active:/ ', { data });

        setRide(data?.[0]);
      }
    };

    fetchActiveRide();
  }, []);

  useEffect(() => {
    let subscription: Location.LocationSubscription | undefined;

    const watchLocation = async () => {
      subscription = await Location.watchPositionAsync({ distanceInterval: 30 }, (newLocation) => {
        console.log('New location: ', newLocation.coords.longitude, newLocation.coords.latitude);
        // setRideRoute((currrRoute) => [
        //   ...currrRoute,
        //   [newLocation.coords.longitude, newLocation.coords.latitude],
        // ]);
        // const from = point([newLocation.coords.longitude, newLocation.coords.latitude]);
        // const to = point([selectedScooter.long, selectedScooter.lat]);
        // const distance = getDistance(from, to, { units: 'meters' });
        // if (distance < 100) {
        //   setIsNearby(true);
        // }
      });
    };

    if (ride) {
      watchLocation();
    }

    // unsubscribe
    return () => {
      subscription?.remove();
    };
  }, [ride]);

  const startJourneyHandler = async () => {
    if (ride) {
      return;
    }

    const { data, error } = await supabase
      .from('rides')
      .insert([
        {
          user_id: session?.user?.id,
          scooter_id: selectedScooter?.id,
        },
      ])
      .select();

    if (error) {
      console.log('Failed to start ride :/', { error });
    } else {
      console.log('Ride started:/ ', { data });

      setRide(data?.[0]);
    }
  };

  const finishRideJourney = async () => {
    const { data, error } = await supabase
      .from('rides')
      .update({ finished_at: new Date() })
      .eq('id', ride.id)
      .select();

    if (error) {
      console.log('Failed to start ride :/', { error });
    } else {
      console.log('Ride finished:/ ', { data });

      setRide(null);
    }
  };

  return (
    <RideContext.Provider value={{ ride, startJourneyHandler, finishRideJourney }}>
      {children}
    </RideContext.Provider>
  );
}

export const useRideProvider = () => useContext(RideContext);
