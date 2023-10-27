import React, { useState, useRef } from 'react';
import { addComma } from '../../../utils/addComma';
import {
  IProductData,
  IProductOptionDB,
  IProductOptionData,
} from '../../../types/product';
import { ICategoryObject } from '../../../types/category';
import { ReactComponent as CloseBtn } from '../../../assets/close-btn.svg';
import style from './AdminEditFrom.module.scss';
import { updateProduct } from '../../../api/admin';
import { useParams } from 'react-router-dom';

const AdminEditForm = ({
  detail,
  optionData,
  categoryData,
}: {
  detail: IProductData;
  optionData: IProductOptionDB[];
  categoryData: ICategoryObject[];
}) => {
  const { id } = useParams();
  const productIdx = { productId: id };
  console.log('data 값', detail);
  const [inputs, setInputs] = useState({
    productName: detail.product_name,
    productDescription: detail.product_description,
    price: detail.product_price,
    discountRate: detail.product_discount,
  });
  const [option, setOption] = useState<IProductOptionData[]>(
    optionData.map((item, index) => {
      return { optionName: item.option_name, inventory: item.inventory };
    }),
  );
  const [thumnail, setThumnail] = useState<File | null>();
  const [detailImage, setDetailImage] = useState<File | null>(null);
  const inventoryInput = useRef<HTMLInputElement>(null);
  const { productName, productDescription, price, discountRate } = inputs;
  const [selectedCategory, setSelectedCategory] = useState<number>(
    detail.category_idx,
  );
  const textInputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const productCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(Number(e.target.value));
  };

  const addOptionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOption([...option, { optionName: '', inventory: undefined }]);
  };
  const removeOptionHandler = (index: number) => {
    const filteredOption = [...option];
    filteredOption.splice(index, 1);
    setOption(filteredOption);
  };
  const changeOptionHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const list: IProductOptionData[] = [...option];
    list[index][e.target.id] = e.target.value;
    setOption(list);
    // console.log(option);
  };
  const activeEnterFirstInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inventoryInput.current) {
        inventoryInput.current.focus();
      }
    }
  };
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setOption([...option, { optionName: '', inventory: undefined }]);
      e.preventDefault();
    }
  };

  const thumnailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    setThumnail(e.target.files[0]);
  };
  const detailImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    setDetailImage(e.target.files[0]);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (thumnail != null) {
      formData.append('product_image', thumnail);
    }
    if (detailImage != null) {
      formData.append('product_detail_image', detailImage);
    }
    formData.append(
      'data',
      JSON.stringify({
        product_name: productName,
        product_description: productDescription,
        product_price: price,
        product_discount_rate: discountRate,
        product_category: selectedCategory,
        product_option: option,
      }),
    );
    /* key 확인하기 */
    for (let key of formData.keys()) {
      console.log(key);
    }

    /* value 확인하기 */
    for (let value of formData.values()) {
      console.log(value);
    }
    // createProduct(formData);
    updateProduct(formData, productIdx);
    console.log('formData 값', formData);
  };

  return (
    <div>
      <div>
        <form
          className="post-form"
          encType="multipart/form-data"
          onSubmit={onSubmitHandler}
        >
          <div className="input-wrap">
            <div className="input-wrap--include-label">
              <label htmlFor="">상품 이름</label>
              <input
                className="input--only-input admin"
                type="text"
                placeholder="상품 이름"
                name="productName"
                value={productName}
                onChange={textInputHandler}
              />
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">상품 카테고리</label>
              <select
                name=""
                id=""
                onChange={productCategoryHandler}
                value={selectedCategory}
              >
                {categoryData !== undefined &&
                  categoryData.map((items: ICategoryObject) => {
                    return (
                      <option key={items.idx} value={items.idx}>
                        {items.category_name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">상품 설명</label>
              <textarea
                className="input--only-input admin"
                placeholder="상품 설명"
                onChange={textInputHandler}
                name="productDescription"
                value={productDescription}
              ></textarea>
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">가격</label>
              <input
                className="input--only-input admin"
                type="text"
                placeholder="가격"
                name="price"
                onChange={textInputHandler}
                value={addComma(price) || ''}
              />
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">할인률</label>
              <input
                className="input--only-input admin"
                type="number"
                placeholder="할인률"
                onChange={textInputHandler}
                name="discountRate"
                value={discountRate}
              />
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">색상</label>
              <div>
                {option.map((item, index) => {
                  return (
                    <div key={index} className="input-wrap__2-input-wrap">
                      <div className="input-wrap__2-input">
                        <div className="input-wrap--sm">
                          <label>색상명</label>
                          <input
                            className="input--only-input admin"
                            type="text"
                            id="optionName"
                            value={item.optionName}
                            placeholder="빨강"
                            onChange={(e) => changeOptionHandler(e, index)}
                            onKeyDown={(e) => activeEnterFirstInput(e)}
                          />
                        </div>
                        <div className="input-wrap--sm">
                          <label>재고</label>
                          <input
                            className="input--only-input admin"
                            type="number"
                            id="inventory"
                            value={item.inventory}
                            placeholder="20"
                            onChange={(e) => changeOptionHandler(e, index)}
                            onKeyDown={(e) => activeEnter(e)}
                            ref={inventoryInput}
                          />
                        </div>
                        <div>
                          {option.length > 1 && (
                            <button
                              className="only-picto-btn"
                              onClick={() => removeOptionHandler(index)}
                            >
                              <CloseBtn />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {option.length < 6 && (
              <div className="input-wrap--include-label">
                <div></div>
                <div className="form-btn-wrap">
                  <button
                    className="block-btn admin"
                    onClick={addOptionHandler}
                  >
                    옵션 추가
                  </button>
                </div>
              </div>
            )}
            <div className={style['notice-gray']}>
              <span>
                아래에 변경하고 싶은 새로운 이미지를 넣어주세요.(*비워두면
                기존에 반영되어있는 그대로 반영됩니다)
              </span>
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">대표 이미지</label>
              <input
                className="input--only-input admin"
                type="file"
                placeholder="대표 이미지"
                onChange={thumnailHandler}
              />
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">상세 페이지</label>
              <input
                className="input--only-input admin"
                type="file"
                placeholder="상세페이지"
                onChange={detailImageHandler}
              />
            </div>
          </div>
          <button className="cta-btn--block admin">상품 추가</button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditForm;
