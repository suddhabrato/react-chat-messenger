import { createContext, useState } from "react";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem("@token") ? true : false
  );

  return (
    <UserContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
