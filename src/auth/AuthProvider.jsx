import { createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
import { API_BASE_URL } from "../../config.js";

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/check`, {
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
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
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
