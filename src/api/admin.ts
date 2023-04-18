import { instance, post } from './index';

const getCategoryData = async () => {
  return await instance.get('admin/category-data');
};
const createCategory = async () => {
  return await instance.post('admin/category-create-process', newCategory);
};

export { getCategoryData, createCategory };
