import { useState, useEffect } from 'react';
import { Category } from '../types/category';
import { getCategoryData } from '../api/admin';
import useErrorHandler from './error-handler';

const useCategoryList = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const errorHandle = useErrorHandler();

  const getCategoryListAndParse = async () => {
    try {
      const axiosGetReponseForCategoryList = await getCategoryData();
      const catagoryList = axiosGetReponseForCategoryList?.data?.content;
      if (!Array.isArray(categoryList)) {
        return;
      }
      setCategoryList(catagoryList);
    } catch (err: any) {
      if (err?.response?.data?.message === 'NETWORK_ERROR') {
        alert('서버에 문제가 생겼어요!\n새로고침 후 다시 시도해주세요!');
        return;
      }
      errorHandle(err);
    }
  };

  useEffect(() => {
    getCategoryListAndParse();
  }, []);
  return { categoryList, setCategoryList };
};

export default useCategoryList;
