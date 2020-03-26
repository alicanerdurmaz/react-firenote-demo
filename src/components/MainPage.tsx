import React, { useState } from 'react';
import styled from 'styled-components/macro';
import LeftMenu from './LeftMenu/LeftMenu';
import Notes from './Notes/Notes';
import Navbar from './Navbar';
import AddNoteButton from './AddNoteButton';
import NewNote from './NewNote/NewNote';
import { NoteContextProvider } from '../context/NoteContext/NoteContext';

const MainPage = () => {
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  return (
    <StyledMainPage>
      {!showNewNoteModal && <AddNoteButton setShowNewNoteModal={setShowNewNoteModal}></AddNoteButton>}
      <NoteContextProvider>
        {showNewNoteModal && <NewNote setShowNewNoteModal={setShowNewNoteModal}></NewNote>}
        <Navbar setLeftMenuOpen={setLeftMenuOpen}></Navbar>
        <LeftMenu leftMenuOpen={leftMenuOpen} setLeftMenuOpen={setLeftMenuOpen}></LeftMenu>
        <Notes></Notes>
      </NoteContextProvider>
    </StyledMainPage>
  );
};

const StyledMainPage = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: 55px 1fr;
  grid-template-areas: 'nav nav' 'left notes';
  @media (max-width: 600px) {
    grid-template-areas: 'nav nav' 'notes notes';
  }
  grid-column-gap: 24px;
`;

export default MainPage;
