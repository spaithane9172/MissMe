import { createContext, useState } from "react";
export const Context = createContext();

const AppContext = ({ children }) => {
  const [mode, setMode] = useState(true);
  return (
    <Context.Provider value={{ mode, setMode }}>{children}</Context.Provider>
  );
};

export default AppContext;
