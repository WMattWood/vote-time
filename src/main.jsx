import React from 'react'
import ReactDOM from 'react-dom/client'
import BrowserProvider from './BrowserContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserProvider>
      <App />
    </BrowserProvider>
  </React.StrictMode>,
)
