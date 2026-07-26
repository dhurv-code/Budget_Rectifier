"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MonthContextType {
  selectedMonth: Date;
  setSelectedMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthContext = createContext<MonthContextType | null>(null);

export function MonthProvider({ children }: { children: ReactNode }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  return (
    <MonthContext.Provider
      value={{ selectedMonth, setSelectedMonth }}
    >
      {children}
    </MonthContext.Provider>
  );
}

export function useMonth() {
  const context = useContext(MonthContext);

  if (!context) {
    throw new Error("useMonth must be used inside MonthProvider");
  }

  return context;
}