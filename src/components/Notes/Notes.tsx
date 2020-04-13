import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import NotesListItem from './NotesListItem';
import { useNoteContext } from '../../context/NoteContext/NoteContext';
import { INote } from '../../context/NoteContext/noteTypes';
import { motion, AnimatePresence } from 'framer-motion';

type INotes = {
  setNoteToBeEdited: React.Dispatch<React.SetStateAction<INote | null>>;
  setShowNewNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const Notes = ({ setShowNewNoteModal, setNoteToBeEdited }: INotes) => {
  const { notesList } = useNoteContext();
  const noteItemClickHandler = (obj: INote, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setShowNewNoteModal(true);
    setNoteToBeEdited(obj);
  };

  const renderPinnedList = () => {
    const pinnedList = notesList.filter(e => e.pinned).reverse();
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
                <NotesListItem note={element}></NotesListItem>
              </motion.div>
            ) : null
          )}
        </NotesListPinned>
        <GridLabelOther>OTHERS</GridLabelOther>
      </>
    ) : null;
  };

  return (
    <NotesArea>
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
              <NotesListItem note={element}></NotesListItem>
            </motion.div>
          )
        )}
      </NotesListOther>
    </NotesArea>
  );
};
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
  margin-top: 60px;
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
