import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import AttendancePage from './pages/AttendancePage';
import StationPage from './pages/StationPage';
import NewUserPage from './pages/NewUserPage';
import EditUserPortal from './pages/EditUserPortal';
import TopBar from './components/TopBar';
import AdminLogin from './components/AdminLogin';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAdmin(true);
    localStorage.setItem('isAdmin', 'true');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <TopBar isAdmin={isAdmin} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<AttendancePage />} />
          <Route path="/station" element={<StationPage />} />
          <Route path="/new-user" element={isAdmin ? <NewUserPage /> : <Navigate to="/admin-login" />} />
          <Route path="/edit-user" element={isAdmin ? <EditUserPortal /> : <Navigate to="/admin-login" />} />
          <Route path="/admin-login" element={<AdminLogin handleLogin={handleLogin} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
