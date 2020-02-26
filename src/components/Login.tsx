import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { auth, googleProvider } from '../components/Firebase/firebase';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  let history = useHistory();
  const { currentUser } = useAuthContext();

  const handleGoogleLogin = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  if (currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <h1>LOGIN PAGE</h1>
      <button onClick={handleGoogleLogin}>LOGIN</button>
    </div>
  );
};

export default Login;
