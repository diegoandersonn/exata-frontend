"use client";
import React, { createContext, useContext, useState } from "react";

type LocalizationContextType = {
  coords: { latitude: number; longitude: number } | null;
  setCoords: (coords: { latitude: number; longitude: number } | null) => void;
};
const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export function LocalizationProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  return (
    <LocalizationContext.Provider value={{ coords, setCoords }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
}