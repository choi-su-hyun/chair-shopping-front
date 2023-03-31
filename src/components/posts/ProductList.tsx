import React from 'react';
import { getProductList } from '../../api/post';

const ProductList = () => {
  async function productList() {
    return await getProductList();
  }
  getProductList().then((response) => {
    console.log('productList 값', response);
  });
  //   const productList = getProductList();
  return <div>product</div>;
};

export default ProductList;
