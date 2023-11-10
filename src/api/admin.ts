import { instance, post } from './index';
import { IAdminLoginData } from '../types/administrator';
import { IAdminLoginAxiosResult } from '../types/administrator';
import { IProductIdx } from '../types/product';

interface CustomError extends Error {
  // name: string;
  // message: string;
  // stack?: string; - Error 인터페이스 프로퍼티들을 직접 쓰거나 아니면 상속해준다.

  response?: {
    data: any;
    status: number;
    headers: string;
  };
}

//category 리스트 요청
const getCategoryList = async () => {
  return await post.get('admin-auth/category-list');
};
//category 생성 요청
const createCategory = async (categoryName: { categoryName: string }) => {
  return await post.post('admin-auth/category-create-process', categoryName);
};
//특정 category 데이터 요청
const getCatagoryData = async (categoryId: { categoryId: number | string }) => {
  return await post.get('admin-auth/get-category-data-process', {
    params: categoryId,
  });
};
//category 수정 요청
const editCatagory = async (categoryData: {
  categoryId?: number | string;
  categoryName: string;
}) => {
  return await post.put('admin-auth/edit-category-process', categoryData);
};

//admin 로그인 요청
async function loginAdmin(
  userData: IAdminLoginData,
): Promise<IAdminLoginAxiosResult> {
  try {
    const loginResponsedData = await instance.post(
      'admin/admin-login-process',
      userData,
    );
    console.log('data 값', loginResponsedData);
    const result = {
      successStatus: true,
      loginResponsedData: loginResponsedData,
    };
    return result;
  } catch (error: unknown) {
    console.log('error 값', error);
    const customErr = error as CustomError;
    if (customErr.response?.data.message === 'ID_NOTHING') {
      const result = {
        successStatus: false,
        message: '존재하지 않는 아이디입니다.',
      };
      return result;
    }
    if (customErr.response?.data.message === 'Password not matched') {
      const result = {
        successStatus: false,
        message: '비밀번호가 일치하지 않습니다.',
      };
      return result;
    }
    return {
      successStatus: false,
      message: 'Something Error',
    };
  }
}

//상품 생성 요청
async function createProduct(productData: any) {
  try {
    await post.post('admin-auth/product-create-process', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.log(error);
  }
}

//상품 수정 요청
async function updateProduct(
  productData: any,
  productId: { productId?: string },
) {
  return await post.put('admin-auth/product-update-process', productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      productId: productId,
    },
  });
}

//상품 제거 요청
async function deleteProduct(productId: { productId?: string }) {
  return await post.delete('admin-auth/product-delete-process', {
    params: {
      productId: productId,
    },
  });
}
export {
  getCategoryList,
  getCatagoryData,
  createCategory,
  editCatagory,
  loginAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
};
