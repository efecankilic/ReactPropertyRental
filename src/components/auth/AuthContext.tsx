import { createContext, useState, ReactNode } from 'react';

export type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const flag = localStorage.getItem('token') ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(flag);
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };