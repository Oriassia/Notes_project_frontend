import { formatJWTTokenToUser } from "@/lib/utils";
import api from "@/services/api.service";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && loggedInUser === null) {
      createLoggedInUser();
    }
  }, []);

  async function createLoggedInUser() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await api.get("/users");
        setLoggedInUser({
          userId: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          token,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        logout(); // Log out user if there's an error fetching data
      }
    }
  }

  const login = async (userIdAndToken) => {
    localStorage.setItem("token", userIdAndToken.token);
    const { data } = await api.get("/users");
    setLoggedInUser({
      userId: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      token: userIdAndToken.token,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedInUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
