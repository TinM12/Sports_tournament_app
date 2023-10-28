import { ThemeProvider } from '@emotion/react';
import DefaultTheme from './DefaultTheme';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;