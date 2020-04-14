import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/macro';

import { useDebounce } from '../hooks/useDebounce';
import SearchIcon from '../assets/Icons/SearchIcon';
import CancelIcon from '../assets/Icons/CancelIcon';
import { useNoteContext } from '../context/NoteContext/NoteContext';

const SearchInput = () => {
  const { setSearchTerm, searchTerm, dispatchSelectedTagList } = useNoteContext();
  const [input, setInput] = useState('');
  const debouncedSearchTerm = useDebounce(input, 200);

  useEffect(() => {
    if (searchTerm.length === 0) {
      resetSearchTerm();
    } else return;
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length === 0 || debouncedSearchTerm.length >= 3) {
      setSearchTerm(debouncedSearchTerm);
    }
    if (debouncedSearchTerm.length >= 3) {
      dispatchSelectedTagList({ type: 'cleared', payload: { tag: 'test' } });
    }
  }, [debouncedSearchTerm, setSearchTerm, dispatchSelectedTagList]);

  useEffect(() => {
    if (input.length <= 0) return;
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };

    function handleUserKeyPress(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        resetSearchTerm();
      }
    }
  }, [input]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const resetSearchTerm = () => {
    setInput('');
  };

  return (
    <StyledSearchInputContainer>
      <StyledSearchInput
        onChange={e => handleInput(e)}
        value={input}
        placeholder='Search your notes'></StyledSearchInput>
      {input.length > 0 && (
        <span onClick={resetSearchTerm}>
          <CancelIcon></CancelIcon>
        </span>
      )}
    </StyledSearchInputContainer>
  );
};

const StyledSearchInputContainer = styled.div`
  background: ${props => props.theme.backgroundColorSecondary};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  flex: 1;
`;
const StyledSearchInput = styled.input`
  font-size: 16px;
  padding: 0px 4px;
  width: 100%;
  ::placeholder,
  ::-webkit-input-placeholder {
    user-select: none;
  }
`;

export default SearchInput;
