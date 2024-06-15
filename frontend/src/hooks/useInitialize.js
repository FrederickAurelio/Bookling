import { useEffect, useState } from "react";
import { refreshToken } from "../api/apiAuth";
import { useAuth } from "../context/AuthContext";

export function useInitialize() {
  const { login, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await refreshToken(); // Await the refresh token request
        if (response && response.data && response.data.access) {
          const newAccessToken = response.data.access;
          login(newAccessToken); // Update the context with the new access token
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("No valid refresh token available.");
        } else {
          console.error("Failed to refresh access token:", error);
        }
        logout();
      } finally {
        setIsLoading(false); // Set loading to false after initialization
      }
    };

    initializeAuth();
  }, [login, logout]);

  return isLoading;
}
