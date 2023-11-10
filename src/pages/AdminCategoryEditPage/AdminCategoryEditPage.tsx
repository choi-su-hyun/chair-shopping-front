import React from 'react';
import AdminCategoryEdit from '../../components/posts/AdminCategoryEdit/AdminCategoryEdit';
import AdminCategoryList from '../../pages/AdminCategoryList/AdminCategoryList';
import style from './AdminCategoryEditPage.module.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCatagoryData } from '../../api/admin';

const AdminCategoryEditPage = () => {
  const { id } = useParams();
  const { data } = useQuery('getCategoryData', async () => {
    if (id == undefined) {
      console.log(id);
    }
    const enclosedId = {
      categoryId: id,
    };
    return await getCatagoryData(enclosedId).then((res) => res.data.contents);
  });
  return (
    <div>
      <h1>카테고리 수정하기</h1>
      <div className={style['page-layout']}>
        <div>
          <h2></h2>
        </div>
        <AdminCategoryEdit />
      </div>
    </div>
  );
};

export default AdminCategoryEditPage;
