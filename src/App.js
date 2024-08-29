import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import Papa from 'papaparse'; // CSV parsing library
import axios from 'axios'; // HTTP client for sending data to the server
import AttendancePage from './pages/AttendancePage';
import StationPage from './pages/StationPage';
import NewUserPage from './pages/NewUserPage';
import TopBar from './components/TopBar';

function App() {
  // Handle CSV file upload
  const handleFileUpload = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true, // Skips empty lines in the CSV
      complete: (results) => {
        const data = results.data;
        sendDataToServer(data);
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
      }
    });
  };

  // Send parsed CSV data to the server
  const sendDataToServer = async (data) => {
    try {
      const response = await axios.post('http://192.168.27.143:5000/api/upload-csv', data);
      console.log('Data uploaded successfully:', response.data);
      alert('Data uploaded successfully!');
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Failed to upload data. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <TopBar onFileUpload={handleFileUpload} />
        <Routes>
          <Route path="/" element={<AttendancePage />} />
          <Route path="/station" element={<StationPage />} />
          <Route path="/new-user" element={<NewUserPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
