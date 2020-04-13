import React from 'react';

import { auth, googleProvider } from '../components/Firebase/firebase';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const { currentUser } = useAuthContext();

  const handleGoogleLogin = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>LOGIN PAGE</h1>
      <button onClick={handleGoogleLogin}>LOGIN</button>
    </div>
  );
};

export default Login;
