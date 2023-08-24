import React, { useEffect, useState } from 'react';
import style from '../../css/ProductTab.module.scss';
import { getProductList, getCategorysProduct } from '../../api/post';
import { IProductData } from '../../types/product';
import ProductItem from './ProductItem';
import useCategoryList from '../../hooks/use-category-list';
import { ReactComponent as ProductNotExist } from '../../assets/product-not-exist-img.svg';
import { ICategoryObject } from '../../types/category';
// interface test {

// }
const ProductTab = () => {
  const { categoryList } = useCategoryList();
  const [productResult, setProductResult] = useState<IProductData[]>([]);
  const [currentTab, setCurrentTab] = useState<string>('1');
  useEffect(() => {
    // getProductList()
    //   .then((response: any) => {
    //     // console.log('productList 값', response);
    //     setProductResult(response.data.contents);
    //     // console.log('product state 값', productResult);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
            categoryList.map((item: ICategoryObject) => {
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
