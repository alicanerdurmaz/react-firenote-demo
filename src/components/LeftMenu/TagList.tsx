import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useNoteContext } from '../../context/NoteContext/NoteContext';
import TagListItem from './TagListItem';

type StyledProps = {
  isHidden: string;
};

const TagList: React.FC = () => {
  const { selectedTagList, tagsList, dispatchSelectedTagList } = useNoteContext();

  return (
    <StyledTagList>
      <TagListHeader>
        <TagsLabel>TAGS</TagsLabel>
        <BtnClearSelected
          isHidden={selectedTagList.length > 0 ? 'visible ' : 'hidden'}
          onClick={e => dispatchSelectedTagList({ type: 'cleared', payload: { tag: 'test' } })}>
          <span>CLEAR SELECTED</span>
        </BtnClearSelected>
      </TagListHeader>
      {tagsList.map(e => {
        return <TagListItem key={e} tagName={e} selected={selectedTagList.includes(e) ? true : false}></TagListItem>;
      })}
    </StyledTagList>
  );
};

const StyledTagList = styled.div`
  border-top: 1px solid ${props => props.theme.borderColor};
  border-bottom: 1px solid ${props => props.theme.borderColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px 0px;
  width: 100%;
`;

const TagListHeader = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
`;
const TagsLabel = styled.div`
  user-select: none;
  color: ${props => props.theme.textColorSecondary};
  margin: 0px 0px 0px 11px;
  font-size: 11px;
  font-weight: 600;
`;
const BtnClearSelected = styled.div<StyledProps>`
  visibility: ${props => props.isHidden};
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
  padding: 4px;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.lightBlue};
  }
  span {
    color: ${props => props.theme.textColorPrimaryPale};
  }
`;

export default TagList;
