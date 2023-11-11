import React, { useEffect, useState } from 'react';
import style from './AdminCategoryEdit.module.scss';
import {
  editCatagory,
  getCatagoryData,
  deleteCatagory,
} from '../../../api/admin';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';

const AdminCategoryEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState<string>('');

  const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCategory(value);
  };

  const initCategory = () => {
    setCategory('');
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      if (id != undefined) {
        const enclosedCategory = {
          categoryId: id,
          categoryName: category,
        };
        return await editCatagory(enclosedCategory);
      }
      return;
    },
    {
      onSuccess: (newQueryData) => {
        console.log('newQueryData', newQueryData);
        if (newQueryData) {
          queryClient.setQueryData('getCategory', newQueryData.data.contents);
        }
        navigate('/admin-category-create');
      },
    },
  );
  const deleteMutation = useMutation(
    async () => {
      if (id != undefined) {
        const enclosedId = {
          categoryId: id,
        };
        return await deleteCatagory(enclosedId);
      }
      return;
    },
    {
      onSuccess: (newQueryData) => {
        if (newQueryData) {
          queryClient.setQueryData('getCategory', newQueryData.data.contents);
        }
        navigate('/admin-category-create');
      },
    },
  );
  const deleteHandler = () => {
    deleteMutation.mutate();
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
    initCategory();
  };
  if (id == undefined) return null;
  const enclosedId = {
    categoryId: id,
  };
  const { data } = useQuery(['getCategoryData', enclosedId], async () => {
    return await getCatagoryData(enclosedId).then((res) => {
      return res.data.contents;
    });
  });
  useEffect(() => {
    setCategory(data.category_name);
  }, [data]);
  if (data == undefined) return null;
  return (
    <div>
      <div>
        <form onSubmit={submitHandler} className={style['form-back']}>
          <div className="input-wrap--has-label">
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
        {id != '6' ? (
          <div className={style['form-back']}>
            <div className={style['delete-form']}>
              <h3>카테고리 삭제</h3>
              <button onClick={deleteHandler} className="block-btn alert">
                클릭 시 삭제
              </button>
            </div>
            <span className={style['notice-text']}>
              *카테고리를 삭제하면 카테고리에 포함된 상품은 기본 카테고리로
              넘어갑니다.
            </span>
          </div>
        ) : (
          <span className={style['notice-text']}>
            *기본 카테고리는 삭제할 수 없습니다.
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminCategoryEdit;
