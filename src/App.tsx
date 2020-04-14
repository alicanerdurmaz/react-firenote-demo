import React, { Fragment, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import styled, { ThemeProvider } from 'styled-components/macro';
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/theme';
import RouteController from './components/RouteController';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [theme, setTheme] = useState(() => {
    const theme = localStorage.getItem('theme');
    if (theme === null) {
      localStorage.setItem('theme', 'dark');
      return 'dark';
    } else if (theme === 'light') {
      localStorage.setItem('theme', 'light');
      return 'light';
    } else {
      localStorage.setItem('theme', 'dark');
      return 'dark';
    }
  });

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', setSize);
    return () => {
      window.removeEventListener('resize', setSize);
    };
  }, []);

  function setSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  return (
    <AuthProvider>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <Fragment>
          <GlobalStyles />
          <AppContainer>
            <RouteController setTheme={setTheme}></RouteController>
          </AppContainer>
        </Fragment>
      </ThemeProvider>
    </AuthProvider>
  );
}
const AppContainer = styled.div`
  text-align: center;
  height: 100%;
`;

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
