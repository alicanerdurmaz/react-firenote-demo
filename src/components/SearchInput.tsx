import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

import { useDebounce } from '../hooks/useDebounce';
import SearchIcon from '../assets/Icons/SearchIcon';
import CancelIcon from '../assets/Icons/CancelIcon';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    // TODO: API CALL
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (searchTerm.length <= 0) return;
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };

    function handleUserKeyPress(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSearchTerm('');
      }
    }
  }, [searchTerm]);

  const handleSearchTerm = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  return (
    <StyledSearchInputContainer>
      {searchTerm.length > 0 ? <CancelIcon></CancelIcon> : <SearchIcon></SearchIcon>}
      <StyledSearchInput onChange={e => handleSearchTerm(e)} value={searchTerm}></StyledSearchInput>
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
