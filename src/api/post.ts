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

//장바구니에 담기 api
async function insertToCart(cartData: any) {
  return await post.post('post-auth/insert-to-cart-process', cartData);
}

//장바구니 내용 가져오기
async function getCartList() {
  return await post.get('post-auth/get-cart-list-process');
}

//장바구니의 특정 상품 수량 추가하기
async function increasCartInventory(productId: IProductIdx) {
  return await post.post('post-auth/increase-cart-inventory', productId);
}

//장바구니 비우기 요청
async function deleteCart() {
  return await post.delete('post-auth/delete-cart');
}

//선택한 장바구니 비우기 요청
async function deleteSelectedCart(selectedData: Array<string>) {
  return await post.delete('post-auth/delete-selected-cart', {
    data: { selectedData: selectedData },
  });
}

export {
  getProductList,
  getCategorys,
  getCategorysProduct,
  getProductDetail,
  getProductOption,
  insertToCart,
  getCartList,
  increasCartInventory,
  deleteCart,
  deleteSelectedCart,
};
