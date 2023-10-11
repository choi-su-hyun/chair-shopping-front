import React, { useState, useEffect, ReactEventHandler, useRef } from 'react';
import { createProduct } from '../../api/admin';
import { addComma } from '../../utils/addComma';
import { ReactComponent as CloseBtn } from '../../assets/close-btn.svg';
import useCategoryList from '../../hooks/use-category-list';
import { IProductOptionData } from '../../types/product';

const AdminCreateForm = () => {
  const { categoryList } = useCategoryList();
  const [selectedCategory, setSelectedCategory] = useState<string>('1');
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<string>('');
  const [option, setOption] = useState<IProductOptionData[]>([
    { optionName: '', inventory: undefined },
  ]);
  const [thumnail, setThumnail] = useState<File | null>(null);
  const [detailImage, setDetailImage] = useState<File | null>(null);
  const inventoryInput = useRef<HTMLInputElement>(null);

  const productNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };
  const productCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('value 확인', typeof e.target.value);
    setSelectedCategory(e.target.value);
  };
  const productDescriptionHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setProductDescription(e.target.value);
  };
  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let str = e.target.value.replaceAll(',', '');
    setPrice(str);
  };
  const discountRateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountRate(e.target.value);
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
    if (thumnail !== null) {
      formData.append('product_image', thumnail);
    }
    if (detailImage !== null) {
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
    createProduct(formData);
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
                onChange={productNameHandler}
              />
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">상품 카테고리</label>
              <select name="" id="" onChange={productCategoryHandler}>
                {categoryList !== undefined &&
                  categoryList.map((items: any) => {
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
          <button className="cta-btn--block admin">상품 추가</button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateForm;
