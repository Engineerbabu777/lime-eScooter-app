import { supabase } from '@/lib/supabse';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useAuthProvider } from './AuthProvider';
import { useScooter } from './scooter-provider';

const RideContext = createContext<any>({});

export default function RideProvider({ children }: PropsWithChildren) {
  const [ride, setRide] = useState<any>(null);
  const { session } = useAuthProvider();
  const { selectedScooter } = useScooter();

  const startJourneyHandler = async () => {
    const { data, error } = await supabase
      .from('rides')
      .insert([
        {
          user_id: session?.user?.id,
          scooter_id: selectedScooter.id,
        },
      ])
      .select();

    if (error) {
      console.log('Failed to start ride :/', { error });
    } else {
      console.log('Ride started:/ ', { data });

      setRide(data);
    }
  };

  return (
    <RideContext.Provider value={{ ride, startJourneyHandler }}>{children}</RideContext.Provider>
  );
}

export const useRideProvider = () => useContext(RideContext);
