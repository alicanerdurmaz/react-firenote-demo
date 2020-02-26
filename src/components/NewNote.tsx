import React, { Fragment } from 'react';
import styled from 'styled-components/macro';
import TextareaAutosize from 'react-textarea-autosize';

const NewNote = () => {
  return (
    <TakeNoteContainer>
      <InputArea>
        <TitleInput>
          <TextareaAutosize maxLength={30} maxRows={2} placeholder='Title'></TextareaAutosize>
        </TitleInput>
        <ContentInput>
          <TextareaAutosize maxLength={999} maxRows={8} placeholder='Take a note...'></TextareaAutosize>
        </ContentInput>
      </InputArea>
      <BottomBar>
        <ButtonGroup>
          <SaveButton>SAVE</SaveButton>
          <CancelButton>CANCEL</CancelButton>
        </ButtonGroup>
      </BottomBar>
    </TakeNoteContainer>
  );
};

const TakeNoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  justify-content: space-between;
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
  justify-content: flex-end;
`;

const ButtonGroup = styled.div`
  margin-right: 8px;
  flex: 0.4;
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
  padding: 0px 8px;
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
  padding: 0px 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -webkit-tap-highlight-color: transparent;
  &:active {
    transform: scale(0.9);
  }
`;
export default NewNote;
