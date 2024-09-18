import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, MenuItem, Button as MuiButton } from '@mui/material';
import axios from 'axios'; 

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 5rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

const GlassCard = styled.div`
  backdrop-filter: blur(15px);
  background: ${({ theme }) => theme.colors.glass};
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 500px;
  width: 100%;
  text-align: center;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.0001);
    box-shadow: 0 10px 40px rgba(31, 38, 135, 0.5);
  }
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Button = styled(MuiButton)`
  && {
    padding: 1rem;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    font-size: 1.2rem;
    transition: background-color 0.3s ease;
    margin-top: 1rem;

    &:hover {
      background-color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const StationIDForm = () => {
  const [shift, setShift] = useState('');
  const [uid, setUid] = useState('');
  const [stationId, setStationId] = useState('');

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleUIDChange = (event) => {
    const trimmedUID = event.target.value.trim(); // sahi se entry to kr nhi skte
    setUid(trimmedUID); 
  };

  const handleStationIdChange = (event) => {
    const inputValue = event.target.value;
    setStationId(inputValue.trim().toUpperCase()); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      employeeid: uid, 
      stationid: stationId,
      shift: shift,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/update-user', data);
      console.log(response.data);
      alert('Station ID and shift updated successfully!');

      setUid('');
      setStationId('');
      setShift('');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update Station ID and shift.');
    }
  };

  return (
    <Container>
      <GlassCard>
        <Logo src={require('../../assets/images/logo.png')} alt="Lenskart" />
        <Title>Station ID Portal</Title>
        <Form onSubmit={handleSubmit}>
          <TextField
            label="UID"
            variant="outlined"
            fullWidth
            value={uid}
            onChange={handleUIDChange} 
            InputProps={{
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
              },
            }}
            required
          />
          <TextField
            label="Station ID"
            variant="outlined"
            fullWidth
            value={stationId}
            onChange={handleStationIdChange} 
            InputProps={{
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
              },
            }}
            required
          />
          <TextField
            select
            label="Shift"
            value={shift}
            onChange={handleShiftChange}
            variant="outlined"
            fullWidth
            InputProps={{
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
              },
            }}
            required
          >
            <MenuItem value="6am-2pm">6am-2pm</MenuItem>
            <MenuItem value="2pm-10pm">2pm-10pm</MenuItem>
            <MenuItem value="10pm-6am">10pm-6am</MenuItem>
          </TextField>
          <Button variant="contained" type="submit">
            Let's get working!!!
          </Button>
        </Form>
      </GlassCard>
    </Container>
  );
};

export default StationIDForm;
