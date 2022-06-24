import { createContext, ReactNode, useContext, useCallback } from 'react';
import useLocalStorageState from 'use-local-storage-state';

type AppDataContext = {
  isLoggedIn?: boolean;
  username?: string;
  setUsername: (username?: string) => void;
  clearLoginData: VoidFunction;
}

const Context = createContext<AppDataContext>(undefined as any);

function AppDataContextProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useLocalStorageState<string>('username');

  const clearLoginData = useCallback(() => {
    setUsername(undefined);
  }, [setUsername]);

  const isLoggedIn = Boolean(username);

  return (
    <Context.Provider value={{ isLoggedIn, username, setUsername, clearLoginData }}>
      {children}
    </Context.Provider>
  );
}

function useAppDataContext() {
  const AppDataContext = useContext(Context);
  return AppDataContext;
}

export { AppDataContext, AppDataContextProvider, useAppDataContext };