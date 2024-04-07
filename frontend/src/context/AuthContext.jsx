import { createContext } from 'react';
import { useState } from 'react';
import { localStorage } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [authState, setAuthState] = useState(JSON.parse(localStorage.getItem('authState') || null));
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}