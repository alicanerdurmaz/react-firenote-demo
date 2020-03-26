import React, { useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useFirebaseContext } from '../../context/NoteContext/NoteContext';
import TagListItem from './TagListItem';
import LeftIcon from '../../assets/Icons/LeftIcon';

type Props = {
  leftMenuOpen: boolean;
  setLeftMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type StyleProps = {
  leftMenuOpen: boolean;
};

const LeftSideMenu: React.FC<Props> = ({ leftMenuOpen, setLeftMenuOpen }: Props) => {
  //
  const { tagsList } = useFirebaseContext();
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
      <LeftMenuContent onClick={e => handleLeftMenu(e)}>
        <LeftMenuHeader>
          <LeftIconContainer onClick={closeLeftMenu}>
            <LeftIcon width={22} height={22}></LeftIcon>
          </LeftIconContainer>
        </LeftMenuHeader>
        <TagsList>
          <span>TAGS</span>
          {tagsList.map(e => {
            return <TagListItem key={e} tagName={e}></TagListItem>;
          })}
        </TagsList>
      </LeftMenuContent>
    </LeftMenuContainer>
  );
};

const LeftMenuContainer = styled.div<StyleProps>`
  @media (max-width: 600px) {
    will-change: transform;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear 0s;
    transform-origin: 1px;
    transform: ${({ leftMenuOpen }) => (leftMenuOpen ? 'translateX(0)' : 'translateX(-100%)')};
    display: flex;
    flex-direction: row;
    background: rgba(0, 0, 0, 0.5);
  }
  grid-area: left;
`;

const LeftMenuHeader = styled.div`
  display: flex;
  flex-direction: column;
  height: 36px;
  * {
    cursor: pointer;
  }
`;
const LeftIconContainer = styled.div`
  justify-self: flex-start;
  align-self: flex-start;
  width: 48px;
  height: 100%;
  * {
    margin-top: 6px;
    margin-left: 12px;
  }
`;

const LeftMenuContent = styled.div`
  will-change: width;
  z-index: 99;
  opacity: 1;
  @media (max-width: 600px) {
    width: 80%;
    opacity: 1;
    background: ${proprs => proprs.theme.backgroundColor};
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.4);
  }
  @media (min-width: 600px) {
    height: 100%;
    opacity: 1;
    background: ${proprs => proprs.theme.backgroundColor};
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.4);
  }
  width: 280px;
  height: 100%;
  background: ${proprs => proprs.theme.backgroundColor};
`;

const TagsList = styled.div`
  border-top: 1px solid ${props => props.theme.borderColor};
  border-bottom: 1px solid ${props => props.theme.borderColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px 0px;
  span {
    color: ${props => props.theme.textColorSecondary};
    margin: 8px 0px 8px 17px;
  }
`;

export default LeftSideMenu;
