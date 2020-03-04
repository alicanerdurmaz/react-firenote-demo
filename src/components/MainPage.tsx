import React, { useState } from 'react';
import styled from 'styled-components/macro';
import LeftMenu from './LeftMenu';
import Notes from './Notes';
import Navbar from './Navbar';
import AddNoteButton from './AddNoteButton';
import NewNote from './NewNote/NewNote';
import { FirestoreProvider } from '../context/FirebaseContext/FirestoreContext';

const MainPage = () => {
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  return (
    <StyledMainPage>
      {!showNewNoteModal && <AddNoteButton setShowNewNoteModal={setShowNewNoteModal}></AddNoteButton>}
      <FirestoreProvider>
        {showNewNoteModal && <NewNote setShowNewNoteModal={setShowNewNoteModal}></NewNote>}
        <Navbar setLeftMenuOpen={setLeftMenuOpen}></Navbar>
        <LeftMenu leftMenuOpen={leftMenuOpen} setLeftMenuOpen={setLeftMenuOpen}></LeftMenu>
        <Notes></Notes>
      </FirestoreProvider>
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

export default MainPage;
