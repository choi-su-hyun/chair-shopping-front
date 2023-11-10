import React, { useEffect, useState } from 'react';
import style from './AdminCategoryEdit.module.scss';
import { editCatagory, getCatagoryData } from '../../../api/admin';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';

const AdminCategoryEdit = () => {
  const navigate = useNavigate();
  const { data } = useQuery('getCategoryData', async () => {
    if (id != undefined) {
      const enclosedId = {
        categoryId: id,
      };
      return await getCatagoryData(enclosedId).then((res) => {
        return res.data.contents.category_name;
      });
    }
    return new Promise((resolve) => resolve(null));
  });
  const [category, setCategory] = useState<string>(data);
  console.log('data', data);
  console.log('category', category);
  const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCategory(value);
  };
  const { id } = useParams();

  const initCategory = () => {
    setCategory('');
  };
  const enclosedCategory = {
    categoryId: id,
    categoryName: category,
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      return await editCatagory(enclosedCategory);
    },
    {
      onSuccess: (newQueryData) => {
        console.log('newQueryData', newQueryData);
        queryClient.setQueryData('getCategory', newQueryData.data.contents);
        navigate('/admin-category-create');
      },
    },
  );
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
    initCategory();
  };
  useEffect(() => {
    setCategory(data);
  }, [data]);
  if (data == undefined) return null;
  return (
    <div>
      <div>
        <form onSubmit={submitHandler} className={style['form-back']}>
          <div className="input-wrap--include-label">
            <label htmlFor="">카테고리 이름</label>
            <input
              type="text"
              placeholder="카테고리 이름을 작성하세요."
              className="input--only-input admin"
              value={category}
              onChange={categoryHandler}
              required
            />
          </div>
          <div>
            <button className="cta-btn--block admin">카테고리 수정</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCategoryEdit;
