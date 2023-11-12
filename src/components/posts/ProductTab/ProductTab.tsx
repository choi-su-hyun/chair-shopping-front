import React, { useEffect, useState } from 'react';
import style from './ProductTab.module.scss';
import { getProductList, getCategorysProduct } from '../../../api/post';
import { IProductData } from '../../../types/product';
import ProductItem from '../ProductItem/ProductItem';
import useCategoryList from '../../../hooks/use-category-list';
import { ReactComponent as ProductNotExist } from '../../../assets/product-not-exist-img.svg';
import { ICategoryObject } from '../../../types/category';

const ProductTab = () => {
  const { categoryList } = useCategoryList();
  const [productResult, setProductResult] = useState<IProductData[]>([]);
  const [currentTab, setCurrentTab] = useState<string>('6');
  useEffect(() => {
    const categoryId = {
      category_idx: currentTab,
    };
    getCategorysProduct(categoryId).then((response: IProductData[]) => {
      console.log(response);
      if (response !== undefined) {
        setProductResult(response);
      }
      return;
    });
  }, []);

  const tabButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const categoryName = e.currentTarget.value;
    const categoryData = {
      category_idx: categoryName,
    };
    getCategorysProduct(categoryData).then((response: IProductData[]) => {
      console.log(response);
      if (response !== undefined) {
        setProductResult(response);
      }
    });
    setCurrentTab(categoryName);
  };
  //   console.log('category 값', category);
  return (
    <div>
      <div>
        <ul className={style.product_tab}>
          {categoryList !== undefined &&
            categoryList
              .filter((category) => category.idx != '6')
              .map((item: ICategoryObject) => {
                return (
                  <li
                    key={item.idx}
                    className={currentTab == item.idx ? style.active_tab : ''}
                  >
                    <button onClick={tabButton} value={item.idx}>
                      {item.category_name}
                    </button>
                  </li>
                );
              })}
          {categoryList !== undefined &&
            categoryList
              .filter((category) => category.idx == '6')
              .map((item: ICategoryObject) => {
                return (
                  <li
                    key={item.idx}
                    className={currentTab == item.idx ? style.active_tab : ''}
                  >
                    <button onClick={tabButton} value={item.idx}>
                      {item.category_name}
                    </button>
                  </li>
                );
              })}
        </ul>
      </div>
      <div className={style.product_tab__content}>
        {productResult[0] ? (
          <ProductItem item={productResult} />
        ) : (
          <div className={style.product_not_exist}>
            <ProductNotExist />
            <h2>상품이 없어요</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTab;
