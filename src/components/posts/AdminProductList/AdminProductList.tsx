import React from 'react';
import AdminProductItem from '../AdminProductItem/AdminProductItem';
import { useQuery } from 'react-query';
import { getProductList } from '../../../api/post';

const AdminProductList = () => {
  const { data } = useQuery('getProductList', async (): Promise<any> => {
    try {
      return await getProductList().then((res) => res?.data.contents);
    } catch (error) {
      console.log(error);
    }
  });
  console.log('data 값', data);
  if (data == null) return null;
  return (
    <div className="container">
      <AdminProductItem items={data} />
    </div>
  );
};

export default AdminProductList;
