import React, { createContext, useState, ReactNode } from "react";

interface Member {
  name: string;
  userId: string;
  role: string;
}

interface appData {
  userId: string;
  members: Member[];
}

interface AppContextProps {
  appData: appData;
  setAppData: React.Dispatch<React.SetStateAction<appData>>;
  clearContext: () => void;
}

const defaultAppData: appData = {
  userId: "",
  members: [],
};

const AppContext = createContext<AppContextProps>({
  appData: defaultAppData,
  setAppData: () => {},
  clearContext: () => {},
});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [appData, setAppData] = useState<appData>(defaultAppData);

  const clearContext = () => {
    setAppData(defaultAppData);
  };

  return (
    <AppContext.Provider value={{ appData, setAppData, clearContext }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
