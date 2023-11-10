import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { Outlet, Navigate } from 'react-router-dom';
import { getCookie } from '../utils/reactCookie';

const PublicRouter = () => {
  const isLogin = getCookie('user_token');
  console.log('isLogin값', isLogin);
  return !isLogin ? <Outlet /> : <Navigate to={'/'} />;
};

export default PublicRouter;
