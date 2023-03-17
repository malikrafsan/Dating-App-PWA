import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "../api";
import {FullPageLoading} from "../components";
interface IAuthProviderProps {
  children: React.ReactNode;
}

type AuthContextType = {
  token: string | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, username: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  token: "",
  login: async (_: string, __: string) => {},
  logout: () => {},
  register: async (_: string, __: string, ___: string) => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

type Permission = "UNAUTHORIZED" | "USER" | "ADMIN";

type PermissionData = {
  [key: string]: Permission[] | PermissionData;
}

const PERMISSIONS :PermissionData  = {
  "/profile": ["USER"],
  "/login": ["UNAUTHORIZED"],
  "/register": ["UNAUTHORIZED"],
  /*
  Bisa nested, contoh
  "/admin": {
    "/channels": ["ADMIN"],
  } 
  */
};

interface IAuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children } : IAuthGuardProps) => {
  const { token } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const checkPermission = (path: string, role: Permission, permissionData: PermissionData = PERMISSIONS) : boolean => {
    const keypath = Object.keys(permissionData).find((key) => path.startsWith(key));
    if (!keypath) return false;
    const permissions = permissionData[path];
    // Check if object, traverse again
    if (!Array.isArray(permissions)) {
      return checkPermission(path.slice(keypath.length + 1), role, (permissions as PermissionData));
    }
    else {
      return (permissions as Permission[]).includes(role) || (permissions as Permission[]).includes("UNAUTHORIZED");
    }
  };
  useEffect(() => {
    setIsLoading(true);
    if (!token) {
      checkPermission(pathname, "UNAUTHORIZED") ? null : navigate("/login");
    } else {
      Auth.self().then((res) => {
        if (res && res.data) {
          checkPermission(pathname, res.data.account.role) ? (
            (pathname === "/login" || pathname === "/register") ? (
              res.data.account.role === "USER" ? navigate("/profile") : navigate("/admin")
            ) : null
          ) : navigate("/login");
        } else {
          navigate("/login");
        }
      });
    }
    setIsLoading(false);
  }, [pathname, token]);
  

  if (isLoading)
    return <FullPageLoading />;

  return <>{children}</>;
};

export const AuthProvider = (props: IAuthProviderProps) => {
  const [token, setToken] = useState<string>();

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
    setToken(undefined);
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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  return (
    <AuthContext.Provider
      value={{ token, login: loginHandler, logout: logoutHandler, register: registerHandler }}
    >
      <AuthGuard>
        {props.children}
      </AuthGuard>
    </AuthContext.Provider>
  );
};


