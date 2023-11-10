import React from 'react';
import { Link } from 'react-router-dom';
import style from './AdminCategoryListItem.module.scss';
import { getCategoryList } from '../../../api/admin';
import { useQuery } from 'react-query';
import { ICategoryObject } from '../../../types/category';

const AdminCategoryListItem = () => {
  const { data } = useQuery<ICategoryObject[]>(
    'getCategoryList',
    async (): Promise<any> => {
      return await getCategoryList().then((res) => {
        return res.data.contents;
      });
    },
  );
  if (data == undefined) return null;
  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.idx} className={style['list-item']}>
            {item.category_name}
            <Link
              to={`/admin-edit-category/${item.idx}`}
              className={style['list-link']}
            >
              <span>편집</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AdminCategoryListItem;
