// Menu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
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
    <MenuContainer>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>☰</MenuButton>
      {isOpen && (
        <MenuList>
           <li><Link to="/emergency">Emergency</Link></li>
          <li><Link to="/new-card">Agregar nueva tarjeta</Link></li>
        </MenuList>
      )}
    </MenuContainer>
  );
}

export default Menu;