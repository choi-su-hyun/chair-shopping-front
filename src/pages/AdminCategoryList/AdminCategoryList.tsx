import React from 'react';
import style from './AdminCategoryList.module.scss';
import AdminCategoryListItem from '../../components/posts/AdminCategoryListItem/AdminCategoryListItem';

const AdminCategoryList = () => {
  return (
    <div className={style['list-back']}>
      <div className={style['title-wrap']}>
        <h5>현재 카테고리 리스트</h5>
        <span>*원하시는 카테고리를 클릭하여 수정하세요.</span>
      </div>
      <div className={style['content-wrap']}>
        <AdminCategoryListItem />
      </div>
    </div>
  );
};

export default AdminCategoryList;
