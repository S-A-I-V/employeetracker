import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Navbar = styled.nav`
  background: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

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
  font-size: 1.2rem;
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

const TopBar = ({ onFileUpload }) => {
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
        <UploadButtonContainer>
          <ButtonLabel>Choose File</ButtonLabel>
          <HiddenFileInput
            type="file"
            accept=".csv"
            onChange={(e) => onFileUpload(e.target.files[0])}
          />
        </UploadButtonContainer>
      </NavLinks>
    </Navbar>
  );
};

export default TopBar;
