import { createContext, useState, useEffect } from "react";

const AuthContext = createContext(null); 

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/check", {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setLoggedInUser(data.data);
        } else {
          setLoggedInUser(null);
        }
      } catch (error) {
        console.error(error);
        setLoggedInUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  const login = (learner) => setLoggedInUser(learner);

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoggedInUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;