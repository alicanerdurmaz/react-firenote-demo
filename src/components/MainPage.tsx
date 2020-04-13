import React, { useState } from 'react';
import styled from 'styled-components/macro';
import LeftMenu from './LeftMenu/LeftMenu';
import Notes from './Notes/Notes';
import Navbar from './Navbar';
import AddNoteButton from './AddNoteButton';
import NewNote from './NewNote/NewNote';
import { NoteContextProvider } from '../context/NoteContext/NoteContext';
import { INote } from '../context/NoteContext/noteTypes';

const MainPage = () => {
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [noteToBeEdited, setNoteToBeEdited] = useState<INote | null>(null);
  return (
    <StyledMainPage>
      {!showNewNoteModal && <AddNoteButton setShowNewNoteModal={setShowNewNoteModal}></AddNoteButton>}
      <NoteContextProvider>
        {showNewNoteModal && (
          <NewNote
            setShowNewNoteModal={setShowNewNoteModal}
            noteToBeEdited={noteToBeEdited}
            setNoteToBeEdited={setNoteToBeEdited}></NewNote>
        )}
        <Navbar setLeftMenuOpen={setLeftMenuOpen}></Navbar>
        <LeftMenu leftMenuOpen={leftMenuOpen} setLeftMenuOpen={setLeftMenuOpen}></LeftMenu>
        <Notes setShowNewNoteModal={setShowNewNoteModal} setNoteToBeEdited={setNoteToBeEdited}></Notes>
      </NoteContextProvider>
    </StyledMainPage>
  );
};

const StyledMainPage = styled.div`
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 285px 1fr;
  grid-template-rows: 55px 1fr;
  grid-template-areas: 'nav nav' 'left notes';
  grid-column-gap: 16px;

  @media (max-width: 700px) {
    grid-template-areas: 'nav nav' 'notes notes' 'notes notes';
  }
`;

export default MainPage;
