import React, { useState } from 'react';
import style from './AdminCategoryCreate.module.scss';
import { createCategory } from '../../../api/admin';
import { useQueryClient, useMutation } from 'react-query';

const AdminCategoryCreate = () => {
  const [category, setCategory] = useState<string>('');
  const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCategory(value);
  };
  const initCategory = () => {
    setCategory('');
  };
  const enclosedCategory = {
    categoryName: category,
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      return await createCategory(enclosedCategory);
    },
    {
      onSuccess: (newQueryData) => {
        console.log('newQueryData', newQueryData);
        queryClient.setQueryData('getCategoryList', newQueryData.data.contents);
      },
    },
  );
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
    initCategory();
  };
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
            />
          </div>
          <div>
            <button className="cta-btn--block admin">카테고리 생성</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCategoryCreate;
