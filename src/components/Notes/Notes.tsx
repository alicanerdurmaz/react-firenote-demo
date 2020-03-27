import React from 'react';
import styled from 'styled-components/macro';
import NotesListItem from './NotesListItem';
import { useNoteContext } from '../../context/NoteContext/NoteContext';

const Notes = () => {
  const { notesList } = useNoteContext();

  return (
    <NotesArea>
      <NotesList>
        {notesList.map((e, i) => (
          <NotesListItem key={i} note={e}></NotesListItem>
        ))}
      </NotesList>
    </NotesArea>
  );
};
const NotesArea = styled.div`
  grid-area: notes;
  overflow: auto;
  overflow-x: hidden;
`;
const NotesList = styled.div`
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  }
  grid-gap: 16px;
`;
export default Notes;
