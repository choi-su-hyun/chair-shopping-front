import React from 'react';
import AdminCategoryEdit from '../../components/posts/AdminCategoryEdit/AdminCategoryEdit';
import AdminCategoryList from '../../pages/AdminCategoryList/AdminCategoryList';
import style from './AdminCategoryEditPage.module.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCatagoryData } from '../../api/admin';

const AdminCategoryEditPage = () => {
  const { id } = useParams();
  const enclosedId = {
    categoryId: id,
  };
  const { data } = useQuery(['getCategoryData', enclosedId], async () => {
    // if (id !== undefined) {
    // const enclosedId = {
    //   categoryId: id,
    // };
    return await getCatagoryData(enclosedId).then((res) => res.data.contents);
    // } else {
    //   return;
    // }
  });
  console.log('data값', data);
  if (data == undefined || data == null) return null;
  return (
    <div>
      <h1 className={style['page-title']}>카테고리 수정하기</h1>
      <div className={style['page-layout']}>
        <div className={style['page-content']}>
          <h2>&apos;{data.category_name}&lsquo; 카테고리 수정하기</h2>
          <AdminCategoryEdit />
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryEditPage;
