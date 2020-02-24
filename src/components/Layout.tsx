import React, { useState } from 'react';
import styled from 'styled-components/macro';
import LeftMenu from './LeftMenu';
import Notes from './Notes';
import Navbar from './Navbar';

const Layout = () => {
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);

  return (
    <LayoutContainer>
      <Navbar setLeftMenuOpen={setLeftMenuOpen}></Navbar>
      <LeftMenu leftMenuOpen={leftMenuOpen} setLeftMenuOpen={setLeftMenuOpen}></LeftMenu>
      <Notes></Notes>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 55px 1fr;
  grid-template-areas: 'nav nav' 'left notes';
  @media (max-width: 600px) {
    grid-template-areas: 'nav nav' 'notes notes';
  }
`;

export default Layout;
