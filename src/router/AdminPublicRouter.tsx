import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { Outlet, Navigate } from 'react-router-dom';

const AdminPublicRouter = () => {
  const isAdminLogin = useSelector(
    (state: RootState) => state.userAuth.user_token,
  );
  console.log('isAdminLogin값', isAdminLogin);
  return !isAdminLogin ? <Outlet /> : <Navigate to={'/'} />;
};

export default AdminPublicRouter;
