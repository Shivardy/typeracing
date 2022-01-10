import { useReducer } from "react";
import createContext from "../hooks/createContext";
import useDarkMode from "../hooks/useDarkMode";
import { AppContext } from "../types/commons";
import { initialState } from "../utils/constants";
import appReducer from "./appReducer";

const [appContext, AppProvider] = createContext<AppContext>();

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <AppProvider value={{ ...state, dispatch, isDarkMode, toggleDarkMode }}>
      {children}
    </AppProvider>
  );
};

export { appContext };
