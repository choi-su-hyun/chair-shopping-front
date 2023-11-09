import React from 'react';
import style from './AdminEditPage.module.scss';
import AdminEditForm from '../../components/posts/AdminEditForm/AdminEditForm';
import { useQuery } from 'react-query';
import { IProductOptionDB } from '../../types/product';
import {
  getProductDetail,
  getProductOption,
  getCategorys,
} from '../../api/post';
import { useParams } from 'react-router-dom';

const AdminEditPage = () => {
  const { id } = useParams();
  const productIdx = { productId: id };
  const { data } = useQuery('getProductDetail', async (): Promise<any> => {
    return await getProductDetail(productIdx).then(
      (res) => res.data.contents[0],
    );
  });
  const getCategoryData = useQuery('getCategory', async (): Promise<any> => {
    return await getCategorys().then((res) => res.data.contents);
  });
  const getOptionData = useQuery<IProductOptionDB[]>(
    'getOption',
    async (): Promise<any> => {
      return await getProductOption(productIdx).then(
        (res) => res.data.contents,
      );
    },
  );
  if (data == null || getOptionData.data == null) return null;
  return (
    <div>
      <div className={style['banner']}>
        <h1>
          <span className={style['title']}>
            &apos;{data.product_name}&apos;
          </span>{' '}
          수정하기
        </h1>
      </div>
      <div className="container">
        <AdminEditForm
          detail={data}
          optionData={getOptionData.data}
          categoryData={getCategoryData.data}
        />
      </div>
    </div>
  );
};

export default AdminEditPage;
