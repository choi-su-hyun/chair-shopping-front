import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail, getProductOption } from '../../api/post';
import style from './detail.module.scss';
import { IProductData, IProductOptionDB } from '../../types/product';
import DetailContent from '../../components/DetailContent/DetailContent';
import { addComma } from '../../utils/addComma';
import { discountPrice } from '../../utils/discountPrice';

const DetailPage = () => {
  let [productData, setProductData] = useState<IProductData>();
  let [productOption, setProductOption] = useState<IProductOptionDB[]>([
    { idx: null, option_name: '선택', inventory: 0 },
  ]);
  let { id } = useParams();
  useEffect(() => {
    const productIdx = {
      idx: id,
    };
    getProductDetail(productIdx)
      .then((response: [IProductData]) => {
        setProductData(response[0]);
        // console.log('response 값', response);
      })
      .catch((error: any) => {
        console.log(error);
      });

    getProductOption(productIdx).then((response: [IProductOptionDB]) => {
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
                  {productOption.map((item: IProductOptionDB) => {
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
                  {addComma(productData.product_price)} 원
                </span>
                <span className={style.detail_main__price}>
                  {addComma(
                    discountPrice(
                      productData.product_price,
                      productData.product_discount,
                    ),
                  )}
                  <span className={style.detail_main__price_degree}>원</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <DetailContent image={productData.image_detail_path} />
      </div>
    </div>
  );
};

export default DetailPage;