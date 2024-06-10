// Menu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h1`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 20px 0;
  font-size: 2em;
  background-color: #f8f9fa;
`;
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    color: blue;
  }
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 100px; // Ajusta esto según el tamaño de tu título
  left: 0;
  padding: 10px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 2em;
`;

const MenuList = styled.ul`
  background: white;
  list-style: none;
  padding: 10px;
  border: 1px solid black;
`;

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Title>Supercell Monitoring System</Title>
      <MenuContainer>
        <MenuButton onClick={() => setIsOpen(!isOpen)}>☰</MenuButton>
        {isOpen && (
           <MenuList>
           <li><StyledLink to="/emergency">Emergency</StyledLink></li>
           <li><StyledLink to="/new-card">Add new card</StyledLink></li>
           <li><StyledLink to="/prison-logs">Prison logs</StyledLink></li>
         </MenuList>
        )}
      </MenuContainer>
    </>
  );
}

export default Menu;