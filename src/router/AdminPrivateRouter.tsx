import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { Outlet, Navigate } from 'react-router-dom';

const AdminPrivateRouter = () => {
  const isAdminLogin = useSelector(
    (state: RootState) => state.adminAuth.admin_token,
  );
  console.log('isAdminLogin값', isAdminLogin);
  return isAdminLogin ? <Outlet /> : <Navigate to={'/admin'} />;
};

export default AdminPrivateRouter;
