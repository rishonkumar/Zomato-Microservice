import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from './context/AppContext.tsx';


export const authService = "http://localhost:5030"


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <GoogleOAuthProvider clientId="469762553854-5ro933ocdu9ceipu2l1v2brti97a73e2.apps.googleusercontent.com">
      <AppProvider>
        <App />
      </AppProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
