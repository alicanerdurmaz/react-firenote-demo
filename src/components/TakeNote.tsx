import React, { Fragment } from 'react';
import styled from 'styled-components/macro';
import { slideUp } from '../styles/animations/slideUp';
type Props = {
  addNoteAreaOpen: boolean;
  setAddNoteAreaOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type StyleProps = {
  addNoteAreaOpen: boolean;
};

const TakeNote = ({ addNoteAreaOpen, setAddNoteAreaOpen }: Props) => {
  return (
    <TakeNoteLayout>
      <TakeNoteContainer>
        <StyledTakeNote>
          <TitleInput></TitleInput>
          <ContentInput></ContentInput>
        </StyledTakeNote>
      </TakeNoteContainer>
    </TakeNoteLayout>
  );
};

const TakeNoteLayout = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.3;
  overflow: hidden;
`;
const TakeNoteContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
`;
const StyledTakeNote = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: green;
`;
const TitleInput = styled.div``;
const ContentInput = styled.div``;

export default TakeNote;
