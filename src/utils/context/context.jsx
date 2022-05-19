import React, { useState, createContext } from 'react'

//user
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

//Posts context
export const PostsContext = createContext()
export const PostsProvider = ({ children }) => {
  const [data, setPostData] = useState([])

  const setData = (posts) => {
    setPostData(posts)
  }

  return (
    <PostsContext.Provider value={{ data, setData }}>
      {children}
    </PostsContext.Provider>
  )
}

//FeedBack alert context

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
