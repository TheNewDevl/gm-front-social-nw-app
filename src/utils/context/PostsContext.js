import React, { useState, createContext } from 'react'

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
