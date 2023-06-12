import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem("@token") ? true : false
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await auth?.currentUser?.getIdToken(true);
        localStorage.setItem("@token", token);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
