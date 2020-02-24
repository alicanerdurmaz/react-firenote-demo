import React, { useRef, useEffect } from 'react';
import styled from 'styled-components/macro';

type Props = {
  leftMenuOpen: boolean;
  setLeftMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type StyleProps = {
  leftMenuOpen: boolean;
};

const LeftSideMenu: React.FC<Props> = ({ leftMenuOpen, setLeftMenuOpen }: Props) => {
  //

  useEffect(() => {
    if (!leftMenuOpen) return;
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };

    function handleUserKeyPress(e: KeyboardEvent) {
      console.log('worked');
      if (leftMenuOpen && e.key === 'Escape') {
        setLeftMenuOpen(false);
      }
    }
  }, [leftMenuOpen, setLeftMenuOpen]);

  const closeLeftMenu = (e: React.MouseEvent) => {
    setLeftMenuOpen(false);
  };
  const handleLeftMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <LeftMenuContainer onClick={e => closeLeftMenu(e)} leftMenuOpen={leftMenuOpen}>
      <LeftMenuContent onClick={e => handleLeftMenu(e)}></LeftMenuContent>
    </LeftMenuContainer>
  );
};

const LeftMenuContainer = styled.div<StyleProps>`
  @media (max-width: 600px) {
    will-change: transform;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear 0s;
    transform-origin: 1px;
    transform: ${({ leftMenuOpen }) => (leftMenuOpen ? 'translateX(0)' : 'translateX(-100%)')};
    display: flex;
    flex-direction: row;
  }
  background: black;
  opacity: 0.6;
  grid-area: left;
`;

const LeftMenuContent = styled.div`
  @media (max-width: 600px) {
    width: 60%;
    margin-top: 55px;
  }
  width: 240px;
  background: pink;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.28);
`;

export default LeftSideMenu;
