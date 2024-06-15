import { createContext, useContext, useState } from "react";

const AuthContent = createContext();

const initialState = {
  token: null,
  isAuthenticated: false
}

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(initialState);
  function login(token) {
    setAuthState({
      token,
      isAuthenticated: true,
    });
  }
  function logout() {
    setAuthState(initialState);
  }

  return (
    <AuthContent.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContent.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContent);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };