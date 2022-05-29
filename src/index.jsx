import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from './utils/context/UserContext'
import { PostsProvider } from './utils/context/PostsContext'
import { AlertProvider } from './utils/context/AlertContext'
import { DarkModeProvider } from './utils/context/DarkModeContex'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <UserProvider>
    <PostsProvider>
      <AlertProvider>
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </AlertProvider>
    </PostsProvider>
  </UserProvider>
)
