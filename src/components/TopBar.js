import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = styled.nav`
  background: ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accentLight};
    transform: translateY(-2px);
    box-shadow: 0 12px 50px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
`;

const LogoText = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
    gap: 1rem;
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: white;
  font-size: 1.6rem;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  &.active {
    font-weight: bold;
    border-bottom: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;

const UploadButtonContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  background: ${({ theme }) => theme.colors.glass};
  border-radius: 10px;
  padding: 0.5rem 1rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 40px rgba(31, 38, 135, 0.5);
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const HiddenFileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 100px;
  text-align: right;
  opacity: 0;
  cursor: pointer;
`;

const ButtonLabel = styled.span`
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: scale(1.05);
    box-shadow: 0 10px 40px rgba(31, 38, 135, 0.5);
  }
`;

const TopBar = ({ isAdmin, handleLogout }) => {
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios
        .post('http://localhost:5000/api/upload-csv', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('Upload success:', response.data);
        })
        .catch((error) => {
          console.error('Upload error:', error);
        });
    }
  };

  return (
    <Navbar>
      <LogoContainer>
        <Logo src={require('../assets/images/logo.png')} alt="Lenskart Logo" />
        <LogoText>Lenskart</LogoText>
      </LogoContainer>
      <NavLinks>
        <NavLinkStyled to="/" exact activeClassName="active">
          Attendance
        </NavLinkStyled>
        <NavLinkStyled to="/station" activeClassName="active">
          Station ID
        </NavLinkStyled>
        <NavLinkStyled to="/new-user" activeClassName="active">
          New User
        </NavLinkStyled>
        <NavLinkStyled to="/edit-user" activeClassName="active">
          Edit User
        </NavLinkStyled>
        <UploadButtonContainer>
          <ButtonLabel>Choose File</ButtonLabel>
          <HiddenFileInput
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
        </UploadButtonContainer>
      </NavLinks>
      {isAdmin ? (
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      ) : (
        <LogoutButton onClick={() => navigate('/admin-login')}>Login</LogoutButton>
      )}
    </Navbar>
  );
};

export default TopBar;
