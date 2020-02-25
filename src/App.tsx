import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader/root';
import styled, { ThemeProvider } from 'styled-components/macro';
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/theme';

import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Fragment>
        <GlobalStyles />
        <AppContainer>
          <Layout></Layout>
        </AppContainer>
      </Fragment>
    </ThemeProvider>
  );
}
const AppContainer = styled.div`
  text-align: center;
  height: 100vh;
`;

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
