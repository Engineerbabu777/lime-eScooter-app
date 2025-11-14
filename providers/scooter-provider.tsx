import { createContext, PropsWithChildren, useContext, useState } from 'react';

const ScooterContext = createContext({});

export default function ScooterProvider({ children }: PropsWithChildren) {
  const [selectedScooter, setSelectedScooter] = useState(null);

  return (
    <ScooterContext.Provider
      value={{
        selectedScooter,
        setSelectedScooter,
      }}>
      {children}
    </ScooterContext.Provider>
  );
}

export const useScooter = () => useContext(ScooterContext);
