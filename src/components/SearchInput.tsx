import React, { useState } from 'react';
import styled from 'styled-components/macro';

import SearchIcon from '../assets/Icons/SearchIcon';

const SearchInput = () => {
  return (
    <StyledSearchInputContainer>
      <SearchIcon></SearchIcon>
      <StyledSearchInput></StyledSearchInput>
    </StyledSearchInputContainer>
  );
};

const StyledSearchInputContainer = styled.div`
  display: flex;
  background: ${props => props.theme.backgroundColorsecondary};
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 4px;
  margin-left: 16px;
  margin-right: 16px;
`;
const StyledSearchInput = styled.input`
  font-size: 16px;
  width: 100%;
  margin-left: 8px;
`;

export default SearchInput;
