import React, { useState, useEffect, ReactEventHandler } from 'react';
import { getCategoryData } from '../../api/admin';
import { createProduct } from '../../api/admin';

const AdminCreateForm = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [thumnail, setThumnail] = useState('');
  const [detailImage, setDetailImage] = useState('');

  useEffect(() => {
    getCategoryData()
      .then((response: any) => {
        setCategoryData(response.data.content);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const productNameHandler = (e: React.ChangeEvent<any>) => {
    setProductName(e.target.value);
  };
  const productCategoryHandler = (e: React.ChangeEvent<any>) => {
    setSelectedCategory(e.target.value);
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
                {categoryData.map((items: any) => {
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
                type="number"
                placeholder="가격"
                onChange={priceHandler}
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
