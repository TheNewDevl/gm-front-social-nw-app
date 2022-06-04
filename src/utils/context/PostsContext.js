import React, { useState, createContext } from 'react'

export const PostsContext = createContext()
export const PostsProvider = ({ children }) => {
  const [data, setPostData] = useState([])
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [noContent, setNoContent] = useState(false)

  const setData = (posts) => {
    setPostData(posts)
  }

  return (
    <PostsContext.Provider
      value={{
        data,
        setData,
        error,
        setError,
        isLoading,
        setIsLoading,
        noContent,
        setNoContent,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}
