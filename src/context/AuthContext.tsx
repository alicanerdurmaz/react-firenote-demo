import React, { useEffect, useState, createContext, useContext } from 'react';
import { auth } from '../components/Firebase/firebase';

const AuthContext = createContext<any | undefined>(undefined);

export const AuthProvider: React.FC = props => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(undefined);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      authUser ? setCurrentUser(authUser) : setCurrentUser(null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{props.children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
};
