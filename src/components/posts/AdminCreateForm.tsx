import React, { useState, useEffect, ReactEventHandler } from 'react';
import { getCategoryData } from '../../api/admin';

const AdminCreateForm = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [thumnail, setThumnail] = useState('');

  useEffect(() => {
    getCategoryData()
      .then((response: any) => {
        setCategoryData(response.data.content);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const productNameHandler = (e: React.ChangeEvent<any>) => {
    setProductName(e.target.value);
  };
  const productDescriptionHandler = (e: React.ChangeEvent<any>) => {
    setProductDescription(e.target.value);
  };
  const priceHandler = (e: React.ChangeEvent<any>) => {
    setPrice(e.target.value);
  };
  const discountRateHandler = (e: React.ChangeEvent<any>) => {
    setDiscountRate(e.target.value);
  };
  const thumnailHandler = (e: React.ChangeEvent<any>) => {
    setThumnail(e.target.value);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log('세상은 뭘까?');
  };
  return (
    <div>
      <div>
        <form className="post-form">
          <div className="input-wrap">
            <div className="input-wrap--include-label">
              <label htmlFor="">상품 이름</label>
              <input
                className="input--only-input"
                type="text"
                placeholder="상품 이름"
                onChange={productNameHandler}
              />
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">상품 카테고리</label>
              <select name="" id="">
                {categoryData.map((items: any) => {
                  return (
                    <option key={items.idx} value={items.category_name}>
                      {items.category_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">상품 설명</label>
              <textarea
                className="input--only-input"
                placeholder="상품 설명"
                onChange={productDescriptionHandler}
              ></textarea>
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">가격</label>
              <input
                className="input--only-input"
                type="number"
                placeholder="가격"
                onChange={priceHandler}
              />
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">할인률</label>
              <input
                className="input--only-input"
                type="number"
                placeholder="할인률"
                onChange={discountRateHandler}
              />
            </div>
            <div className="input-wrap--include-label">
              <label htmlFor="">대표 이미지</label>
              <input
                className="input--only-input"
                type="file"
                placeholder="대표 이미지"
                onChange={thumnailHandler}
              />
            </div>
          </div>
          <button className="cta-btn--block" onClick={onSubmitHandler}>
            상품 추가
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateForm;
