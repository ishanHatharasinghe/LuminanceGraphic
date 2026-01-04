// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const ADMIN_EMAILS = [
  "ishanhatharasinghe222@gmail.com",
  "luminancegraphic@gmail.com"
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const isAdmin = currentUser && ADMIN_EMAILS.includes(currentUser.email);

  const value = {
    currentUser,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
