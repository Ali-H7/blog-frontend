import { createContext, useContext, useState } from 'react';
import getLoggedUser from '../helpers/getLoggedUser';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getLoggedUser());

  function login(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(getLoggedUser());
  }

  function logout() {
    localStorage.removeItem('userData');
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
