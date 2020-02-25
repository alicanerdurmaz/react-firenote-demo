import React, { useState } from 'react';
import styled from 'styled-components/macro';
import LeftMenu from './LeftMenu';
import Notes from './Notes';
import Navbar from './Navbar';
import TakeNote from './TakeNote';
import AddNoteButton from './AddNoteButton';

const Layout = () => {
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [addNoteAreaOpen, setAddNoteAreaOpen] = useState(false);
  return (
    <LayoutContainer>
      {addNoteAreaOpen && (
        <TakeNote addNoteAreaOpen={addNoteAreaOpen} setAddNoteAreaOpen={setAddNoteAreaOpen}></TakeNote>
      )}
      <AddNoteButton setAddNoteAreaOpen={setAddNoteAreaOpen}></AddNoteButton>
      <Navbar setLeftMenuOpen={setLeftMenuOpen}></Navbar>
      <LeftMenu leftMenuOpen={leftMenuOpen} setLeftMenuOpen={setLeftMenuOpen}></LeftMenu>
      <NotesArea>
        <Notes></Notes>
      </NotesArea>
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
const NotesArea = styled.div`
  grid-area: notes;
  display: flex;
  flex-direction: column;
`;

export default Layout;
