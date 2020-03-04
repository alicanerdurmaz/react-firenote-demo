import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

interface Props extends RouteProps {
  component: React.FC;
}

const PrivateRoute: React.FC<Props> = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useAuthContext();

  return <Route {...rest} render={routeProps => (currentUser ? <RouteComponent /> : <Redirect to={'/login'} />)} />;
};

export default PrivateRoute;
