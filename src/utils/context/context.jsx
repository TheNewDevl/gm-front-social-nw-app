import React, { useState, createContext } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, saveUser] = useState('')
  const [hasProfile, updateValue] = useState(false)

  const setUser = (user) => {
    saveUser(user)
  }
  const setHasProfile = (profile) => {
    updateValue(profile)
  }
  return (
    <UserContext.Provider value={{ user, setUser, hasProfile, setHasProfile }}>
      {children}
    </UserContext.Provider>
  )
}
