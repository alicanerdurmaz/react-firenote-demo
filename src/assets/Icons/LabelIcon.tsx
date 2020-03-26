import React from 'react';
import styled from 'styled-components/macro';

type StyledProps = {
  selected: boolean;
};

const LabelIcon = ({ selected = false }) => {
  return (
    <StyledLabelIcon selected={selected}>
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
        <path d='M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z'></path>
      </svg>
    </StyledLabelIcon>
  );
};

export const StyledLabelIcon = styled.svg<StyledProps>`
  width: 24px;
  height: 24px;
  fill: ${props => (props.selected ? '#00a8cc' : props.theme.iconColorSecondary)};
`;

export default LabelIcon;
