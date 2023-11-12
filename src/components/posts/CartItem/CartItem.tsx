import { addComma } from '../../../utils/addComma';
import { discountPrice } from '../../../utils/discountPrice';
import style from './CartItem.module.scss';
import { IcartData } from '../../../types/product';

import React, { useEffect, useState } from 'react';

const CartItem = ({
  items,
  transportSelectedCart,
  countPrice,
  pageName,
}: {
  items: IcartData[];
  transportSelectedCart?: (arg: Array<string>) => void;
  countPrice: number;
  pageName: string;
}) => {
  // console.log('item 값', items);
  const [selectedData, setSelectedData] = useState<Array<string>>([]);
  // console.log('selectedData 값', selectedData);

  const selectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSingleCheck(e.target.checked, e.target.name);
  };

  const handleSingleCheck = (checked: boolean, item: string) => {
    if (checked) {
      setSelectedData([...selectedData, item]);
    } else if (!checked) {
      setSelectedData(selectedData.filter((el) => el !== item));
    }
  };

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      let idArray: string[] = [];
      items.map((item) => idArray.push(String(item.idx)));
      setSelectedData(idArray);
    } else {
      setSelectedData([]);
    }
  };
  useEffect(() => {
    if (pageName == 'cart') {
      transportSelectedCart?.(selectedData);
    }
  }, [selectedData]);
  // console.log('countPrice', countPrice);

  return (
    <div>
      <div className={style['cart-table__header']}>
        <div>
          {pageName == 'order' ? (
            ''
          ) : (
            <input
              type="checkbox"
              onChange={(e) => handleAllCheck(e.target.checked)}
              checked={items.length === selectedData.length ? true : false}
            />
          )}
        </div>
        <h2>상품 정보</h2>
        <h2>옵션/수량</h2>
        <h2>가격</h2>
        {/* <h2>배송비</h2> */}
      </div>
      {items.map((item, index) => {
        return (
          <div className={style['cart-table__content']} key={index}>
            <div>
              {pageName == 'order' ? (
                ''
              ) : (
                <input
                  type="checkbox"
                  name={String(item.idx)}
                  onChange={selectedHandler}
                  checked={
                    selectedData.includes(String(item.idx)) ? true : false
                  }
                />
              )}
            </div>
            <div className={style['cart-table__product-info']}>
              <img
                src={process.env.REACT_APP_API_URL + item.image_thumnail_path}
                alt=""
              />
              <div>
                <span className="category">{item.category_name}</span>
                <h4>{item.product_name}</h4>
                <div className={style['cart-table__price-wrap']}>
                  <p className={style['cart-table__price']}>
                    {addComma(
                      discountPrice(
                        Number(item.product_price) * item.cart_qty,
                        item.product_discount,
                      ),
                    )}
                    <span className={style['cart-table__price-degree']}>
                      원
                    </span>
                  </p>
                  <p className={style['cart-table__first-cost']}>
                    {addComma(Number(item.product_price) * item.cart_qty)}
                    <span className={style['cart-table__first-cost-degree']}>
                      원
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className={style['cart-table__remain-part']}>
              <p className={style['cart-table__option-and-qty']}>
                <span>{item.option_name}</span> / <span>{item.cart_qty}</span>
              </p>
            </div>
            <div className={style['cart-table__remain-part']}>
              <p
                className={`${style['cart-table__price']} ${style['product-price']}`}
              >
                {addComma(
                  discountPrice(
                    Number(item.product_price) * item.cart_qty,
                    item.product_discount,
                  ),
                )}
                <span className={style['cart-table__price-degree']}>원</span>
              </p>
            </div>
            {/* <div className={style['cart-table__remain-part']}>
              <p className={style['cart-table__delivery-cost']}>
                3,000
                <span className={style['cart-table__delivery-cost-degree']}>
                  원
                </span>
              </p>
            </div> */}
          </div>
        );
      })}
      <div className={style['delivery-fee']}>
        <span className={style['delivery-fee__title']}>배송비</span>
        <span className={style['delivery-fee__price']}>
          + {addComma(3000)}원
        </span>
      </div>
      <div className={style['count-price']}>
        <span className={style['count-price__title']}>총액</span>
        <p className={`${style['cart-table__price']} ${style['count']}`}>
          {addComma(countPrice + 3000)}
          <span
            className={`${style['cart-table__price-degree']} ${style['count']}`}
          >
            원
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartItem;
