import { instance, post } from './index';

//상품 리스트 가져오기
const getProductList = async () => {
  try {
    return await instance.get('post/product-list');
  } catch (error: any) {
    console.log(error);
    if (error.message === 'DB_ERROR') {
      return {
        message: 'database에서 문제가 발생했습니다.',
        error,
      };
    }
  }
};

export { getProductList };
