import { useEffect, useState } from "react";
import { refreshToken } from "../api/apiAuth";
import { useAuth } from "../context/AuthContext";

export function useInitialize() {
  const { login, logout, authState: { isAuthenticated } } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      // if (isAuthenticated) {
      //   setIsLoading(false);
      //   return;
      // }
      try {
        // Now attempt to refresh the access token using the refresh token
        const response = await refreshToken();

        if (response && response.data && response.data.access) {
          const newAccessToken = response.data.access;
          login(newAccessToken); // Update the context with the new access token
        }

      } catch (error) {
        console.error("Failed to refresh access token:", error);
        // logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [login, logout, isAuthenticated]);

  return isLoading;
}
