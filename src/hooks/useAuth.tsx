import { useContext, useState, useMemo, createContext, useEffect } from "react";
import { User } from "../types";
import {
  setToken,
  removeToken,
  useSignIn,
  useFetchCurrentUser,
} from "../api/authApi";

type AuthContextType = {
  user?: User;
  isLoading: boolean;
  isAuthenticated: boolean;
  logIn: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<any>;
  loadUser: () => void;
};

// eslint-disable-next-line
export const AuthContext = createContext<AuthContextType>(undefined!);

export function AuthProvider(props: any) {
  const signIn = useSignIn();
  const fetchCurrentUser = useFetchCurrentUser();
  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  async function loadUser() {
    try {
      const user = await fetchCurrentUser();
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

  async function logIn(email: string, password: string) {
    const user = await signIn({ email, password });
    setUser(user);
    setToken(user.token);
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
    }),
    // eslint-disable-next-line
    [user, isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={values} {...props} />;
}

export default function useAuth() {
  return useContext(AuthContext);
}
