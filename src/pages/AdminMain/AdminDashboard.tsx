import React from 'react';
import AdminProductList from '../../components/posts/AdminProductList/AdminProductList';
import style from './AdminDashboard.module.scss';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <div className={style['hero']}>
        <h1 className="page-content__title">안녕하세요 관리자님!</h1>
      </div>
      <div>
        <div className={style['page-title-wrap']}>
          <h2 className="page-content__title main-page">
            현재 게시중인 상품 내역
          </h2>
        </div>
        <AdminProductList />
      </div>
    </div>
  );
};

export default AdminDashboard;
