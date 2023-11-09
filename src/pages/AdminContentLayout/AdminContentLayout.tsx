import React from 'react';
import Header from '../../components/AdminHeader/AdminHeader';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/AdminFooter/AdminFooter';
import SideBar from '../../components/SideBar/SideBar';
import style from './AdminContentLayout.module.scss';

const AdminContentLayout = () => {
  return (
    <div>
      <Header />
      <main className={style['main-container']}>
        <SideBar />
        <div className={style['main-content']}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminContentLayout;
