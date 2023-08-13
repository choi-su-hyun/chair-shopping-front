import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../api/post';
import style from '../css/detail.module.scss';

const DetailPage = () => {
  let [productData, setProductData] = useState<any>();
  let { id } = useParams();
  useEffect(() => {
    const productIdx = {
      idx: id,
    };
    getProductDetail(productIdx)
      .then((response) => {
        setProductData(response[0]);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [id]);
  console.log('productData 값', productData);
  if (productData === undefined) return null;
  return (
    <div className={style.detail_page}>
      <div className="container">
        <div className={style.detail_main}>
          <div>
            <img
              src={
                process.env.REACT_APP_API_URL + productData.image_thumnail_path
              }
              alt=""
            />
          </div>
          <div>
            <span>{productData.category_name}</span>
            <h1>{productData.product_name}</h1>
            <p>{productData.product_description}</p>
            <div>
              <div className={style.detail_main__table}>
                <h4>배송비</h4>
                <span>
                  3,000<span>원</span>
                </span>
              </div>
              <div className={style.detail_main__table}>
                <h4>할인율</h4>
                <span>
                  {productData.product_discount}
                  <span>%</span>
                </span>
              </div>
              <div className={style.detail_main__table}>
                <h4>색상</h4>
                <span>
                  {productData.product_discount}
                  <span>%</span>
                </span>
              </div>
              <div>
                <span>{productData.product_price} 원</span>
                <span>
                  {productData.product_price} <span>원</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
