import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from './utils/context/UserContext'
import { PostsProvider } from './utils/context/PostsContext'
import { AlertProvider } from './utils/context/AlertContext'
import { DarkModeProvider } from './utils/context/DarkModeContex'
import { RequestsProvider } from './utils/context/RequestsContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <UserProvider>
    <PostsProvider>
      <AlertProvider>
        <DarkModeProvider>
          <RequestsProvider>
            <App />
          </RequestsProvider>
        </DarkModeProvider>
      </AlertProvider>
    </PostsProvider>
  </UserProvider>
)
