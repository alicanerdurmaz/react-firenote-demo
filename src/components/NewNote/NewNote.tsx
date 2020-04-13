import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';

import { INote } from '../../context/NoteContext/noteTypes';
import { useAuthContext } from '../../context/AuthContext';
import SelectColorPanel from './SelectColorPanel';
import SelectTagPanel from './SelectTagPanel';
import { firestoreAddNote, firestoreUpdateNote } from '../../context/NoteContext/firestoreFunctions';
import NewNoteInput from './NewNoteInput';

type Props = {
  noteToBeEdited: INote | null;
  setNoteToBeEdited: React.Dispatch<React.SetStateAction<INote | null>>;
  setShowNewNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
};
type styleProps = {
  bgColor: string;
};

type Notes = {
  title: string;
  content: string;
  tags: string[];
  color: string;
};

const NewNote = ({ setShowNewNoteModal, noteToBeEdited, setNoteToBeEdited }: Props) => {
  const themeContext = useContext(ThemeContext);
  const { currentUser } = useAuthContext();

  const [note, setNote] = useState<Notes>({
    title: noteToBeEdited ? noteToBeEdited.title : '',
    content: noteToBeEdited ? noteToBeEdited.content : '',
    tags: noteToBeEdited ? noteToBeEdited.tags : [],
    color: noteToBeEdited ? noteToBeEdited.color : themeContext.backgroundColor
  });

  const cancelHandler = () => {
    setShowNewNoteModal(false);
    setNoteToBeEdited(null);
  };

  const saveNoteToFirebase = () => {
    if (!currentUser) {
      return;
    } else if (note.title.length < 1 || note.content.length < 1) {
      return;
    } else {
      noteToBeEdited
        ? firestoreUpdateNote(currentUser.uid, note, noteToBeEdited.uid)
        : firestoreAddNote(currentUser.uid, note);
    }
  };

  const selectColor = (colorCode: string) => {
    setNote(prevState => ({
      ...prevState,
      color: colorCode
    }));
  };
  const addTag = (list: string[]) => {
    setNote(prevState => ({
      ...prevState,
      tags: list
    }));
  };

  return (
    <Modal onKeyDown={e => (e.key === 'Escape' ? cancelHandler() : null)} tabIndex={0}>
      <TakeNoteContainer bgColor={note.color}>
        <div>
          <NewNoteInput color={note.color} setNote={setNote} note={note}></NewNoteInput>
          <TagListContainer>
            {note.tags.map(e => {
              return (
                <TagTextContainer key={e}>
                  <TagText>{e}</TagText>
                </TagTextContainer>
              );
            })}
          </TagListContainer>
        </div>
        <BottomBar>
          <ButtonGroupOne>
            <SelectTagPanel addTag={addTag} userId={currentUser.uid} tags={note.tags}></SelectTagPanel>
            <SelectColorPanel selectedColorProp={note.color} selectColor={selectColor}></SelectColorPanel>
          </ButtonGroupOne>
          <ButtonGroupTwo>
            <SaveButton onClick={saveNoteToFirebase}>SAVE</SaveButton>
            <CancelButton onClick={cancelHandler}>CANCEL</CancelButton>
          </ButtonGroupTwo>
        </BottomBar>
      </TakeNoteContainer>
    </Modal>
  );
};

const Modal = styled.div`
  @media (max-width: 700px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    opacity: 1;
    background: black;
  }

  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TakeNoteContainer = styled.div<styleProps>`
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    justify-content: space-between;
    background: ${props => props.bgColor};
    height: 100%;
    width: 100%;
    opacity: 1;
    z-index: 120;
  }
  border-radius: 8px;
  opacity: 1;
  z-index: 120;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${props => props.bgColor};
  height: 40%;
  width: 60%;
  padding: 16px;
`;

const BottomBar = styled.div`
  width: 100%;
  height: fit-content;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
`;

const ButtonGroupOne = styled.div`
  align-self: flex-start;
  flex: 0.2;
  padding-left: 16px;
  display: flex;
  justify-content: space-around;
  @media (min-width: 700px) {
    justify-content: flex-start;
  }
`;
const ButtonGroupTwo = styled.div`
  align-self: flex-end;
  flex: 0.4;
  display: flex;
  justify-content: space-around;
  @media (min-width: 700px) {
    justify-content: flex-end;
    padding-right: 16px;
  }
`;

const SaveButton = styled.button`
  @media (min-width: 700px) {
    margin-right: 16px;
  }
  height: 24px;
  background: #364f6b;
  color: ${props => props.theme.textColorPrimary};
  border: 0px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 2px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -webkit-tap-highlight-color: transparent;
  &:active {
    transform: scale(0.9);
  }
`;
const CancelButton = styled.button`
  text-align: center;
  background: ${props => props.theme.warningColor};
  color: ${props => props.theme.textColorPrimary};
  border: 0px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -webkit-tap-highlight-color: transparent;
  &:active {
    transform: scale(0.9);
  }
`;

const TagListContainer = styled.div`
  cursor: pointer;
  margin: 4px 8px;
  display: flex;
  flex-wrap: wrap;
  -webkit-tap-highlight-color: transparent;
`;
const TagTextContainer = styled.div`
  user-select: none;
  min-width: 35px;
  height: 18px;
  box-shadow: inset 0 0 0 1px rgba(154, 160, 166, 0.541);
  padding: 3px 6px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 2px;
`;
const TagText = styled.div`
  user-select: none;
  color: ${props => props.theme.textColorSecondary};
  font-size: 14px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
`;

export default NewNote;
