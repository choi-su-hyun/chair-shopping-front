import React, { useEffect, useState } from 'react';
import { getProductList } from '../../api/post';
import ProductItem from './ProductItem/ProductItem';
import { AxiosResponse } from 'axios';
import { IProductData } from '../../types/product';
import { useQuery } from 'react-query';
import { getCategorysProduct } from '../../api/post';

const ProductList = () => {
  const [productResult, setProductResult] = useState<IProductData[]>([]);
  const categoryName = { category_idx: '9' };
  const { data } = useQuery(
    ['getThisCategoryProduct', categoryName],
    async () => {
      return await getCategorysProduct(categoryName).then((res) => {
        console.log('res 값', res);
        return res;
      });
    },
  );
  console.log('data 값', data);

  if (data == undefined) return null;
  return (
    <div className="container">
      <ProductItem item={data} havePagenation={false} />
    </div>
  );
};

export default ProductList;
