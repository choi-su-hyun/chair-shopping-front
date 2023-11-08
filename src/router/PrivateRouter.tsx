import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRouter = () => {
  const isLogin = useSelector((state: RootState) => state.userAuth.user_token);
  console.log('isLogin값', isLogin);
  return isLogin ? <Outlet /> : <Navigate to={'/login'} />;
};

export default PrivateRouter;
