import React, { createContext, useState, useCallback, useContext } from "react";
import { Auth } from "../api";
interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  token: null,
  login: async (username: string, password: string) => {},
  logout: () => {},
});

export const AuthProvider = (props: IAuthProviderProps) => {
  const [token, setToken] = useState(null);

  const loginHandler = useCallback(
    async (username: string, password: string) => {
      const res = await Auth.login(username, password);
      if (res && res.data?.token) {
        setToken(res.data?.token);
      }
    },
    []
  );

  const logoutHandler = useCallback(() => {
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, login: loginHandler, logout: logoutHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
