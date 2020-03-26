import React from 'react';
import styled from 'styled-components/macro';

type Props = {
  height?: number;
  width?: number;
};

const CancelIcon = ({ height = 24, width = 24 }: Props) => {
  return (
    <StyledCancelIcon height={height} width={width}>
      <svg focusable='false' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
        <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
        <path d='M0 0h24v24H0z' fill='none'></path>
      </svg>
    </StyledCancelIcon>
  );
};

export const StyledCancelIcon = styled.svg<Props>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  fill: #ff2e63;
  vertical-align: bottom;
`;

export default CancelIcon;
