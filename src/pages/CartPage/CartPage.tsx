import React, { useEffect, useState } from 'react';
import style from './Cart.module.scss';
import { getCartList, deleteCart, deleteSelectedCart } from '../../api/post';
import { IcartData } from '../../types/product';
import cartEmpty from '../../assets/cart-empty-img.png';
import { Link } from 'react-router-dom';
import CartItem from '../../components/posts/CartItem/CartItem';
import { useQuery } from 'react-query';

const CartPage = () => {
  const [cartData, setCartData] = useState<IcartData[]>();
  const [receivedSelectedData, setReceivedSelectedData] = useState<
    Array<string>
  >([]);
  // const { data } = useQuery({
  //   queryKey: ['get-test'],
  //   queryFn: () => getCartList().then((response) => response),
  // });
  const doGetCartList = () => {
    getCartList()
      .then((response) => {
        // console.log('response 값', response.data.content);
        setCartData(response.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const receiveData = (data: any) => {
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

  // console.log('data', data);
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
            <CartItem item={cartData} transportSelectedCart={receiveData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
