import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ProgressProvider } from './hooks/useMissionProgress'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><HashRouter><ProgressProvider><App /></ProgressProvider></HashRouter></React.StrictMode>
)
