import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail, getProductOption } from '../../api/post';
import style from './detail.module.scss';
import { IProductData, IProductOptionDB } from '../../types/product';
import DetailContent from '../../components/DetailContent/DetailContent';
import { addComma } from '../../utils/addComma';
import { discountPrice } from '../../utils/discountPrice';
import { ReactComponent as UserCart } from '../../assets/user-cart.svg';
import { ReactComponent as DirectionBoard } from '../../assets/direction-board.svg';
import useInsertCart from '../../hooks/insert-to-cart';

const DetailPage = () => {
  let [productData, setProductData] = useState<IProductData>();
  let [productOption, setProductOption] = useState<IProductOptionDB[]>([
    { idx: 0, option_name: '선택', inventory: 0, productId: 0 },
  ]);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const { insertProduct, noticeOptionState } = useInsertCart(
    productData,
    selectedOption,
    quantity,
  );
  let { id } = useParams();

  const selectedOptionHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(parseInt(e.target.value));
  };
  const quantityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setQuantity(Number(e.target.value));
  };

  useEffect(() => {
    const productIdx = {
      productId: id,
    };
    getProductDetail(productIdx)
      .then((response) => {
        setProductData(response.data.contents[0]);
        // console.log('response 값', response);
      })
      .catch((error: any) => {
        console.log(error);
      });

    getProductOption(productIdx).then((response) => {
      setProductOption(response.data.contents);
    });
  }, [id]);

  if (productData === undefined) return null;
  return (
    <div className={style['detail-page']}>
      <div className="container">
        <div className={style['detail-main']}>
          <div>
            <img
              src={
                process.env.REACT_APP_API_URL + productData.image_thumnail_path
              }
              alt=""
            />
          </div>
          <div className={style['detail-main__content']}>
            <div className={style['detail_main__title-wrap']}>
              <span className="category">{productData.category_name}</span>
              <h1 className={style['detail-main__title']}>
                {productData.product_name}
              </h1>
              <p className={style['detail-main__paragraph']}>
                {productData.product_description}
              </p>
            </div>
            <div className={style['detail-main__table-wrap']}>
              <div className={style['detail-main__table']}>
                <h4>배송비</h4>
                <span className={style['detail-main__table-value']}>
                  3,000
                  <span className={style['detail-main__table-value-degree']}>
                    {' '}
                    원
                  </span>
                </span>
              </div>
              <div className={style['detail-main__table']}>
                <h4>할인율</h4>
                <span className={style['detail-main__table-value']}>
                  {productData.product_discount}
                  <span className={style['detail-main__table-value-degree']}>
                    {' '}
                    %
                  </span>
                </span>
              </div>
              <div className={style['detail-main__table']}>
                <h4>색상</h4>
                <select
                  onChange={selectedOptionHandler}
                  className={style['detail-main__select-bar']}
                >
                  <option value="0">옵션을 선택하세요</option>
                  {productOption.map((item: IProductOptionDB) => {
                    return (
                      <option key={item.idx} value={item.idx}>
                        {item.option_name} ({item.inventory})
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={style['detail-main__table']}>
                <h4>수량</h4>
                <input
                  type="number"
                  className={style['detail-main__input']}
                  onChange={quantityHandler}
                  placeholder="0"
                  value={quantity}
                />
              </div>
              <div className={style['detail-main__price-wrap']}>
                <span className={style['detail-main__discount']}>
                  {addComma(Number(productData.product_price) * quantity)} 원
                </span>
                <span className={style['detail-main__price']}>
                  {addComma(
                    discountPrice(
                      Number(productData.product_price) * quantity,
                      productData.product_discount,
                    ),
                  )}
                  <span className={style['detail-main__price-degree']}>원</span>
                </span>
              </div>
              {noticeOptionState && (
                <div className={style['detail-main__notice']}>
                  <DirectionBoard />
                  상품의 옵션을 선택해주세요.
                </div>
              )}
            </div>
            <div className={style['detail-main__purchase']}>
              <button
                className="cta-btn--block have-icon"
                onClick={insertProduct}
              >
                <UserCart />
                장바구니에 담기
              </button>
            </div>
          </div>
        </div>
        <DetailContent image={productData.image_detail_path} />
      </div>
    </div>
  );
};

export default DetailPage;
