import React, { useState } from 'react';
import styled from 'styled-components';
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

const Select = styled.select`
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  border-radius: 10px;
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

const EditUserPortal = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [userData, setUserData] = useState(null);
  const [stationId, setStationId] = useState('');
  const [shift, setShift] = useState('');

  const handleSearch = () => {
    axios.get(`http://localhost:5000/api/user/${employeeId}`)
      .then(response => {
        setUserData(response.data);
        setStationId(response.data.stationid);
        setShift(response.data.shift);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        alert('User not found');
      });
  };

  const handleUpdateUser = () => {
    axios.post('http://localhost:5000/api/update-user', {
      employeeid: userData.employeeid,
      stationid: stationId,
      shift: shift,
    })
    .then(response => {
      alert('User updated successfully');
      setUserData(null);
      setStationId('');
      setShift('');
      setEmployeeId('');
    })
    .catch(error => console.error('Error updating user:', error));
  };

  const handleRemoveUser = () => {
    axios.delete(`http://localhost:5000/api/remove-user/${userData.employeeid}`)
      .then(response => {
        alert('User removed successfully');
        setUserData(null);
        setEmployeeId('');
      })
      .catch(error => console.error('Error removing user:', error));
  };

  return (
    <Container>
      <GlassCard>
        <Title>Edit or Remove User</Title>
        {!userData ? (
          <Form>
            <InputWrapper>
              <Input
                type="text"
                placeholder="Enter Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </InputWrapper>
            <Button type="button" onClick={handleSearch}>Search User</Button>
          </Form>
        ) : (
          <Form>
            <InputWrapper>
              <Input type="text" value={userData.name} disabled />
            </InputWrapper>
            <InputWrapper>
              <Input type="text" placeholder="Station ID" value={stationId} onChange={e => setStationId(e.target.value)} />
            </InputWrapper>
            <InputWrapper>
              <Select value={shift} onChange={e => setShift(e.target.value)}>
                <option value="">Select Shift</option>
                <option value="6am-2pm">6am-2pm</option>
                <option value="2pm-10pm">2pm-10pm</option>
                <option value="10pm-6am">10pm-6am</option>
              </Select>
            </InputWrapper>
            <Button type="button" onClick={handleUpdateUser}>Update User</Button>
            <Button type="button" onClick={handleRemoveUser} style={{ backgroundColor: 'red' }}>Remove User</Button>
          </Form>
        )}
      </GlassCard>
    </Container>
  );
};

export default EditUserPortal;
