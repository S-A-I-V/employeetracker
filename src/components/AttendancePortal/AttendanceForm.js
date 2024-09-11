import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FiUser } from 'react-icons/fi';
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

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.glass};
  border-radius: 10px;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent}; 
  }
`;

const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 1.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const AttendanceForm = () => {
  const [uid, setUid] = useState('');
  const [message, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRef = useRef(null); // To automatically focus the input field

  // Automatically focus the input field on component mount or page refresh
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputChange = (event) => {
    // Trim the input value before saving it to state
    setUid(event.target.value.trim());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsDisabled(true);

    try {
      const response = await axios.post('http://localhost:5000/api/update-attendance', {
        employeeid: uid
      });

      if (response.status === 200) {
        setMessage('Attendance recorded successfully!!!');
        window.alert('Attendance recorded successfully!!!');
      } else {
        setMessage('Failed to record attendance!!!');
        window.alert('Failed to record attendance!!!');
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
      setMessage('Error recording attendance.');
    }

    // Clear the UID input after submission
    setUid('');

    // Refocus after the alert is closed, using setTimeout with a 0ms delay
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);

    // Re-enable the button immediately
    setIsDisabled(false);
  };

  return (
    <Container>
      <GlassCard>
        <Logo src={require('../../assets/images/logo.png')} alt="Lenskart" />
        <Title>Attendance Portal</Title>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <FiUser size={24} color="#333" />
            <Input
              type="text"
              placeholder="Enter UID or scan barcode"
              value={uid}
              onChange={handleInputChange}
              required
              disabled={isDisabled}
              ref={inputRef} // Reference for automatic focus
            />
          </InputWrapper>
          <Button type="submit" disabled={isDisabled}>
            PRESENT SIR!!!
          </Button>
        </form>
        {message && <p>{message}</p>}
        <p>
          Naye ho? <a href="/new-user">Register here</a>
        </p>
      </GlassCard>
    </Container>
  );
};

export default AttendanceForm;
