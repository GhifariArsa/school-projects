import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserObject } from "../data/repository";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("current_user"));
    setUser(user);
  }, []);

  const refreshLocalStorage = async () => {
    if(user){
      const response = await getUserObject(user.EMAIL);
      const userObj = {
        ID: response.ID,
        EMAIL: response.EMAIL,
        JOIN_DATE: response.JOIN_DATE,
        USERNAME: response.USERNAME,
        BLOCKED: response.BLOCKED
      }
      localStorage.setItem("current_user", JSON.stringify(userObj))
      setUser(userObj);
    }
  };

  const logoutUser = () => {
    setUser(null);
  };
  const loginUser = () => {
    const user = JSON.parse(localStorage.getItem("current_user"));
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser, loginUser, refreshLocalStorage }}>
      {children}
    </UserContext.Provider>
  );
}
