import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  UserProvider,
  PostsProvider,
  AlertProvider,
} from './utils/context/context'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <UserProvider>
    <PostsProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </PostsProvider>
  </UserProvider>
)
