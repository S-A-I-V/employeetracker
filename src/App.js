import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import AttendancePage from './pages/AttendancePage';
import StationPage from './pages/StationPage';
import NewUserPage from './pages/NewUserPage';
import EditUserPortal from './pages/EditUserPortal';
import TopBar from './components/TopBar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <TopBar />
        <Routes>
          <Route path="/" element={<AttendancePage />} />
          <Route path="/station" element={<StationPage />} />
          <Route path="/new-user" element={<NewUserPage />} />
          <Route path="/edit-user" element={<EditUserPortal />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
