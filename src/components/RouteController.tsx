import React, { Fragment } from 'react';

import { useAuthContext } from '../context/AuthContext';
import MainPage from './MainPage';
import Login from './Login';

const RouteController = () => {
  const { currentUser } = useAuthContext();
  return <Fragment>{currentUser ? <MainPage></MainPage> : <Login></Login>}</Fragment>;
};

export default RouteController;
