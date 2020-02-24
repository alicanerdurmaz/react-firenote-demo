import React from 'react';
import styled from 'styled-components/macro';

const NoteList = () => {
  return <NoteListContainer></NoteListContainer>;
};

const NoteListContainer = styled.div`
  grid-area: notes;
`;

export default NoteList;
