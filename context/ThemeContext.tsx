import React, { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

const ThemeContextProvider = (props: any) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") setTheme("light");
    else if (storedTheme === "dark") setTheme("dark");
    else localStorage.setItem("theme", "light");
  }, []);

  const toggleTheme = () => {
    const toTheme = theme === "light" ? "dark" : "light";
    setTheme(toTheme);
    localStorage.setItem("theme", toTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
