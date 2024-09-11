import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles'; // Correct path for GlobalStyles
import { theme } from './styles/theme'; // Correct path for theme
import AttendancePage from './pages/AttendancePage'; // Correct path for AttendancePage
import StationPage from './pages/StationPage'; // Correct path for StationPage
import NewUserPage from './pages/NewUserPage'; // Correct path for NewUserPage
import EditUserPortal from './pages/EditUserPortal'; // Correct path for EditUserPortal
import TopBar from './components/TopBar'; // Correct path for TopBar
import AdminLogin from './components/AdminLogin'; // Correct path for AdminLogin
import PrivateRoute from './components/PrivateRoute'; // Correct path for PrivateRoute

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <TopBar />
        <Routes>
          <Route path="/" element={<AttendancePage />} />
          <Route path="/station" element={<StationPage />} />
          
          {/* Protected Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/new-user" element={
            <PrivateRoute>
              <NewUserPage />
            </PrivateRoute>
          } />
          <Route path="/edit-user" element={
            <PrivateRoute>
              <EditUserPortal />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
