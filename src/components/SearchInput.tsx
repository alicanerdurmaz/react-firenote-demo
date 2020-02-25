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
        resetSearchTerm();
      }
    }
  }, [searchTerm]);

  const handleSearchTerm = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  const resetSearchTerm = () => {
    setSearchTerm('');
  };

  return (
    <StyledSearchInputContainer>
      <StyledSearchInput
        onChange={e => handleSearchTerm(e)}
        value={searchTerm}
        placeholder='Search your notes'></StyledSearchInput>
      {searchTerm.length > 0 && (
        <span onClick={resetSearchTerm}>
          <CancelIcon></CancelIcon>
        </span>
      )}
    </StyledSearchInputContainer>
  );
};

const StyledSearchInputContainer = styled.div`
  display: flex;
  padding: 4px 0px;
  margin-left: 16px;
  width: 100%;
`;
const StyledSearchInput = styled.input`
  font-size: 16px;
  width: 100%;
  ::placeholder,
  ::-webkit-input-placeholder {
    user-select: none;
  }
`;

export default SearchInput;
