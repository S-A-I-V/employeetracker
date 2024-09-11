import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.glass};
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
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
`;

const AdminLogin = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple hardcoded check for admin login (can be replaced with a real backend auth check)
    if (username === 'Admin' && password === 'Bhiwadi@2024') {
      handleLogin(); // Call the login function from App.js to update isAdmin state
      navigate('/new-user'); // Redirect to New User page after login
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container>
      <GlassCard>
        <Title>Admin Login</Title>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputWrapper>
          <Button type="submit">Login</Button>
        </Form>
      </GlassCard>
    </Container>
  );
};

export default AdminLogin;
