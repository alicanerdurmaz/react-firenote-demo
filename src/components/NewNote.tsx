import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import TextareaAutosize from 'react-textarea-autosize';
import firebase, { firestore } from '../components/Firebase/firebase';
import { useAuthContext } from '../context/AuthContext';
import SelectColorPanel from './SelectColorPanel';
import SelectTagPanel from './SelectTagPanel';

type Props = {
  setShowNewNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const NewNote = ({ setShowNewNoteModal }: Props) => {
  const themeContext = useContext(ThemeContext);

  const { currentUser } = useAuthContext();

  const [note, setNote] = useState({
    title: '',
    content: '',
    labels: [],
    color: themeContext.backgroundColor
  });

  const cancelHandler = () => {
    setShowNewNoteModal(false);
  };

  const newNoteController = () => {
    if (!currentUser) {
      return;
    } else if (note.title.length < 1 || note.content.length < 1) {
      return;
    } else {
      firestore
        .collection(currentUser.uid)
        .add({
          title: note.title,
          content: note.content,
          labels: note.labels,
          color: note.color,
          lastEdited: firebase.firestore.FieldValue.serverTimestamp(),
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
        });
    }
  };

  const newNoteInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNote(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const selectColor = (colorCode: string) => {
    setNote(prevState => ({
      ...prevState,
      color: colorCode
    }));
  };

  return (
    <Modal>
      <TakeNoteContainer>
        <InputArea>
          <TitleInput>
            <TextareaAutosize
              maxLength={30}
              maxRows={2}
              placeholder='Title'
              onChange={e => newNoteInput(e)}
              name='title'></TextareaAutosize>
          </TitleInput>
          <ContentInput>
            <TextareaAutosize
              maxLength={999}
              maxRows={8}
              placeholder='Take a note...'
              onChange={e => newNoteInput(e)}
              name='content'></TextareaAutosize>
          </ContentInput>
        </InputArea>
        <BottomBar>
          <ButtonGroupOne>
            <SelectTagPanel></SelectTagPanel>
            <SelectColorPanel selectedColorProp={note.color} selectColor={selectColor}></SelectColorPanel>
          </ButtonGroupOne>
          <ButtonGroupTwo>
            <SaveButton onClick={newNoteController}>SAVE</SaveButton>
            <CancelButton onClick={cancelHandler}>CANCEL</CancelButton>
          </ButtonGroupTwo>
        </BottomBar>
      </TakeNoteContainer>
    </Modal>
  );
};

const Modal = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
`;

const TakeNoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  justify-content: space-between;
  background: ${props => props.theme.backgroundColor};
  height: 100%;
  width: 100%;
`;

const TitleInput = styled.div`
  padding: 16px;
  overflow: hidden;
  padding-bottom: 8px;
  textarea {
    resize: none;
    width: 100%;
    height: auto;
    background: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColorPrimary};
    font-size: 16px;
  }
`;
const ContentInput = styled.div`
  padding: 16px;
  overflow: hidden;
  padding-top: 8px;
  textarea {
    resize: none;
    font-size: 16px;
    width: 100%;
    background: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColorPrimary};
  }
`;

const InputArea = styled.div`
  width: 100%;
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
  display: flex;
  justify-content: space-evenly;
`;
const ButtonGroupTwo = styled.div`
  align-self: flex-end;
  flex: 0.3;
  display: flex;
  justify-content: space-evenly;
`;

const SaveButton = styled.button`
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

export default NewNote;
