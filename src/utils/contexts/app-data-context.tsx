import { createContext, ReactNode, useContext } from 'react';
import useLocalStorageState from 'use-local-storage-state';

type AppDataContext = {
  isLoggedIn?: boolean;
  setLoginState: (isLoggedIn: boolean) => void;
}

const Context = createContext<AppDataContext>(undefined as any);

function AppDataContextProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setLoginState] = useLocalStorageState<boolean>('isLoggedIn');

  return (
    <Context.Provider value={{ isLoggedIn, setLoginState }}>
      {children}
    </Context.Provider>
  );
}

function useAppDataContext() {
  const AppDataContext = useContext(Context);
  return AppDataContext;
}

export { AppDataContext, AppDataContextProvider, useAppDataContext };