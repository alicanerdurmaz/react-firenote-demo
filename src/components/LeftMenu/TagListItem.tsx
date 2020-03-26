import React, { useState } from 'react';
import styled from 'styled-components/macro';
import LabelIcon from '../../assets/Icons/LabelIcon';

type Props = {
  tagName: string;
};

type StyledProps = {
  selected: boolean;
};

const TagListItem = ({ tagName }: Props) => {
  const [selected, setSelected] = useState(false);
  console.log(tagName, selected);

  const selectHandler = () => {
    setSelected(!selected);
  };
  return (
    <StyledTagListItem onClick={selectHandler} selected={selected}>
      <ItemContainer>
        <LabelIcon selected={selected}></LabelIcon>
        <TagName>{tagName}</TagName>
      </ItemContainer>
    </StyledTagListItem>
  );
};
// background: ${props => (props.selected ? props.theme.backgroundColorSecondary : null)};
// border-radius: ${props => (props.selected ? '0px 24px 24px 0px' : null)};
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
  width: 100%;
  height: 100%;
  margin: 8px 16px;
`;
const TagName = styled.div`
  color: ${props => props.theme.textColorPrimary};
  font-weight: 600;
  margin: 3px 0 0 16px;
`;
