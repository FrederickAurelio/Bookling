import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const AuthContent = createContext();

const initialState = {
  token: null,
  username: null,
  isAuthenticated: false,
};

function AuthProvider({ children }) {
  const [authState, setAuthState] = useLocalStorageState(initialState, "auth");
  const queryClient = useQueryClient();

  function login({ token, username }) {
    queryClient.removeQueries();
    setAuthState((obj) => {
      return { ...obj, token, username, isAuthenticated: true };
    });
  }

  function logout() {
    // deleteRefreshToken();
    queryClient.removeQueries();
    setAuthState(initialState);
    toast("Logout");
  }

  // function deleteRefreshToken() {
  //   document.cookie =
  //     "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  // }

  return (
    <AuthContent.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContent.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContent);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
