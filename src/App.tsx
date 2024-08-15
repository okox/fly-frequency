import { CssBaseline, ThemeProvider } from '@mui/material'

import theme from './styles/theme';
import Home from './pages/home';
import Layout from './components/Layout';


function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Layout>
          <Home />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default App
