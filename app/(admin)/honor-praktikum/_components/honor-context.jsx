"use client";

import { createContext, useContext, useState } from "react";

const HonorContext = createContext(null);

export function HonorProvider({ children, initialData }) {
  const [data, setData] = useState(initialData);
  
  return (
    <HonorContext.Provider value={{ data, setData }}>
      {children}
    </HonorContext.Provider>
  );
}

export function useHonor() {
  const context = useContext(HonorContext);
  if (!context) {
    throw new Error("useHonor must be used within a HonorProvider");
  }
  return context;
}