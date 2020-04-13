import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components/macro';
import NotesListItem from './NotesListItem';
import { useNoteContext } from '../../context/NoteContext/NoteContext';
import { INote } from '../../context/NoteContext/noteTypes';
import { firestoreDeleteMultipleNotes } from '../../context/NoteContext/firestoreFunctions';

type INotes = {
  setNoteToBeEdited: React.Dispatch<React.SetStateAction<INote | null>>;
  setShowNewNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const Notes = ({ setShowNewNoteModal, setNoteToBeEdited }: INotes) => {
  const { notesList } = useNoteContext();
  const [selectedNoteList, setSelectedNoteList] = useState<string[]>([]);
  const noteItemClickHandler = (obj: INote, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setShowNewNoteModal(true);
    setNoteToBeEdited(obj);
  };

  const renderPinnedList = () => {
    const pinnedList = notesList.filter(e => e.pinned);
    return pinnedList.length > 0 ? (
      <>
        <GridLabelPinned>PINNED</GridLabelPinned>
        <NotesListPinned>
          {pinnedList.map(element =>
            element.pinned ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                positionTransition={{
                  damping: 100,
                  stiffness: 10
                }}
                key={element.uid}
                onClick={event => noteItemClickHandler(element, event)}>
                <NotesListItem note={element} setSelectedNoteList={setSelectedNoteList}></NotesListItem>
              </motion.div>
            ) : null
          )}
        </NotesListPinned>
        <GridLabelOther>OTHERS</GridLabelOther>
      </>
    ) : null;
  };

  const deleteAllSelectedNotes = () => {
    firestoreDeleteMultipleNotes(selectedNoteList);
    setSelectedNoteList([]);
  };
  return (
    <NotesArea>
      {selectedNoteList.length > 0 ? (
        <SelectedMenuPanel onClick={deleteAllSelectedNotes}>
          <span>DELETE ALL SELECTED NOTES</span>
        </SelectedMenuPanel>
      ) : null}
      {renderPinnedList()}
      <NotesListOther>
        {notesList.map((element, i) =>
          element.pinned ? null : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              positionTransition={{
                damping: 100,
                stiffness: 10
              }}
              key={element.uid}
              onClick={event => noteItemClickHandler(element, event)}>
              <NotesListItem note={element} setSelectedNoteList={setSelectedNoteList}></NotesListItem>
            </motion.div>
          )
        )}
      </NotesListOther>
    </NotesArea>
  );
};

const SelectedMenuPanel = styled.div`
  cursor: pointer;
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    height: fit-content;
    color: ${props => props.theme.textColorPrimary};
    border: 1px solid ${props => props.theme.borderColor};
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 600;
  }
`;

const GridLabelPinned = styled.div`
  margin-left: 10px;
  text-align: start;
  font-size: 11px;
  font-weight: 600px;
  letter-spacing: 1px;
  color: ${props => props.theme.textColorSecondary};
`;
const GridLabelOther = styled.div`
  font-size: 11px;
  font-weight: 600px;
  letter-spacing: 1px;
  margin-left: 10px;
  margin-top: 16px;
  text-align: start;
  color: ${props => props.theme.textColorSecondary};
`;
const NotesArea = styled.div`
  grid-area: notes;
  overflow: auto;
  overflow-x: hidden;
`;
const NotesListPinned = styled.div`
  user-select: none;
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  }
  grid-gap: 16px;
  grid-auto-flow: row;
`;
const NotesListOther = styled.div`
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
