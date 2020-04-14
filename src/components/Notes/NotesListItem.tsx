import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components/macro';
import { INote } from '../../context/NoteContext/noteTypes';
import { useNoteContext } from '../../context/NoteContext/NoteContext';
import { fireStorePinTest } from '../../context/NoteContext/firestoreFunctions';

type Props = {
  note: INote;
  setSelectedNoteList: React.Dispatch<React.SetStateAction<string[]>>;
  ref: React.MutableRefObject<Map<any, any>>;
};
type BoxContainerProps = {
  color: string;
  selected: boolean;
};
type SelectNoteButtonProps = {
  selected: boolean;
};
type PinButtonProps = {
  pinned: boolean;
};

const NotesListItem = forwardRef(({ note, setSelectedNoteList }: Props, ref) => {
  const { uid, color, content, createdAt, lastEdited, tags, title, pinned } = note;
  const [selected, setSelected] = useState(false);

  const pinNoteHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    fireStorePinTest(!pinned, uid);
  };

  const selectNoteHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (selected) {
      setSelectedNoteList(prevState => prevState.filter(e => e !== uid));
    } else {
      setSelectedNoteList(prevState => [...prevState, uid]);
    }

    setSelected(!selected);
  };

  useImperativeHandle(ref, () => ({
    unSelect() {
      if (selected) {
        setSelected(false);
      }
    }
  }));
  return (
    <BoxContainer color={color} selected={selected}>
      <StyledNotesListItem>
        <NoteHeader>
          <SelectNoteButton onClick={e => selectNoteHandler(e)} selected={selected}></SelectNoteButton>
          <NoteTitle>
            <span>{title}</span>
          </NoteTitle>
          <PinButton onClick={e => pinNoteHandler(e)} pinned={pinned}></PinButton>
        </NoteHeader>
        <NoteContent>
          <span>{content}</span>
        </NoteContent>
        <TagList>
          {tags[0] && (
            <TagTextContainer>
              <TagText>{tags[0]}</TagText>
            </TagTextContainer>
          )}

          {tags[1] && (
            <TagTextContainer>
              <TagText>{tags[1]}</TagText>
            </TagTextContainer>
          )}
          {tags.length > 2 && (
            <TagTextBox>
              <TagText>+{tags.length - 2}</TagText>
            </TagTextBox>
          )}
        </TagList>
      </StyledNotesListItem>
    </BoxContainer>
  );
});

const NoteHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const SelectNoteButton = styled.div<SelectNoteButtonProps>`
  background: ${props => props.theme.backgroundColorSecondary};
  opacity: ${props => (props.selected ? 1 : 0)};
  background-size: 24px 24px;
  border-radius: 24px;
  height: 24px;
  width: 24px;
  background-image: ${props => props.theme.selectNoteIcon};
  transition: opacity 190ms linear;
  background-repeat: no-repeat;
  position: absolute;
  left: -10px;
  top: -10px;
  transition: transform 190ms linear, transform 60ms linear, visibility 60ms linear;
  &:hover {
    transform: scale(1.3);
  }
`;

const PinButton = styled.div<PinButtonProps>`
  visibility: ${props => (props.pinned ? 'visible' : 'hidden')};
  user-select: none;
  background-size: 24px 24px;
  background: ${props => props.theme.backgroundColorSecondary};
  border-radius: 30px;
  height: 30px;
  width: 30px;
  opacity: 0.5;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${props => (props.pinned ? props.theme.pinnedIcon : props.theme.pinIcon)};
  will-change: transform;
  transition: opacity 190ms linear, transform 60ms linear, visibility 60ms linear;
  &:hover {
    opacity: 1;
    transform: rotate(40deg);
  }
  position: absolute;
  right: -10px;
  top: -10px;
`;

const NoteTitle = styled.div`
  color: ${props => props.theme.textColorPrimary};
  text-align: start;
  font-weight: 600;
  width: 100%;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 100%;
  height: 100%;
`;

const BoxContainer = styled.div<BoxContainerProps>`
  @media (max-width: 900px) {
    width: 100%;
    height: 100%;
  }
  will-change: transform;
  width: 100%;
  height: 100%;

  border: 1px solid ${props => (props.selected ? props.theme.colors.lightBlue : props.theme.borderColor)};
  border-radius: 4px;
  background: ${props => props.theme.backgroundColor};
  transition: opacity 190ms linear;
  cursor: pointer;
  &:hover {
    ${PinButton} {
      opacity: 1;
      visibility: visible;
    }
    ${SelectNoteButton} {
      opacity: 1;
    }
    border: 1px solid ${props => (props.selected ? props.theme.colors.lightBlue : props.theme.textColorPrimary)};
  }
`;

const StyledNotesListItem = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px;
  padding-bottom: 8px;
`;

const NoteContent = styled.div`
  color: ${props => props.theme.textColorPrimary};
  text-align: start;
  margin: 8px 0px;
  width: 100%;
  span {
    text-overflow: ellipsis;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const TagList = styled.div`
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  -webkit-tap-highlight-color: transparent;
  margin-top: auto;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
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
  max-width: 24ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
`;
const TagTextBox = styled(TagTextContainer)`
  border-radius: 2px;
  min-width: 15px;
`;

export default NotesListItem;
