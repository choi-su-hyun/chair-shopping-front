import React, { useState, useEffect, ReactEventHandler, useRef } from 'react';
import { getCategoryData } from '../../api/admin';
import { createProduct } from '../../api/admin';
import { addComma } from '../../utils/addComma';

import { ReactComponent as CloseBtn } from '../../assets/close-btn.svg';
import useCategoryList from '../../hooks/use-category-list';

const AdminCreateForm = () => {
  const { categoryList } = useCategoryList();
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [option, setOption] = useState([{ optionName: '', inventory: '' }]);
  const [thumnail, setThumnail] = useState('');
  const [detailImage, setDetailImage] = useState('');
  const inventoryInput = useRef<HTMLInputElement>(null);

  const productNameHandler = (e: React.ChangeEvent<any>) => {
    setProductName(e.target.value);
  };
  const productCategoryHandler = (e: React.ChangeEvent<any>) => {
    setSelectedCategory(e.target.value);
  };
  const productDescriptionHandler = (e: React.ChangeEvent<any>) => {
    setProductDescription(e.target.value);
  };
  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let str = e.target.value.replaceAll(',', '');
    setPrice(str);
  };
  const discountRateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountRate(e.target.value);
  };

  const addOptionHandler = (e: any) => {
    e.preventDefault();
    setOption([...option, { optionName: '', inventory: '' }]);
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
    const list: any = [...option];
    list[index][e.target.id] = e.target.value;
    setOption(list);
    console.log(option);
  };
  const activeEnterFirstInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inventoryInput.current) {
        inventoryInput.current.focus();
      }
      console.log('엔터가 눌렸는지 확인');
    }
    console.log('함수가 작동하는지 확인');
    console.log(option);
  };
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addOptionHandler(e);
    }
    console.log(e);
    console.log('작동 여부 확인');
  };

  const thumnailHandler = (e: React.ChangeEvent<any>) => {
    setThumnail(e.target.files[0]);
  };
  const detailImageHandler = (e: React.ChangeEvent<any>) => {
    setDetailImage(e.target.files[0]);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product_image', thumnail);
    formData.append('product_detail_image', detailImage);
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
    createProduct(formData);
  };
  return (
    <div>
      <div>
        <form className="post-form" encType="multipart/form-data">
          <div className="input-wrap">
            <div className="input-wrap--include-label">
              <label htmlFor="">상품 이름</label>
              <input
                className="input--only-input admin"
                type="text"
                placeholder="상품 이름"
                onChange={productNameHandler}
              />
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">상품 카테고리</label>
              <select name="" id="" onChange={productCategoryHandler}>
                {categoryList.map((items: any) => {
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
                onChange={productDescriptionHandler}
              ></textarea>
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">가격</label>
              <input
                className="input--only-input admin"
                type="text"
                placeholder="가격"
                onChange={priceHandler}
                value={addComma(price) || ''}
              />
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">할인률</label>
              <input
                className="input--only-input admin"
                type="number"
                placeholder="할인률"
                onChange={discountRateHandler}
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
          <button className="cta-btn--block admin" onClick={onSubmitHandler}>
            상품 추가
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateForm;
