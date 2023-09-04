import { insertToCart } from '../api/post';
import { IProductData } from '../types/product';
import { useState } from 'react';

const useInsertCart = (
  productData: IProductData | undefined,
  option: string,
  quantity: number,
) => {
  const [noticeOptionState, setNoticeOptionState] = useState<Boolean>(false);
  const insertProduct = async () => {
    try {
      const cartData = {
        productIdx: productData?.idx,
        productOption: option,
        quantity: quantity,
      };
      if (option === '') {
        setNoticeOptionState(true);
      } else {
        setNoticeOptionState(false);
      }

      const insertToCartResponse = await insertToCart(cartData);
      console.log('작동되는지', insertToCartResponse);
      return;
    } catch (error) {
      console.log(error);
    }
  };
  return { insertProduct, noticeOptionState };
};

export default useInsertCart;
