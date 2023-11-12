import React, { useEffect, useState } from 'react';
import { getProductList } from '../../api/post';
import ProductItem from './ProductItem/ProductItem';
import { AxiosResponse } from 'axios';

const ProductList = () => {
  const [productResult, setProductResult] = useState([]);
  useEffect(() => {
    getProductList()
      .then((response: AxiosResponse) => {
        console.log('productList 값', response);
        setProductResult(response.data.contents);
        // console.log('product state 값', productResult);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container">
      <ProductItem item={productResult} />
    </div>
  );
};

export default ProductList;
