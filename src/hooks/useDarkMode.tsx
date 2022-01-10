import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useDarkMode = (): {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
} => {
  const darkModeQuery = window?.matchMedia("(prefers-color-scheme: dark)");
  const isDarkModeFromOs = darkModeQuery?.matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    "darkMode",
    isDarkModeFromOs
  );

  useEffect(() => {
    const darkModeHandler = ({ matches }: MediaQueryListEvent): void =>
      setIsDarkMode(matches);
    darkModeQuery?.addListener(darkModeHandler);
    return () => darkModeQuery.removeEventListener("change", darkModeHandler);
  }, [darkModeQuery, setIsDarkMode]);

  return {
    isDarkMode,
    toggleDarkMode: () => setIsDarkMode((prev) => !prev),
  } as const;
};

export default useDarkMode;
