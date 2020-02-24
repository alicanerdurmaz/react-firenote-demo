import React from 'react';
import styled from 'styled-components/macro';

const BarsIcon = () => {
  return (
    <StyledBar>
      <svg focusable='false' viewBox='0 0 24 24'>
        <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'></path>
      </svg>
    </StyledBar>
  );
};

export const StyledBar = styled.svg`
  width: 24px;
  height: 24px;
  fill: ${props => props.theme.iconColor};
  vertical-align: bottom;
`;

export default BarsIcon;
