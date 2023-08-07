import React, { useEffect, useState } from 'react';
import style from '../../css/ProductTab.module.scss';
import {
  getProductList,
  getCategorys,
  getCategorysProduct,
} from '../../api/post';
import ProductItem from './ProductItem';

//svg component
import { ReactComponent as ProductNotExist } from '../../assets/product-not-exist-img.svg';

const ProductTab = () => {
  const [category, setCategory] = useState([]);
  const [productResult, setProductResult] = useState([]);
  useEffect(() => {
    getCategorys()
      .then((response: any) => {
        // console.log('category 리스트', response.data.contents);
        setCategory(response.data.contents);
      })
      .catch((error) => {
        console.log(error);
      });

    getProductList()
      .then((response: any) => {
        // console.log('productList 값', response);
        setProductResult(response.data.contents);
        // console.log('product state 값', productResult);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabButton = (e: React.ChangeEvent<any>) => {
    const categoryName = e.target.value;
    const categoryData = {
      category_idx: categoryName,
    };
    getCategorysProduct(categoryData).then((response: any) => {
      console.log(response);
      setProductResult(response);
    });
  };
  //   console.log('category 값', category);
  return (
    <div>
      <div className={style.product_tab}>
        {category.map((item: any) => {
          return (
            <button key={item.idx} onClick={tabButton} value={item.idx}>
              {item.category_name}
            </button>
          );
        })}
      </div>
      {productResult[0] ? (
        <ProductItem item={productResult} />
      ) : (
        <div className={style.product_not_exist}>
          <ProductNotExist />
          <h2>상품이 없어요</h2>
        </div>
      )}
    </div>
  );
};

export default ProductTab;
