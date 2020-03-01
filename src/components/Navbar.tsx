import React, { useState } from 'react';
import styled from 'styled-components/macro';

import BarsIcon from '../assets/Icons/BarsIcon';
import SearchInput from './SearchInput';

type Props = {
  setLeftMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Navbar = ({ setLeftMenuOpen }: Props) => {
  return (
    <NavbarContainer>
      <StyledPanel>
        <BarsButton onClick={e => setLeftMenuOpen(old => !old)}>
          <BarsIcon></BarsIcon>
        </BarsButton>
        <SearchInput></SearchInput>
      </StyledPanel>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  grid-area: nav;
  padding: 8px 8px;
  display: flex;
  align-items: center;
`;
const StyledPanel = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  padding: 4px 8px;
  background: ${props => props.theme.backgroundColorSecondary};
`;

const BrandName = styled.div`
  color: ${props => props.theme.textColorPrimary};
  font-family: 'Montserrat';
  font-size: 22px;
  text-align: center;
  font-weight: 600;
  margin-left: 8px;
  span {
    margin-top: 1px;
    vertical-align: bottom;
    display: inline-block;
  }
`;

const BarsButton = styled.div`
  cursor: pointer;
  @media (min-width: 600px) {
    visibility: hidden;
  }
`;

export default Navbar;
