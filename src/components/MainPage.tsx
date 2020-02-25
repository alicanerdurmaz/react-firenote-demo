import React, { useState } from 'react';
import styled from 'styled-components/macro';
import LeftMenu from './LeftMenu';
import Notes from './Notes';
import Navbar from './Navbar';

const MainPage = () => {
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  return (
    <StyledMainPage>
      <Navbar setLeftMenuOpen={setLeftMenuOpen}></Navbar>
      <LeftMenu leftMenuOpen={leftMenuOpen} setLeftMenuOpen={setLeftMenuOpen}></LeftMenu>
      <NotesArea>
        <Notes></Notes>
      </NotesArea>
    </StyledMainPage>
  );
};

const StyledMainPage = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 55px 1fr;
  grid-template-areas: 'nav nav' 'left notes';
  @media (max-width: 600px) {
    grid-template-areas: 'nav nav' 'notes notes';
  }
`;
const NotesArea = styled.div`
  grid-area: notes;
  display: flex;
  flex-direction: column;
`;

export default MainPage;
