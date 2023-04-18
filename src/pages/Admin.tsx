import React from 'react';
import AdminCreate from '../components/posts/AdminCreate';

const Admin = () => {
  return (
    <div>
      <div className="container--sm">
        <div className="page-content__wrap">
          <h1 className="page-content__title page-content__title--center">
            상품 추가
          </h1>
          <AdminCreate />
        </div>
      </div>
    </div>
  );
};

export default Admin;
