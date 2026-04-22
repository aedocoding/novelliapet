import { loginUser, logoutUser, registerUser } from "@/services/userService";
import { User } from "@/types/models";
import { createContext, useContext, useState } from "react";

interface UserContextType {
  user: User | null;
  login: (username: string) => Promise<void>;
  register: (username: string) => Promise<void>;
  logout: (userId: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(username: string) {
    const data = await loginUser(username);
    setUser(data);
  }

  async function register(username: string) {
    const data = await registerUser(username);
    setUser(data);
  }

  async function logout(userId: string) {
    const data = await logoutUser(userId);
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
