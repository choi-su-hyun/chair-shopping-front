import React from 'react';

//component
import AdminCreateForm from '../components/posts/AdminCreateForm';

const AdminCreate = () => {
  return (
    <div className="container--sm">
      <div className="page-content__wrap">
        <h1 className="page-content__title">상품 생성하기</h1>
        <AdminCreateForm />
      </div>
    </div>
  );
};

export default AdminCreate;
