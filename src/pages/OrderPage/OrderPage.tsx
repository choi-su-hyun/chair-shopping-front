import React, { useState } from 'react';
import style from './OrderPage.module.scss';
import { useQuery } from 'react-query';
import { getCartList } from '../../api/post';
import CartItem from '../../components/posts/CartItem/CartItem';
import { discountPrice } from '../../utils/discountPrice';

const OrderPage = () => {
  const [countPrice, setCountPrice] = useState<number>(0);
  const { data } = useQuery('getCart', async () => {
    return await getCartList().then((res) => {
      const data = res.data.content;
      let sum = 0;
      for (let item of data) {
        let productPrice =
          Number(discountPrice(item.product_price, item.product_discount)) *
          item.cart_qty;
        sum = sum + productPrice;
      }
      setCountPrice(sum);
      return res.data.content;
    });
  });
  console.log('data', data);
  if (data == undefined) return null;
  return (
    <div>
      <div className={style['order-hero']}>
        <div className="container">
          <h1>주문하기</h1>
        </div>
      </div>
      <div className="container">
        <div className={style['cart-table']}>
          <CartItem items={data} countPrice={countPrice} pageName="order" />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
