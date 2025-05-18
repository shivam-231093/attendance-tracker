import React, { createContext, useState } from 'react';

// Create the Theme Context
export const ThemeContext = createContext();

// Create the Theme Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("Light");
  const [font, setFont] = useState("Small"); // Add font state

  return (
    <ThemeContext.Provider value={{ theme, setTheme, font, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
};