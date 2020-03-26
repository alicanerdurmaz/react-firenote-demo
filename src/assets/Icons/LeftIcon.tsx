import React from 'react';
import styled from 'styled-components/macro';

type Props = {
  height?: number;
  width?: number;
};

const LeftIcon = ({ height = 24, width = 24 }: Props) => {
  return (
    <StyledLeftIcon height={height} width={width}>
      <svg
        aria-hidden='true'
        focusable='false'
        data-prefix='fas'
        data-icon='arrow-left'
        role='img'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 448 512'>
        <path d='M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z'></path>
      </svg>
    </StyledLeftIcon>
  );
};

export const StyledLeftIcon = styled.svg<Props>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  fill: ${props => props.theme.textColorSecondary};
  vertical-align: bottom;
`;

export default LeftIcon;
