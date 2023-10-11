import { addComma } from '../../../utils/addComma';
import { discountPrice } from '../../../utils/discountPrice';
import style from './CartItem.module.scss';
import { IcartData } from '../../../types/product';

import React, { useEffect, useState } from 'react';

const CartItem = ({
  item,
  transportSelectedCart,
}: {
  item: IcartData[];
  transportSelectedCart: any;
}) => {
  // console.log('item 값', item);
  const [selectedData, setSelectedData] = useState<Array<string>>([]);
  const arrangeCheckedItem = (checked: boolean, item: string) => {
    if (checked) {
      setSelectedData([...selectedData, item]);
    } else if (!checked) {
      setSelectedData(selectedData.filter((el) => el !== item));
    }
  };
  const selectedHandler = (e: any) => {
    arrangeCheckedItem(e.target.checked, e.target.name);
  };
  useEffect(() => {
    transportSelectedCart(selectedData);
  }, [selectedData]);

  return (
    <div>
      <div className={style['cart-table__header']}>
        <div>
          <input type="checkbox" />
        </div>
        <h2>상품 정보</h2>
        <h2>옵션/수량</h2>
        <h2>가격</h2>
        <h2>배송비</h2>
      </div>
      {item.map((item, index) => {
        return (
          <div className={style['cart-table__content']} key={index}>
            <div>
              <input
                type="checkbox"
                name={String(item.idx)}
                onChange={selectedHandler}
              />
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
            <div className={style['cart-table__remain-part']}>
              <p className={style['cart-table__delivery-cost']}>
                3,000
                <span className={style['cart-table__delivery-cost-degree']}>
                  원
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItem;
