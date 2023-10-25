import React from 'react';
import AdminProductList from '../components/posts/AdminProductList/AdminProductList';

//component

const AdminMain = () => {
  return (
    <div className="container">
      <div className="page-content__wrap--sm">
        <h1 className="page-content__title">안녕하세요 관리자님!</h1>
        <div>
          <h2 className="page-content__title--sm">현재 게시중인 상품 내역</h2>
          <AdminProductList />
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
