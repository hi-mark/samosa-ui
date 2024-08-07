import React, { createContext, useState, ReactNode } from "react";

interface Member {
  memberName: string;
  memberId: string;
  role: string;
}

interface appData {
  userId: string;
  isLoggedIn: boolean;
  members: Member[];
}

interface AppContextProps {
  appData: appData;
  setAppData: React.Dispatch<React.SetStateAction<appData>>;
  clearContext: () => void;
}

const defaultAppData: appData = {
  userId: "",
  isLoggedIn: false,
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
