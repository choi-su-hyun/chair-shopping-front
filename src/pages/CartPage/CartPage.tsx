import React, { useEffect, useState } from 'react';
import style from './Cart.module.scss';
import { getCartList, deleteCart, deleteSelectedCart } from '../../api/post';
import { IcartData } from '../../types/product';
import cartEmpty from '../../assets/cart-empty-img.png';
import { Link } from 'react-router-dom';
import CartItem from '../../components/posts/CartItem/CartItem';
import { useQuery } from 'react-query';
import { addComma } from '../../utils/addComma';
import { discountPrice } from '../../utils/discountPrice';

const CartPage = () => {
  const [cartData, setCartData] = useState<IcartData[]>();
  const [receivedSelectedData, setReceivedSelectedData] = useState<
    Array<string>
  >([]);
  const [countPrice, setCountPrice] = useState<number>(0);

  const doGetCartList = () => {
    getCartList()
      .then((response) => {
        // console.log('response 값', response.data.content);
        setCartData(response.data.content);
        const data = response.data.content;
        let sum = 0;
        for (let item of data) {
          let productPrice =
            Number(discountPrice(item.product_price, item.product_discount)) *
            item.cart_qty;
          sum = sum + productPrice;
        }
        setCountPrice(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log('cartData', cartData);

  const receiveData = (data: Array<string>) => {
    setReceivedSelectedData([...data]);
  };
  const doDeleteSelectedCart = () => {
    deleteSelectedCart(receivedSelectedData);
    doGetCartList();
  };
  const deleteAllCart = () => {
    deleteCart();
    doGetCartList();
  };
  console.log('window', window);

  useEffect(() => {
    doGetCartList();
  }, []);

  if (cartData === undefined) return null;
  return (
    <div>
      <div className={style['cart-hero']}>
        <div className="container">
          <h1>장바구니</h1>
        </div>
      </div>
      <div className="container">
        <div className={style['cart-table']}>
          <div className={style['cart-table__option-btn-wrap']}>
            <button
              className="general-btn--text block-btn"
              onClick={doDeleteSelectedCart}
            >
              선택항목 삭제
            </button>
            <button
              onClick={deleteAllCart}
              className="general-btn--text block-btn"
            >
              장바구니 비우기
            </button>
          </div>
          {cartData.length == 0 ? (
            <div className={style['cart-empty']}>
              <img src={cartEmpty} alt="" />
              <h2>장바구니가 비어있어요!</h2>
              <p>마음에 드는 의자를 장바구니에 담아보세요!</p>
              <Link to="/product" className="cta-btn--block">
                상품 둘러보러 가기
              </Link>
            </div>
          ) : (
            <CartItem
              items={cartData}
              transportSelectedCart={receiveData}
              countPrice={countPrice}
              pageName="cart"
            />
          )}
        </div>
      </div>
      <div className={style['btn-wrap']}>
        <Link to={'/order'} className="cta-btn--block">
          주문하러가기
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
