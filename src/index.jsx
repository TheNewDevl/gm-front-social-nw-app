import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  UserProvider,
  PostsProvider,
  AlertProvider,
} from './utils/context/context'
import { DarkModeProvider } from './utils/context/context'

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
