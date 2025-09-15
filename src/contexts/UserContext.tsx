"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { IUser } from "@/types/user.type";

type UserContextType = {
  user: IUser | null;
  setUser: (u: IUser | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, initialUser }: { children: React.ReactNode; initialUser?: IUser | null }) {
  const [user, setUser] = useState<IUser | null>(initialUser ?? null);
  const value = useMemo(() => ({ user, setUser }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
