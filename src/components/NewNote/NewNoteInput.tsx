import React from 'react';
import styled from 'styled-components/macro';
import TextareaAutosize from 'react-textarea-autosize';

type Notes = {
  title: string;
  content: string;
  tags: string[];
  color: string;
  pinned: boolean;
};
type Props = {
  note: Notes;
  color: string;
  setNote: React.Dispatch<React.SetStateAction<Notes>>;
};
type styleProps = {
  bgColor: string;
};

const NewNoteInput = ({ color, setNote, note }: Props) => {
  const newNoteInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <InputArea>
      <TitleInput bgColor={color}>
        <TextareaAutosize
          autoFocus
          value={note.title}
          maxLength={30}
          maxRows={1}
          placeholder='Title'
          onChange={(e) => newNoteInput(e)}
          name='title'></TextareaAutosize>
      </TitleInput>
      <ContentInput bgColor={color}>
        <TextareaAutosize
          value={note.content}
          maxLength={999}
          maxRows={6}
          placeholder='Take a note...'
          onChange={(e) => newNoteInput(e)}
          name='content'></TextareaAutosize>
      </ContentInput>
    </InputArea>
  );
};

const TitleInput = styled.div<styleProps>`
  padding: 8px 8px;
  textarea {
    resize: none;
    width: 100%;
    height: auto;
    background: ${(props) => (props.bgColor === 'default' ? props.theme.backgroundColor : props.bgColor)};
    color: ${(props) => props.theme.textColorPrimary};
    font-size: 16px;
    overflow: hidden;
  }
  @media (max-width: 700px) {
    margin-top: 8px;
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
    background: ${(props) => (props.bgColor === 'default' ? props.theme.backgroundColor : props.bgColor)};
    color: ${(props) => props.theme.textColorPrimary};
  }
  textarea::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${(props) => props.bgColor};
  }
  textarea::-webkit-scrollbar {
    width: 4px;
    background-color: ${(props) => props.bgColor};
  }
  textarea::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: ${(props) => props.theme.backgroundColorSecondary};
  }
`;

const InputArea = styled.div`
  width: 100%;
`;

export default NewNoteInput;
