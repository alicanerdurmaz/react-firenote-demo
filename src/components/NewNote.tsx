import React, { Fragment } from 'react';
import styled from 'styled-components/macro';
import TextareaAutosize from 'react-textarea-autosize';

const NewNote = () => {
  return (
    <TakeNoteContainer>
      <TitleInput>
        <TextareaAutosize maxRows={3} placeholder='Title'></TextareaAutosize>
      </TitleInput>
      <ContentInput>
        <TextareaAutosize maxRows={15} placeholder='Take a note...'></TextareaAutosize>
      </ContentInput>
    </TakeNoteContainer>
  );
};

const TakeNoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding: 16px;
`;

const TitleInput = styled.div`
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
  overflow: hidden;
  padding-top: 8px;
  border-top: 1px solid black;
  textarea {
    resize: none;
    font-size: 16px;
    width: 100%;
    background: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColorPrimary};
  }
`;

export default NewNote;
