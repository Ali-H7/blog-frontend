import { Outlet } from 'react-router';
import Layout from './components/Layout';
import { createContext, useContext, useState } from 'react';
import getLoggedUser from './helpers/getLoggedUser';

export const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

function App() {
  const loggedUser = getLoggedUser();
  const [user, setUser] = useState(loggedUser);

  function login(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(getLoggedUser());
  }

  function logout() {
    localStorage.removeItem('userData');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Layout>
        <Outlet />
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;
