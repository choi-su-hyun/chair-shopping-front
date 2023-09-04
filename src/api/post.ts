import { instance, post } from './index';
import { ICategoryId } from '../types/category';
import { IProductIdx } from '../types/product';

//상품 리스트 요청
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

//상품 카테고리 탭 리스트 요청
const getCategorys = async () => {
  return await instance.get('post/product-category-tab');
};

//특정 카테고리의 상품 리스트 요청
const getCategorysProduct = async (categoryId: ICategoryId) => {
  try {
    const result = await instance.post(
      'post/product-category-data',
      categoryId,
    );
    return result.data.contents;
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

//상세페이지 정보 요청
const getProductDetail = async (productIdx: IProductIdx) => {
  try {
    const result = await instance.post(
      'post/product-detail-data-process',
      productIdx,
    );
    // console.log('result 값', result);
    return result.data.contents;
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

//상세페이지 옵션 리스트 요청
const getProductOption = async (productIdx: IProductIdx) => {
  try {
    const result = await instance.post('post/product-option-list', productIdx);
    return result.data.contents;
  } catch (error) {
    console.log(error);
  }
};

//카트에 담기 api
async function insertToCart(cartData: any) {
  return await post.post('post-auth/insert-to-cart-process', cartData);
}

export {
  getProductList,
  getCategorys,
  getCategorysProduct,
  getProductDetail,
  getProductOption,
  insertToCart,
};
