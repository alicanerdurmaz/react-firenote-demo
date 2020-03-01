import React, { useContext } from 'react';
import PaletteIcon from '../assets/Icons/PaletteIcon';
import styled, { ThemeContext } from 'styled-components/macro';

type Props = {
  selectColor: (color: string) => void;
  selectedColorProp: string;
};
type StyledProps = {
  selectedColor: string;
};

const SelectColorPanel = ({ selectColor, selectedColorProp }: Props) => {
  const themeContext = useContext(ThemeContext);
  return (
    <Details>
      <Summary>
        <PaletteIcon></PaletteIcon>
      </Summary>
      <HiddenPanel>
        <CircleContainer>
          <Circle
            color={themeContext.backgroundColor}
            onClick={e => selectColor(themeContext.backgroundColor)}
            selectedColor={selectedColorProp}
          />
          <Circle color='#5c2b29' onClick={e => selectColor('#5c2b29')} selectedColor={selectedColorProp} />
          <Circle color='#614a19' onClick={e => selectColor('#614a19')} selectedColor={selectedColorProp} />
          <Circle color='#635d19' onClick={e => selectColor('#635d19')} selectedColor={selectedColorProp} />
          <Circle color='#345920' onClick={e => selectColor('#345920')} selectedColor={selectedColorProp} />
          <Circle color='#16504b' onClick={e => selectColor('#16504b')} selectedColor={selectedColorProp} />
          <Circle color='#2d555e' onClick={e => selectColor('#2d555e')} selectedColor={selectedColorProp} />
          <Circle color='#1e3a5f' onClick={e => selectColor('#1e3a5f')} selectedColor={selectedColorProp} />
          <Circle color='#42275e' onClick={e => selectColor('#42275e')} selectedColor={selectedColorProp} />
          <Circle color='#5b2245' onClick={e => selectColor('#5b2245')} selectedColor={selectedColorProp} />
          <Circle color='#442f19' onClick={e => selectColor('#442f19')} selectedColor={selectedColorProp} />
          <Circle color='#3c3f43' onClick={e => selectColor('#3c3f43')} selectedColor={selectedColorProp} />
        </CircleContainer>
      </HiddenPanel>
    </Details>
  );
};

const Details = styled.details`
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  display: inline-block;
  position: relative;
  &[open] > summary:before {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: block;
    cursor: default;
    content: ' ';
    background: transparent;
  }
`;
const Summary = styled.summary`
  ::-webkit-details-marker {
    display: none;
  }
  display: list-item;
  list-style: none;
  user-select: none;
  outline: none;
`;
const HiddenPanel = styled.div`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  background-color: ${props => props.theme.backgroundColorSecondary};
  border-radius: 4px;
  text-align: start;
  padding: 4px 8px;
  z-index: 2;
  position: absolute;
  bottom: 120%;
  width: 150px;
`;
const CircleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Circle = styled.div<StyledProps>`
  display: inline-block;
  cursor: pointer;
  width: 24px;
  height: 24px;
  background: ${props => {
    const color = props.color;
    if (color === 'default') {
      return props.theme.backgroundColor;
    } else {
      return color;
    }
  }};
  border-radius: 50%;
  margin: 4px;
  border: 2px solid
    ${props => {
      const selected = props.selectedColor;
      const color = props.color;
      if (color === selected) {
        return props.theme.textColorPrimary;
      } else {
        return 'transparent';
      }
    }};
  :hover {
    border: 2px solid ${props => props.theme.textColorPrimary};
  }
`;
export default SelectColorPanel;
