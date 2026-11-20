import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  function login() {
    setMessage("Login will be available when the API is connected. You are not logged in yet.");
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, message, setMessage }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
