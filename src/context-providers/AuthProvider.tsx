import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "../api";
import {FullPageLoading} from "../components";
import {ROLE, Permission, PermissionData} from "../types/struct";

interface IAuthProviderProps {
  children: React.ReactNode;
}

type AuthContextType = {
  token: string | undefined;
  refreshToken: () => string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, username: string, password: string, univ_slug: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  token: "",
  refreshToken: () => null,
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

const UserTypes = [
  {
    name: "Unauthorized",
    role: ROLE.UNAUTHORIZED,
    redirect: "/login",
    rank: 0,
  },
  {
    name: "User",
    role: ROLE.USER,
    redirect: "/profile",
    rank: 1,
  },
  {
    name: "Admin",
    role: ROLE.ADMIN,
    redirect: "/admin",
    rank: 2,
  }
] as const;

const PERMISSIONS: PermissionData  = {
  "/profile": [ROLE.USER, ROLE.ADMIN],
  "/login": [ROLE.UNAUTHORIZED],
  "/register": [ROLE.UNAUTHORIZED],
  "/channel": [ROLE.ADMIN],
  "/chat": [ROLE.USER, ROLE.ADMIN],
  "/pair": [ROLE.USER, ROLE.ADMIN],
  "/matchlist": [ROLE.USER, ROLE.ADMIN],
};

interface IAuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children } : IAuthGuardProps) => {
  const { token, refreshToken } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const getKeyPermission = (path: string) => {
    return Object.keys(PERMISSIONS).find((key) => path.includes(key)); // change to regex later
  };

  const getUserRole = async (token: string | undefined): Promise<Permission> => {
    if (!token) {
      return ROLE.UNAUTHORIZED;
    }

    const res = await Auth.self();
    if (res && res.data) {
      return res.data.account.role;
    }
    return ROLE.UNAUTHORIZED;
  };

  const onMount = async (pathname: string, token: string | undefined) => {
    setIsLoading(true);

    const keyPermission = getKeyPermission(pathname);
    const permissions = keyPermission ? PERMISSIONS[keyPermission] : null;
    
    const userRole = await getUserRole(token);
    const userType = UserTypes.find((type) => type.role === userRole);
    const cleanType = userType ? userType : UserTypes[0]; // UNAUTHORIZED

    if (!permissions) {
      // alert("No permissions for this page");
      navigate(cleanType.redirect);
      return;
    }

    if (!permissions.includes(userRole)) {
      // alert("You don't have permission to access this page" + "\nPermission: " + JSON.stringify(permissions) + "\nUserRole: " + userRole + "\nUserType: " + cleanType.name + "\nRedirecting to: " + cleanType.redirect);
      navigate(cleanType.redirect);
      return;
    }
    setIsLoading(false);    
  };

  useEffect(() => {
    let freezeToken = token;

    if (!freezeToken) {
      const storedToken = refreshToken();
      if (storedToken) {
        freezeToken = storedToken;
      }
    }

    onMount(pathname, freezeToken);
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
    async (email: string, username: string, password: string, univ_slug:string) => {
      const res = await Auth.register(email, username, password, univ_slug);
      if (res && res.data?.token) {
        setToken(res.data?.token);
      }
    },
    []
  );

  const refreshToken = () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    return storedToken;
  };

  useEffect(() => {
    refreshToken();
  }, []);


  return (
    <AuthContext.Provider
      value={{ token, refreshToken, login: loginHandler, logout: logoutHandler, register: registerHandler }}
    >
      <AuthGuard>
        {props.children}
      </AuthGuard>
    </AuthContext.Provider>
  );
};


