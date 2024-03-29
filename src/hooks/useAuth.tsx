import {
  useContext,
  useCallback,
  useState,
  useMemo,
  createContext,
  useEffect,
} from "react";
import { User } from "src/types";
import {
  storeToken,
  removeToken,
  useSignIn,
  useFetchCurrentUser,
} from "src/api/authApi";

type AuthContextType = {
  user?: User;
  fullName: string;
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
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const user = await fetchCurrentUser();
      setUser(user);
    } catch (error) {
      setUser(undefined);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  async function logIn(email: string, password: string) {
    const user = await signIn({ email, password });
    storeToken(user.token);
    setToken(user.token);
  }

  async function logOut() {
    removeToken();
    setUser(undefined);
  }

  const isAuthenticated = Boolean(user);

  const fullName = [user?.firstName, user?.lastName].join(" ");

  const values = useMemo<AuthContextType>(
    () => ({
      user,
      fullName,
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

export function useAuth() {
  return useContext(AuthContext);
}
