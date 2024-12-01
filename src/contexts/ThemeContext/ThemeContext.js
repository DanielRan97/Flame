import React, { createContext, useState,useEffect ,useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme

  useEffect(() => {
    const favThem = localStorage.getItem('flameFavTheme');
    if(favThem){
      favThem === 'light' ? setTheme('light') : setTheme('dark')
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if(prevTheme === 'light'){
        localStorage.setItem('flameFavTheme', 'dark');
        return 'dark';
      }else{
        localStorage.setItem('flameFavTheme', 'light');
        return 'light';
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);