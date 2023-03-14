import React, { createContext, useState, useCallback, useContext } from "react";
import { Auth } from "../api";
interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  token: null,
  login: async (_: string, __: string) => {},
  logout: () => {},
  register: async (_: string, __: string, ___: string) => {},
});

export const AuthProvider = (props: IAuthProviderProps) => {
  const [token, setToken] = useState(null);

  const loginHandler = useCallback(
    async (username: string, password: string) => {
      const res = await Auth.login(username, password);
      if (res && res.data?.token) {
        setToken(res.data?.token);
        localStorage.setItem("token", res.data?.token);
      }
    },
    []
  );

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  const registerHandler = useCallback(
    async (email: string, username: string, password: string) => {
      const res = await Auth.register(email, username, password);
      if (res && res.data?.token) {
        setToken(res.data?.token);
      }
    },
    []
  );



  return (
    <AuthContext.Provider
      value={{ token, login: loginHandler, logout: logoutHandler, register: registerHandler }}
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
