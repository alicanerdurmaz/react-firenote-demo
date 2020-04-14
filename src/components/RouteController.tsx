import React, { Fragment } from 'react';

import { useAuthContext } from '../context/AuthContext';
import MainPage from './MainPage';
import Login from './Login';

type IRouteController = {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};
const RouteController = ({ setTheme }: IRouteController) => {
  const { currentUser } = useAuthContext();
  return <Fragment>{currentUser ? <MainPage setTheme={setTheme}></MainPage> : <Login></Login>}</Fragment>;
};

export default RouteController;
