import React from 'react';
import ProductList from '../../components/posts/ProductList';
import ProductTab from '../../components/posts/ProductTab/ProductTab';
import style from './ProductPage.module.scss';

const ProductPage = () => {
  return (
    <div>
      <div className={style.hero}>
        <div className="container">
          <h1 className="page-content__title">Relaxing Chair의 모든 의자</h1>
        </div>
      </div>
      <div className="container">
        <ProductTab />
      </div>
    </div>
  );
};

export default ProductPage;
