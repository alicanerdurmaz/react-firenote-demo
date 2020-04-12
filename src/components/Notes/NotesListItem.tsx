import React from 'react';
import styled from 'styled-components/macro';
import { INote } from '../../context/NoteContext/noteTypes';

type Props = {
  note: INote;
};
type StyledProps = {
  color: string;
};
const NotesListItem = ({ note }: Props) => {
  const { uid, color, content, createdAt, lastEdited, tags, title } = note;

  const noteItemClickHandler = () => {
    console.log(content);
  };
  return (
    <BoxContainer color={color} onClick={noteItemClickHandler}>
      <StyledNotesListItem>
        <NoteTitle>{title}</NoteTitle>
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
};

const BoxContainer = styled.div<StyledProps>`
  min-height: max-content;
  max-height: 240px;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 4px;
  background: ${props => props.color};
  transition: all 60ms ease-in-out;
  cursor: pointer;
  &:hover {
    border: 1px solid ${props => props.theme.textColorPrimary};
  }
`;

const StyledNotesListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const NoteHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PinButton = styled.div`
  user-select: none;
  background-size: 24px 24px;
  height: 24px;
  width: 24px;
  opacity: 0.5;
  padding: 8px 8px 0px 0px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+CiAgPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTE3IDR2N2wyIDN2MmgtNnY1bC0xIDEtMS0xdi01SDV2LTJsMi0zVjRjMC0xLjEuOS0yIDItMmg2YzEuMTEgMCAyIC44OSAyIDJ6TTkgNHY3Ljc1TDcuNSAxNGg5TDE1IDExLjc1VjRIOXoiLz4KPC9zdmc+Cg==);
  &:hover {
    opacity: 1;
  }
`;
const NoteTitle = styled.div`
  color: ${props => props.theme.textColorPrimary};
  text-align: start;
  margin-bottom: 8px;
  margin-top: 10px;
  font-weight: 600;
  padding: 0px 16px;
`;
const NoteContent = styled.div`
  color: ${props => props.theme.textColorPrimary};
  text-align: start;
  padding: 0px 16px;

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
  margin-top: 8px;
  margin-bottom: 2px;
  padding: 0px 8px;
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
