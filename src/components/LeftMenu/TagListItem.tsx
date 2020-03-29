import React, { useState } from 'react';
import styled from 'styled-components/macro';
import LabelIcon from '../../assets/Icons/LabelIcon';
import { useNoteContext } from '../../context/NoteContext/NoteContext';

type Props = {
  tagName: string;
  selected: boolean;
};

type StyledProps = {
  selected: boolean;
};

const TagListItem = ({ tagName, selected }: Props) => {
  const { dispatchSelectedTagList } = useNoteContext();

  const selectHandler = () => {
    if (!selected) {
      dispatchSelectedTagList({
        type: 'added',
        payload: {
          tag: tagName
        }
      });
    }
    if (selected) {
      dispatchSelectedTagList({
        type: 'removed',
        payload: {
          tag: tagName
        }
      });
    }
  };
  return (
    <StyledTagListItem onClick={selectHandler} selected={selected}>
      <ItemContainer>
        <LabelIcon selected={selected}></LabelIcon>
        <TagName selected={selected}>{tagName}</TagName>
      </ItemContainer>
    </StyledTagListItem>
  );
};

export default TagListItem;

const StyledTagListItem = styled.div<StyledProps>`
  width: 100%;
  cursor: pointer;
  display: flex;
  &:hover {
    background: ${props => props.theme.backgroundColorSecondary};
  }
`;
const ItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  margin: 6px 8px;
`;
const TagName = styled.div<StyledProps>`
  user-select: none;
  color: ${props => (props.selected ? props.theme.textColorPrimary : props.theme.textColorSecondary)};
  font-weight: 600;
  margin: 0px 0px 3px 8px;
  font-family: 'Open Sans', sans-serif;
`;
