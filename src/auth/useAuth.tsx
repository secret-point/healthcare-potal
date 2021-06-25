import { useContext, useState, useMemo, createContext, useEffect } from "react";
import { Nullable, User } from "../types";
import { useFetchUser, useSignIn } from "../api/authApi";

type AuthContextType = {
  user?: User;
  isLoading: boolean;
  isAuthenticated: boolean;
  logIn: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<any>;
  loadUser: () => void;
  getToken: () => Nullable<string>;
  removeToken: () => void;
};

export const AuthContext = createContext<AuthContextType>(undefined!);

export function AuthProvider(props: any) {
  const signIn = useSignIn();
  const fetchUser = useFetchUser();
  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  async function loadUser() {
    try {
      const user = await fetchUser();
      setUser(user);
    } catch (error) {
      setUser(undefined);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  function getToken() {
    return sessionStorage.getItem("token");
  }

  function removeToken() {
    sessionStorage.removeItem("token");
  }

  async function logIn(email: string, password: string) {
    const user = await signIn(email, password);
    setUser(user);
  }

  async function logOut() {
    removeToken();
    setUser(undefined);
  }

  const isAuthenticated = Boolean(user);

  const values = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      logIn,
      logOut,
      loadUser,
      getToken,
      removeToken,
    }),
    // eslint-disable-next-line
    [user, isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={values} {...props} />;
}

export default function useAuth() {
  return useContext(AuthContext);
}
