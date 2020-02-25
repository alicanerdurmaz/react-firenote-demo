import { createGlobalStyle } from 'styled-components/macro';


export const GlobalStyles = createGlobalStyle<{ theme: any }>`
html,
body {
  margin: 0;
  padding: 0;
  
  min-height:100vh;  
  height: 100vh;
  
  min-height: calc(var(--vh, 1vh) * 100);  
  height: calc(var(--vh, 1vh) * 100);

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
textarea{
	border-style: none;
	border-color: Transparent;
	overflow: auto;
	outline: none;
}
`;
