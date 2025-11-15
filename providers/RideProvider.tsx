/* eslint-disable react-hooks/exhaustive-deps */
import { supabase } from '@/lib/supabse';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useAuthProvider } from './AuthProvider';
import { useScooter } from './scooter-provider';

const RideContext = createContext<any>({});

export default function RideProvider({ children }: PropsWithChildren) {
  const [ride, setRide] = useState<any>(null);
  const { session } = useAuthProvider();
  const { selectedScooter } = useScooter();

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

        setRide(data);
      }
    };

    fetchActiveRide();
  }, []);

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

  return (
    <RideContext.Provider value={{ ride, startJourneyHandler }}>{children}</RideContext.Provider>
  );
}

export const useRideProvider = () => useContext(RideContext);
