import { ThemeProvider } from 'styled-components'
import { theme } from './app/theme'
import './App.css'
import { GlobalStyle } from './app/GlobalStyle'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { AuthProvider } from './features/auth/AuthContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </ThemeProvider>

  )
}
export default App
