import { createContext, useState } from "react";
export const Context = createContext();

const AppContext = ({ children }) => {
  const [mode, setMode] = useState(true);
  const [isUserLogin, setIsUserLogin] = useState(false);
  return (
    <Context.Provider value={{ mode, setMode, isUserLogin, setIsUserLogin }}>
      {children}
    </Context.Provider>
  );
};

export default AppContext;
