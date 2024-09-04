import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, MenuItem, Button as MuiButton } from '@mui/material';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 4rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

const GlassCard = styled.div`
  backdrop-filter: blur(15px);
  background: ${({ theme }) => theme.colors.glass};
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 600px;
  width: 100%;
  text-align: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.0001);
    box-shadow: 0 10px 40px rgba(31, 38, 135, 0.5);
  }
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

const Logo = styled.img`
  width: 120px;
  margin-bottom: 1.5rem;
`;

const NewUserForm = () => {
  const [name, setName] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [gender, setGender] = useState('');
  const [qualification, setQualification] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      employeeid: employeeID,
      gender,
      education: qualification,
      stationid: null, // Add any default values or other fields as necessary
      shift: null, // Add shift or other fields if necessary
      attendance: '0000000000000000000000000000000', // Default value for attendance
      agency: 'N/A', // Any additional field that needs to be included
      doj: new Date().toISOString().slice(0, 10), // Use current date as DOJ for demonstration
      ageing: 0, // Default value for demonstration
      throughput: 0 // Default value for demonstration
    };

    try {
      const response = await fetch('http://localhost:5000/api/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('User registered successfully');
        // Clear form
        setName('');
        setEmployeeID('');
        setGender('');
        setQualification('');
      } else {
        alert('Failed to register user');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while registering the user.');
    }
  };

  return (
    <Container>
      <GlassCard>
        <Logo src={require('../../assets/images/logo.png')} alt="Lenskart" />
        <Title>New User Registration</Title>
        <Form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
              },
            }}
          />
          <TextField
            label="Employee ID"
            variant="outlined"
            fullWidth
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
              },
            }}
          />
          <TextField
            select
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            variant="outlined"
            fullWidth
            InputProps={{
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
              },
            }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            label="Qualification"
            variant="outlined"
            fullWidth
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
              },
            }}
          />
          <Button variant="contained" type="submit">
            Register
          </Button>
        </Form>
      </GlassCard>
    </Container>
  );
};

export default NewUserForm;
