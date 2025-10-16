import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TourContext from './context/TourBookingContext.jsx'
import TourContextProvider from './context/TourBookingContext.jsx'

createRoot(document.getElementById('root')).render(
  
    <TourContextProvider>
      <App />
    </TourContextProvider>
)
