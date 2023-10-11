import { useNavigate } from 'react-router-dom';
import { insertToCart } from '../api/post';
import { IProductData } from '../types/product';
import { useEffect, useState } from 'react';
import { getCartList, getCategorys } from '../api/post';
import { IcartData } from '../types/product';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { saveNewPopup } from '../redux/alertPopup/action';
import alertImg from '../assets/alert-login-popup-img.png';
import alertCartExist from '../assets/alert-cart-exist-popup-img.png';

const useInsertCart = (
  productData: IProductData | undefined,
  option: number,
  quantity: number,
) => {
  const [noticeOptionState, setNoticeOptionState] = useState<Boolean>(false);
  const [onlyOneCartItem, setOnlyOneCartItem] = useState<Boolean>(false);
  const navigate = useNavigate();
  const loginState = useSelector(
    (state: RootState) => state.userAuth.user_token,
  );
  const dispatch = useDispatch();
  // console.log('loginState 값', loginState);
  const [cartState, setCartState] = useState<IcartData[] | undefined>();
  useEffect(() => {
    if (loginState) {
      getCartList().then((response) => {
        setCartState(response?.data.content);
      });
    }
  }, [loginState]);
  // console.log(cartState);
  const insertProduct = async () => {
    try {
      const cartData = {
        productIdx: productData?.idx,
        productOption: option,
        quantity: quantity,
      };

      if (!loginState) {
        const popupData = {
          image: alertImg,
          title: '로그인이 필요해요.',
          paragraph: '장바구니는 로그인하신 후 이용할 수 있습니다.',
          ctaBtn: '로그인하러 가기',
          popupController: true,
        };
        dispatch(saveNewPopup(popupData));
      } else {
        if (option === 0) {
          setNoticeOptionState(true);
        } else {
          setNoticeOptionState(false);

          if (cartState != undefined) {
            // console.log('cartState가 undefined가 아님');
            if (cartState.length != 0) {
              // console.log('cartState.length가 0이 아님');
              for (let item of cartState) {
                // console.log('item 값', item);
                if (
                  productData?.idx == item.productId &&
                  option == item.optionId
                ) {
                  const popupData2 = {
                    image: alertCartExist,
                    title: '장바구니에 이미 담겨있는 상품입니다.',
                    paragraph: '수량을 추가할까요?',
                    ctaBtn: '수량 추가하기',
                    currentProductId: productData?.idx,
                    popupController: true,
                  };
                  dispatch(saveNewPopup(popupData2));
                  return;
                }
              }
            }
            const insertToCartResponse = await insertToCart(cartData);
            // console.log('작동되는지', insertToCartResponse);
            navigate('/cart');

            // console.log('현재 상품', productData, '옵션명', option);
          }

          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { insertProduct, noticeOptionState };
};

export default useInsertCart;
