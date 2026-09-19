import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    const name = sessionStorage.getItem('name');
    if (token) {
      setIsLoggedIn(true);
      setUserName(name || '');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userName, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAppContext = () => useContext(AuthContext);
