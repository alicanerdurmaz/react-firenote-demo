import React, { useState, useEffect, useRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';

import BarsIcon from '../assets/Icons/BarsIcon';
import SearchInput from './SearchInput';
import { auth } from './Firebase/firebase';

type Props = {
  setLeftMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};
const Navbar = ({ setLeftMenuOpen, setTheme }: Props) => {
  const themeContext = useContext(ThemeContext);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsPanel = useRef<HTMLDivElement | null>(null);
  const settingsButton = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  function handleClick(e: MouseEvent) {
    if (!settingsOpen) return;
    if (settingsButton?.current?.contains(e.target as Node)) {
      return;
    }
    if (!settingsPanel?.current?.contains(e.target as Node)) {
      setSettingsOpen(false);
      return;
    }
  }

  const settingsButtonHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setSettingsOpen(prevState => !prevState);
  };
  const changeThemeButtonHandler = () => {
    console.log(themeContext.name);
    if (themeContext.name === 'dark') {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else if (themeContext.name === 'light') {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  const signOutHandler = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      /* @ TODO
				send information to developer
				show proper error message to user
			*/
    }
  };

  return (
    <NavbarContainer>
      <Panel>
        <BarsButton onClick={e => setLeftMenuOpen(old => !old)}>
          <BarsIcon></BarsIcon>
        </BarsButton>
        <BrandName>Firenote</BrandName>
        <SearchInput></SearchInput>
        <SettingsButton ref={settingsButton} onClick={e => settingsButtonHandler(e)}></SettingsButton>
        {settingsOpen && (
          <SettingsContainer ref={settingsPanel}>
            <SettingsList>
              <SettingsListItem onClick={changeThemeButtonHandler}>
                Change to
                {themeContext.name === 'dark' ? ' light theme' : ' dark theme'}
              </SettingsListItem>
              <SettingsListItem>About</SettingsListItem>
              <SettingsListItem onClick={signOutHandler}>Sign out</SettingsListItem>
            </SettingsList>
          </SettingsContainer>
        )}
      </Panel>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  grid-area: nav;
  padding: 8px 0px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.borderColor};
`;
const Panel = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  padding: 4px 8px;
  background: ${props => props.theme.backgroundColor};
`;

const BrandName = styled.div`
  cursor: pointer;
  color: ${props => props.theme.textColorPrimary};
  font-size: 22px;
  text-align: center;
  font-weight: 600;
  margin-left: 4px;
  margin-right: 8px;
  span {
    margin-top: 1px;
    vertical-align: bottom;
    display: inline-block;
  }
`;

const BarsButton = styled.div`
  cursor: pointer;
  @media (min-width: 700px) {
    display: none;
  }
`;

const SettingsButton = styled.div`
  cursor: pointer;
  background-image: ${props => props.theme.settingsIcon};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 24px 24px;
  height: 24px;
  width: 24px;
  margin-left: 8px;
  opacity: 0.6;
`;

const SettingsContainer = styled.div`
  position: absolute;
  height: max-content;
  width: max-content;
  top: 50px;
  right: 16px;
  z-index: 99;
  background: ${props => props.theme.backgroundColorSecondary};
  padding: 8px 16px;
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;
const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SettingsListItem = styled.div`
  user-select: none;
  cursor: pointer;
  width: 100%;
  color: ${props => props.theme.textColorPrimary};
  text-align: left;
  padding: 6px 0px;
  &:hover {
    color: ${props => props.theme.colors.lightBlue};
  }
`;

export default Navbar;
