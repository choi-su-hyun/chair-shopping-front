import React from 'react';
import Header from '../components/AdminHeader/AdminHeader';
import { Outlet } from 'react-router-dom';
import Footer from '../components/AdminFooter/AdminFooter';

const AdminLoginLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLoginLayout;
