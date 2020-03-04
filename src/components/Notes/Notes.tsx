import React from 'react';
import styled from 'styled-components/macro';
import NotesListItem from './NotesListItem';

const Notes = () => {
  return (
    <NotesArea>
      <NotesList>
        <NotesListItem></NotesListItem>
      </NotesList>
    </NotesArea>
  );
};
const NotesArea = styled.div`
  grid-area: notes;
  display: flex;
  flex-direction: column;
`;
const NotesList = styled.div``;

export default Notes;
