import React from 'react';
import styled from 'styled-components/macro';
import NotesListItem from './NotesListItem';
import { useNoteContext } from '../../context/NoteContext/NoteContext';
import { INote } from '../../context/NoteContext/noteTypes';

type INotes = {
  setNoteToBeEdited: React.Dispatch<React.SetStateAction<INote | null>>;
  setShowNewNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const Notes = ({ setShowNewNoteModal, setNoteToBeEdited }: INotes) => {
  const { notesList } = useNoteContext();
  const noteItemClickHandler = (obj: INote) => {
    setShowNewNoteModal(true);
    setNoteToBeEdited(obj);
  };
  return (
    <NotesArea>
      <NotesList>
        {notesList.map((e, i) => (
          <div key={i} onClick={() => noteItemClickHandler(e)}>
            <NotesListItem note={e}></NotesListItem>
          </div>
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
  user-select: none;
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  }
  grid-gap: 16px;
`;
export default Notes;
