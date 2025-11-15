import { createContext, useContext } from 'react';

const AuthContext = createContext<null | any>({});

export default function AuthProvider({ children }) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export const useAuthProvider = () => useContext(AuthContext);
