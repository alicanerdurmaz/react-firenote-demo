import { createGlobalStyle } from 'styled-components/macro';
export const GlobalStyles = createGlobalStyle<{ theme: any }>`

html,
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
}

*::after,
*::before {
  box-sizing: border-box;
}

body {
  line-height: 1;
  justify-content: center;
  text-rendering: optimizeLegibility;
  align-items: center;
  background: ${props => props.theme.backgroundColor};
}
ol,
ul {
  list-style: none;
}

input{
	color:${props => props.theme.textColor};
	background-color:inherit;
	border-width: 0px;
    border-style: none;
	border-image: none;
	&:focus{
		outline:none;
	}
	font-family: Open Sans ;
}
`;
