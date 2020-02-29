import React from 'react';
import styled from 'styled-components/macro';
import TagsIcon from '../assets/Icons/TagsIcon';
const SelectTagPanel = () => {
  return (
    <Details>
      <Summary>
        <TagsIcon></TagsIcon>
      </Summary>
      <HiddenPanel>
        <TagInputContainer>
          <TagInput maxLength={12}></TagInput>
        </TagInputContainer>
      </HiddenPanel>
    </Details>
  );
};

const Details = styled.details`
  cursor: pointer;
  display: inline-block;
  position: relative;
  &[open] > summary:before {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: block;
    cursor: default;
    content: ' ';
    background: transparent;
  }
`;
const Summary = styled.summary`
  ::-webkit-details-marker {
    display: none;
  }
  display: list-item;
  list-style: none;
  user-select: none;
  outline: none;
`;
const HiddenPanel = styled.div`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  background-color: ${props => props.theme.backgroundColorSecondary};
  border-radius: 4px;
  text-align: start;
  padding: 4px 8px;
  z-index: 2;
  position: absolute;
  bottom: 120%;
  width: 150px;
`;

const TagInputContainer = styled.div`
  width: 100%;
  display: flex;
`;
const TagInput = styled.input`
  width: 100%;
`;

const PlusIcon = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;

  background: linear-gradient(#000, #000), linear-gradient(#000, #000);
  background-position: center;
  background-size: 50% 2px, 2px 50%; /*thickness = 2px, length = 50% (25px)*/
  background-repeat: no-repeat;
`;

export default SelectTagPanel;
