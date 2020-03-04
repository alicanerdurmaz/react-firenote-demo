import React, { useState } from 'react';
import styled from 'styled-components/macro';
import TextareaAutosize from 'react-textarea-autosize';

type Notes = {
  title: string;
  content: string;
  tags: string[];
  color: string;
};
type Props = {
  color: string;
  setNote: React.Dispatch<React.SetStateAction<Notes>>;
};
type styleProps = {
  bgColor: string;
};

const NewNoteInput = ({ color, setNote }: Props) => {
  const newNoteInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNote(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <InputArea>
      <TitleInput bgColor={color}>
        <TextareaAutosize
          maxLength={30}
          maxRows={2}
          placeholder='Title'
          onChange={e => newNoteInput(e)}
          name='title'></TextareaAutosize>
      </TitleInput>
      <ContentInput bgColor={color}>
        <TextareaAutosize
          maxLength={999}
          maxRows={6}
          placeholder='Take a note...'
          onChange={e => newNoteInput(e)}
          name='content'></TextareaAutosize>
      </ContentInput>
    </InputArea>
  );
};

const TitleInput = styled.div<styleProps>`
  padding: 8px 8px;
  overflow: hidden;
  textarea {
    resize: none;
    width: 100%;
    height: auto;
    background: ${props => props.bgColor};
    color: ${props => props.theme.textColorPrimary};
    font-size: 16px;
  }
`;
const ContentInput = styled.div<styleProps>`
  padding: 8px 8px;
  padding-top: 0px;
  overflow: hidden;
  textarea {
    resize: none;
    font-size: 16px;
    width: 100%;
    background: ${props => props.bgColor};
    color: ${props => props.theme.textColorPrimary};
  }
`;

const InputArea = styled.div`
  width: 100%;
`;

export default NewNoteInput;
