import { createContext, PropsWithChildren, useContext } from 'react';

const RideContext = createContext({});

export default function RideProvider({ children }: PropsWithChildren) {
  return <RideContext.Provider value={{}}></RideContext.Provider>;
}

export const useRideProvider = () => useContext(RideContext);
