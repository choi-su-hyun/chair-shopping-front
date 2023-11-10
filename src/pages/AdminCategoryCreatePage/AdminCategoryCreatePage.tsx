import React from 'react';
import AdminCategoryCreate from '../../components/posts/AdminCategoryCreate/AdminCategoryCreate';
import AdminCategoryList from '../../pages/AdminCategoryList/AdminCategoryList';
import style from './AdminCategoryCreatePage.module.scss';

const AdminCategoryCreatePage = () => {
  return (
    <div className={style['page-layout']}>
      <AdminCategoryCreate />
      <AdminCategoryList />
    </div>
  );
};

export default AdminCategoryCreatePage;
