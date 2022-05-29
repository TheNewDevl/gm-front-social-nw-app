import React, { useState, createContext } from 'react'

export const DarkModeContext = createContext()
export const DarkModeProvider = ({ children }) => {
  const [mode, setModeState] = useState('light')

  const setDarkMode = (boolist) => {
    setModeState(boolist)
  }

  return (
    <DarkModeContext.Provider value={{ mode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}
