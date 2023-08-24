import { useState, useEffect } from 'react';
import { ICategoryObject } from '../types/category';
import { getCategorys } from '../api/post';
import useErrorHandler from './error-handler';

const useCategoryList = () => {
  const [categoryList, setCategoryList] = useState<ICategoryObject[]>([]);
  const errorHandle = useErrorHandler();

  const getCategoryListAndParse = async () => {
    try {
      const axiosGetReponseForCategoryList = await getCategorys();
      const catagoryList = axiosGetReponseForCategoryList?.data?.contents;
      if (!Array.isArray(categoryList)) {
        return;
      }
      console.log('categoryList 값', axiosGetReponseForCategoryList);
      setCategoryList(catagoryList);
      console.log('categoryList 값', catagoryList);
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
