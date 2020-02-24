import React, { useState } from 'react';
import styled from 'styled-components/macro';

import BarsIcon from '../assets/Icons/BarsIcon';
import SearchIcon from '../assets/Icons/SearchIcon';
import SettingsIcon from '../assets/Icons/SettingsIcon';
import SearchInput from './SearchInput';

type Props = {
  setLeftMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Navbar = ({ setLeftMenuOpen }: Props) => {
  return (
    <NavbarContainer>
      <GroupOne>
        <BarsButton onClick={e => setLeftMenuOpen(old => !old)}>
          <BarsIcon></BarsIcon>
        </BarsButton>
        <BrandName>
          <span>FireNote</span>
        </BrandName>
      </GroupOne>

      <GroupTwo>
        <SearchInput></SearchInput>
        <SettingsButton>
          <SettingsIcon></SettingsIcon>
        </SettingsButton>
      </GroupTwo>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  grid-area: nav;
  padding: 16px 8px;
`;

const BrandName = styled.div`
  color: ${props => props.theme.textColor};
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

const SettingsButton = styled.div`
  height: 100%;
  display: inline-block;
  margin-right: 8px;
`;
const SearchButton = styled.div``;
const BarsButton = styled.div`
  @media (min-width: 600px) {
    visibility: hidden;
  }
`;

const GroupOne = styled.div`
  flex: 1;
  display: flex;
`;
const GroupTwo = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Navbar;
