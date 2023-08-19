import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail, getProductOption } from '../api/post';
import style from '../css/detail.module.scss';

const DetailPage = () => {
  let [productData, setProductData] = useState<any>();
  let [productOption, setProductOption] = useState<any>([{ 옵션: '선택' }]);
  let { id } = useParams();
  useEffect(() => {
    const productIdx = {
      idx: id,
    };
    getProductDetail(productIdx)
      .then((response) => {
        setProductData(response[0]);
        console.log('response 값', response);
      })
      .catch((error: any) => {
        console.log(error);
      });

    getProductOption(productIdx).then((response) => {
      setProductOption(response);
    });
  }, [id]);
  // console.log('productData 값', productData);
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
          <div className={style.detail_main__content}>
            <span className="category">{productData.category_name}</span>
            <h1 className={style.detail_main__title}>
              {productData.product_name}
            </h1>
            <p className={style.detail_main__paragraph}>
              {productData.product_description}
            </p>
            <div className={style.detail_main__table_wrap}>
              <div className={style.detail_main__table}>
                <h4>배송비</h4>
                <span className={style.detail_main__table_value}>
                  3,000
                  <span className={style.detail_main__table_value_degree}>
                    {' '}
                    원
                  </span>
                </span>
              </div>
              <div className={style.detail_main__table}>
                <h4>할인율</h4>
                <span className={style.detail_main__table_value}>
                  {productData.product_discount}
                  <span className={style.detail_main__table_value_degree}>
                    {' '}
                    %
                  </span>
                </span>
              </div>
              <div className={style.detail_main__table}>
                <h4>색상</h4>
                <select>
                  {productOption.map((item: any) => {
                    return (
                      <option key={item.idx} value={item.option_name}>
                        {item.option_name} ({item.inventory})
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={style.detail_main__price_wrap}>
                <span className={style.detail_main__discount}>
                  {productData.product_price} 원
                </span>
                <span className={style.detail_main__price}>
                  {productData.product_price}
                  <span className={style.detail_main__price_degree}>원</span>
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
