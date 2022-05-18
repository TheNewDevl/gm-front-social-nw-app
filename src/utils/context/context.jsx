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

//comments
export const CommentsContext = createContext()

export const CommentsProviter = ({ children }) => {
  const [dataComment, setDataCommentState] = React.useState([])
  const [commentsCount, setCommentsCountState] = React.useState(undefined)

  const setDataComment = (data) => {
    setDataCommentState(data)
  }

  const setCommentsCount = (data) => {
    setCommentsCountState(data)
  }
  return (
    <CommentsContext.Provider
      value={{ dataComment, setDataComment, commentsCount, setCommentsCount }}
    >
      {children}
    </CommentsContext.Provider>
  )
}
