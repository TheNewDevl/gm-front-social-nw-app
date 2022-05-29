import { createContext, useState } from 'react'

export const AlertContext = createContext()
export const AlertProvider = ({ children }) => {
  const [alertStates, setOpenAlertState] = useState({
    open: false,
    type: '',
    message: '',
  })

  const setAlertStates = (boolist) => {
    setOpenAlertState(boolist)
  }

  return (
    <AlertContext.Provider value={{ alertStates, setAlertStates }}>
      {children}
    </AlertContext.Provider>
  )
}
