import React from 'react';
import style from './AdminCreate.module.scss';

//component
import AdminCreateForm from '../../components/posts/AdminCreateForm/AdminCreateForm';

const AdminCreate = () => {
  return (
    <div>
      <div className={style['banner']}>
        <h1 className="page-content__title">상품 생성하기</h1>
      </div>
      <div className="container">
        <AdminCreateForm />
      </div>
    </div>
  );
};

export default AdminCreate;
